const { v4 } = require("uuid")

import * as coreMethods from "../coreMethods"
const tableName = "broadcast"

export class Broadcast {
    constructor(roomId, sessionId) {
        this.id = v4()
        this.sessionId = sessionId
        this.startTime = new Date();
        this.endTime = null
    }
}

export const createTable = async () => {
    var sql = `CREATE TABLE ${tableName} (id VARCHAR(255) PRIMARY KEY, sessionId VARCHAR(255), startTime DATETIME, endTime DATETIME)`;
    return await coreMethods.runQuery(sql)
}

export const getAllBroadcasts = async () => await coreMethods.getAll(tableName)

export const createBroadcast = async (roomId, sessionId) => {
    const newBroadcast = new Broadcast(roomId, sessionId)
    await coreMethods.create(tableName, newBroadcast)

    return newBroadcast
}

export const getBroadcastById = async id => {
    const query = `SELECT * FROM ${tableName} WHERE id = ?`
    return await coreMethods.runQuery(query, id)
}


