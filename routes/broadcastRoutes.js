import { createBroadcast, getBroadcastById, getAllBroadcasts, generatePublisherToken, generateViewerToken } from '../controllers/broadcast'
import { checkJwt, tokenErr, implId } from "../lib/middleware/checkJwt"

// import v from "../lib/requestValidation/broadcastValidator"
// import { validate } from "../lib/requestValidation/validation"

module.exports = (app) => {
    app.post('/broadcasts/create', checkJwt, tokenErr, implId, createBroadcast)
    app.get('/broadcasts/:id', checkJwt, tokenErr, implId, getBroadcastById)
    app.get('/broadcasts', checkJwt, tokenErr, implId, getAllBroadcasts)
    app.get('/broadcasts/:id/publisher', checkJwt, tokenErr, implId, generatePublisherToken)
    app.get('/broadcasts/:id/viewer', checkJwt, tokenErr, implId, generateViewerToken)
}