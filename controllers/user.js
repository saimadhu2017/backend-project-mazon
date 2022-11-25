const executeAPI = require("../database/exFunction");
const common = require("../helpers/common");
const { ok } = require("../helpers/httpcodes");
const { onError } = require("../helpers/response");

exports.userIdParam = (req, res, next, id) => {
    if (isNaN(id)) {
        const err = { message: common.NOT_NUMBER }
        return (
            onError(err, res)
        );
    }
    const onDone = (rows, res) => {
        req.paramAuth = rows[0];
        next();
    }
    const sql = `SELECT * from users.fn_getUser(${id})`;
    executeAPI(sql, onDone, onError, res, req);
}

exports.getUser = (req, res) => {
    req.paramAuth.encry_password = undefined;
    req.paramAuth.salt = undefined;
    res.status(ok.code).json({
        status: ok.status,
        message: ok.message,
        data: req.paramAuth
    })
}