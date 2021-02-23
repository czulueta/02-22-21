const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")

app.use(express.json())
app.use(morgan("dev"))

mongoose.connect("mongodb://localhost:/27017/artistDb",
    {   useNewUrlParser: true,
        useUnifiedTopology: true,
        usecreateIndex: true,
        useFindAndModify: false,
    },
    () => console.log("connected to the database"))

app.use("/songs", require("./routes/songRouter.js"))
app.use("/shop", require("../routes/shopRouter.js"))

app.use((err, req, res, next) => {
    if(err)
    return res.send({errMsg: err.message})
})

app.listen(9000, () => {
    console.log("successfully running on port 9000")
})