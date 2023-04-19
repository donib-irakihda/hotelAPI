const { body } = require('express-validator')

exports.registerValidationRules = () => {
    return [
        body('name', "Name is required").notEmpty(),
        body('address', 'Address reqd').notEmpty(),
        body('contactNumber', 'contact number is reqd').notEmpty(),
    ];
};