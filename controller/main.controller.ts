import { Application } from 'express';
import { MainService } from '../service/main.service';

export class MainController {
    private mainService: MainService;

    constructor(private app: Application) {
        this.mainService = new MainService();
        this.routes();
    }

    routes() {
        this.app.route('/').get(this.mainService.mensajeBienvenida);
    }
}