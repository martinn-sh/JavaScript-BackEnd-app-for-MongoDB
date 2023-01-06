const express = require('express')
const app = express()

require('./startup/routes')(app)
require('./startup/db')()
require('./startup/validationObjectId')()

const port = process.env.PORT || 5000
app.listen(port, () => logger.info(`App avaiable on http://localhost:${port}`))