const express = require("express");
const app = express();
const port = 8000;
const info = require('./lista-tareas')
const jwt = require("jsonwebtoken")
const infoRouter = require('./list-view.router')
const editInfoRouter = require('./list-edit.router')
app.use(express.json());
app.use(express.urlencoded({extended: false}));
const secretKey = 'mortadela'; 


const usuarios = [
    {usuario:"Christian", clave: "mortadela3"},
    {usuario: "Jimena", clave: "txt2009"}
];       

app.use((req, res, next) => {
    const metodosValidos = ['GET', 'POST', 'PUT', 'DELETE'];

    if (metodosValidos.includes(req.method)) {
        next();
    } else {
        res.status(405).send('Método no permitido');
    }
});

app.use("/tareas", validateToken, infoRouter);
app.use("/editar", validateToken, editInfoRouter);


const jsonData = JSON.stringify(info);

app.post("/auth", (req,res) => {
    const {usuario, clave} = req.body;
    if (usuario === "christian" && clave === "mortadela") {
        const user = {usuario: usuario};
        const accessToken = generateAccessToken(user)
        res.header("authorization", accessToken).json({
            message: "Usuario autenticado",
            token: accessToken
        })
    } else {
        res.json("usuario no autorizado")
    }
   })

function generateAccessToken(user) {
    return jwt.sign(user, secretKey,{ expiresIn: '30m' });
}


function validateToken(req,res,next) {
   const accessToken = req.headers["authorization"];
   if (!accessToken) res.status(401).send('Acceso denegado');

   jwt.verify(accessToken, secretKey, (err, user) => {
    if(err) {
        res.status(401).send("Acceso denegado, token expiro o es incorrecto")
    }else{
        next();
    }
   }) 
};

app.get('/', validateToken, (req,res) => {
    res.json(info)
})

    app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
})
