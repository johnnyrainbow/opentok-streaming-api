const { v4 } = require("uuid")

import * as coreMethods from "../coreMethods"
const tableName = "room"


export class Room {
    constructor(hostId, maxOccupancy, startAtOccupancy, startAtTime, title, description, cost, isVariableCost) {
        this.hostId = hostId;
        this.maxOccupancy = maxOccupancy
        this.startAtOccupancy = startAtOccupancy
        this.startAtTime = startAtTime
        this.title = title
        this.description = description
        this.cost = cost //the total cost per minute that the room must take from combined users
        this.isVariableCost = isVariableCost //the fixed cost of the room per user
        this.state = "WAITING" //WAITING, IN_PROGRESS, FINISHED,
        this.chatLogsId = null
    }
}

export const selectStates = () => { return { WAITING: "WAITING", IN_PROGRESS: "IN_PROGRESS", FINISHED: "FINISHED" } }

export const createTable = async () => {
    const query = `CREATE TABLE ${tableName} (hostId VARCHAR(255) PRIMARY KEY, maxOccupancy INT, startAtOccupancy INT, startAtTime DATETIME, title VARCHAR(255), description VARCHAR(1000), cost INT, isVariableCost BOOL, state VARCHAR(255), chatLogsId VARCHAR(255))`;
    return await coreMethods.runQuery(query)
}

export const getActiveRoomByHostId = async hostId => {
    const query = `SELECT * FROM ${tableName} WHERE hostId = ? AND state = 'WAITING' OR state = 'IN_PROGRESS'`
    return await coreMethods.runQuery(query, hostId)
}

export const getRoomByHostId = async id => {
    const query = `SELECT * FROM ${tableName} WHERE hostId = ?`
    return await coreMethods.runQuery(query, id)
}

export const updateRoomState = async state => {
    const query = `UPDATE ${tableName} SET state = ?`
    return await coreMethods.runQuery(query, state)
}

export const getAllRooms = async id => {
    const query = `SELECT * FROM ${tableName}`
    return await coreMethods.runQuery(query, id)
}

export const getAllUsersInRoom = async id => {
    const query = `SELECT * FROM standarduser WHERE roomId = ?`
    return await coreMethods.runQuery(query, id)
}

export const createRoom = async (hostId, maxOccupancy, title, description, cost) => {
    const createRoom = new Room(hostId, maxOccupancy, title, description, cost)
    await coreMethods.create(tableName, createRoom)
    return createRoom
}