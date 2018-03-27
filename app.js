var request = require('request')
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3002
const SECRET = process.env.SPOTIFY

app.use(cors())
// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': `Basic ${SECRET}`
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
  })
})

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
})
