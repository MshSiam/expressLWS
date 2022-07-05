const express = require("express")
const multer = require("multer")

// file upload folder
const uploadFolder = "./uploads/"

// prepare the final multer object
var upload = multer({
  dest: uploadFolder,
  limits: {
    fileSize: 1000000
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true)
    } else {
      cb(new Error("Only jpg, png, jpeg format allowed."))
    }
  }
})

const app = express()

// ==================single file ====================

app.post("/", upload.single("avatar"), (req, res) => {
  res.send("Hello World")
})

// ===================upload multiple file===============

// app.post("/", upload.array("avatar", 3), (req, res) => {
//   res.send("Hello World")
// })

// ================== upload a gallary ==================
// app.post(
//   "/",
//   upload.fields([
//     { name: "avatar", maxCount: 1 },
//     { name: "gallery", maxCount: 2 }
//   ]),
//   (req, res) => {
//     res.send("Hello World")
//   }
// )

// ======================if we want to upload form data =================

// app.post("/", upload.none(), (req, res) => {
//   console.log("hello world")
// })

// ===========default error handler ==============

app.use((err, req, res, next) => {
  if (err) {
    if (err instanceof multer.MulterError) {
      res.status(500).send("there was an file upload error.")
    } else {
      res.status(500).send(err.message)
    }
  } else {
    res.send("Success")
  }
})

app.listen(3000, (req, res) => {
  console.log("listening")
})
