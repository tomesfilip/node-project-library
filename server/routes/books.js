const express = require('express')
const router = express.Router()
const { getBooks, createBook, updateBookName, getBookName, deleteBook } = require('../controllers/books')

router.route('/').get(getBooks).post(createBook)
router.route('/:key').get(getBookName).delete(deleteBook).put(updateBookName)

module.exports = router