import express from 'express';
import { SERVER_PORT } from '../globals/environment';
import bodyParser from 'body-parser';
import cors from 'cors';
import socketIO from 'socket.io';
import http from 'http';

import * as socket from '../sockets/socket';
import { MainController } from '../controller/main.controller';
import { MensajeController } from '../controller/mensaje.controller';

class Server {
    private static _instance: Server;
    app: express.Application;
    port: number;
    io: socketIO.Server;
    httpServer: http.Server;

    // declaracion del controlador
    mainController: MainController;
    mensajeController: MensajeController;

    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);
        this.escucharSockets();
        this.setConfig();

        this.mainController = new MainController(this.app);
        this.mensajeController = new MensajeController(this.app);
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    private setConfig(){
        // nos permite recibir request con data en formato json
        this.app.use(bodyParser.json({ limit: '50mb'}));

        // Nos permite recibir request con data en formato x-www-form-urlencoded
        this.app.use(bodyParser.urlencoded({ limit :'50mb', extended: true}));

        // Habilita Cors
        this.app.use(cors({ origin: true, credentials: true}));
    }

    private escucharSockets(){
        console.log('Escuchando conexiones  - Sockets');
        this.io.on('connection', cliente =>{
            console.log('Cliente conectado');

            // mensajes
            socket.mensaje(cliente, this.io);
            // desconectar
            socket.desconectar(cliente);
        })
    }


}

export default Server.instance;