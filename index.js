import express from "express";
import routes_recurso from "./routes/routes-recurso.mjs";
import routes_reserva from "./routes/routes-reserva.mjs";

const APP = new express();

import './drivers/connect-db.mjs';

APP.use(express.json());
APP.use(express.urlencoded({ extended: false }));

APP.set('view engine', 'ejs');

APP.use("/recursos", routes_recurso);
APP.use("/reservas", routes_reserva);

APP.get('/', (req, res) => {
    res.render('index'); 
});

APP.get('/vista-recursos', (req, res) => {
    res.render('recursos'); 
});

APP.get('/vista-reservas', (req, res) => {
    res.render('reservas'); 
});

APP.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000 - API UPTC");
});