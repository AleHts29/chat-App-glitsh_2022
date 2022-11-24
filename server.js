const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer)

// configuramos el middleware para indicar que usamos archivos estaticos
app.use(express.static('./public'))

// adicional si no les toma la configuracion de la ruta statica, podemos forzarlo con:
// app.get('/', (req, res) => {
//     res.sendFile('index.html', { root: __dirname })
// })

const PORT = process.env.PORT || 8070
const messages = [
    { author: 'Alejandro', text: 'Hola!!, que tal' },
    { author: 'Mirko', text: 'Hola!!' },
    { author: 'Matias', text: 'Hola, todo bien!!' }
]

// configuramos comunicacion del lado del server
io.on('connection', socket => {
    console.log('Nuevo cliente conectado');

    // Vamos a enviar el historial del chat cuando un nuevo cliente se conecta
    socket.emit('messages', messages)

    // escuchamos al cliente
    socket.on('new-message', data => {
        messages.push(data)
        // re enviamos por medio de broadcast los mensajes a todos los clientes que esten conectados en ese momento.
        io.sockets.emit('messages', messages)
    })
})

httpServer.listen(PORT, () => {
    console.log('server run on port: ' + PORT);
})


// Comandos glitsh (https://glitch.com/create-project) para cuando se sube un proyecto mediante un .zip
// 01_ clic en Asseets --> arrastramos el .zip al dashboard

// 02_ clic en el archivo que subimos y compiamos la url --> ejemplo: https://cdn.glitch.global/8e6b1637-ca7b-46e3-81bf-73dd40d52d0d/Archive.zip?v=1669260878670

// 03_ en la terminal del glitsh ponemos --> wget -O 'NOMBRE DEL ARCHIVO.zip' + 'URL' 
// el anterior comando lo que hace es copiar un recurso y lo monta al server (un deploy)

// 04_ descomprimimos el archivo con el comando y reemplazamos los archivos que nos indique la consola --> unzip 'NOMBRE DEL ARCHIVO.zip' -d .

// refresh