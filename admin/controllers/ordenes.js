const path = require('path');     // importacion del modulo PATH para el manejo de las direcciones de los directorios 

// importacion de las funciones del modulo lib
const lib = require(path.join(__dirname, '..', '\\lib\\lib'));

/** getOrders
 * esta funcion se encarga de enviar las ordenes que se han realizado cuando se consulta la URI http://localhost:3000/admin/ordenes por el
 * metodo get. Envia un archivo tipo JSON con el id de las ordenes y la informacion de cada producto comprado.
 * 
 * HTTP GET http://localhost:3000/admin/ordenes
 * @param {object} req : objeto Request de Express que maneja parametros del mensaje de llegada que envia el cliente
 * @param {object} res : objeto Respone de Express que maneja parametros del mensaje de respuesta hacia el cliente
 */
const getOrders = (req, res) => {
    let ordenes = lib.getOrders();  // se obtienen las ordenes con el formato especifico
    res.send(ordenes);              // se envian las ordenes con el uso del metodo .send, en formato JSON
};

module.exports = {getOrders};       // exportacion de funciones de controlador 'ordenes' para ser importadas en routers/ordenes.js