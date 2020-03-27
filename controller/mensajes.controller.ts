import { Application } from 'express';
import { MensajesService } from '../service/mensajes.service';

export class MensajesController {
    private mensajesService: MensajesService;

    constructor(private app: Application) {
        this.mensajesService = new MensajesService();
        this.routes();
    }

    routes() {
        this.app.route('/mensajes').get(this.mensajesService.getMensajes);
        this.app.route('/mensajes').post(this.mensajesService.postMensajes);
        this.app.route('/mensajes/:id').post(this.mensajesService.postMensajesId);
    }
}