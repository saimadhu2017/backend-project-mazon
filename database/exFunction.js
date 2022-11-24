const connectDB = require('./connectDB');
const { Request } = require('tedious');

const executeAPI = (sql, onDone, onError, res, req) => {
    connectDB((connection) => {
        const rows = [];
        let checkErrorInFetch = false;
        const request = new Request(sql, (err) => {
            if (err) {
                checkErrorInFetch = true;
                onError(err, res);
            }
            connection.close();
        });

        request.on('row', (columns) => {
            const item = {}
            columns.map((column) => {
                item[column.metadata.colName] = column.value;
            })
            rows.push(item)
        })

        request.on('requestCompleted', () => {
            if (!checkErrorInFetch) {
                onDone(rows, res, req)
            }
        })

        if (connection) {
            connection.execSql(request)
        }
    }, res);
}

module.exports = executeAPI;