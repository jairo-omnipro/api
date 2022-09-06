# api

INSTRUCCIONES PARA UTILIZAR LA API

REQUISITOS:

- Tener instalado Node.js
- Tener instalado y configurado Git, y contar con una cuenta en Github

PROCEDIMIENTO:

- Ubiquese en una carpeta dentro de su sistema
- Abra una terminal de comandos (CMD)
- Ejecute el comando git clone https://github.com/jairo-omnipro/api/network para adicionar el repositorio remoto a su sistema
- Ubiquese con la terminal de comandos sobre el directorio creado por el anterior comando
- En la misma terminal, ejecute el comando npm init
- Oprima la tecla enter repetidas veces hasta que llegue al mensaje "is this OK? (yes)"
- Escriba en la terminal la palabra "yes" y oprima ENTER. Espere a que cargue servicio de node.
- Una vez que finalice, verifique que se haya creado un archivo con el nombre package.json. Si es asi, prosiga. En caso contrario, repita el procedimiento desde el inicio nuevamente.
- Ejecute el comando npm install express --save
- Al terminar, verifique que se haya instalado correctamente el modulo, y que se haya generado un archivo package-lock.json.
- Luego, abra el archivo package.json.
- Ubiquese en el atributo "scripts"
- A continuacion, edite el archivo para agregar un nuevo valor a "scripts" como sigue:

{
    "scripts" : {
        "start" : "node server.js",    // INSERTE ESTA LINEA 
        // AQUI SIGUEN OTROS ATRIBUTOS (IGNORE)
    }
}

- Por ultimo, ejecute el comando npm start para empezar a correr el servidor Node.js
- En la terminal del Visual Studio se podra observar un mensaje que notifica que el servidor esta ON.

RAMAS DE GITHUB

- main: Rama principal donde reside la API-REST completa
- comprar-mobile: Rama donde se maneja la solicitud POST hacia /comprar
- data: Rama donde se maneja la subida de los archivos .json en el directorio admin/data
- delete-product-web: Rama donde se maneja la solicitud DELETE hacia /admin/producto/{sku}
- get-product-mobile: Rama donde se maneja la solicitud GET hacia /producto
- get-product-sku-mobile: Rama donde se maneja la solicitud GET hacia /producto/{sku}
- get-product-sku-web: Rama donde se maneja la solicitud GET hacia admin/producto/{sku}
- get-product-web: Rama donde se maneja la solicitud GET hacia admin/producto
- lib: Rama donde se maneja el script lib.js en directorio admin/lib
- ordenes-web: Rama donde se maneja la solicitud POST hacia admin/ordenes
- post-product-web: Rama donde se maneja la solicitud POST hacia admin/producto
- put-product-web: Rama donde se maneja la solicitud PUT hacia admin/producto/{sku}
- resume-mobile: Rama donde se maneja la solicitud POST hacia /resumen
- web-index-routing: Rama donde se maneja el enrutamiento dinamico de la API WEB en index.js dentro de /admin/routers
- mobile-index-routing: Rama donde se maneja el enrutamiento dinamico de la API MOBILE en index.js dentro de /mobile/routers
