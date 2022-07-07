const express = require("express")
const { default: mongoose } = require("mongoose")
const router = express.Router()

const todoSchema = require("../schemas/todoSchema")

// creating model
const Todo = new mongoose.model("Todo", todoSchema)

// get all the todos

router.get("/", async (req, res) => {
  await Todo.find({ status: "active" })
    .select({
      _v: 0
    })
    .exec((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was an server side error"
        })
      } else {
        res.status(200).json({
          result: data,
          messsage: "Success"
        })
      }
    })
})

// get a todo by is
router.get("/:id", async (req, res) => {
  await Todo.findOne({ _id: req.params.id }, (err, data) => {
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

// post a todo
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body)
  await newTodo.save((err) => {
    if (err) {
      res.status(500).json({
        error: "There was an server side error!"
      })
    } else {
      res.status(200).json({
        message: "Todo was inserted Successfully."
      })
    }
  })
})

// post multiple todo
router.post("/all", async (req, res) => {
  await Todo.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was an server side Error."
      })
    } else {
      res.status(200).json({
        message: "Many Data inserted Successfully."
      })
    }
  })
})

// put todo
router.put("/:id", async (req, res) => {
  await Todo.updateOne(
    { _id: req.params.id },
    {
      $set: {
        status: "inactive"
      }
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was an server side Error."
        })
      } else {
        res.status(200).json({
          message: "Updated Successfully."
        })
      }
    }
  )
  // const result = await Todo.findByIdAndUpdate(
  //   { _id: req.params.id },
  //   {
  //     $set: {
  //       status: "active"
  //     }
  //   },
  //   {
  //     new: true,
  //     useFindAndModify: false
  //   },
  //   (err) => {
  //     if (err) {
  //       res.status(500).json({
  //         error: "There was a server side error!"
  //       })
  //     } else {
  //       res.status(200).json({
  //         message: "Todo was updated successfully!"
  //       })
  //     }
  //   }
  // )
  // console.log(result)
})

// delete todo
router.delete("/:id", async (req, res) => {
  await Todo.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!"
      })
    } else {
      res.status(200).json({
        result: data,
        message: "deleted"
      })
    }
  })
})

module.exports = router
