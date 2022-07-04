const express = require("express")
const app = express()
const admin = express()

app.set("view engine", "ejs")

admin.get("/dashboard", (req, res) => {
  console.log(admin.mountpath)
  res.send("welcome to dashboard")
})

app.get("/", (req, res) => {
  res.send("welcome")
})

//  param //
app.param("id", (req, res, next, id) => {
  const user = {
    userId: id,
    name: "siam"
  }
  req.userDetails = user

  next()
})

app.get("/user/:id", (req, res) => {
  console.log(req.userDetails)
  res.send("welcome to application home.")
})

// //////

// app.route

// app.post("/about/mission", (req, res) => {
//   res.send("welcome to post")
// })

// app.put("/about/mission", (req, res) => {
//   res.send("welcome to put")
// })

// instead of this, we can use app.route to avoid duplicate code and typo errors.
// app
//   .route("/about/mission")
//   .get((req, res) => {
//     res.send("welcome to about mission GET")
//   })
//   .post((req, res) => {
//     res.send("welcome to about mission POST")
//   })
//   .put((req, res) => {
//     res.send("welcome to about mission PUT")
//   })

// ////////
app.use("/admin", admin)

///////////////// ==================== template engine ==================== /////////////
app
  .route("/about/mission")
  .get((req, res) => {
    res.render("index")
  })
  .post((req, res) => {
    res.render("pages/about")
  })
  .put((req, res) => {
    res.send("welcome to about mission PUT")
  })

app.listen(3000, () => {
  console.log("running")
})
