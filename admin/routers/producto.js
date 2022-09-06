const express = require('express');   // importacion del modulo Express js

const path = require('path');         // importacion del modulo PATH para el manejo de las direcciones de los directorios 

// importacion de las funciones del modulo lib
const lib = require(path.join(__dirname, '..', '\\lib\\lib'));


const router = express.Router();           // declaracion del objeto tipo router de Express, que se utiliza para enrutar las URI hacia
                                           // las respectivas funciones callback dependiendo del tipo de solicitud 

/**
 * se importan las funciones callback que responderan a las solicitudes en las rutas por los distintos metodos HTTP.
 * estas se encuentran en el archivo dentro del directorio /controllers, y tienen el mismo nombre de la ruta a la que responden.
 */ 
const controller = require('../controllers/producto');

/**
 * se enrutan las solicitudes necesarias (get, post, put, delete, etc) hacia las funciones callback de cada controlador
 */

router.get('', controller.getProducts);        // metodo get para http://localhost:3000/admin/producto, funcion callback de controlador: getProducts
router.get(lib.getPathsBySKU(), controller.getProductsBySKU); // metodo get para familia de URIs http://localhost:3000/admin/producto/{sku}, funcion callback de controlador: getProducts
router.post('', controller.postProducts);     // metodo post para http://localhost:3000/admin/producto, funcion callback de controlador: getProducts


module.exports = router;     // se exporta el enrutador para ser importado en el index.js