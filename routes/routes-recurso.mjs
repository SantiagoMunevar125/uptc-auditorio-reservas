import express from "express";
import { crearRecurso, obtenerRecursos, obtenerRecursoPorId } from "../controllers/controll-recurso.mjs";

const router = express.Router();

// Ruta para crear un recurso (POST http://localhost:3000/recursos)
router.post("/", crearRecurso);

// Ruta para obtener todos los recursos (GET http://localhost:3000/recursos)
router.get("/", obtenerRecursos);

// Ruta para obtener un recurso por ID (GET http://localhost:3000/recursos/12345...)
router.get("/:id", obtenerRecursoPorId);

export default router;