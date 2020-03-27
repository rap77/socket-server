import { Request, Response } from 'express';
import Server from '../clases/server';
import { usuariosConectados } from '../sockets/socket';

export class UsuariosService {
    
    getUsuarios(req: Request, res: Response) {

        const server = Server;
        
        server.io.clients( (err: any, clientes: string[]) => {
            if (err) {
                return res.json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                clientes
            });
        })
    }

    getUsuariosDetalle(req: Request, res: Response) {

       
    
        res.json({
            ok: true,
            clientes:  usuariosConectados.getLista()
        });
    }
}