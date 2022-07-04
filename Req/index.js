const express = require("express")
const app = express()
const adminRoute = express.Router()

app.use("/admin", adminRoute)

adminRoute.get("/dashboard", (req, res) => {
  console.log(req.baseUrl)
  res.send("we are in admin dashboard")
})

app.get("/user/:id", (req, res) => {
  console.log(req.baseUrl)
  res.send("welcome")
})

app.listen(3000, () => {
  console.log("running")
})
