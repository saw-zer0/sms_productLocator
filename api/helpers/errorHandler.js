const app = require('express')()

class ErrorResponse extends Error {
    constructor(statusCode, message, errors = null){
        super();
        this.statusCode = statusCode
        this.message = message
        this.errors = errors;
    }
}

const errorHandler = (err, res, next) => {
    const {statusCode, message, errors} = err;
    const errDetails = (errors === null)? [] : errors 
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message,
        ...errDetails,
    })
    next()
}

module.exports = {
    ErrorResponse,
    errorHandler,
}