import mongoose from "mongoose";

// conectar a MongoDB
const URI = "mongodb://127.0.0.1:27017/";
const DB = "audiovisualesUPTC"; // Nombre adaptado al proyecto

try {
    await mongoose.connect(URI + DB);
    console.log("Conectado a MongoDB - Base de datos Audiovisuales");
} catch (error) {
    console.error("Error de conexión:", error);
}

export default mongoose;