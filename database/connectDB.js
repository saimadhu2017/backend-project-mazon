const dbconfig = require('./dbconfig');
const { Connection } = require('tedious');

const connectDB = (callback) => {
    try {
        const connection = new Connection(dbconfig);
        connection.on('connect', (err) => {
            if (err) {
                console.error("Can't connect DB... please check configuration of DB")
            }
            else {
                console.log('successfully connected DB')
                callback(connection)
            }
        })
        connection.connect();
    } catch (error) {
        console.log('Error with connecting DB...');
    }
}

module.exports = connectDB;