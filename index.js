const express = require("express")
const app = express()
const admin = express()

admin.get("/dashboard", (req, res) => {
  console.log(admin.mountpath)
  res.send("welcome to dashboard")
})

app.get("/", (req, res) => {
  res.send("welcome")
})

app.use("/admin", admin)

app.listen(3000, () => {
  console.log("running")
})
