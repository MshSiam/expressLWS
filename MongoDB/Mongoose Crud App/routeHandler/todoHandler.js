const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const todoSchema = require("../schemas/todoSchema")
const Todo = new mongoose.model("Todo", todoSchema)

// GET ALL THE TODOS
router.get("/", (req, res) => {
  Todo.find({ status: "active" })
    .select({
      __v: 0,
      date: 0
    })
    .exec((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!"
        })
      } else {
        res.status(200).json({
          result: data,
          message: "Success"
        })
      }
    })
})

// // // // Instance Methode // // // //

// Get Active TOdos (asyncs await) (recomended)
router.get("/active", async (req, res) => {
  const todo = new Todo()
  const data = await todo.findActive()
  res.status(200).json({
    data: data
  })
})

// Get Active todos with Callback (Not Recomended)

router.get("/actives", (req, res) => {
  const todo = new Todo()
  todo.findActiveCallback((err, data) => {
    res.status(200).json({
      data
    })
  })
})

// // // // Static Methodes // // // //

router.get("/js", async (req, res) => {
  const data = await Todo.findByJs()
  res.status(200).json({
    data: data
  })
})
// // // // Get Todo by language // // // //

router.get("/language", async (req, res) => {
  const data = await Todo.find().byLanguage("mongo")
  res.status(200).json({
    data: data
  })
})

// GET A TODO by ID
router.get("/:id", async (req, res) => {
  try {
    const data = await Todo.find({ _id: req.params.id })
    res.status(200).json({
      result: data,
      message: "Success"
    })
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error!"
    })
  }
})

// POST A TODO
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body)
  await newTodo.save((err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!"
      })
    } else {
      res.status(200).json({
        message: "Todo was inserted successfully!"
      })
    }
  })
})

// POST MULTIPLE TODO
router.post("/all", async (req, res) => {
  await Todo.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!"
      })
    } else {
      res.status(200).json({
        message: "Todos were inserted successfully!"
      })
    }
  })
})

// PUT TODO
router.put("/:id", async (req, res) => {
  const result = await Todo.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        status: "inactive"
      }
    },
    {
      new: true,
      useFindAndModify: false
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!"
        })
      } else {
        res.status(200).json({
          message: "Todo was updated successfully!"
        })
      }
    }
  )
  console.log(result)
})

// DELETE TODO
router.delete("/:id", async (req, res) => {
  await Todo.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!"
      })
    } else {
      res.status(200).json({
        message: "Todo was deleted successfully!"
      })
    }
  })
})

module.exports = router
