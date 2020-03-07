import * as coreMethods from "../coreMethods"
import { v4 } from "uuid"
const tableName = "broadcast"

export class Broadcast {
    constructor(roomId, sessionId) {
        this.id = v4()
        this.roomId = roomId
        this.sessionId = sessionId
        this.startTime = new Date();
        this.endTime = null

    }
}

export const createTable = async () => {
    var sql = `CREATE TABLE ${tableName} (id VARCHAR(255) PRIMARY KEY, roomId VARCHAR(255), sessionId VARCHAR(255), startTime DATETIME, endTime DATETIME)`;
    return await coreMethods.runQuery(sql)
}

export const getAllBroadcasts = async () => await coreMethods.getAll(tableName)

export const createBroadcast = async (roomId, sessionId) => {
    await coreMethods.create(tableName, new Broadcast(roomId, sessionId))
}
export const getBroadcastById = async id => {
    const query = `SELECT * FROM ${tableName} WHERE id = ?`
    return await coreMethods.runQuery(query, id)
}
export const getBroadcastByRoomId = async roomId => {
    const query = `SELECT * FROM ${tableName} WHERE roomId = ?`
    return await coreMethods.runQuery(query, roomId)
}

