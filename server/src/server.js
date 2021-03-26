const express = require('express')
const app = express()
const router = require('./routes.js')

const port = 3000

app.use(express.json())

app.use('/products', router)

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})