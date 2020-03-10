import { connection } from "../sqlConfig/db"

export const create = async (tableName, newItem) => {
    return await connection.query(`INSERT INTO ${tableName} SET ?`, newItem)
}
// export const createLock = async(tableName, notExistsQuery, newItems,) => {
//     return await connection.query(`INSERT INTO ${tableName} SET ?  WHERE NOT EXISTS ${notExistsQuery}`, newItems)
// }
export const getAll = async (tableName) => {
    return await connection.query(`SELECT * FROM ${tableName}`)
}

export const runQuery = async (query, val) => {
    return await connection.query(query, val)
}