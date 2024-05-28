const express = require("express")
const router = express.Router()
const { getUrlAnalytics } = require("../controllers/urlController")

console.log("came inside static routes page")

router.get("/", getUrlAnalytics)

router.get("/signup", (req, res) => {
    console.log("came inside signup")
    return res.render("signup")
})

router.get('/login', (req, res) => {
    return res.render("login")
})

module.exports = router