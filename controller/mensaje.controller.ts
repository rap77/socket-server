import { Application } from 'express';
import { MensajeService } from '../service/mensaje.service';

export class MensajeController {
    private mensajeService: MensajeService;

    constructor(private app: Application) {
        this.mensajeService = new MensajeService();
        this.routes();
    }

    routes() {
        this.app.route('/mensaje').get(this.mensajeService.getMensaje);
        this.app.route('/mensaje').post(this.mensajeService.postMensaje);
        this.app.route('/mensaje/:id').post(this.mensajeService.postMensajeId);
    }
}