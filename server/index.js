const fs = require('fs')

const express = require('express')
const app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  const { path } = req.query
  fs.readFile(path, (err, data) => {
    if (err) return console.error(err)
    res.send(data)
  })
})

module.exports = app