import * as StandardUserModel from "../db/models/StandardUser"


export const getStandardUserById = async function (req, res, next) {
    try {
        const result = await StandardUserModel.getStandardUserById(req.params.id)
        res.status(200).send({ success: true, standardUser: result[0] })

    } catch (e) {
        return next(e)
    }
}