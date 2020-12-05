const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const {pool} = require('./config')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())


    const getQuestions = (req, res) => {
      pool.query('SELECT * FROM questions', (error, results) => {
        if (error) {
          console.log(`error at get Q's`)
        }
        res.send(results.rows)
      })
    }



// const addBook = (request, response) => {
//   const {author, title} = request.body

//   pool.query(
//     'INSERT INTO books (author, title) VALUES ($1, $2)',
//     [author, title],
//     (error) => {
//       if (error) {
//         throw error
//       }
//       response.status(201).json({status: 'success', message: 'Book added.'})
//     },
//   )
// }

app
  .route('/questions')
  // GET endpoint
  .get(getQuestions)
  // POST endpoint
//   .post(addBook)

// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening`)
})

// module.exports = router;
