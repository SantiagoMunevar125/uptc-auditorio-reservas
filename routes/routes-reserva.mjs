import express from "express";
import { crearReserva, obtenerReservas } from "../controllers/controll-reserva.mjs";

const router = express.Router();

// Ruta para crear una reserva validando disponibilidad (POST http://localhost:3000/reservas)
router.post("/", crearReserva);

// Ruta para ver todas las reservas y sus datos (GET http://localhost:3000/reservas)
router.get("/", obtenerReservas);

export default router;