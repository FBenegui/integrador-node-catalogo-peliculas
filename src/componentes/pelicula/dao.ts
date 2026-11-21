import { Pelicula, IPelicula } from "./model";

export const getTodas = async () => {
    return await Pelicula.find();
};

export const getTodasPorUsuario = async (usuarioId: string) => {
    return await Pelicula.find({ usuario: usuarioId }).populate("usuario", "nombre apellido nombreUsuario");
};

export const getPorId = async (id: string) => {
    return await Pelicula.findById(id).populate("usuario", "nombre apellido nombreUsuario");
};

export const crear = async (datos: IPelicula) => {
    return await Pelicula.create(datos);
};

export const actualizar = async (id: string, datos: Partial<IPelicula>) => {
    return await Pelicula.findByIdAndUpdate(id, datos, { new: true });
};

export const eliminar = async (id: string) => {
    return await Pelicula.findByIdAndDelete(id);
};