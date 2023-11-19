const app = require('./app')
require('dotenv').config(); // Load environment variables from .env file
const PORT = process.env.PORT // P ort on which the server listens

//entry point of the application
app.listen(PORT, ()=> {
  console.log(`🚀 Server is running on PORT: ${PORT}...🚀 `)
})

