const mongoose = require('mongoose')
const MONGO_URL = 'mongodb://localhost:27017/reprograma'

function connect() {
  mongoose.connect(MONGO_URL,
    {useNewUrlParser: true},
    error => {
  
      if (error) {
        console.log("Deu ERRO", error)
      } else {
        console.log("DEU CERTO")
      }
    }
  )
}

module.exports = { connect }