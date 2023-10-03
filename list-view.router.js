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

.use('/', (req,res,next)=> {
    if (req.method === 'GET') {
    res.send('Metodo valido')
    next()        
    } else {
        return res.status(400).send('La solicitud con esta ruta no es valida')
    }
})

module.exports = infoRouter;