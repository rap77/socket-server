import express from 'express';
import { SERVER_PORT } from '../globals/environment';
import bodyParser from 'body-parser';
import cors from 'cors';
import socketIO from 'socket.io';
import http from 'http';

import * as socket from '../sockets/socket';
import { MainController } from '../controller/main.controller';
import { MensajesController } from '../controller/mensajes.controller';
import { UsuariosController } from '../controller/usuarios.controller';

class Server {
    private static _instance: Server;
    app: express.Application;
    port: number;
    io: socketIO.Server;
    httpServer: http.Server;

    // declaracion del controlador
    mainController: MainController;
    mensajesController: MensajesController;
    usuariosController: UsuariosController;

    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);
        this.escucharSockets();
        this.setConfig();

        this.mainController = new MainController(this.app);
        this.mensajesController = new MensajesController(this.app);
        this.usuariosController = new UsuariosController(this.app);
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
            //   console.log('Cliente conectado');

            // Conectar cliente
            socket.conectarCliente(cliente, this.io);

            //Configurando Usuario
            socket.configuraUSuario(cliente,this.io);

            //Obtener usuarios ativos
            socket.obtenerUSuarios(cliente, this.io);
           
            // mensajess
            socket.mensaje(cliente, this.io);
            // desconectar
            socket.desconectar(cliente, this.io);
            
        })
    }


}

export default Server.instance;