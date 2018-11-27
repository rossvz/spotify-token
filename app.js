require('dotenv-safe').config()
var request = require('request')
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3002
const REPERTOIRE_SECRET = process.env.REPERTOIRE_SECRET

app.use(cors())
// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    Authorization: `Basic ${REPERTOIRE_SECRET}`
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
}

app.get('/authenticate', (req, res) => {
  if (req.query.r !== 't') {
    res.status(500)
    res.send('error')
    return
  }
  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      // use the access token to access the Spotify Web API
      var token = body.access_token
      res.send(token)
    }

    if(error){
      res.status(500)
      res.send(error)
    }
  })
})

app.get('/credentials', (req, res) => {
  console.log(req.query.email, 'signed up')
  switch (req.query.client) {
    case process.env.REPERTOIRE_CLIENT:
      res.send(process.env.REPERTOIRE_SECRET)
      break
    case process.env.SPOTITERM_CLIENT:
      res.send(process.env.SPOTITERM_SECRET)
      break
    default:
      res.status(400)
      res.send({ message: 'Bad credentials' })
  }
})

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
})
