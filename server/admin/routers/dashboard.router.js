const { Router } = require('express')
const route = Router()
const { dashBoard } = require('../controllers/dashboard.controller')

route.get('/dashboard/index', dashBoard)

module.exports = route