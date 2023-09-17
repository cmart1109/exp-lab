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

.delete('/eliminar/:id', (req,res) => {
    let id = parseInt(req.params.id)
    let tareaBorrar = id
    funciones.borrarTarea(id)
    res.send(`La tarea con id ${id} fue borrada con exito`)
})



module.exports = editInfoRouter;