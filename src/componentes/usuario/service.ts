import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dao from "./dao";
import { IUsuario } from "./model";

export const registrar = async (datos: IUsuario) => {
    if (!datos.nombre || !datos.apellido || !datos.email || !datos.contraseña || !datos.nombreUsuario) {
        throw new Error("Todos los campos (nombre, apellido, email, nombre de usuario y contraseña) son obligatorios");
    }

    const existeUsuario = await dao.buscarPorEmail(datos.email);
    if (existeUsuario) {
        throw new Error("El correo electrónico ya está registrado");
    }

    const existeUsername = await dao.buscarPorNombreUsuario(datos.nombreUsuario);
    if (existeUsername) {
        throw new Error("El nombre de usuario ya está en uso");
    }

    const contraseñaEncriptada = await bcrypt.hash(datos.contraseña, 10);

    const nuevoUsuario = await dao.crearUsuario({
        ...datos,
        contraseña: contraseñaEncriptada,
    });

    return {
        id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        apellido: nuevoUsuario.apellido,
        nombreUsuario: nuevoUsuario.nombreUsuario,
        email: nuevoUsuario.email,
    };
};

export const login = async (identificador: string, contraseña: string) => {
    if (!identificador || !contraseña) {
        throw new Error("Debes ingresar tu email o nombre de usuario y tu contraseña");
    }
    
    const usuario = await dao.buscarPorMailOUsuario(identificador);
    if (!usuario) {
    throw new Error("Credenciales inválidas");
}

    const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!contraseñaValida) {
        throw new Error("Credenciales inválidas");
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET no está configurado en el servidor");
    }

    const token = jwt.sign({ id: usuario._id }, secret, { expiresIn: "24h" });

    return { token };
};