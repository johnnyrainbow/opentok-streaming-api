import * as RoomModel from "../db/models/Room"
import * as BroadcastModel from "../db/models/Broadcast"
import * as StandardUserModel from "../db/models/StandardUser"

export const createRoom = async function (req, res, next) {
    try {
        //ensure we don't already have an active room
        const result = await RoomModel.getActiveRoomByHostId(req.userId)
        if (result.length > 0) return res.status(400).send({ error: "You already have an active room." })
        const { maxOccupancy, startAtOccupancy, startAtTime, title, description, cost, isVariableCost, minJoinTime } = req.body

        await RoomModel.createRoom(req.userId, maxOccupancy, startAtOccupancy, startAtTime, title, description, cost, isVariableCost, minJoinTime)
        res.status(200).send({ success: true })

    } catch (e) {
        return next(e)
    }
}

export const startRoom = async function (req, res, next) {
    try {
        //ensure room exists
        const roomResult = await RoomModel.getRoomById(req.params.id)
        if (roomResult.length === 0) return res.status(404).send({ error: `Room ${req.params.id} not found` })

        //check that we are the room owner
        if (roomResult[0].hostId !== req.userId)
            return res.status(400).send({ error: "Unauthorized" })
        //update user roomId
        await RoomModel.updateRoomState(RoomModel.selectStates().IN_PROGRESS)

        res.status(200).send({ success: true })

    } catch (e) {
        return next(e)
    }
}

export const getRoomCost = async function (req, res, next) {

    const roomResult = await RoomModel.getRoomById(req.params.id)
    if (roomResult.length === 0) return res.status(404).send({ error: `Room ${req.params.id} not found` })

    let costForUser = null;

    const usersInRoom = await RoomModel.getAllUsersInRoom(req.params.id)

    if (roomResult[0].isVariableCost) {
        costForUser = roomResult[0].cost / usersInRoom.length
    } else {
        costForUser = roomResult[0].cost
    }

    res.status(200).send({ isVariableCost: roomResult[0].isVariableCost, cost: costForUser })
}

export const joinRoom = async function (req, res, next) {
    try {
        //ensure that we have a standardUser, and not just a user in auth0. this only really needs to be done at the room check, as it's the first layer
        const myUserResult = await StandardUserModel.getStandardUserById(req.userId)
        if (myUserResult.length === 0) return res.status(500).send({ error: "Not allowed" })
        //ensure room exists
        const roomResult = await RoomModel.getRoomById(req.params.id)
        if (roomResult.length === 0) return res.status(404).send({ error: `Room ${req.params.id} not found` })

        //ensure room not already full
        const usersInRoom = await RoomModel.getAllUsersInRoom(req.params.id)
        if (usersInRoom.length >= roomResult[0].maxOccupancy) return res.status(404).send({ error: `Room is full` })
        //TODO do i need some kind of lock to stop race condition joining room
        //update user roomId 
        await StandardUserModel.updateStandardUserRoomId(req.params.id)

        //check if we now have enough capacity to start room
        if (numInRoom >= roomResult[0].maxOccupancy)
            await RoomModel.updateRoomState(RoomModel.selectStates().IN_PROGRESS)

        res.status(200).send({ success: true })

    } catch (e) {
        return next(e)
    }
}

export const getRoomBroadcast = async function (req, res, next) {
    try {
        const result = await BroadcastModel.getBroadcastByRoomId(req.params.id)

        if (result.length === 0)
            return res.status(404).send({ error: `No broadcast found for room ${req.params.id}` })

        res.status(200).send({ success: true, broadcast: result[0] })

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
