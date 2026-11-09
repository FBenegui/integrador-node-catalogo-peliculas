import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./db";
import rutasPelicula from "./componentes/pelicula/ruttes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


connectDB();

app.use("/api/peliculas", rutasPelicula);

app.get("/", (req: Request, res: Response) => {
    res.send("¡API Catálogo de Películas (Letterboxd Style) de nuevo en marcha!");
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});