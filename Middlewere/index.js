const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const adminRouter = express.Router()

app.use(cookieParser)
app.use(express.json())

// middlewere
// const logger = (req, res, next) => {
//   console.log(
//     `${new Date(Date.now().toLocaleString())}  - ${req.method} - ${
//       req.protocol
//     }-${req.ip}`
//   )
//   next()
// }
// app.use(logger)
// adminRouter.use(logger)

adminRouter.get("/dashboard", (req, res) => {
  console.log("dashboard")
})

// error handling middlewere //

const errorMiddlewere = (err, req, res, next) => {
  console.log(err)
  res.status(500).send("there was a server side error")
}

adminRouter.use(errorMiddlewere)
// ============================//

app.get("/about", (req, res) => {
  res.send("hello")
})

app.listen(3000, (req, res) => {
  console.log("Running")
})
