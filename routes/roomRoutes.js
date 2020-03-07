import { createRoom, getRoomById, getAllRooms, joinRoom, getRoomBroadcast } from '../controllers/room'
import { checkJwt, tokenErr, implId } from "../lib/middleware/checkJwt"

import v from "../lib/requestValidation/roomValidator"
import { validate } from "../lib/requestValidation/validation"

module.exports = (app) => {
    app.post('/rooms/create', checkJwt, tokenErr, v("create"), validate, implId, createRoom)
    app.get('/rooms/:id', checkJwt, tokenErr, implId, getRoomById)
    app.get('/rooms/:id/join', checkJwt, tokenErr, implId, joinRoom)
    app.get('/rooms/:id/broadcast', checkJwt, tokenErr, implId, getRoomBroadcast)
    app.get('/rooms', checkJwt, tokenErr, implId, getAllRooms)
}
