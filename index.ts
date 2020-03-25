import server from "./clases/server";


server.app.listen(server.port, ()=> console.log(`Servidor Corriendo en el Puerto ${server.port}`));

