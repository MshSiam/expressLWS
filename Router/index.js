const express = require("express")
const app = express()
const adminRouter = require("./adminRouter")
const publicRouter = require("./publicRouter")

// to use the adminRouter & publicRouter
app.use("/admin", adminRouter)
app.use("/public", publicRouter)

app.get("/", (req, res) => {
  res.send("hello")
})
app.get("/about", (req, res) => {
  res.send("About")
})

app.listen(3000, () => {
  console.log("listening")
})
