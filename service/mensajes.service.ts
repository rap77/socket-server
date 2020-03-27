import { Request, Response } from "express";
import Server from '../clases/server';


export class MensajesService {
  getMensajes(req: Request, res: Response) {
    return res.status(200).json({
      ok: true,
      mensaje: "Todo esta Correcto"
    });
  }

  postMensajes(req: Request, res: Response) {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = {
      de,
      cuerpo
    }

    const server = Server;

    server.io.emit('mensaje-nuevo', payload);
    
    res.json({
      ok: true,
      cuerpo,
      de
    });
  }

  postMensajesId(req: Request, res: Response) {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload = {
      de,
      cuerpo
    }

    const server = Server;

    server.io.in(id).emit('mensaje-privado', payload);

    res.json({
      ok: true,
      cuerpo,
      de,
      id
    });
  }
}
