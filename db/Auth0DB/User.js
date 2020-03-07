const fetch = require("node-fetch");

export const getUser = async (accessToken) => {
    const response = await fetch(`${process.env.AUTH0_DOMAIN}userinfo`, {
        headers: {
            'authorization': `${accessToken}`
        }
    })
    return response.json()
}