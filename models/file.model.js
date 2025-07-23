// models/file.model.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    data: {
      type: Buffer,
      required: true
    },
    contentType: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

// This line is important to prevent re-compiling the model if it already exists
// which can happen in development environments or during hot reloading.
module.exports = mongoose.models.File || mongoose.model('File', fileSchema);