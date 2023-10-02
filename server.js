const express = require("express");
const app = express();
const port = 8000;
const info = require('./lista-tareas')
const jwt = require("jsonwebtoken")
const infoRouter = require('./list-view.router')
const editInfoRouter = require('./list-edit.router')
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({extended: false}));


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

app.use("/tareas", infoRouter);
app.use("/editar", editInfoRouter);


const jsonData = JSON.stringify(info);

app.get("/login", (req, res) => {
    res.send(`<html> 
    <head>
        <title>Login</title/>       
    </head> 
    <body>
        <form method="POST" action="/auth">
            Nombre de usuario: <input type="text" name ="text"><br/>
            Contraseña: <input type="password" name="password"><br/>
            <input type="Submit" value="Iniciar Sesion" />
        </form>
    </body>
    </html>`); 
});

app.post("/auth", (req,res) => {
    const {usuario, clave} = req.body;
    const user = {usuario: usuario};
    const accessToken = generateAccessToken(user)
    res.header("authorization", accessToken).json({
        message: "Usuario autenticado",
        token: accessToken
    })
})

function generateAccessToken(user) {
    return jwt.sign(user, `${process.env.TOKEN_SECRET}`, { expiresIn: '30m' });
}


function validateToken(req,res,next) {
   const accessToken = req.headers["authorization"];
   if (!accessToken) res.status(401).send('Acceso denegado');

   jwt.verify(accessToken, process.env.SECRET, (err, user) => {
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
