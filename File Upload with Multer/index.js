const express = require("express")
const multer = require("multer")
const path = require("path")

// file upload folder
const uploadFolder = "./uploads/"

// ========setting file original name ==========
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder)
  },
  filename: (req, file, cb) => {
    const fileEsxt = path.extname(file.originalname)
    const fileName =
      file.originalname
        .replace(fileEsxt, "")
        .toLowerCase()
        .split(" ")
        .join("-") + Date.now()

    cb(null, fileName + fileEsxt)
  }
})

// prepare the final multer object
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "avatar") {
      if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"
      ) {
        cb(null, true)
      } else {
        cb(new Error("Only jpg, png, jpeg format allowed."))
      }
    } else if (file.filename === "doc") {
      if (file.mimetype === "application/pdf") {
        cb(null, true)
      } else {
        cb(new Error("Only PDF file allowed"))
      }
    } else {
      cb(new Error("There was an unknown error"))
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
app.post(
  "/",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "doc", maxCount: 1 }
  ]),
  (req, res) => {
    console.log(req.files)
    res.send("Hello World")
  }
)

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

app.listen(8000, (req, res) => {
  console.log("listening")
})
