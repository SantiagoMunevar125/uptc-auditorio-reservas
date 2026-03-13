import express from "express";
import { crearRecurso, obtenerRecursos, obtenerRecursoPorId } from "../controllers/controll-recurso.mjs";

const router = express.Router();

router.post("/", crearRecurso);

router.get("/", obtenerRecursos);

router.get("/:id", obtenerRecursoPorId);

export default router;