const express = require("express");
const app = express
const editInfoRouter = express.Router();
const info = require('./lista-tareas');
const funciones = require('./funciones')

editInfoRouter

.get("/",(req,res)=> {
    res.json(info)
})

// Middleware para verificar que las solicitudes no esten vacias
.use('/agregar', (req, res, next) => {
    if (req.method === 'POST') {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send('El cuerpo de la solicitud esta vacio.');
        }
    }
    next();
})



// Middleware para verificar JSON validos
.use('/agregar', (req, res, next) => {
    if (req.method === 'POST') {
        if (typeof req.body === 'object' && req.body !== null) {
            next(); 
        } else {
            return res.status(400).send('El body de la solicitud no es válido.');
        }
    } else {
        next();
    }
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

.delete('/eliminar/:id', (req, res) =>
    funciones.borrarTarea(id)
    res.send(`La tarea con id ${id} fue borrada con éxito`)
})

// Middleware para verificar que las actualizaciones no esten vacias
.use('/completar/:id', (req, res, next) => {
    if (req.method === 'PUT') {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send('El cuerpo de la actualizacion esta vacio.');
        }
    }
    next();
})

// Middleware para verificar JSON validos
.use('/completar/:id', (req, res, next) => {
    if (req.method === 'PUT') {
        if (typeof req.body === 'object' && req.body !== null) {
            next(); 
        } else {
            return res.status(400).send('El body de la solicitud no es válido.');
        }
    } else {
        next();
    }
})

.put('/completar/:id', (req, res) => {
    let id = req.params.id;
    const tareaCompletada = funciones.marcarTareaComoCompletada(id);
    if (tareaCompletada) {
        res.status(200).json({ message: `Tarea con ID ${id} marcada como completada` });
    } else {
        res.status(404).json({ message: `No se encontró ninguna tarea con ID ${id}` });
    }
});
module.exports = editInfoRouter;