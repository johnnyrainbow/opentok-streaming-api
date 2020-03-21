import * as StandardUserModel from "../db/models/StandardUser"


export const getStandardUserById = async function (req, res, next) {
    try {
        const result = await StandardUserModel.getStandardUserById(req.params.id)
        res.status(200).send({ success: true, standardUser: result[0] })

    } catch (e) {
        return next(e)
    }
}

export const getMyUser = async function (req, res, next) {
    try {
        const result = await StandardUserModel.getStandardUserById(req.userId)
        res.status(200).send({ success: true, standardUser: result[0] })

    } catch (e) {
        return next(e)
    }
}
//5e60d04b96c4280d4a9b1b1c
//5e61e6f629e1e00d3e77f09e