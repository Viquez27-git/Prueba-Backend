import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
    throw new Error("Falta definir MONGODB_URI");
}

const connectionToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log(`Base de datos conectada exitosamente en ${NODE_ENV}`);
    } catch (error) {
        console.error("Error al conectar la base de datos:", error);
        process.exit(1);
    }
};

export default connectionToDatabase;
