// controllers/file.controller.js
const File = require('../models/file.model'); // Correct relative path

// Upload a file
exports.uploadFile = async (req, res) => {
  try {
    // Check if req.file exists
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const { originalname, buffer, mimetype } = req.file;

    const file = new File({
      name: originalname,
      data: buffer,
      contentType: mimetype,
    });

    await file.save();
    res.status(201).json({ message: 'File uploaded successfully', fileId: file._id });
  } catch (error) {
    console.error('Error uploading file:', error); // More specific logging
    res.status(500).json({ error: 'File upload failed', details: error.message }); // Send error details
  }
};

// Get all files
exports.getFiles = async (req, res) => {
  try {
    const files = await File.find().select('_id name contentType createdAt');
    res.json(files);
  } catch (error) {
    console.error('Error fetching files:', error); // More specific logging
    res.status(500).json({ error: 'Error fetching files', details: error.message }); // Send error details
  }
};

// Get file by ID
exports.getFileById = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ error: 'File not found' });

    res.contentType(file.contentType);
    res.send(file.data);
  } catch (error) {
    console.error('Error retrieving file by ID:', error); // More specific logging
    // Check for invalid Mongoose ID format
    if (error.kind === 'ObjectId') {
        return res.status(400).json({ error: 'Invalid file ID format' });
    }
    res.status(500).json({ error: 'Error retrieving file', details: error.message });
  }
};

// Delete a file by ID
exports.deleteFile = async (req, res) => {
  try {
    const file = await File.findByIdAndDelete(req.params.id);

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting file:', error); // More specific logging
    if (error.kind === 'ObjectId') {
        return res.status(400).json({ error: 'Invalid file ID format' });
    }
    res.status(500).json({ error: 'Error deleting file', details: error.message });
  }
};