const path = require('path'); // importacion del modulo PATH para el manejo de las direcciones de los directorios

// importacion de las funciones del modulo lib
const lib = require(path.join(__dirname, '..', '..', '\\admin\\lib\\lib'));


/** buyProducts
 * esta funcion se encarga de insertar una orden dentro de ordenes.json cuando el usuario realiza un post en la URI 
 * especifica. 
 * 
 * HTTP POST http://localhost:3000/comprar
 * @param {object} req : objeto Request de Express que maneja parametros del mensaje de llegada que envia el cliente
 * @param {object} res : objeto Respone de Express que maneja parametros del mensaje de respuesta hacia el cliente
 */
const buyProducts = (req, res) => {
    let buyInfo = req.body;  // se obtiene la informacion de nombre, apellido y compras (SKUs de los productos a comprar) del request
    lib.newOrder(buyInfo);   // se realiza la nueva orden

    // se le notifica al cliente que la compra ha sido realizada exitosamente
    const mensaje = {
        "Mensaje" : "La compra ha sido realizada exitosamente!!!"
    };
    res.send(mensaje);
};

// exportacion de funciones de controlador 'comprar' para ser importadas en routers/comprar.js
module.exports = {buyProducts};