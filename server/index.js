const express = require('express')
const cors = require('cors')
const events = require('events')

const app = express()
const emitter = new events.EventEmitter()

app.use(cors())
app.use(express.json())

app.get('/get-messages', (req, res) => {
  emitter.once('newMessage', (message) => {
    res.json(message)
  })
})
app.post('/new-messages', (req, res) => {
  const message = req.body
  emitter.emit('newMessage', message)
  res.status(200)
})

const port = 3007
app.listen(port, (error) => {
  error ? console.log(error) : console.log(`Server works on ${port} port`)
})
