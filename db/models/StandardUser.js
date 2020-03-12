import * as coreMethods from "../coreMethods"
const tableName = "standarduser"

export class StandardUser {
    constructor(userId, credit) {
        this.id = userId;
        this.roomId = null;
        this.credit = credit
        this.isTutor = false;
    }
}

export const createTable = async () => {
    const query = `CREATE TABLE ${tableName} (id VARCHAR(255) PRIMARY KEY, roomId VARCHAR(255), credit INT, isTutor BOOL)`;
    return await coreMethods.runQuery(query)
}

export const getStandardUserById = async id => {
    const query = `SELECT * FROM ${tableName} WHERE id = ?`
    return await coreMethods.runQuery(query, id)
}

export const getAllUsersInRoom = async roomId => {
    const query = `SELECT * FROM ${tableName} WHERE roomId = ?`
    return await coreMethods.runQuery(query, roomId)
}

export const updateStandardUserRoomId = async (userId, roomId) => {
    const query = `UPDATE ${tableName} SET roomId = ? WHERE id = ?`
    return await coreMethods.runQuery(query, [roomId, userId])
}

export const createStandardUser = async userId => {
    return await coreMethods.create(tableName, new StandardUser(userId))
}