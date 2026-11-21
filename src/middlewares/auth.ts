import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verificarToken = (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];


    if (!token) {
        return res.status(401).json({ error: "Acceso denegado. Token requerido." });
    }

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
        throw new Error("JWT_SECRET no configurado");
    }

    const decodificado = jwt.verify(token, secret) as { id: string };

    req.usuarioId = decodificado.id;

    next();
    } catch (error: any) {
        console.error("Error verificando JWT:", error.message);
        return res.status(401).json({ error: "Token inválido o vencido.", detalle: error.message });
    }
};