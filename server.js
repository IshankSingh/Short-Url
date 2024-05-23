const express = require("express")
const dotenv = require("dotenv").config()
const path = require("path")
const urlRoute = require("./routes/urlRoutes")
const urlStaticRoute = require("./routes/urlStaticRoutes")
const { connectToMongoDb } = require("./dbconfig")

const PORT = process.env.PORT || 8000

const app = express()

connectToMongoDb(process.env.MONGO_DB_CONNECTION_URL)
.then(() => console.log("Connected to db"))

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", urlStaticRoute)
app.use('/url', urlRoute)

app.listen(PORT, () => { console.log (`Server started at Port: ${PORT}`)})