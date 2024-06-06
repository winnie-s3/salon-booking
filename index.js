// config inicial
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.use(express.json())

// Open Route - Public Route
app.get('/', (req, res) => {
  res.status(200).json({msg: 'Bem vindo a API de reservas de salão!'})
})

// Routes
const reservationsRouter = require('./routes/reservations')
app.use('/reservations', reservationsRouter)

// Credenciais
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@salon-booking.qc6oola.mongodb.net/?retryWrites=true&w=majority&appName=salon-booking`,
  )
  .then(() => {
    app.listen(3000)
    console.log('Conectou ao banco!')
  })
  .catch((err) => console.log(err))