const express = require('express')
const moment = require('moment')
const router = require('express').Router()
const Reservation = require('../models/Reservation')

// Criar reserva
router.post('/', async (req, res) => {
  const { name, lastName, dateTime, service } = req.body

  const parsedDateTime = moment(dateTime, 'LLL', 'pt-br').toDate()

  if(!name) {
    return res.status(422).json({msg: 'O nome é obrigatório!'})
  }
  
  if (!lastName) {
    return res.status(422).json({msg: 'O sobrenome é obrigatório!'})
  }
  
  if (!dateTime) {
    return res.status(422).json({msg: 'A data é obrigatória!'})
  }
  
  if (!service) {
    return res.status(422).json({msg: 'O servico é obrigatório!'})
  }

  const reservation = new Reservation({
    name,
    lastName,
    dateTime: parsedDateTime,
    service
  })

  try {
    await reservation.save();
    res.status(201).json({msg: 'Reserva criada com sucesso!'})
  } catch (error) {
    res.status(500).json({msg: 'Erro ao criar reserva!'})
  }
})

// Ler dados
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find()
    res.status(200).json(reservations)
  } catch (error) {
    res.status(500).json({msg: 'Erro ao buscar reservas!'})
  }
})

// Resgatar reserva por ID
router.get('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const reservation = await Reservation.findOne({_id: id})

    if (!reservation) {
      return res.status(422).json({msg: 'Reserva não encontrada!'})
    }

    res.status(200).json(reservation)

  } catch (error) {
    res.status(500).json({msg: 'Erro ao buscar reserva!'})
  }
})

// Atualizar reserva
router.patch('/:id', async (req, res) => {
  const id = req.params.id
  const { name, lastName, dateTime, service } = req.body

  const parsedDateTime = moment(dateTime, 'LLL', 'pt-br').toDate()

  const reservation = {
    name,
    lastName,
    dateTime: parsedDateTime,
    service
  }

  try {
    const updatedReservation = await Reservation.updateOne({_id: id}, reservation)

    if (updatedReservation.matchedCount === 0) {
      return res.status(422).json({msg: 'Reserva não encontrada!'})
    }

    res.status(200).json(reservation)
  } catch (error) {
    res.status(500).json({msg: 'Erro ao atualizar reserva!'})
  }
})

// Deletar reserva
router.delete('/:id', async (req, res) => {
  const id = req.params.id

  const reservation = await Reservation.findOne({_id: id})

  if (!reservation) {
    return res.status(422).json({msg: 'Reserva não encontrada!'})
  }

  try {

    await Reservation.deleteOne({_id: id})

    res.status(200).json({msg: 'Reserva excluída com sucesso!'})

  } catch (error) {
    res.status(500).json({msg: 'Erro ao excluir reserva!'})
  }
})

module.exports = router;