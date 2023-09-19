let info = require("./lista-tareas");

function agregarTarea(nuevaTarea) {
    info.push(nuevaTarea)
};

function borrarTarea(tareaBorrar) {
    let nuevaLista = info.filter((item) => item.id !== tareaBorrar)
    info = nuevaLista;
}

function marcarTareaComoCompletada(id) {
    const tarea = info.find((item) => item.id === id);
    if (tarea) {
        tarea.isCompleted = true;
        return true; 
    }
    return false; 
}

module.exports = {agregarTarea, borrarTarea, marcarTareaComoCompletada};