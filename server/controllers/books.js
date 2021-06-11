let { books } = require('../../data/data')

const getBooks = (req, res) => {
  res.status(200).json({ success: true, data: books })
}

const createBook = (req, res) => {
  const { title, author, desc } = req.body
  if(!title || !author || !desc) {
    return res.status(400).json({ success: false, msg: 'one of the required field has not been filled' })
  }

  const bookInfo = {
    title: title,
    author: author,
    desc: desc
  }
  res.status(201).json({ success: true,  data: [...books, bookInfo] })
}

const getBookName = (req, res) => {
  const { key } = req.params
  if(!key) {
    return res.status(400).json({ success: false, msg: 'the key of the book is required to delete it (name or isbn)' })
  }

  const book = books.find((book) => book.title === key)

  if(!book) {
    return res.status(400).json({ success: false, msg: `there is no book with title: ${key}` })
  }

  res.status(201).json({ success: true, data: book })
}

const deleteBook = (req, res) => {
  const { key }  = req.params
  if(!key) {
    return res.status(400).json({ success: false, msg: 'the key of the book is required to delete it (name or isbn)' })
  }

  if(isNaN(key)) {
    const bookToDelete = books.find((book) => book.title === key)

    if(!bookToDelete) {
      return res.status(400).json({ success: false, msg: `there is no book with title: ${key}` })
    }

    const newBooks = books.filter((book) => book.title !== key)
    return res.status(200).json({ success: true, data: newBooks })
  }

  if(!isNaN(key)) {
    const bookToDelete = books.find((book) => book.isbn === Number(key))
  
    if(!bookToDelete) {
      return res.status(400).json({ success: false, msg: `there is no book with isbn: ${key}` })
    }

    const newBooks = books.filter((book) => book.isbn !== Number(key))
    return res.status(200).json({ success: true, data: newBooks })
  }

  return res.status(400).json({ success: false, msg: 'the inputted query is wrong' })

}

const updateBookName = (req, res) => {
  const { key } = req.params
  const { title } = req.body

  if(!key) {
    return res.status(400).json({ success: false, msg: 'the key of the book is required to delete it (name or isbn)' })
  }
  if(!title) {
    return res.status(400).json({ success: false, msg: 'the new title is required to change the previous one' })
  }

  if(isNaN(key)) {
    const bookToUpdate = books.find((book) => book.title === key)

    if(!bookToUpdate) {
      return res.status(400).json({ success: false, msg: `there is no book with title: ${key}` })
    }

    const newBooks = books.map((book) => {
      if(book.title === key) {
        book.title = title
      }
      return book
    })

    res.status(200).json({ success: true, data: newBooks })
  }

  if(!isNaN(key)) {
    const bookToUpdate = books.find((book) => book.isbn === Number(key))
  
    if(!bookToUpdate) {
      return res.status(400).json({ success: false, msg: `there is no book with isbn: ${key}` })
    }

    const newBooks = books.map((book) => {
      if(book.isbn === Number(key)) {
        book.title = title
      }
      return book
    })

    res.status(200).json({ success: true, data: newBooks })
  }
}

module.exports = {
  getBooks,
  createBook,
  getBookName,
  deleteBook,
  updateBookName
}