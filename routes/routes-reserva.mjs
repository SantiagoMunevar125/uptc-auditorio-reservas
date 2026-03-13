import express from "express";
import { crearReserva, obtenerReservas } from "../controllers/controll-reserva.mjs";

const router = express.Router();

router.post("/", crearReserva);

router.get("/", obtenerReservas);

export default router;