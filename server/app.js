const express = require('express')
const app = express()
const books = require('./routes/books')

// parse json
app.use(express.json())
app.use('/api/books', books)

app.listen(5000, () => {
  console.log('server is listening on port 5000')
})


