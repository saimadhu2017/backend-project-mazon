const executeAPI = require('../database/exFunction');
const common = require('../helpers/common');
const { onError, onDone } = require('../helpers/response');
const validators = require('../helpers/validators')

const onCreatingShop = (rows, res) => {
    const { isCreated } = rows[0];
    if (isCreated) {
        return onDone(rows, res);
    }
    const err = { message: common.SHOP_THERE }
    onError(err, res)
}

exports.addProduct = (req, res) => {
    const data = {
        ...req.body,
        manager: req.params.userid
    }
    const valid = validators.validateNewShop(data);
    if (valid.error) {
        return onError(valid.error.details, res);
    }
    const sql = `EXEC products.[sp_new_shop] '${data.name}','${data.mail}','${data.phone}',${data.manager}`;
    executeAPI(sql, onCreatingShop, onError, res);
}