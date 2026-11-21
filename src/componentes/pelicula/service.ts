import * as dao from "./dao";
import { IPelicula } from "./model";


export const getTodas = async (usuarioId: string) => {
    return await dao.getTodasPorUsuario(usuarioId);
};

export const getPorId = async (id: string) => {
    const pelicula = await dao.getPorId(id);
    if (!pelicula) {
    throw new Error("Película no encontrada");
    }
    return pelicula;
};

export const crear = async (datos: IPelicula) => {
    if (datos.puntaje < 0 || datos.puntaje > 5) {
    throw new Error("El puntaje debe estar entre 0 y 5");
    }


const anioActual = new Date().getFullYear();
    if (datos.año && (datos.año < 1888 || datos.año > anioActual)) {
    throw new Error(`El año de estreno debe estar entre 1888 y ${anioActual}`);
    }

    return await dao.crear(datos);
};

export const actualizar = async (id: string, usuarioId: string, datos: Partial<IPelicula>) => {

    const pelicula = await dao.getPorId(id);

    
    if (!pelicula) {
        throw new Error("Película no encontrada");
    }
    
    if (!pelicula.usuario) {
        throw new Error("Esta película no tiene un usuario asociado");
    }       

    

    const duenioId = (pelicula.usuario as any)._id
    ? (pelicula.usuario as any)._id.toString()
    : pelicula.usuario.toString();

    if (duenioId !== usuarioId) {
        throw new Error("No tenés permiso para editar esta película");
    }

    if (datos.puntaje !== undefined && (datos.puntaje < 0 || datos.puntaje > 5)) {
        throw new Error("El puntaje debe estar entre 0 y 5");
    }
    


    return await dao.actualizar(id, datos);
};

export const eliminar = async (id: string, usuarioId: string) => {
    const pelicula = await dao.getPorId(id);
    
    if (!pelicula) {
        throw new Error("Película no encontrada para eliminar");
    }
    
    if (!pelicula.usuario) {
        throw new Error("Esta película no tiene un usuario asociado");
    }  

    

    const duenioId = (pelicula.usuario as any)._id
    ? (pelicula.usuario as any)._id.toString()
    : pelicula.usuario.toString();

    if (duenioId !== usuarioId) {
        throw new Error("No tenés permiso para eliminar esta película");
    }

    return await dao.eliminar(id);
};
