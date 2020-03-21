require("dotenv").config()
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const HTTP_UNAUTHORIZED = 401

export const tokenErr = (err, req, res, next) => {
    if (err.status == HTTP_UNAUTHORIZED) {
        return res.status(HTTP_UNAUTHORIZED).send({ error: 'Invalid token' })
    }
}

export const implId = (req, res, next) => {
    try {
        const parts = req.user.sub.split("|")
        if (parts.length < 2) return res.status(401).send({ error: 'Invalid user id format' })
        req.userId = parts[1]
    } catch (e) {
        //this should never happen
        return res.status(401).send({ error: 'Invalid user id format' })
    }
    next()
}

export const checkJwt = jwt({
    // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
    secret: "2EynQqrVUzlAJJEEfaC1LcP9X3npq9DM",

    // Validate the audience and the issuer.
    audience: process.env.AUTH0_AUDIENCE,
    issuer: process.env.AUTH0_DOMAIN,
    algorithms: ['HS256']
})

