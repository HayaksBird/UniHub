const app = require('./src/app')
require('dotenv').config(); // Load environment variables from .env file
const PORT = process.env.PORT // Port on which the server listens

//entry point of the application
app.listen(PORT, ()=> {
  console.log(`🚀 Server is running on PORT: ${PORT}...🚀 `)
})

