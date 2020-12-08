const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())


const getQuestions = (req, res) => {
  //res.send(req.params.id)
  pool.query('SELECT * FROM qa.questions WHERE product_id = ($1)', [req.params.id], (error, results) => {
    if (error) {
      console.log(`error at get Q's`)
    }
    res.send(results.rows)
  })
}

const getAnswers = (req, res) => {

  pool.query('SELECT * FROM qa.answers WHERE question_id = ($1)', [req.params.id], (error, results) => {
    if (error) {
      console.log(error)
    }
    res.send(results.rows)
  })
}

const postQuestion = (req, res) => {

  let postVals = [req.params.id, Object.values(req.body)].flat();
  let p_id = Number(req.params.id);
  let q_body = postVals[1]
  let q_date = postVals[2];
  let name = postVals[3];
  let help = postVals[4];
  let reported = postVals[5];

  pool.query(`INSERT INTO qa.questions(product_id, question_body, question_date, asker_name, helpfulness, reported)
        VALUES ($1, $2, $3, $4, $5, $6)`, [p_id, q_body, q_date, name, help, reported], (err) => {
    if (err) {
      console.log(err)
    }
    res.send('success')
  })
}

const postAnswer = (req, res) => {
  let answerVal = [Number(req.params.id), Object.values(req.body)].flat();
  pool.query(`INSERT INTO qa.answers(question_id, answer_body, answer_date, answerer_name, helpfulness, reported)
        VALUES ($1, $2, $3, $4, $5, $6)`, answerVal, (err) => {
    if (err) {
      console.log(err)
    }
    res.send('success')
  })

}

const questionHelpful = (req, res) => {

  let id = (req.params.id);
  pool.query(`Update qa.questions SET helpfulness = helpfulness+1 WHERE question_id = $1`, [id],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.send('helpfulness updated');
      }
    })
}

const answerHelpful = (req, res) => {

  let id = (req.params.id);
  pool.query(`Update qa.answers SET helpfulness = helpfulness+1 WHERE question_id = $1`, [id],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.send('answer helpfulness updated');
      }
    })
}

//reports question to TRUE because a question can only be reported 1x before it is hidden from front-end
const reportQuestion = (req, res) => {

  let id = (req.params.id);
  pool.query(`Update qa.questions SET reported = true WHERE question_id = $1`, [id],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.send('question updated');
      }
    })
}


app
  .route('/questions/:id')
  // GET endpoint
  .get(getQuestions)

app
  .route('/answers/:id')
  .get(getAnswers)
app
  //add product id to route
  .route('/postquestion/:id')
  .post(postQuestion)

app
  .route('/postanswer/:id')
  .post(postAnswer)
app
  .route('/questionhelpful/:id')
  .put(questionHelpful)

app
  .route('/questionreport/:id')
  .put(reportQuestion)

app
  .route('/answerhelpful/:id')
  .put(answerHelpful)

//   .route('/answerreport/:id')
//   .put(reportAnswer)

// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening`)
})

// module.exports = router;
