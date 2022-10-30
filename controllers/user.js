const { buildPassword } = require('../helpers/password');
const executeAPI = require('../database/exFunction');
const { ok, badReq } = require('../helpers/httpcodes');
const validators = require('../helpers/validators');

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

exports.setUser = (req, res) => {
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
        executeAPI(sql, onDone, onError, res);
    }
}