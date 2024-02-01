const express = require('express')
const useRoutes = require('./routes/routes.js')

const app = express()

const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

require('./config/connectDb.js')

app.use(cors())
app.use(express.json())

app.use('/api', useRoutes)

app.use('/', (req, res) => res.json({message: "slm"}))

app.listen(5000, () => console.log('server is running'))