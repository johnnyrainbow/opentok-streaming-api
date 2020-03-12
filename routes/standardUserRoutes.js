import { getStandardUserById, getMyUser } from '../controllers/standardUser'
import { checkJwt, tokenErr, implId } from "../lib/middleware/checkJwt"

// import v from "../lib/requestValidation/broadcastValidator"
// import { validate } from "../lib/requestValidation/validation"

module.exports = (app) => {
    app.get('/users/profile', checkJwt, tokenErr, implId, getMyUser)
    app.get('/users/:id', checkJwt, tokenErr, implId, getStandardUserById)

}
