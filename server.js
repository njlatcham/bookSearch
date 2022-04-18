"use strict"

const express = require("express")
const request = require("request")
const app = express()
const port = process.env.PORT || 3001

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.ORIGIN || "*")
  next()
})

app.get("/", (req, res) => {
  const isbn = req.query["isbn"]
  const url = `http://openlibrary.org/api/volumes/brief/isbn/${isbn}.json`

  request(url).pipe(res)
})

app.listen(port, () => console.log(`Listening on port ${port}`))