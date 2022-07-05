const express = require("express")
const adminRouter = require("./adminRouter")
const publicRouter = express.Router()

publicRouter
  .route("/user")
  .all((req, res, next) => {
    console.log("I am logging something")
    next()
  })
  .get((req, res) => {
    res.send("get")
  })
  .post((req, res) => {
    res.send("post")
  })
  .put((req, res) => {
    res.send("put")
  })
  .delete((req, res) => {
    res.send("delete")
  })

publicRouter.use((req, res, next) => {
  console.log("router.use")
  next()
})

publicRouter.use(adminRouter)
module.exports = publicRouter
