// _01 Establecemos la comunicaicon del lado del cliente
const socket = io.connect()

// _03
function render(data) {
    const html = data.map(item => {
        return (`<div><strong> ${item.author}</strong>: <em>${item.text}</em></div>`)
    }).join(' ')
    // renderizamos la data en el div de la plantilla HTML
    document.getElementById('messages').innerHTML = html
}

function alertMsj(data) {
    // renderizamos la data en el div de la plantilla HTML
    document.getElementById('nameMsj').innerHTML = `
        <div class="toast align-items-center text-bg-primary border-0 fade show" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    <font style="vertical-align: inherit;">
                        <font style="vertical-align: inherit;" id="nameMsj">
                            Nuevo mensaje de:  ${data[data.length - 1].author}
                        </font>
                    </font>
                </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Cerca"></button>
            </div>
        </div>
    `
}

// _04 - funcion que se ejecuta cuando doy clic al boton enviar
function addMessage(e) {
    const authorName = document.getElementById('author').value
    const textMsn = document.getElementById('text').value

    if (authorName) {
        document.getElementById('author').disabled = true
    }

    const mensaje = {
        author: authorName,
        text: textMsn,
    }
    // enviamos la data al server
    socket.emit('new-message', mensaje)
    // limpiamos el campo del mensaje
    document.getElementById('text').value = ''
    // para que no haga un refresh la pagina cuando enviamos data del form
    return false;
}

// _02 Eventos para enviar(emit) y recibor(on) mensajes
socket.on('messages', data => {
    render(data)
    alertMsj(data)
})