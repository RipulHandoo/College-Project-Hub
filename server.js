const express = require("express")
const app = express()
const port = 3000

const userRoutes = require('./routes/test')
const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/uploads');

app.use(express.json())
app.use('/v1/api', userRoutes)
app.use('/v1/api', authRoutes)
app.use('/v1/api', uploadRoutes)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})