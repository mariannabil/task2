const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const userRoutes = require('./routes/users')
const categoryRoutes = require('./routes/category')
const bookingRoutes = require('./routes/booking')
const destinationRoutes = require('./routes/destination')


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use(userRoutes)
app.use(categoryRoutes)
app.use(bookingRoutes)
app.use(destinationRoutes)
app.listen(port)