import { Request, Response } from 'express';

export class MainService {
    mensajeBienvenida(req: Request, res: Response) {
        return res.status(200).json({
            ok: true,
            mensaje: 'Peticionrealizada correctamente'
        });
    }
}