const { application } = require("express")
const express = require("express")
const handler = require("./handler")
const app = express()
const adminRoute = express.Router()

app.use(express.json())

app.use("/admin", adminRoute)

adminRoute.get("/dashboard", (req, res) => {
  //   console.log(req.baseUrl)
  //   console.log(req.originalUrl)
  //   console.log(req.url)
  //   console.log(req.path)
  //   console.log(req.hostname)
  res.send("we are in admin dashboard")
})

app.get("/user/:id", (req, res) => {
  //   console.log(req.baseUrl)
  //   console.log(req.originalUrl)
  //   console.log(req.url)
  //   console.log(req.path)
  //   console.log(req.params)
  //   console.log(req.query)
  //   console.log(req.secure)

  res.send("welcome")
})

app.post("/users", handler)

app.listen(3000, () => {
  console.log("running")
})
