const { v4 } = require("uuid")

import * as coreMethods from "../coreMethods"
const tableName = "room"

export class Room {
    constructor(hostId, maxOccupancy, title, description, totalCost, isVariableCost) {
        this.id = v4()
        this.hostId = hostId;
        this.maxOccupancy = maxOccupancy
        this.title = title
        this.description = description
        this.totalCost = totalCost //the total cost per minute that the room must take from combined users
        this.isVariableCost = isVariableCost //TRUE if the totalCost should be divided between all users joined, cheaper per user price for larger groups. FALSE if fixed rate per user
        this.state = "WAITING" //WAITING, IN_PROGRESS, FINISHED
    }
}

export const createTable = async () => {
    const query = `CREATE TABLE ${tableName} (id VARCHAR(255) PRIMARY KEY, hostId VARCHAR(255), maxOccupancy INT, title VARCHAR(255), description VARCHAR(1000), totalCost INT, isVariableCost BOOL, state VARCHAR(255))`;
    return await coreMethods.runQuery(query)
}

export const getActiveRoomByHostId = async hostId => {
    const query = `SELECT * FROM ${tableName} WHERE hostId = ? AND state = 'WAITING' OR state = 'IN_PROGRESS'`
    return await coreMethods.runQuery(query, hostId)
}

export const getRoomById = async id => {
    const query = `SELECT * FROM ${tableName} WHERE id = ?`
    return await coreMethods.runQuery(query, id)
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
    return await coreMethods.create(tableName, new Room(hostId, maxOccupancy, title, description, cost))
}