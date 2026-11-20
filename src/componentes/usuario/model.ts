import { Schema, model } from "mongoose";

export interface IUsuario {
    nombre: string;
    apellido: string;
    nombreUsuario: string;
    email: string;
    contraseña: string;
}

const usuarioSchema = new Schema<IUsuario>({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    nombreUsuario: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    contraseña: { type: String, required: true },
},
{ timestamps: true }
);

export const Usuario = model<IUsuario>("Usuario", usuarioSchema);