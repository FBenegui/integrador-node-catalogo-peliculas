import * as dao from "./dao";
import { IPelicula } from "./model";

export const getTodas = async () => {
  return await dao.getTodas();
};

export const getPorId = async (id: string) => {
    const pelicula = await dao.getPorId(id);
    if (!pelicula) {
    throw new Error("Película no encontrada");
    }
    return pelicula;
};

export const crear = async (datos: IPelicula) => {
    if (datos.puntaje < 1 || datos.puntaje > 5) {
    throw new Error("El puntaje debe estar entre 1 y 5");
    }


const anioActual = new Date().getFullYear();
    if (datos.año && (datos.año < 1888 || datos.año > anioActual)) {
    throw new Error(`El año de estreno debe estar entre 1888 y ${anioActual}`);
    }

    return await dao.crear(datos);
};

export const actualizar = async (id: string, datos: Partial<IPelicula>) => {
    if (datos.puntaje !== undefined && (datos.puntaje < 1 || datos.puntaje > 5)) {
    throw new Error("El puntaje debe estar entre 1 y 5");
    }

const actualizada = await dao.actualizar(id, datos);
    if (!actualizada) {
    throw new Error("Película no encontrada para actualizar");
    }
    return actualizada;
};

export const eliminar = async (id: string) => {
    const eliminada = await dao.eliminar(id);
    if (!eliminada) {
    throw new Error("Película no encontrada para eliminar");
    }
    return eliminada;
};