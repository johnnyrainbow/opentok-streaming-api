import * as opentok from "../opentok/promises"
import * as BroadcastModel from "../db/models/Broadcast"
import * as RoomModel from "../db/models/Room"

//Create a broadcast for a specified room. our userId must match the room hostId.
export const createBroadcast = async function (req, res, next) {
    //HI GAB QUESTION OF THE DAY IS HOW DO WE STOP SOMEONE FROM GIGA SPAMMING THIS ENDPOINT, creating lotsa opentok sessions IF 1 BROADCAST PER USER?
    try {
        const { roomId } = req.body

        const roomResult = await RoomModel.getRoomById(roomId)

        if (roomResult.length === 0)
            return res.status(404).send({ error: `Room ${roomId} not found` })

        if (roomResult[0].hostId !== req.userId)
            return res.status(400).send({ error: "Unauthorized" })

        // Instantiate a new session(room) on opentok cloud
        const session = await opentok.createSession({ mediaMode: "routed" })
        const { sessionId } = session;
        //create broadcast in db
        const createdBroadcast = await BroadcastModel.createBroadcast(roomId, sessionId)

        await RoomModel.updateBroadcastId(createdBroadcast.id, roomId)

        //pass the room into the new cron job, to subtract balance so long as broadcast is live and room is in progress
        //TODO create eventbridge CRON, to run lambda with passed room object 

        res.status(200).send({ success: true, broadcast: createdBroadcast })

    } catch (e) {
        return next(e)
    }
}

export const generatePublisherToken = async function (req, res, next) {
    try {
        const broadcastResult = await BroadcastModel.getBroadcastById(req.params.id)

        if (broadcastResult.length === 0)
            return res.status(404).send({ error: `Broadcast ${req.params.id} not found` })

        //ensure that we are the owner of the room, and therefore the publisher
        const roomResult = await RoomModel.getRoomByBroadcastId(req.params.id)

        if (roomResult.length === 0)
            return res.status(404).send({ error: `Room ${req.params.id} not found` })

        if (roomResult[0].hostId !== req.userId)
            return res.status(400).send({ error: "Unauthorized" })

        const sessionId = broadcastResult[0].sessionId
        const token = opentok.generateToken(sessionId, { role: "publisher" });

        res.status(200).send({ success: true, token })

    } catch (e) {
        return next()
    }
}


export const generateViewerToken = async function (req, res, next) {
    try {
        const broadcastResult = await BroadcastModel.getBroadcastById(req.params.id)

        if (broadcastResult.length === 0)
            return res.status(404).send({ error: `Broadcast ${req.params.id} not found` })

        const sessionId = broadcastResult[0].sessionId
        const token = opentok.generateToken(sessionId, { role: "subscriber" });

        res.status(200).send({ success: true, token })

    } catch (e) {
        return next()
    }
}


export const getBroadcastById = async function (req, res, next) {
    try {
        const result = await BroadcastModel.getBroadcastById(req.params.id)

        if (result.length === 0)
            return res.status(404).send({ error: `Broadcast ${req.params.id} not found` })

        res.status(200).send({ success: true, broadcast: result[0] })

    } catch (e) {
        return next(e)
    }
}

export const getAllBroadcasts = async function (req, res, next) {
    try {
        const result = await BroadcastModel.getAllBroadcasts()
        res.status(200).send({ success: true, rooms: result })

    } catch (e) {
        return next(e)
    }
}


