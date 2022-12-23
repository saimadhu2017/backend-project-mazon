const dbconfig = require('./dbconfig');
const { Connection } = require('tedious');
const { unavailable, internalServErr } = require('../helpers/httpcodes');

const connectDB = (callback, res) => {
    try {
        const connection = new Connection(dbconfig);
        connection.on('connect', (err) => {
            if (err) {
                res.status(internalServErr.code).json({
                    status: internalServErr.status,
                    message: internalServErr.message,
                    err: internalServErr.message
                })
            }
            else {
                callback(connection)
            }
        })
        connection.connect();
    } catch (error) {
        res.status(unavailable.code).json({
            status: unavailable.status,
            message: unavailable.message,
            err: unavailable.message
        })
    }
}

module.exports = connectDB;