const divPreguntas = document.querySelector("#divPreguntas");
let respuestasCorrectas = [];

function mostrarPreguntas() {
    preguntasDeportes.forEach((pregunta) => {
        divPreguntas.innerHTML += `
            <div>
                <h3>Pregunta ${pregunta.id} de ${preguntasDeportes.length}</h3>
                <h3>${pregunta.pregunta}</h3>
                <button class="botonOpcion" id="${pregunta.id}">${pregunta.opciones[0]}</button>
                <button class="botonOpcion" id="${pregunta.id}">${pregunta.opciones[1]}</button>
                <button class="botonOpcion" id="${pregunta.id}">${pregunta.opciones[2]}</button>
                <button class="botonOpcion" id="${pregunta.id}">${pregunta.opciones[3]}</button>
            </div>
        `

        let botonOpcion = document.getElementsByClassName("botonOpcion");

        for (boton of botonOpcion) {
            boton.onclick = (e) => {
                let opcion = e.target;
                let respuesta = opcion.innerText;
                let preguntaId = opcion.getAttribute("id");

                let preguntaActual = preguntasDeportes.find(pregunta => pregunta.id === Number(preguntaId));       

                respuesta === preguntaActual.correcta ? (respuestasCorrectas.push(respuesta) && Toastify({
                    text: "Correcto!",
                    duration: 800,
                    style: {
                        background: "#2A9D8F",
                        display: "flex",
                        padding: "10px",
                        width: "20%",
                        justifyContent: "center"
                    }
                }).showToast()) : Toastify({
                    text: "Incorrecto :(",
                    duration: 800,
                    style: {
                        background: "#EE2322",
                        display: "flex",
                        padding: "10px",
                        width: "20%",
                        justifyContent: "center"  
                    }
                }).showToast();

                scroll()
            }
        }
    })
}

mostrarPreguntas()

function scroll() {
    divPreguntas.style.scrollSnapType = "y mandatory";
    divPreguntas.style.scroolSnapType = "start";
    divPreguntas.scrollBy(0, 500)
}

const verResultado = document.getElementById("resultado");

verResultado.onclick = () => {
    let mensaje;
    if (respuestasCorrectas.length < 10) {
        mensaje = "Muy poco deporte eh..."
    }
    else if (respuestasCorrectas.length >= 10 && respuestasCorrectas.length < 20) {
        mensaje = "No está mal..."
    }
    else if (respuestasCorrectas.length >= 20 && respuestasCorrectas.length < 30) {
        mensaje = "Muy bien!"
    }
    else {
        mensaje = "Sos crack!!"
    }

    Swal.fire(
        'Tuviste ' + respuestasCorrectas.length + " respuestas correctas.",
        mensaje,
        'success'
    )
}

const showCounter = document.getElementById("counter");

function updateCounter() {
    let counter = 180;
    const i = setInterval(() => {
        showCounter.innerText = counter;
        counter--;
        if (counter === -1) {
            clearInterval(i);
            showCounter.innerText = counter;
            Swal.fire({
                title: "Terminó el tiempo",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Volver a empezar',
                denyButtonText: `Salir`,
                allowOutsideClick: false,
                allowEscapeKey: false,
            }).then((result) => {
                if(result.isConfirmed){
                    window.location.reload()
                }
                else if (result.isDenied) {
                    window.location.href = "../index.html"
                }
            })
        }
    }, 1000);
}

updateCounter();

const salir = document.getElementById("salir");

salir.onclick = () => {
    window.location.href = "../index.html"
};