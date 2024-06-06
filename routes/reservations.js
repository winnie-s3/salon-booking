const express = require('express')
const moment = require('moment')
const router = require('express').Router()
const Reservation = require('../models/Reservation')

// Função para verificar conflitos de horários
// async function checkConflicts(dateTime, duration) {
//   const startTime = moment(dateTime)
//   const endTime = moment(dateTime).add(duration, 'minutes')

//   const conflictingReservations = await Reservation.find({
//     $or: [
//       {
//         $and: [
//           { dateTime: { $gte: startTime } },
//           { dateTime: { $lte: endTime } },
//         ],
//       },
//       {
//         $and: [
//           { dateTime: { $lte: startTime } },
//           { dateTime: { $gte: endTime } },
//         ],
//       },
//     ],
//   });

//   return conflictingReservations.length > 0;
// }

// Criar reserva
router.post('/', async (req, res) => {
  const { name, lastName, dateTime, service } = req.body

  const parsedDateTime = moment(dateTime, 'LLL', 'pt-br').toDate()

  // const available = await checkConflicts(parsedDateTime, duration)

  // if (!available) {
  //   return res.status(422).json({msg: 'Horário indisponível'})
  // }

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
    res.status(500).json({msg: error})
  }
})

module.exports = router;