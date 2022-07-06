const express = require("express")
const mongoose = require("mongoose")

const todoHandler = require("./rout handler/todoHandler")

const app = express()
app.use(express.json())

// connection with mongoose
mongoose
  .connect("mongodb://localhost/todos", {})
  .then(() => {
    console.log("connected successfully")
  })
  .catch((err) => {
    console.log(err)
  })

// application route

app.use("/todo", todoHandler)

// default error handler
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500).json({ error: err })
}

app.listen(3000, () => {
  console.log("running")
})
