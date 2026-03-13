import mongoose from "mongoose";

const reservaSchema = new mongoose.Schema({
    recurso: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recurso", // Relacionamos esta reserva con el modelo "Recurso"
        required: [true, "Debe especificar qué recurso desea reservar"]
    },
    fecha: {
        type: String, // Usamos String formato "YYYY-MM-DD" para facilitar la validación exacta
        required: [true, "La fecha de reserva es obligatoria"]
    },
    horaInicio: {
        type: String,
        required: [true, "La hora de inicio es obligatoria"],
        match: [/^([01]\d|2[0-3]):([0-5]\d)$/, "El formato debe ser HH:mm (ej. 08:00)"] // Constraint: Formato estricto
    },
    horaFin: {
        type: String,
        required: [true, "La hora de fin es obligatoria"],
        match: [/^([01]\d|2[0-3]):([0-5]\d)$/, "El formato debe ser HH:mm (ej. 10:00)"] // Constraint: Formato estricto
    },
    solicitante: {
        type: String,
        required: [true, "El nombre de quien reserva es obligatorio"],
        trim: true
    }
}, {
    timestamps: true
});

export default mongoose.model("Reserva", reservaSchema);