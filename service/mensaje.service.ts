import { Request, Response } from "express";

export class MensajeService {
  getMensaje(req: Request, res: Response) {
    return res.status(200).json({
      ok: true,
      mensaje: "Todo esta Correcto"
    });
  }

  postMensaje(req: Request, res: Response) {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    res.json({
      ok: true,
      cuerpo,
      de
    });
  }
  postMensajeId(req: Request, res: Response) {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    res.json({
      ok: true,
      cuerpo,
      de,
      id
    });
  }
}
