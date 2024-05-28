const jwt = require('jsonwebtoken');
const sessionIdToUserMap = new Map()

function setSessionId(user) {
    let payload = {
        id: user._id,
        email: user.email
    }
    return jwt.sign(payload, process.env.JWT_SECRET_KEY)
}

function getSessionId(token) {
    if (!token) return null;
    return jwt.verify(token, process.env.JWT_SECRET_KEY)
}

module.exports = {
    setSessionId,
    getSessionId
}