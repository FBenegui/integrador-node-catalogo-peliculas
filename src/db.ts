import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
    try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
    throw new Error("La variable MONGO_URI no está definida en el .env");
    }

    await mongoose.connect(mongoUri);
    console.log("🟢 Conexión exitosa a MongoDB Atlas");
    } catch (error) {
    console.error("🔴 Error al conectar con MongoDB:", error);
    process.exit(1);
    }
};