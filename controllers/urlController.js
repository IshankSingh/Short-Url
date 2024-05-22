const URL = require("../models/urlModel")
const shortId = require("../utils/shortId")
const urlAnalytics = require("../models/analyticsModel")

async function generateShortUrl (req, res) {
    const url = await URL.create({
        shortUrl: shortId(6),
        redirectUrl: req.body.redirectUrl
    })
    const analytics = await urlAnalytics.create({
        urlId: url._id
    })
    return res.json({ message: `url created successfully`,
        url,
        analytics
    })
}

async function getRedirectUrl (req, res) {
    const shortUrl = req.params.url
    const url = await URL.findOne({ shortUrl: shortUrl })
    const analytics = await urlAnalytics.findOneAndUpdate (
        {
            urlId: url._id
        },
        {
            $push: { visitHistory: { timestamp: Date.now() } }
        }
    )
    console.log(analytics)
    return res.redirect(url.redirectUrl)
}

module.exports = {
    generateShortUrl,
    getRedirectUrl
}