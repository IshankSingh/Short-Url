const mongoose = require("mongoose");

const urlAnalyticsSchema = new mongoose.Schema ({
    urlId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'url'
    },
    visitHistory: [{
        timestamp: {type: Number}
    }]
})

module.exports = mongoose.model('analytics', urlAnalyticsSchema)