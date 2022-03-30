let errores = []
const ListaErrores = {
    agregarError: function(tipo, desc, linea, col) {
        errores.push({ "tipo": tipo, "desc": desc, "linea": linea, "col": col })
    },
    verErrores: function() {
        return errores;
    },
    clear: function() {
        errores = []
    }
}
module.exports.ListaErrores = ListaErrores;