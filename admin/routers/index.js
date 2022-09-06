const express = require('express');  // importacion del modulo Express js

const path = require('path');        // importacion del modulo PATH para el manejo de las direcciones de los directorios   

const fs = require('fs');            // importacion del modulo File System (fs) para la lectura y escritura de archivos

// importacion de las funciones del modulo lib
const lib = require(path.join(__dirname, '..', '\\lib\\lib'));

const INDEX_DIRNAME = __dirname;     // ruta del directorio donde se encuentre el archivo index.js

const router = express.Router();     // declaracion del objeto tipo router de Express, que se utiliza para enrutar las URI hacia
                                     // las respectivas funciones callback dependiendo del tipo de solicitud

/** automaticRouting
 *  esta funcion se encarga de realizar el enrutamiento dinamico de las URI. Crea una ruta por cada archivo que se encuentre en la carpeta /routers,
 *  excepto para index.js. La ruta se crea de tal manera que el resultado sea http://localhost:3000/admin/ordenes, en el caso de ordenes.js, y
 *  asi sucesivamente.
 * 
 * Nota: Si se agrega un archivo en esta carpeta /routers, debe tener en cuenta que se creara una ruta, por lo que debe asegurarse de que en
 * ese script se exporte un enrutador tipo express para que no se genere un error.
 * 
 * @param {string} PATH : directorio donde se encuentra index.js
 */
const automaticRouting = (PATH) => {
    let fileNames = fs.readdirSync(PATH);   // se leen los archivos que estan en la carpeta admin/routers, y se listan en un array

    /**
     * se filtran los archivos leidos en la carpeta, para omitir la extension de los archivos .js y el archivo index.js.
     * se generan al mismo tiempo las rutas dinamicas para cada archivo de ruta.
     */
    fileNames = fileNames.filter(file => {  // file itera el array fileNames que contiene los nombres de los archivos
        
        const name = lib.removeExtension(file);  // se remueve la extension .js del nombre de archivo
        const nameRouter = require(`./${file}`); // se importa el enrutador que se exporta en el correspondiente js de cada archivo en /routers

        if(name !== 'index'){   // se evita crear una ruta para index.js
            router.use(`/${name}`, nameRouter);  // se crean las rutas dinamicas con el metodo .use, el cual creara la ruta en
                                                 // http://localhost:3000/admin/{nombre del archivo sin extension}
        }
    });
};

automaticRouting(INDEX_DIRNAME);  // se ejecuta el enrutamiento dinamico

module.exports = router;          // se exporta el enrutador de index.js para ser usado en server.js