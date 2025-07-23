// routes/file.routes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadFile, getFiles, getFileById, deleteFile } = require('../controllers/file.controller');

// Multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });
router.post('/upload', upload.single('pdf'), uploadFile);
router.get('/', getFiles);
router.get('/:id', getFileById);
router.delete('/:id', deleteFile);

module.exports = router;