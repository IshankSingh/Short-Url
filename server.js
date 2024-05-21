const express = require("express")
const dotenv = require("dotenv").config()
const urlRoute = require("./routes/urlRoutes")
const { connectToMongoDb } = require("./dbconfig")

const PORT = process.env.PORT || 8000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

connectToMongoDb(process.env.MONGO_DB_CONNECTION_URL)
.then(() => console.log("Connected to db"))

app.use('/', urlRoute);

app.listen(PORT, () => { console.log (`Server started at Port: ${PORT}`)})