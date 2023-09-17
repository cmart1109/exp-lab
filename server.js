const express = require("express");
const app = express();
const port = 8000;
const info = require('./lista-tareas')
const infoRouter = require('./list-view.router')
const editInfoRouter = require('./list-edit.router')
app.use(express.json());

app.use("/tareas", infoRouter);
app.use("/editar", editInfoRouter);

const jsonData = JSON.stringify(info);

app.get("/", (req, res) => {
    res.json(info); 
});

app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
});
