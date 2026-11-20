import { Usuario, IUsuario } from "./model";

export const buscarPorEmail = async (email: string) => {
    return await Usuario.findOne({ email });
};

export const buscarPorNombreUsuario = async (nombreUsuario: string) => {
    return await Usuario.findOne({ nombreUsuario });
};

export const buscarPorMailOUsuario = async (identificador: string) => {
    return await Usuario.findOne({
        $or: [{ email: identificador }, { nombreUsuario: identificador }],
    });
};

export const crearUsuario = async (datos: IUsuario) => {
    return await Usuario.create(datos);
};