require('dotenv').config()

const express = require("express")
const app = express()
const cors = require("cors")
const routeApi = require("./routes/Api")
const bodyParser = require("body-parser")

const port = process.env.PORT || 1337

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use("/api/v1", routeApi)

/*
Wildcard route for define if request not available
@return Json
*/
app.get("*", (req, res) => {
    res.json({
        message: "Resource not found",
        status: 404,
        data: {},
        error: false
    })
})

app.listen(port, () => console.log(`Backend started on port ${port}`))