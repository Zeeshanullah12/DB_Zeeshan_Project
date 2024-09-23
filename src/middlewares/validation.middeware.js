const validationMiddleware = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {abortEarly: false});

        if(error) {
            // return res.status(400).json({errors: error.details.map(detail => detail.message)}) // Throw array of errors
            return res.status(400).json({errors: error.details[0].message})  // Throw Single errors
        }
        next()
    }
}

module.exports = validationMiddleware