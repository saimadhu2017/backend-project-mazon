const { buildPassword } = require('../helpers/password');
const executeAPI = require('../database/exFunction');
const { unAuth, forbidden } = require('../helpers/httpcodes');
const validators = require('../helpers/validators');
const jwt = require('jsonwebtoken');
const common = require('../helpers/common');
const { expressjwt } = require('express-jwt')
const { onDone, onError } = require('../helpers/response')

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
    const { isMailThere, salt: userSalt, encry_password, id } = rows[0];
    if (isMailThere) {
        const { password: userPassword, mail } = req.query;
        const { password: newEncrypassword } = buildPassword(userPassword, userSalt);
        if (newEncrypassword === encry_password) {
            const token = jwt.sign({ mail: mail }, process.env.TOKEN_SECRECT);
            res.cookie(common.TOKEN, token, { maxAge: 60000 })
            const finData = {
                token,
                mail,
                id
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
        '${user.mail}','${user.phone}','${user.password}','${user.salt}',${user.role || common.DEF_USER_ROLE}`;
        executeAPI(sql, onCreatingUser, onError, res);
    }
}

exports.signIn = (req, res) => {
    const valid = validators.validateSignInUser(req.query);
    if (valid.error) {
        onError(valid.error.details, res)
    }
    else {
        const sql = `SELECT * from users.fn_checkUserEmailPresent('${req.query.mail}')`;
        executeAPI(sql, onMailFound, onError, res, req);
    }
}

exports.signOut = (req, res) => {
    res.clearCookie(common.TOKEN);
    onDone({ message: common.SIGN_OUT }, res)
}

// expressjwt middleware
exports.isSignedIn = expressjwt({
    secret: process.env.TOKEN_SECRECT,
    algorithms: ['HS256']
})

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
    const check = req.paramAuth?.mail && req.auth?.mail && (req.paramAuth.mail === req.auth.mail);
    if (!(check && (req.headers?.authorization === `Bearer ${req.cookies?.token}`))) {
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