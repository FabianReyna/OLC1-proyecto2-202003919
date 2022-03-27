const express = require('express')
const router = express.Router()
const control = require("../Controllers/index_controller")
router.get("/prueba", control.prueba)
module.exports = router