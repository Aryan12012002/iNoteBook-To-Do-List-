const connectToMongo = require('./db');
const express = require('express')
connectToMongo();
var cors = require('cors')

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.get('/createuser', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/v1/login', (req, res) => {
  res.send('Hello login!')
})

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://127.0.0.1:${port}`)
})

 
