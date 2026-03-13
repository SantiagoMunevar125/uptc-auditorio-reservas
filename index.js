import express from "express";
import routes_recurso from "./routes/routes-recurso.mjs";
import routes_reserva from "./routes/routes-reserva.mjs";

const APP = new express();

import './drivers/connect-db.mjs';

APP.use(express.json());
APP.use(express.urlencoded({ extended: false }));

// Configurar EJS para la Interfaz Gráfica de Usuario
APP.set('view engine', 'ejs');

// middleware de rutas
APP.use("/recursos", routes_recurso);
APP.use("/reservas", routes_reserva);

//Interfaz gráfica de usuario para mostrar los recursos y reservas
// --- RUTAS DE LA INTERFAZ GRÁFICA (VISTAS EJS) ---

// Mostrar el menú principal
APP.get('/', (req, res) => {
    res.render('index'); // Renderiza views/index.ejs
});

// Mostrar la vista de recursos
APP.get('/vista-recursos', (req, res) => {
    res.render('recursos'); // Renderizará views/recursos.ejs (lo haremos en breve)
});

// Mostrar la vista de reservas
APP.get('/vista-reservas', (req, res) => {
    res.render('reservas'); // Renderizará views/reservas.ejs (lo haremos en breve)
});

// mensaje de que el servidor comenzó a correr
APP.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000 - API UPTC");
});