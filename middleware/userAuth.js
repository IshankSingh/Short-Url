const { getSessionId } = require("../utils/auth")

async function restrictToLoggedInUserOnly(req, res, next) {
    const authId = req.cookies?.authId
    const user = getSessionId(authId)
    if (!authId || !user) {
        return res.redirect("/login")
    }
    req.user = user
    next()
}

async function checkAuth(req, res, next) {
    const authId = req.cookies?.authId
    const user = getSessionId(authId)
    req.user = user
    next()
}

module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth
}