const express = require('express')
const app = express()
const port = 3000
const router = require('./routes.js')

app.use(express.json())

app.use('/products', router)

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})