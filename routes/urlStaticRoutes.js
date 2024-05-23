const express = require("express")
const router = express.Router()
const { generateShortUrl, getRedirectUrl, getUrlAnalytics } = require("../controllers/urlController")

router.get("/", getUrlAnalytics)

router.get('/:url', getRedirectUrl)

module.exports = router