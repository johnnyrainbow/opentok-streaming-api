export const dependencies = { opentok: null }

export const createSession = async function (options) {
    return new Promise((resolve, reject) => {
        const onResult = (err, session) => (err ? reject(err) : resolve(session));
        dependencies.opentok.createSession(options, onResult);
    })
}
export const generateToken = function (sessionId, options) {

    return dependencies.opentok.generateToken(sessionId, options);
}
