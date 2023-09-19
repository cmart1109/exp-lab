const express = require("express");
const app = express
const editInfoRouter = express.Router();
const info = require('./lista-tareas');
const funciones = require('./funciones')

editInfoRouter

.get("/",(req,res)=> {
    res.json(info)
})

.post('/agregar', (req,res) => {
    const nuevaTarea = req.body;
    funciones.agregarTarea(nuevaTarea);
    res.json({
        status:200,
        data: nuevaTarea,
        message:'Nueva tarea agregada al sistema'
    })
})

.delete('/eliminar/:id', (req, res) => {
    funciones.borrarTarea(id)
    res.send(`La tarea con id ${id} fue borrada con éxito`)
})

.post('/completar/:id', (req, res) => {
    let id = req.params.id;
    const tareaCompletada = funciones.marcarTareaComoCompletada(id);
    if (tareaCompletada) {
        res.status(200).json({ message: `Tarea con ID ${id} marcada como completada` });
    } else {
        res.status(404).json({ message: `No se encontró ninguna tarea con ID ${id}` });
    }
});
module.exports = editInfoRouter;