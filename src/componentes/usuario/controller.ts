import type { Request, Response } from "express";
import * as service from "./service";

export const registrar = async (req: Request, res: Response) => {
    try {
        const usuario = await service.registrar(req.body);
        res.status(201).json(usuario);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
}
};

export const login = async (req: Request, res: Response) => {
    try {
        const identificador = req.body.identificador || req.body.email || req.body.nombreUsuario;
        const { contraseña } = req.body;

    const resultado = await service.login(identificador, contraseña);
    res.status(200).json(resultado);
    } catch (error: any) {
    res.status(401).json({ error: error.message });
    }
};