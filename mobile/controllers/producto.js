const path = require('path');   // importacion del modulo PATH para el manejo de las direcciones de los directorios 

// importacion de las funciones del modulo lib
const lib = require(path.join(__dirname, '..', '..', '\\admin\\lib\\lib'));

/** getProducts
 * esta funcion se encarga de enviar el archivo productos.json como un mensaje HTTP hacia el cliente. permite consultar los productos
 * que se han registrado en la API.
 * 
 * HTTP GET http://localhost:3000/producto
 * @param {object} req : objeto Request de Express que maneja parametros del mensaje de llegada que envia el cliente
 * @param {object} res : objeto Respone de Express que maneja parametros del mensaje de respuesta hacia el cliente
 */
const getProducts = (req, res) => {

    // atributos de los productos que se desean eliminar para ser mostrados
    let propertiesToRemove = [
        "precio",
        "descripcion",
        "iva",
        "descuento",
        "inventario",
        "fecha_creacion"
    ];

    let productos = lib.getProductsMobile(true, propertiesToRemove);
    res.send(productos);
};




// exportacion de funciones de controlador 'producto' para ser importadas en routers/producto.js
module.exports = {getProducts};