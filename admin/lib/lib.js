/**
 * El modulo lib.js contiene las funciones que se utilizaran en los scripts de la API. Estan seran importadas en cada archivo .js
 * para evitar que estos scripts se extiendan, y puedan ser mas legibles y entendibles. En cada script que se se desee utilizar este modulo
 * se debe importar el modulo path de Node.js e insertar la siguiente linea
 * const lib = require(path.join(__dirname, '..', '{ubicacion de /lib/lib}')); los dos puntos '..' se utilizan para ir un directorio atras del script,
 * y ubicar la carpeta lib 
 */

const path = require('path');   // importacion del modulo PATH para el manejo de las direcciones de los directorios 
const fs   = require('fs');     // importacion del modulo File System (fs) para la lectura y escritura de archivos

// constantes que guardan las rutas de los archivos productos.json y ordenes.json, ubicados en el directorio /admin/data
const PRODUCTOS_JSON_PATH = path.join(__dirname, '..', '\\data\\productos.json');
const ORDENES_JSON_PATH   = path.join(__dirname, '..', '\\data\\ordenes.json');

/**getProductsJSON
 * esta funcion se encarga de entregar el archivo productos.json en una variable tipo objeto.
 * @returns Object : archivo productos.json de tipo objeto
 */
const getProductsJSON = () => {
    let rawData = fs.readFileSync(PRODUCTOS_JSON_PATH); // se lee el archivo productos.json, se obtiene un conjunto de datos crudos
    let productos = JSON.parse(rawData);   // se realiza la conversion a objeto desde un archivo json

    return productos;  // se retorna el objeto de productos
};

/**getOrdersJSON
 * esta funcion se encarga de entregar el archivo ordenes.json en una variable tipo objeto.
 * @returns Object : archivo productos.json de tipo objeto
 */
const getOrdersJSON = () => {
    let rawData = fs.readFileSync(ORDENES_JSON_PATH);// se lee el archivo ordenes.json, se obtiene un conjunto de datos crudos
    let ordenes = JSON.parse(rawData);               // se realiza la conversion a objeto desde un archivo json

    return ordenes;                 // se retorna el objeto de productos
};

/**getOrders
 * esta funcion se encarga de entregar las ordenes que se han realizado en la API, teniendo en cuenta que se deben especificar
 * para cada producto solo los atributos de nombre, sku, marca y url de la imagen.
 * @returns Object : ordenes realizadas. los atributos del objeto corresponden al id de la orden
 */
const getOrders = () => {
    let ordenes   = getOrdersJSON();  // se obtienen las ordenes realizadas desde ordenes.json

    // se obtienen los id de las ordenes registradas como un array [id1, id2, id3, ...]
    const ORDERS_IDs  =  Object.getOwnPropertyNames(ordenes);  

    // se fijan cuales atributos se desean quitar de los registros de los productos, para ser mostrados en las ordenes
    let propertiesToRemove = [
        "precio", 
        "descripcion", 
        "iva", 
        "descuento", 
        "inventario", 
        "fecha_creacion",
        "precio_final"
    ];

    // se obtienen los productos desde productos.json, sin los atributos especificados en propertiesToRemove
    let productsJSON = getProductsMobile(false, propertiesToRemove);
    
    // se inicializa un objeto vacio, el cual acumulara el registro de las ordenes con los atributos de cada producto
    let orders     = {};
    
    /**PROCESO DE OBTENCION DE ATRIBUTOS PARA CADA PRODUCTO EN CADA ORDEN REALIZADA
     * en este for se realiza el proceso de extraer los atributos de los productos para insertarlos
     * en las ordenes
     */
    for(let id of ORDERS_IDs){ // se itera el array que contiene los id de las ordenes, los valores se guardan en 'id'
        let compras = {};     // objeto vacio que acumulara los productos de la compra con los atributos
        let unitOrders = {};  // objeto vacio que guardara cada orden de manera que se identifique con su id respectivo

        /**
         * se insertan los productos en el objeto compras, de manera que cada producto tenga los atributos requeridos
         */
        for(let SKU of ordenes[id].productos){  // se itera sobre los SKU de los productos de la orden id
            // se adiciona en el objeto compras los productos de la orden, de manera que cada producto quede indentificado con su SKU
            // dentro del objeto
            compras = Object.assign({}, compras, {[SKU] : productsJSON[SKU]}); 
        }

        // se realiza el formato de la orden unidaria para que quede identificada con su id
        unitOrders = ordenes[id];

        // se insertan los productos con sus atributos en la orden unitaria
        unitOrders.productos = compras;

        // se combinan todas las ordenes unitarias dentro del objeto orders, para tener el registro completo de las ordenes
        orders = Object.assign({}, orders, {[id] : unitOrders});
    }


    // se retornan las ordenes con la adicion de los atributos para cada producto
    return orders;
};


/**getProductsMobile
 * en esta funcion se genera la informacion de los productos consultados a traves de la aplicacion web, como un objeto que se enviara
 * como un archivo json. se encarga tambien de adicionar el atributo producto_final.
 * @param {boolean} isRemoveNoStock : true; remueve los productos que tienen inventario = 0. false; mantiene todos los productos.
 * @param {array} propertiesToRemove : conjunto de propiedades que se quieren eliminar de los productos
 * @returns Object: objeto con la informacion de los productos para la aplicacion mobile
 */
const getProductsMobile = (isRemoveNoStock, propertiesToRemove) => {
    let productos = getProductsJSON();  // se obtienen los productos leyendo el archivo productos.json
    let arraySKUProducts = Object.getOwnPropertyNames(productos);  // se obtienen los SKUs de los productos registrados como un array
    let removedSKUs      = arraySKUProducts;                // se inicializa un array que guardara los productos con inventarios != 0,
                                                            // en caso de ser requerido
    
    /**
     * proceso de eliminar los productos que no tienen inventario (inventario = 0).
     */
    if(isRemoveNoStock){
        for(let key of arraySKUProducts){
            if(productos[key].inventario == 0){
                delete productos[key];
                let propIndex = arraySKUProducts.indexOf(key);
                removedSKUs.splice(propIndex);
            }
        }
    }

    /**
     * proceso de adicion del atributo producto_final a cada producto, y de la eliminacion de las propiedades especificadas en
     * propertiesToRemove
     */
    for(let key of removedSKUs){
        let precio    = productos[key].precio;
        let iva       = productos[key].iva;
        let descuento = productos[key].descuento;
        let precioFinal = precio - (precio * descuento) + (precio * iva);

        productos[key].precio_final = precioFinal;  // adicion de producto_final a cada producto

        // eliminacion de atributos
        for(let removeProps of propertiesToRemove){
            delete productos[key][removeProps];
        }
    }

    return productos;  // retorno de la lista de productos
};

/**updateProductsJSON
 * esta funcion se encarga de sobreescribir el archivo productos.json para actualizarlo
 * @param {object} newProductsObj : objeto con la lista de productos que se quiere actualizar 
 */
const updateProductsJSON = (newProductsObj) => {
    let newProductsData = JSON.stringify(newProductsObj);  // se convierte al formato requerido para la escritura del archivo
    fs.writeFileSync(PRODUCTOS_JSON_PATH, newProductsData);   // se sobreescribe productos.json con el nuevo listado 
};

/**updateOrdersJSON
 * esta funcion se encarga de sobreescribir el archivo ordenes.json para actualizarlo
 * @param {object} newOrdersObj : objeto con la lista de ordenes que se quiere actualizar 
 */
const updateOrdersJSON = (newOrdersObj) => {
    let newOrdersData = JSON.stringify(newOrdersObj);       // se convierte al formato requerido para la escritura del archivo
    fs.writeFileSync(ORDENES_JSON_PATH, newOrdersData);     // se sobreescribe ordenes.json con el nuevo listado 
};

/**addNewProductsJSON
 * esta funcion se encarga de adicionar un nuevo producto al archivo productos.json.
 * @param {object} newProduct : producto nnuevo que se quiere adicionar
 */
const addNewProductsJSON = (newProduct) => {
    let productos = getProductsJSON();

    // se obtiene la fecha de creacion del producto y se almacena en la variable today
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); 
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;  // formato YYYY-MM-DD
    newProduct.fecha_creacion = today;  


    // se crea un nuevo objeto con el listado de los productos y la adicion del nuevo producto
    let SKU = newProduct.sku;
    let newSKUProduct = {[SKU] : newProduct};
    const merge = Object.assign({},productos,newSKUProduct);

    // se actualiza productos.json por el nuevo listado
    updateProductsJSON(merge);
};

/**addNewOrdersJSON
 * esta funcion se encarga de adicionar una nueva orden al archivo ordenes.json.
 * @param {object} newOrder : orden nueva que se quiere adicionar
 */
const addNewOrdersJSON = (newOrder) => {
    let ordenes = getOrdersJSON();  // se obtiene el listado de ordenes actual de ordenes.json
    const merge = Object.assign({},ordenes,newOrder);   // se adiciona la nueva orden al objeto ordenes
    updateOrdersJSON(merge);  // se actualiza el archivo ordenes.js por el nuevo listado con la orden adicional
};

/**updateProductBySKU
 * esta funcion se encarga de actualizar los atributos de los productos registrados
 * @param {string} SKU : el SKU del producto que se desea actualizar
 * @param {object} newProperties : objeto cuyas propiedades contienen los atributos y los valores que se desean actualizar 
 */
const updateProductBySKU = (SKU, newProperties) => {
    let productos = getProductsJSON();  // se obtiene la lista de productos registrados
    let product = productos[SKU];  // se obtiene el producto con el SKU correspondiente
    let arraySKUProducts = Object.getOwnPropertyNames(product);  // se obtienen los atributos del producto

    // se valida que las nuevas propiedades coincidan con las propiedades que ya tiene el objeto. en dado caso que existan, se
    // actualizan
    for(let key of arraySKUProducts){
        if(newProperties.hasOwnProperty(key)){
            product[key] = newProperties[key];
        }
    }

    // se crea un nuevo objeto que contiene las propiedades actualizadas
    let newSKUProductProperties = {[SKU] : product};

    // se combina este nuevo objeto con la lista de productos existentes, lo que resulta en actualizar el producto que tiene 
    // el mismo SKU
    let newProductsJSON = Object.assign({},productos,newSKUProductProperties);

    // se actualiza el archiv productos.json con el nuevo listado
    updateProductsJSON(newProductsJSON);
};

/**deleteProductBySKU
 * esta funcion permite eliminar un producto dentro de productos.json, especificandose el SKU del producto
 * @param {string} SKU : SKU del producto que se desea eliminar
 */
const deleteProductBySKU = (SKU) => {
    let productos = getProductsJSON();  // se lee las lista de productos
    delete productos[SKU];   // se elimina el producto cuyo SKU coincida

    updateProductsJSON(productos); // se actualiza productos.json
};

/**getSKUProducts
 * esta funcion se encarga de retornar un array con la lista de los SKUs de los productos registrados en productos.json
 * @returns array: [SKU1, SKU2, SKU3, ...]
 */
const getSKUProducts = () => {
    let productos = getProductsJSON();
    const SKUs    = Object.getOwnPropertyNames(productos);

    return SKUs;
};


/**getPathsBySKU
 * esta funcion genera un array que contiene los SKU antecedidos de un slash (/) para poder fijar las rutas de direccionamiento
 * @returns array: lista de los SKUs con un slash / para poder generar las rutas hacia cada SKU [\SKU1, \SKU2, ...]
 */
const getPathsBySKU = () => {
    let SKUs = getSKUProducts();

    for(let index in SKUs){
        SKUs[index] = '/' + SKUs[index]; 
    }

    return SKUs;
};

/**getProductsBySKU
 * esta funcion permite obtener un objeto que contendra el producto especificado por el SKU que se ingresa como parametro
 * @param {string} SKU : SKU del producto que se desea obtener de productos.json
 * @returns object: producto de la lista con el SKU correspondiente
 */
const getProductsBySKU = (SKU) => {
    let productos = getProductsJSON();
    let product = productos[SKU];
    return product;
};

/**getProductsMobileBySKU 
 * esta funcion permite obtener un objeto que contendra el producto especificado por el SKU que se ingresa como parametro, en el ambito
 * de la aplicacion mobile
 * @param {string} SKU : SKU del producto que se desea obtener de productos.json
 * @returns object: producto de la lista con el SKU correspondiente
 */
const getProductsMobileBySKU = (SKU) => {
    // listado de atributos que se desean eliminar de los productos
    let propertiesToRemove = [
        "inventario",
        "fecha_creacion"
    ];
    // eliminacion de los atributos no deseados
    let productos = getProductsMobile(false, propertiesToRemove);
    
    // extraccion del producto por SKU
    let product = productos[SKU];

    return product; // retorno del objeto
};

/**removeExtension
 * remueve la extension del nombre de archivo
 * @param {string} fileName 
 * @returns string
 */
const removeExtension = (fileName) => {
    return fileName.split('.').shift();
};

/**getSKUFromReq
 * obtiene el SKU de la solicitud HTTP con base a la URL que se hizo para la consulta del recurso
 * @param {string} REQ_URI 
 * @returns string
 */
const getSKUFromReq = (REQ_URI) => {
    let SKU = REQ_URI.split('/').pop();
    return SKU;
};

/**purchaseSummary
 * se obtiene una lista con el resumen de la compra que se va a realizar. se extraen los productos especificados en el array de compras
 * para posteriormente ser devueltos en un objeto con toda la informacion de la compra.
 * @param {boolean} isRemoveNoStock : true; remueve los productos que tienen inventario = 0. false; mantiene todos los productos.
 * @param {array} compras : array de compras [SKU1, SKU2, ...]
 * @param {array} propertiesToRemove : conjunto de propiedades que se quieren eliminar de los productos
 * @returns object
 */
const purchaseSummary = (isRemoveNoStock, compras, propertiesToRemove) => {
    let productos = getProductsJSON();
    let removedSKUs = compras;
    var summary = {};
    var total = 0;

    if(isRemoveNoStock){
        for(let key of compras){
            if(productos[key].inventario == 0){
                delete productos[key];
                let propIndex = arraySKUProducts.indexOf(key);
                removedSKUs.splice(propIndex);
            }
        }
    }

    for(let key of removedSKUs){
        let precio    = productos[key].precio;
        let iva       = productos[key].iva;
        let descuento = productos[key].descuento;
        let precioFinal = precio - (precio * descuento) + (precio * iva);
    
        total = total + precioFinal;

        productos[key].precio_final = precioFinal;
        
        

        for(let removeProps of propertiesToRemove){
            delete productos[key][removeProps];
        }

        let auxObj = {[key] : productos[key]};
         
        summary = Object.assign({},summary,auxObj);
    }

    summary.total = total;

    return summary;
};

/**newOrder
 * esta funcion se encarga de generar la orden que se guardara y adicionara en el archivo ordenes.js.
 * @param {Object} buyInfo : informacion de la compra que en sus atributos guarda los valores de productos comprados, nombre y apellido
 * del titular
 */
const newOrder = (buyInfo) => {
    let ordenes    = getOrdersJSON();
    let productos  = getProductsJSON();
    const SKUs     = buyInfo.productos;
    const nombre   = buyInfo.nombre;
    const apellido = buyInfo.apellido;
    let newOrder   = {};
    var total      = 0;

    for(let product of SKUs){
        let productBySKU = getProductsBySKU(product);
        let precio       = productBySKU.precio;
        let descuento    = productBySKU.descuento;
        let iva          = productBySKU.iva;
        
        let precio_final = precio - (precio * descuento) + (precio * iva);

        total = total + precio_final;
    };

    let id = Object.keys(ordenes).length + 1;

    newOrder = {
        [id] : {
            "id"        : id,
            "nombre"    : nombre,
            "apellido"  : apellido,
            "total"     : total,
            "productos" : SKUs,
        }
    };

    addNewOrdersJSON(newOrder);
};


/**
 * Se exportan todas las funciones de este modulo para poder ser utilizadas en el resto de scripts.
 */
module.exports = {
    getProductsJSON, 
    addNewProductsJSON, 
    removeExtension, 
    getSKUProducts, 
    getPathsBySKU, 
    getSKUFromReq, 
    getProductsBySKU,
    updateProductBySKU,
    deleteProductBySKU,
    getOrdersJSON,
    getProductsMobile,
    getProductsMobileBySKU,
    purchaseSummary,
    newOrder,
    updateOrdersJSON,
    addNewOrdersJSON,
    getOrders
};