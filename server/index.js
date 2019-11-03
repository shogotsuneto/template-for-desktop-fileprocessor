const fs = require('fs')

const express = require('express')
const app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  const { path, filename } = req.query
  fs.readFile(decodeURIComponent(path), (err, data) => {
    if (err) return res.status(400).send(err)
    res.status(200)
    res.attachment(`${decodeURIComponent(filename)}.txt`)
    res.send(data)
  })
})

module.exports = app