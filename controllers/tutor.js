import * as TutorModel from "../db/models/Tutor"

export const createTutor = async function (req, res, next) {
    try {
        await TutorModel.createTutor(req.userId, req.body.bio)
        res.status(200).send({ success: true })

    } catch (e) {
        return next(e)
    }
}

export const getTutorById = async function (req, res, next) {
    try {
        const result = await TutorModel.getTutorById(req.params.id)
        res.status(200).send({ success: true, tutor: result[0] })

    } catch (e) {
        return next(e)
    }
}