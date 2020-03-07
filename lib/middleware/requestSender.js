export const setReqMethods = (req, res, next) => {
    req.setResponse = (statusCode, message) => {
        res.locals.message = message
        res.locals.statusCode = statusCode
    }
    return next()
}

export const sendResponse = (req, res, next) => {
    const { statusCode, message } = res.locals
    res.status(statusCode).send({ message })
}

