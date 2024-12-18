// customError.js
class BaseError extends Error {
    constructor(message, code, statusCode) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

class NotFoundError extends BaseError {
    constructor(message = 'Resource not found') {
        super(message, 'NOT_FOUND_ERROR', 404);
    }
}

module.exports = {
    BaseError,
    NotFoundError,
};


class BadRequestError extends BaseError {
    constructor(message = 'Bad request') {
        super(message, 'BAD_REQUEST_ERROR', 400);
    }
}

class UnsupportedMediaTypeError extends BaseError {
    constructor(message = 'Unsupported media type') {
        super(message, 'UNSUPPORTED_MEDIATYPE_ERROR', 415);
    }
}

class ForbiddenError extends BaseError {
    constructor(message = 'Access forbidden') {
        super(message, 'FORBIDDEN_ERROR', 403);
    }
}

class ConflictError extends BaseError {
    constructor(message = 'Conflict detected') {
        super(message, 'CONFLICT_ERROR', 409);
    }
}

class MethodNotAllowedError extends BaseError {
    constructor(message = 'Method not allowed') {
        super(message, 'METHOD_NOT_ALLOWED_ERROR', 405);
    }
}

class RequestTimeoutError extends BaseError {
    constructor(message = 'Request timed out') {
        super(message, 'REQUEST_TIMEOUT_ERROR', 408);
    }
}

class UnauthorizedError extends BaseError {
    constructor(message = 'Unauthorized access') {
        super(message, 'UNAUTHORIZED_ERROR', 401);
    }
}

class NotImplementedError extends BaseError {
    constructor(message = 'Feature not implemented') {
        super(message, 'NOT_IMPLEMENTED_ERROR', 501);
    }
}

class PayloadTooLargeError extends BaseError {
    constructor(message = 'Payload too large') {
        super(message, 'PAYLOAD_TOO_LARGE_ERROR', 413);
    }
}

class ValidationError extends BaseError {
    constructor(message = 'Validation failed') {
        super(message, 'VALIDATION_ERROR', 422);
    }
}

module.exports = {
    BaseError,
    NotFoundError,
    BadRequestError,
    UnsupportedMediaTypeError,
    ForbiddenError,
    ConflictError,
    MethodNotAllowedError,
    RequestTimeoutError,
    UnauthorizedError,
    NotImplementedError,
    PayloadTooLargeError,
    ValidationError,
};

