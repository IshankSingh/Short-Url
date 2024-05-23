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
    console.log(url)
    return res.render("home", {id: url.shortUrl, url: url, analytics: analytics})
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
    console.log(url)
    return res.redirect(url.redirectUrl)
}

async function getUrlAnalytics(req, res) {
    let urls = await URL.find({})
    let allUrls = []
    console.log (`Total urls: ${urls.length}`)
    urls.forEach(url => {
        allUrls.push(getUrlHistory(url))
    })
    let results = await Promise.all(allUrls)
    
    return res.render("home", {urls: results})
}

async function getUrlHistory(url) {
    const urlHistory = await urlAnalytics.findOne({urlId: url._id})
    return {url: url, visitHistory: urlHistory.visitHistory != null ? urlHistory.visitHistory : []}
}

module.exports = {
    generateShortUrl,
    getRedirectUrl,
    getUrlAnalytics
}