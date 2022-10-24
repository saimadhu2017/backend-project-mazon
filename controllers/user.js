const { buildPassword } = require('../helpers/password');
const executeAPI = require('../database/exFunction');
const { ok, badReq } = require('../helpers/httpcodes');

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
        err: err
    })
}

exports.setUser = (req, res) => {
    const user = {
        ...req.body,
        ...buildPassword(req.body.password)
    }
    const sql = 'select * from [users].[customers]';
    executeAPI(sql, onDone, onError, res)
}