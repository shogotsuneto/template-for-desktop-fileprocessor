const fs = require('fs')

const express = require('express')
const app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  const { path } = req.query
  fs.readFile(path, (err, data) => {
    if (err) return res.status(400).send(err)
    // res.send(data)
    res.status(400).send(err)
  })
})

module.exports = app