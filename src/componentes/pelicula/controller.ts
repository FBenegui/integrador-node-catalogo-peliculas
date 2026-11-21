import type { Request, Response } from "express";
import * as service from "./service";

export const getTodas = async (req: any, res: Response) => {
    try {
        const peliculas = await service.getTodas(req.usuarioId);
        res.status(200).json(peliculas);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    } 
};

export const getPorId = async (req: Request, res: Response) => {
    try {
    const pelicula = await service.getPorId(req.params.id as string);
    res.status(200).json(pelicula);
    } catch (error: any) {
    res.status(404).json({ error: error.message });
    }
};

export const crear = async (req: any, res: Response) => {
    try {
        const datosPelicula = {
            ...req.body,
            usuario: req.usuarioId,
        };

        const nuevaPelicula = await service.crear(datosPelicula);
        res.status(201).json(nuevaPelicula);
    } catch (error: any) {
    res.status(400).json({ error: error.message });
    }
};

export const actualizar = async (req: any, res: Response) => {
    try {
        const actualizada = await service.actualizar(req.params.id as string, req.usuarioId, req.body);
        res.status(200).json(actualizada);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const eliminar = async (req: any, res: Response) => {
    try {
        await service.eliminar(req.params.id as string, req.usuarioId);
        res.status(200).json({ message: "Película eliminada correctamente" });
    } catch (error: any) {
        res.status(404).json({ error: error.message });
    }
};