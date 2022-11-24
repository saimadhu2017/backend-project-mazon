const { v4: uuidv4 } = require('uuid');
const { createHmac } = require('node:crypto');
const { HASH_ALGO, HASH_DIGEST } = require('./common');

exports.buildPassword = (password, userSalt) => {
    const salt = userSalt || uuidv4();
    const hash = createHmac(HASH_ALGO, salt).update(password).digest(HASH_DIGEST);
    return {
        password: hash,
        salt: salt
    }
}