import { Schema, model, Types } from "mongoose";

export interface IPelicula {
    titulo: string;
    director: string;
    genero: string;
    puntaje: number;
    año?: number;
    reseña?: string;
    usuario: Types.ObjectId;
}

const peliculaSchema = new Schema<IPelicula>(
    {
    titulo: { type: String, required: true },
    director: { type: String, required: true },
    genero: { type: String, required: true },
    puntaje: { type: Number, required: true },
    año: { type: Number },
    reseña: { type: String },
    usuario: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

export const Pelicula = model<IPelicula>("Pelicula", peliculaSchema);