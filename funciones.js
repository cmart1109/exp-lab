let info = require("./lista-tareas");

function agregarTarea(nuevaTarea) {
    info.push(nuevaTarea)
};

function borrarTarea(tareaBorrar) {
    let nuevaLista = info.filter((infos) => infos.id !== tareaBorrar)
    info = nuevaLista;
};


















module.exports = {agregarTarea, borrarTarea};