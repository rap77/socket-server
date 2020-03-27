import { Application } from 'express';
import { UsuariosService } from '../service/usuarios.service';

export class UsuariosController {
    private usuariosService: UsuariosService;

    constructor(private app: Application) {
        this.usuariosService = new UsuariosService();
        this.routes();
    }

    routes() {
        this.app.route('/usuarios').get(this.usuariosService.getUsuarios);
    }
}