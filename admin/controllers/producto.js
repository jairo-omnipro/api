const path = require('path');       // importacion del modulo PATH para el manejo de las direcciones de los directorios 

// importacion de las funciones del modulo lib
const lib = require(path.join(__dirname, '..', '\\lib\\lib'));

/** getProducts
 * esta funcion se encarga de enviar el archivo productos.json como un mensaje HTTP hacia el cliente. permite consultar los productos
 * que se han registrado en la API.
 * 
 * HTTP GET http://localhost:3000/admin/producto
 * @param {object} req : objeto Request de Express que maneja parametros del mensaje de llegada que envia el cliente
 * @param {object} res : objeto Respone de Express que maneja parametros del mensaje de respuesta hacia el cliente
 */
const getProducts = (req, res) => {
    let productos = lib.getProductsJSON();  // se obtiene el archivo productos.json
    res.send(productos);                    // se enviar productos.json como respuesta HTTP
};




// exportacion de funciones de controlador 'producto' para ser importadas en routers/producto.js
module.exports = {getProducts};
