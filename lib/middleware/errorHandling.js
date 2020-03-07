const send = (res, statusCode, message) => {
    res.status(statusCode).send({ success: false, error: message })
}

export const handleError = (err, req, res, next) => {
    //log out the error for debugging
    console.log(err)

    if (err.code === "ER_DUP_ENTRY")
        return send(res, 401, "ALREADY_EXIST_NO_DUPLICATES")

    if (err.code === "ER_BAD_FIELD_ERROR")
        return send(res, 401, "INVALID INPUT")

    return send(res, 500, "UNKNOWN ERROR")
}