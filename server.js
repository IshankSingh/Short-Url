const express = require("express")
const dotenv = require("dotenv").config()
const path = require("path")
const cookieParser = require('cookie-parser')
const { connectToMongoDb } = require("./dbconfig")

const staticRoute = require("./routes/staticRoutes")
const urlRoute = require("./routes/urlRoutes")
const userRoute = require("./routes/userRoutes")

const { restrictToLoggedInUserOnly, checkAuth } = require("./middleware/userAuth")

const PORT = process.env.PORT || 8000

const app = express()

connectToMongoDb(process.env.MONGO_DB_CONNECTION_URL)
.then(() => console.log("Connected to db"))

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static("static"))

app.use("/", checkAuth, staticRoute)
app.use("/user", userRoute)
app.use('/url',restrictToLoggedInUserOnly, urlRoute)

app.listen(PORT, () => { console.log (`Server started at Port: ${PORT}`)})