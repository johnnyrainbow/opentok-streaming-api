import * as RoomModel from "../db/models/Room"
import * as BroadcastModel from "../db/models/Broadcast"
import * as StandardUserModel from "../db/models/StandardUser"
export const createRoom = async function (req, res, next) {
    try {
        //ensure we don't already have an active room
        const result = await RoomModel.getActiveRoomByHostId(req.userId)
        if (result.length > 0) return res.status(400).send({ error: "You already have an active room." })
        const { maxOccupancy, title, description, totalCost, isVariableCost } = req.body

        await RoomModel.createRoom(req.userId, maxOccupancy, title, description, totalCost, isVariableCost)
        res.status(200).send({ success: true })

    } catch (e) {
        return next(e)
    }
}

export const joinRoom = async function (req, res, next) {
    try {
        //ensure that we have a standardUser, and not just a user in auth0. this only really needs to be done at the room check, as it's the first layer
        const myUserResult = await StandardUserModel.getStandardUserById(req.userId)
        if (myUserResult.length === 0) return res.status(500).send({ error: "Not allowed" })
        //ensure room exists
        const result = await RoomModel.getRoomById(req.params.id)
        if (result.length === 0) return res.status(404).send({ error: `Room ${req.params.id} not found` })
        //update user roomId
        await StandardUserModel.updateStandardUserRoomId(req.params.id)
        res.status(200).send({ success: true })

    } catch (e) {
        return next(e)
    }
}

export const getRoomBroadcast = async function (req, res, next) {
    try {
        const result = await BroadcastModel.getBroadcastByRoomId(req.params.id)
        res.status(200).send({ success: true, broadcast: result })

    } catch (e) {
        return next(e)
    }
}

export const getRoomById = async function (req, res, next) {
    try {
        const result = await RoomModel.getRoomById(req.params.id)
        if (result.length === 0)
            return res.status(404).send({ error: `Room ${req.params.id} not found` })
        //get num users in the room
        result[0].users = await RoomModel.getAllUsersInRoom(req.params.id)
        res.status(200).send({ success: true, room: result })

    } catch (e) {
        return next(e)
    }
}

export const getAllRooms = async function (req, res, next) {
    try {
        const result = await RoomModel.getAllRooms()
        res.status(200).send({ success: true, rooms: result })

    } catch (e) {
        return next(e)
    }
}
