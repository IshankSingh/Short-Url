const express = require("express")
const router = express.Router()
const { generateShortUrl, getRedirectUrl } = require("../controllers/urlController")

router.post("/", generateShortUrl)

router.get('/:url', getRedirectUrl)

module.exports = router