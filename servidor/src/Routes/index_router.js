const express = require('express')
const router = express.Router()
const control = require("../Controllers/index_controller")

router.get("/prueba", control.prueba)
router.post("/escaneo", control.escaneo)
router.get("/ast", control.ast)
router.get("/simbolos", control.simbolos)
router.get("/errores", control.errores)

module.exports = router