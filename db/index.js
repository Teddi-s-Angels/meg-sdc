const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const {pool} = require('./config')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())


    const getQuestions = (req, res) => {
      pool.query('SELECT * FROM qa.questions', (error, results) => {
        if (error) {
          console.log(`error at get Q's`)
        }
        res.send(results.rows)
      })
    }

    const getAnswers = (req, res) => {
        pool.query('SELECT * FROM qa.answers', (error, results) => {
          if (error) {
            console.log(`error at get A's`)
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


    }

app
  .route('/questions')
  // GET endpoint
  .get(getQuestions)
  
app
  .route('/answers')
  .get(getAnswers)
app
//add product id to route
  .route('/postquestion/:id')
  .post(postQuestion)

//   .route('/postanswer')
//   .post(postAnswer)

//   .route('/questionhelpful/:id')
//   .put(questionHelpful)

//   .route('/questionreport/:id')
//   .put(reportQuestion)

//   .route('/answerhelpful/:id')
//   .put(answerHelpful)

//   .route('/answerreport/:id')
//   .put(reportAnswer)

// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening`)
})

// module.exports = router;
