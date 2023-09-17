const express = require("express");
const app = express
const infoRouter = express.Router();
const info = require('./lista-tareas');

infoRouter.get("/",(req,res)=> {
    res.json(info)
})

infoRouter.get('/completas', (req,res) => {
    let tareasCompletas = info.filter((item)=> item.isCompleted === true);
    res.json(tareasCompletas);
})

infoRouter.get('/incompletas', (req,res) => {
    let tareasIncompletas = info.filter((item)=> item.isCompleted === false);
    res.json(tareasIncompletas);
})

module.exports = infoRouter;