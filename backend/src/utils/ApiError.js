import express from "express"; // Import express module

const app = express();

class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors

        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }

    }
}

app.use((err, req, res, next) => {
    // Default to 500 Internal Server Error if status code is not set
    const statusCode = err.statusCode || 500;
    const data = err.data || null;
    const success = err.success || false;
    const message = err.message || 'Internal Server Error';


    // Send JSON response with error details
    res.status(statusCode).json({
        success: false,
        error: {
            statusCode,
            message,
            data,
            success
        }
    });
});

export { ApiError }