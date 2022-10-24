const { v4: uuidv4 } = require('uuid');
const { createHmac } = require('node:crypto');

exports.buildPassword = (password) => {
    const salt = uuidv4();
    const hash = createHmac('sha256', salt).update(password).digest('hex');
    return {
        password: hash,
        salt: salt
    }
}