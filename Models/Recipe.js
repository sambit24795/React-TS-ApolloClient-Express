const mongoose = require("mongoose");

const { Schema } = mongoose;

const RecipeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  instructions: {
    type: String,
    required: true,
  },

  createdDate: {
    type: Date,
    default: Date.now(),
  },

  likes: {
    type: String,
    default: 0,
  },

  userName: {
    type: String,
  },
});

RecipeSchema.index({
  "$**": "text",
});

module.exports = mongoose.model("Recipe", RecipeSchema);
