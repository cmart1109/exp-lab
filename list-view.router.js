const express = require("express");
const app = express
const infoRouter = express.Router();
const info = require('./lista-tareas');
const server = require("./server")

infoRouter


.get("/",(req,res)=> {
    res.json(info)
})

.get('/completas',  (req,res) => {
    let tareasCompletas = info.filter((item)=> item.isCompleted === true);
    res.json(tareasCompletas);
})

.get('/incompletas', (req,res) => {
    let tareasIncompletas = info.filter((item)=> item.isCompleted === false);
    res.json(tareasIncompletas);
})


.get('/:id', (req,res) => {
    let id = req.params.id
    let tareaSolo = info.filter((item)=> item.id === id);
    res.json(tareaSolo);
})


.use('/', (req,res,next)=> {
    if (req.method === 'GET') {
    res.send('Metodo valido')
    next()        
    } else {
        return res.status(400).send('La solicitud con esta ruta no es valida')
    }
})

module.exports = infoRouter;