import Reserva from "../models/Reserva.mjs";

// Crear una nueva reserva validando disponibilidad
export const crearReserva = async (req, res) => {
    try {
        const { recurso, fecha, horaInicio, horaFin, solicitante } = req.body;

        // Validación de lógica básica: Que la hora de inicio no sea después de la hora de fin
        if (horaInicio >= horaFin) {
            return res.status(400).json({ mensaje: "La hora de inicio debe ser anterior a la hora de fin" });
        }

        // VALIDACIÓN DEL EXAMEN: Disponibilidad por fecha y horario
        // Buscamos si existe alguna reserva para el mismo recurso en la misma fecha
        // donde los horarios se crucen ($lt = menor que, $gt = mayor que)
        const reservaExistente = await Reserva.findOne({
            recurso: recurso,
            fecha: fecha,
            $or: [
                { horaInicio: { $lt: horaFin }, horaFin: { $gt: horaInicio } }
            ]
        });

        // Si encontramos una reserva que choca con el horario solicitado, rechazamos la petición
        if (reservaExistente) {
            return res.status(400).json({
                mensaje: "El auditorio ya no tiene disponibilidad en ese horario o se cruza con otra reserva.",
                conflicto: reservaExistente
            });
        }

        // Si pasa la validación, procedemos a crear y guardar la reserva
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

// Obtener todas las reservas 
export const obtenerReservas = async (req, res) => {
    try {
        // Usamos .populate('recurso') para que MongoDB nos traiga los datos 
        // completos del auditorio (nombre, capacidad) y no solo su ID.
        const reservas = await Reserva.find().populate('recurso');
        res.status(200).json(reservas);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener las reservas", error: error.message });
    }
};