const joi = require(`@hapi/joi`)

const validateSignUp = async (req, res, next) => {
    const schema = joi.object({
        firstName: joi.string().required().max(20).pattern(/^\s*[A-Za-z]+\s*$/).messages({
            "any.required": "Please provide First name.",
            "string.empty": "First name cannot be left empty.",
            "string.max": "First name must not be more than 20 characters long.",
            "string.pattern.base": "First name should only contain letters.",
        }),
        surname: joi.string().required().max(20).pattern(/^\s*[A-Za-z]+\s*$/).messages({
            "any.required": "Please provide First name.",
            "string.empty": "First name cannot be left empty.",
            "string.max": "First name must not be more than 20 characters long.",
            "string.pattern.base": "First name should only contain letters.",
        }),
        contact: joi.alternatives().try(
            joi.string().trim().email().messages({
                "any.required": "Please provide your email address or phone number.",
                "string.empty": "Email address or phone number cannot be left empty.",
                "string.email": "Invalid email format. Please use a valid email address.",
                "string.pattern.base": "Please provide your email address or phone number.",
            }),
            joi.string().pattern(/^\+\d{3}-\d{3}\d{7}$/).messages({
                "any.required": "Please provide your email address or phone number.",
                "string.empty": "Email address or phone number cannot be left empty.",
                "string.pattern.base": "Invalid phone number format. Please use a valid phone number(+234-8182154747).",
            })
        ),
        password: joi.string().required().pattern(new RegExp("^(?=.*[!@#$%^&])(?=.*[A-Z]).{8,}$")).messages({
            "any.required": "Please provide a password.",
            "string.empty": "Password cannot be left empty.",
            "string.pattern.base":
                "Password must be at least 8 characters long and include at least one uppercase letter and one special character (!@#$%^&*).",
        }),
        dateOfBirth: joi.string().required().messages({
            "any.required": "Please provide your date of birth.",
            "string.empty": "Date of birth cannot be left empty.",
        }),
        gender: joi.string().required().valid('male', 'female').insensitive().messages({
            'string.pattern.base': 'Gender must be in alphabets.',
            'any.required': 'Gender is required.',
            'any.only': 'Gender must be one of [male or female].'
        }),
    })
    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        })
    } else {
        return next()
    }
}

const validateSignIn = async (req, res, next) => {
    const schema = joi.object({
        contact: joi.alternatives().try(
            joi.string().trim().email().messages({
                "any.required": "Please provide your email address or phone number.",
                "string.empty": "Email address or phone number cannot be left empty.",
                "string.email": "Invalid email format. Please use a valid email address.",
                "string.pattern.base": "Please provide your email address or phone number.",
            }),
            joi.string().pattern(/^\+\d{3}-\d{3}\d{7}$/).messages({
                "any.required": "Please provide your email address or phone number.",
                "string.empty": "Email address or phone number cannot be left empty.",
                "string.pattern.base": "Invalid phone number format. Please use a valid phone number(+234-8182154747).",
            })
        ),
        password: joi.string().required().pattern(new RegExp("^(?=.*[!@#$%^&])(?=.*[A-Z]).{8,}$")).messages({
            "any.required": "Please provide a password.",
            "string.empty": "Password cannot be left empty.",
            "string.pattern.base":
                "Password must be at least 8 characters long and include at least one uppercase letter and one special character (!@#$%^&*).",
        })
    })
    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        })
    } else {
        return next()
    }
}

module.exports = { validateSignUp, validateSignIn }

