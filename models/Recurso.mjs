import mongoose from "mongoose";

const recursoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre del auditorio o espacio es obligatorio"],
        unique: true, // Constraint: No pueden existir dos auditorios con el mismo nombre
        trim: true
    },
    capacidad: {
        type: Number,
        required: [true, "La capacidad es obligatoria"],
        min: [1, "La capacidad debe ser de al menos 1 persona"] // Constraint: Mínimo lógico
    },
    ubicacion: {
        type: String,
        required: [true, "La ubicación es obligatoria"],
        trim: true
    }
}, {
    timestamps: true // Agrega automáticamente fecha de creación y actualización
});

export default mongoose.model("Recurso", recursoSchema);