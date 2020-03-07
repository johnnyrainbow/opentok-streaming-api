import { getTutorById, createTutor } from '../controllers/tutor'
import { checkJwt, tokenErr, implId } from "../lib/middleware/checkJwt"

// import v from "../lib/requestValidation/broadcastValidator"
// import { validate } from "../lib/requestValidation/validation"

module.exports = (app) => {
    app.post('/tutors/create', checkJwt, tokenErr, implId, createTutor)
    app.get('/tutors/:id', checkJwt, tokenErr, implId, getTutorById)
}
