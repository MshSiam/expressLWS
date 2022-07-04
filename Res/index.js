const express = require("express")
const app = express()
app.use(express.json())
app.set("view engine", "ejs")

app.get("/", (req, res) => {
  //   res.render("index", {
  //     name: "bangladesh"
  //   })
  //   res.json({
  //     name: "Bangldesh"
  //   })
  //   res.status(200)
  //   res.end()
  //   res.sendStatus(404)
  //  --------------------- format // --------------------
  //   res.format({
  //     "text/plain": () => {
  //       res.send("hello ")
  //     },
  //     "text/html": () => {
  //       res.send("accepting html")
  //     },
  //     "application/json": () => {
  //       res.send("accepting json")
  //     },
  //     default: () => {
  //       res.status(404).send("Not acceptable")
  //     }
  //   })
  // ============================ coockies ========================
  //   res.cookie("name", "muhammad siam")
  //   res.end()
  // ===============location ================
  res.location("/test")
})

app.get("/test22", (req, res) => {
  res.send("hi redirect")
})

app.get("/", (req, res) => {
  res.redirect("/test22")
  res.end()
})

app.listen(3000, () => {
  console.log("running")
})
