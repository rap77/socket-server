import express from 'express';
import { SERVER_PORT } from '../globals/environment';
import bodyParser from 'body-parser';
import cors from 'cors';

import { MainController } from '../controller/main.controller';
import { MensajeController } from '../controller/mensaje.controller';

class Server {
    app: express.Application;
    port: number;

    // declaracion del controlador
    mainController: MainController;
    mensajeController: MensajeController;

    constructor(){
        this.app = express();
        this.port = SERVER_PORT;
        this.setConfig();

        this.mainController = new MainController(this.app);
        this.mensajeController = new MensajeController(this.app);
    }

    private setConfig(){
        // nos permite recibir request con data en formato json
        this.app.use(bodyParser.json({ limit: '50mb'}));

        // Nos permite recibir request con data en formato x-www-form-urlencoded
        this.app.use(bodyParser.urlencoded({ limit :'50mb', extended: true}));

        // Habilita Cors
        this.app.use(cors({ origin: true, credentials: true}));
    }


}

export default new Server();