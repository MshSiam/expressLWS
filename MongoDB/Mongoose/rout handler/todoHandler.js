const express = require("express")
const { default: mongoose } = require("mongoose")
const router = express.Router()

const todoSchema = require("../schemas/todoSchema")

// creating model
const Todo = new mongoose.model("Todo", todoSchema)

// get all the todos

router.get("/", async (req, res) => {})

// get a todo by is
router.get("/:id", async (req, res) => {})

// post a todo
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body)
  await newTodo.save((err) => {
    if (err) {
      res.status(500).json({
        errror: "There was an server side error!"
      })
    } else {
      res.status(200).json({
        message: "Todo was inserted Successfully."
      })
    }
  })
})

// post multiple todo
router.post("/all", async (req, res) => {})

// put todo
router.put("/:id", async (req, res) => {})

// delete todo
router.delete("/:id", async (req, res) => {})

module.exports = router
