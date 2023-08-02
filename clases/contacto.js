class Contacto {
    constructor(id, nombre, apellido, email, telefono, mensaje,) {
        this.id = id;
        this.nombre = nombre.trim();
        this.apellido = apellido.trim();
        this.email = email.trim();
        this.telefono = telefono;
        this.mensaje = mensaje;
    }

    toString() {
        return this.nombre.toUpperCase();
    }
}

//array
let mensajeria = [];

function enviarMensaje() {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;
    const mensaje = document.getElementById("mensaje").value;

    let agregarMensaje = new Contacto(
        generarId(mensajeria),
        nombre,
        apellido,
        email,
        telefono,
        mensaje
    );

    //validamos los datos
    if (nombre.trim() === "") {
        return false;
    }
    if (apellido.trim() === "") {
        return false;
    }
    if (email.trim() === "") {
        return false;
    }
    if (telefono < 0) {
        return false;
    }
    if (mensaje === "") {
        return false;
    }

    console.log("Array del mensaje: ", agregarMensaje);
    mensajeria.push(agregarMensaje);
    return true;

}

//Generar un numero aleatorio
function generarId(collection = []) {
    let numAleatorio = Math.round(Math.random() * 1000);
    while (collection.some((e) => e.id === numAleatorio)) {
        console.log("se genera num aleatorio");
        numAleatorio = Math.round(Math.random() * 1000);
    }
    return numAleatorio;
}

//Se recupera formulario
const formMensaje = document.getElementById("formMensaje");

//Se captura el evento
formMensaje.addEventListener("submit", (event) => {
    event.preventDefault();

    let respuesta = enviarMensaje();
    if (respuesta) {
        console.log("Se envio el mensaje");
        const botonConfir = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success'
            },
            buttonsStyling: false
        })
        botonConfir.fire({
            title: '¿Seguro?',
            text: "¿Quiere enviar este mensaje?",
            icon: 'warning',
            confirmButtonText: 'Si, enviar!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                botonConfir.fire(
                    'Enviado!',
                    'Su mensaje fue enviado con éxito.',
                    'success'
                )
            }
        })
        borrarFormulario();
        return respuesta;
    }
});

function borrarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("email").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("mensaje").value = "";
}