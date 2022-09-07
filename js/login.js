const user = document.querySelector("#user");
const password = document.querySelector("#password");
const formLogin = document.querySelector("#form-login");
const login = document.querySelector("#login");
const registerUser = document.querySelector("#register");

let users = JSON.parse(localStorage.getItem("users")) || [];

// Iniciar Sesión
function logIn() {
    let usuarioIngresado = users.find(user1 => user1.username === user.value);

    if (usuarioIngresado == undefined) {
        Swal.fire(
            "El usuario no existe",
            "Por favor registrese",
            "error"
        )
    }
    else if (usuarioIngresado.password !== password.value) {
        Swal.fire(
            "Contraseña incorrecta",
            "",
            "error"
        )
    }
    else {
        window.location.href = "./secciones/juego.html"
    }
}

login.onclick = (e) => {
    e.preventDefault();
    logIn();
}

// Registrar Usuario
class NewUser {
    constructor(email, username, password) {
        this.email = email,
        this.username = username,
        this.password = password
    }
}

const divRegister = document.querySelector("#div-register");

function register() {
    const nuevoUsuario = new NewUser(inputEmail.value, inputUser.value, inputPassword.value);
    users.push(nuevoUsuario);
}

registerUser.onclick = (e) => {
    e.preventDefault();
    divRegister.style.display = "flex";
    const formRegister = document.querySelector("#form-register");
    const inputEmail = document.querySelector("#inputEmail");
    const inputUser = document.querySelector("#inputUser");
    const inputPassword = document.querySelector("#inputPassword");
    const cerrarRegister = document.querySelector("#closeRegister");

    formRegister.onsubmit = (e) => {
        e.preventDefault();
        let mailExiste = users.some((user1) => user1.email === inputEmail.value);
        let usernameExiste = users.some((user1) => user1.username === inputUser.value);

        function nuevoUsuario(){
            const newUser = new NewUser(inputEmail.value, inputUser.value, inputPassword.value);
            users.push(newUser);
            divRegister.style.display ="none";
            Swal.fire("Usuario Registrado", "", "success");
            subirAlLS()
        }

        (mailExiste || usernameExiste) ? Swal.fire("Este usuario ya existe", "", "error") : nuevoUsuario()
    }

    cerrarRegister.onclick = () => {
        divRegister.style.display = "none";
    }
}

// Subir al LS
function subirAlLS() {
    localStorage.setItem("users", JSON.stringify(users))
}

// Recuperar Contraseña
const botonRecuperarPswd = document.querySelector("#recuperar-pswd");
const divNewPswd = document.querySelector("#new-pswd");
const recuperarEmail = document.querySelector("#recuperarEmail");
const recuperarPswd = document.querySelector("#recuperarPassword");
const confirmarPswd = document.querySelector("#confirmPassword");
const cambiarPswd = document.querySelector("#cambiar-pswd");
const cerrarCambiarPswd = document.querySelector("#closeCambiarPswd");

function mostrarPassword() {
    let mailRegistrado = users.find(user1 => user1.email === recuperarEmail.value);

    if (mailRegistrado !== undefined) {
        if (recuperarPswd.value === confirmarPswd.value) {
            mailRegistrado.password = recuperarPswd.value;
            Swal.fire("Contraseña cambiada", "", "success");
            subirAlLS();
        }
        else {
            Swal.fire("La contraseñas no coinciden","", "error");
        }
    }
    else {
        Swal.fire("No se encontro el usuario", "", "error");
    }

}

botonRecuperarPswd.onclick = (e) => {
    e.preventDefault();
    divNewPswd.style.display = "flex";
    cambiarPswd.onclick = (e) => {
        e.preventDefault();
        mostrarPassword();
        divNewPswd.style.display = "none"
    }
    cerrarCambiarPswd.onclick = () => {
        divNewPswd.style.display = "none";
    }
}