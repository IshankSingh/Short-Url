const URL = require("../models/urlModel")
const shortId = require("../utils/shortId")

async function generateShortUrl (req, res) {
    const url = await URL.create({
        shortUrl: shortId(6),
        redirectUrl: req.body.redirectUrl
    })
    return res.json({ message: `url created successfully`,
        url
    })
}

async function getRedirectUrl (req, res) {
    const shortUrl = req.params.url
    const url = await URL.findOne({ shortUrl: shortUrl })
    return res.redirect(url.redirectUrl)
}

module.exports = {
    generateShortUrl,
    getRedirectUrl
}