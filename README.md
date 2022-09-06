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
