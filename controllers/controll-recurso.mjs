import Recurso from "../models/Recurso.mjs";

export const crearRecurso = async (req, res) => {
    try {
        const { nombre, capacidad, ubicacion } = req.body;

        const nuevoRecurso = new Recurso({ nombre, capacidad, ubicacion });
        await nuevoRecurso.save();

        res.status(201).json({
            mensaje: "Recurso creado exitosamente",
            recurso: nuevoRecurso
        });
    } catch (error) {
        res.status(400).json({ mensaje: "Error al crear el recurso", error: error.message });
    }
};

export const obtenerRecursos = async (req, res) => {
    try {
        const recursos = await Recurso.find();
        res.status(200).json(recursos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los recursos", error: error.message });
    }
};

export const obtenerRecursoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const recurso = await Recurso.findById(id);

        if (!recurso) {
            return res.status(404).json({ mensaje: "Recurso no encontrado" });
        }

        res.status(200).json(recurso);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al buscar el recurso", error: error.message });
    }
};