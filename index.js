const express = require('express')
const app = express()

require('./startup/logging')()
require('./startup/routes')(app)
require('./startup/db')()
require('./startup/validationObjectId')()

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`App avaiable on http://localhost:${port}`))