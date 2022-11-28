const Joi = require('joi');
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const nameMaxLength = 30;
const phoneLength = 10;
const phonePattren = /^\d{10}$/
const minAge = 18;
const dobPattern = /^\d{4}-\d{2}-\d{2}$/;
const shopNameMaxLenght=100;

exports.validateUser = (data) => {
    const userSchema = Joi.object({
        first_name: Joi.string().max(nameMaxLength).required().trim(),
        last_name: Joi.string().max(nameMaxLength).required().trim(),
        mail: Joi.string().email().required(),
        phone: Joi.string().length(phoneLength).required().pattern(new RegExp(phonePattren)),
        password: Joi.string().pattern(new RegExp(passwordPattern)).required(),
        role: Joi.number()
    })
    return (userSchema.validate(data));
}

exports.validateSignInUser = (data) => {
    const userSchema = Joi.object({
        mail: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp(passwordPattern)).required()
    })
    return (userSchema.validate(data));
}

exports.validateNewShop = (data) => {
    const shopSchema = Joi.object({
        mail: Joi.string().email().required(),
        name: Joi.string().max(shopNameMaxLenght).required().trim(),
        phone: Joi.string().length(phoneLength).required().pattern(new RegExp(phonePattren)),
        manager: Joi.number().required()
    })
    return (shopSchema.validate(data));
}