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

/** getProductsBySKU
 * esta funcion se encarga de obtener los productos de productos.json por SKU para posteriormente ser enviados hacia el cliente en formato JSON.
 * 
 * HTTP GET http://localhost:3000/admin/producto/{sku}
 * @param {object} req : objeto Request de Express que maneja parametros del mensaje de llegada que envia el cliente
 * @param {object} res : objeto Respone de Express que maneja parametros del mensaje de respuesta hacia el cliente
 */
 const getProductsBySKU = (req, res) => {
    const SKU = lib.getSKUFromReq(req.originalUrl);  // se obtiene el SKU con la inspeccion del URL de la peticion del cliente
    const product = lib.getProductsBySKU(SKU);       // se extrae el producto con el respectivo SKU desde productos.json
    res.send(product);                               // se envia el producto a traves del formato JSON
};

/** postProducts
 * esta funcion se encarga de cargar nuevos productos en el archivo productos.json. lee el body del mensaje que envia el cliente (JSON),
 * y lo anade en productos.json.
 * 
 * HTTP POST http://localhost:3000/admin/producto
 * @param {object} req : objeto Request de Express que maneja parametros del mensaje de llegada que envia el cliente
 * @param {object} res : objeto Respone de Express que maneja parametros del mensaje de respuesta hacia el cliente
 */
 const postProducts = (req, res) => {
    let newProduct = req.body;      // se obtiene el contenido (body) del mensaje que el usuario envia (JSON)
    lib.addNewProductsJSON(newProduct);  // se adiciona el contenido a productos.json.
    
    // se envia un mensaje al cliente para notificar la adicion exitosa del producto
     const mensaje = {
        "Mensaje" : "Se ha insertado el producto exitosamente!!!"
    }
    res.send(mensaje);
}

/** updateProductBySKU
 * esta funcion se encarga de actualizar un producto de productos.json por SKU. sirve para solo actualizar uno o varios atributos del producto
 * requerido.
 * HTTP UPDATE http://localhost:3000/admin/producto/{sku}
 * @param {object} req : objeto Request de Express que maneja parametros del mensaje de llegada que envia el cliente
 * @param {object} res : objeto Respone de Express que maneja parametros del mensaje de respuesta hacia el cliente
 */
 const updateProductBySKU = (req, res) => {
    const SKU = lib.getSKUFromReq(req.originalUrl); // se obtiene el SKU con la inspeccion del URL de la peticion del cliente
    let newProduct = req.body;                  // se obtiene el contenido (body) del mensaje que el usuario envia (JSON)

    lib.updateProductBySKU(SKU, newProduct);    // se actualiza el producto SKU con sus nuevos atributos

    // se envia un mensaje al cliente para notificar la adicion exitosa del producto    
    const mensaje = {
        "Mensaje" : "Se ha actualizado el producto exitosamente!!!"
    }
    res.send(mensaje);
};

/** deleteProductBySKU
 * esta funcion se encarga de eliminar un producto de productos.json por SKU. 
 * 
 * HTTP DELETE http://localhost:3000/admin/producto/{sku}
 * @param {object} req : objeto Request de Express que maneja parametros del mensaje de llegada que envia el cliente
 * @param {object} res : objeto Respone de Express que maneja parametros del mensaje de respuesta hacia el cliente
 */
 const deleteProductBySKU = (req, res) => {
    const SKU = lib.getSKUFromReq(req.originalUrl);  // se obtiene el SKU con la inspeccion del URL de la peticion del cliente
    lib.deleteProductBySKU(SKU);       // se elimina el producto con el respectivo SKU del archivo productos.JSON
    
    // se envia un mensaje al cliente para notificar la adicion exitosa del producto    
    const mensaje = {
        "Mensaje" : "Se ha eliminado el producto exitosamente!!!"
    }
    res.send(mensaje);
};

// exportacion de funciones de controlador 'producto' para ser importadas en routers/producto.js
module.exports = {getProducts, getProductsBySKU, postProducts, updateProductBySKU, deleteProductBySKU};
