const path = require('path');   // importacion del modulo PATH para el manejo de las direcciones de los directorios 

// importacion de las funciones del modulo lib
const lib = require(path.join(__dirname, '..', '..', '\\admin\\lib\\lib'));

/** purchaseSummary
 * esta funcion se encarga de enviar un archivo tipo JSON al cliente, donde se especifica la informacion de la compra
 * que el cliente desea realizar. 
 * 
 * HTTP GET http://localhost:3000/resumen
 * @param {object} req : objeto Request de Express que maneja parametros del mensaje de llegada que envia el cliente
 * @param {object} res : objeto Respone de Express que maneja parametros del mensaje de respuesta hacia el cliente
 */
const purchaseSummary = (req, res) => {
    // se lee el body del request para determinar cuales productos se desean comprar
    let productsList = req.body.compras;
    
    // propiedades a eliminar de los productos para ser mostrados en la API mobile
    let propertiesToRemove = [
        "precio", 
        "url", 
        "marca", 
        "descripcion", 
        "iva", 
        "descuento", 
        "inventario", 
        "fecha_creacion"
    ];
    
    // se genera el objeto que contiene el resumen de la compra
    let productos = lib.purchaseSummary(true, productsList, propertiesToRemove);

    // se envia el objeto por medio de un archivo tipo JSON
    res.send(productos);
};

// exportacion de funciones de controlador 'resumen' para ser importadas en routers/resumen.js
module.exports = {purchaseSummary};