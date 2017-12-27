var request = require('request')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic NGFkNzkzNTlmMzk2NDA5ZWIyMzY2ZmZhZGIxMGZlOGI6MTVhOGM3MWFjOTU0NDk5MTg5OTM0ZjlhMDgzZmJjYzQ='
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
}

app.get('*', (req, res) => {
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
