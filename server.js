const express = require("express")
const app = express()
const port = 3000

const userRoutes = require('./routes/test')
const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/uploads');

app.use(express.json())
app.use('/', userRoutes)
app.use('/', authRoutes)
app.use('/', uploadRoutes)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})