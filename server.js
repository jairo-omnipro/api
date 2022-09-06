const express = require('express'); // importacion del modulo express

const app = express();              // creacion del objeto express() para configurar la API REST.

const PORT     = 3000;              // puerto en donde se montara el servicio de la API REST 
const HOSTNAME = "127.0.0.1";       // IP donde se montara el servicio de la API REST (en este caso, localhost)

                                    // URL de la API: http://localhost:3000

/**
 * IMPORTACION DE ROUTERS INDICES
 * se importan las rutas de los index.js ubicados en cada carpeta de routes, tanto de la parte web como la mobile
 */

const mobileIndexRouter = require('./mobile/routers/index');  // importacion de index router de la aplicacion mobile  


app.use(express.json());                         // se prepara el servidor para que pueda recibir datos JSON de los request que se hagan
                                                 // desde el cliente


app.use('/', mobileIndexRouter);                 // enrutamiento de las peticiones para 'http://localhost:3000/' hacia el router de indice
                                                 // para la aplicacion Mobile                                                 
/**
 *  Se monta el servidor Node para que escuche las peticiones en el puerto PORT, y la IP HOSTNAME
 *  Se envia un mensaje por consola para indicar que el servidor esta corriendo
 */
app.listen(PORT, HOSTNAME, () => {
    console.log("El servidor esta ON");
});