import { Schema, model } from "mongoose";

export interface IPelicula {
    titulo: string;
    director: string;
    genero: string;
    puntaje: number;
    año?: number;
}

const peliculaSchema = new Schema<IPelicula>(
    {
    titulo: { type: String, required: true },
    director: { type: String, required: true },
    genero: { type: String, required: true },
    puntaje: { type: Number, required: true },
    año: { type: Number },
    },
    { timestamps: true }
);

export const Pelicula = model<IPelicula>("Pelicula", peliculaSchema);