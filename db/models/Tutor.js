import * as coreMethods from "../coreMethods"
const tableName = "tutor"

export class Tutor {
    constructor(userId, bio) {
        this.id = userId;
        this.bio = bio;
        this.reputation = null
    }
}

export const createTable = async () => {
    const query = `CREATE TABLE ${tableName} (id VARCHAR(255) PRIMARY KEY, reputation int, bio VARCHAR(1000))`;
    return await coreMethods.runQuery(query)
}

export const getTutorById = async id => {
    const query = `SELECT * FROM ${tableName} WHERE id = ?`
    return await coreMethods.runQuery(query, id)
}

export const createTutor = async userId => {
    return await coreMethods.create(tableName, new Tutor(userId))
}