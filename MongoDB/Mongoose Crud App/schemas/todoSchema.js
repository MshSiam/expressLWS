const mongoose = require("mongoose")

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  status: {
    type: String,
    enum: ["active", "inactive"]
  },
  date: {
    type: Date,
    default: Date.now
  }
})

// instance methodes.

todoSchema.methods = {
  findActive: function () {
    return mongoose.model("Todo").find({ status: "active" })
  },
  findActiveCallback: function (cb) {
    return mongoose.model("Todo").find({ status: "active" }, cb)
  }
}

// statcis methodes

todoSchema.statics = {
  findByJs: function () {
    return this.find({ title: /learning/i })
  }
}

module.exports = todoSchema
