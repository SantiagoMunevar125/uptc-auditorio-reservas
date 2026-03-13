import Reserva from "../models/Reserva.mjs";

export const crearReserva = async (req, res) => {
    try {
        const { recurso, fecha, horaInicio, horaFin, solicitante } = req.body;

        if (horaInicio >= horaFin) {
            return res.status(400).json({ mensaje: "La hora de inicio debe ser anterior a la hora de fin" });
        }

        const reservaExistente = await Reserva.findOne({
            recurso: recurso,
            fecha: fecha,
            $or: [
                { horaInicio: { $lt: horaFin }, horaFin: { $gt: horaInicio } }
            ]
        });

        if (reservaExistente) {
            return res.status(400).json({
                mensaje: "El auditorio ya no tiene disponibilidad en ese horario o se cruza con otra reserva.",
                conflicto: reservaExistente
            });
        }

        const nuevaReserva = new Reserva({ recurso, fecha, horaInicio, horaFin, solicitante });
        await nuevaReserva.save();

        res.status(201).json({
            mensaje: "Reserva asignada exitosamente",
            reserva: nuevaReserva
        });

    } catch (error) {
        res.status(500).json({ mensaje: "Error al procesar la reserva", error: error.message });
    }
};

export const obtenerReservas = async (req, res) => {
    try {
        const reservas = await Reserva.find().populate('recurso');
        res.status(200).json(reservas);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener las reservas", error: error.message });
    }
};