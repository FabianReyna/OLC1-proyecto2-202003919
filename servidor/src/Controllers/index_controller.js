var parser = require('../../analizador')
var ListaErrores = require("../../errores").ListaErrores

exports.prueba = async(req, res) => {
    res.send({ "funciona": "la api" })
}

exports.escaneo = async(req, res) => {
    console.log(req.body.consola)
    parser.parse(req.body.consola)
    console.log(JSON.stringify(ListaErrores.verErrores()))
    res.send({ 'consola': "" })
}

exports.ast = async(req, res) => {
    res.send({ 'AST': "" })
}

exports.errores = async(req, res) => {
    res.send({ 'Errores': JSON.parse(JSON.stringify(ListaErrores.verErrores())) })
}

exports.simbolos = async(req, res) => {
    res.send({ 'SIMBOLOS': "" })
}