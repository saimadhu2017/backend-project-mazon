const connectDB = require('./connectDB');
const { Request } = require('tedious');

const executeAPI = (sql) => {
    connectDB((connection) => {
        const rows = [];
        const request = new Request(sql, (err) => {
            if (err) {
                console.log('Error in fetching the data');
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
            console.log('Successfully fecthed the data', rows);
        })

        if (connection) {
            console.log('First this will execute..');
            connection.execSql(request)
        }
    });
}

executeAPI('select * from users.customers');
module.exports = executeAPI;