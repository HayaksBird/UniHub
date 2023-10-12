const PORT = process.env.PORT
const app = require('./app')
require('dotenv').config();

app.listen(PORT, ()=> {
  console.log(`Server is running on PORT: ${PORT}...`)
})

