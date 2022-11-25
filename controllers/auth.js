const { buildPassword } = require('../helpers/password');
const executeAPI = require('../database/exFunction');
const { ok, badReq, unAuth } = require('../helpers/httpcodes');
const validators = require('../helpers/validators');
const jwt = require('jsonwebtoken');
const common = require('../helpers/common');
const { expressjwt } = require('express-jwt')

const onDone = (rows, res) => {
    res.status(ok.code).json({
        status: ok.status,
        message: ok.message,
        data: rows
    })
}

const onError = (err, res) => {
    res.status(badReq.code).json({
        status: badReq.status,
        message: badReq.message,
        err: err.message || err[0].message
    })
}

const onCreatingUser = (rows, res) => {
    const { isCreated } = rows[0];
    if (isCreated) {
        onDone(rows, res)
        return;
    }
    const err = { message: common.USER_THERE }
    onError(err, res)
}

const onMailFound = (rows, res, req) => {
    const { isMailThere, salt: userSalt, encry_password } = rows[0];
    if (isMailThere) {
        const { password: userPassword, mail } = req.body;
        const { password: newEncrypassword } = buildPassword(userPassword, userSalt);
        if (newEncrypassword === encry_password) {
            const token = jwt.sign({ mail: mail }, process.env.TOKEN_SECRECT);
            res.cookie(common.TOKEN, token, { maxAge: 60000 })
            const finData = {
                token,
                mail
            }
            onDone(finData, res);
        }
        else {
            const err = { message: common.PASS_NOT_MATCH }
            onError(err, res)
        }
        return
    }
    const err = { message: common.MAIL_NOT_FOUND }
    onError(err, res)
}

exports.signUp = (req, res) => {
    const valid = validators.validateUser(req.body);
    if (valid.error) {
        onError(valid.error.details, res)
    }
    else {
        const user = {
            ...req.body,
            ...buildPassword(req.body.password)
        }
        const sql = `EXEC users.sp_signup_user '${user.first_name}','${user.last_name}',
        '${user.mail}','${user.phone}','${user.password}','${user.salt}'`;
        executeAPI(sql, onCreatingUser, onError, res);
    }
}

exports.signIn = (req, res) => {
    const valid = validators.validateSignInUser(req.body);
    if (valid.error) {
        onError(valid.error.details, res)
    }
    else {
        const sql = `SELECT * from users.fn_checkUserEmailPresent('${req.body.mail}')`;
        executeAPI(sql, onMailFound, onError, res, req);
    }
}

exports.signOut = (req, res) => {
    res.clearCookie(common.TOKEN);
    onDone({ message: common.SIGN_OUT }, res)
}

// expressjwt middleware
exports.isSignedin = expressjwt({
    secret: process.env.TOKEN_SECRECT,
    algorithms: ['HS256']
})

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
    const check = req.paramAuth?.mail && req.auth?.mail && (req.paramAuth.mail === req.auth.mail);
    if (!check) {
        return (
            res.status(unAuth.code).json({
                status: unAuth.status,
                message: unAuth.message,
                err: unAuth.message
            })
        );
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if (req.paramAuth?.role === 1) {
        next();
        return;
    }
    return (
        res.status(forbidden.code).json({
            status: forbidden.status,
            message: forbidden.message,
            err: forbidden.message
        })
    );
}