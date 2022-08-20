const loginCont = document.getElementById("login-container");

let htmlContentToAppend = ""

htmlContentToAppend += `
        <main class="signin">
            <form class="form" id="form">
                <img class="signin" src="img/login.png">
                <h1 class="form">Inicio de sesión</h1>
                <div class="formCont">
                    <label for="email">Email</label> 
                    <input class="email-control" id="email" type="email" placeholder="Email">
                    <div id="error1">
                    </div>
                    <label for="password">Contraseña</label>
                    <input type="password" id="password" class="pass-control" placeholder="Contraseña">
                    <div id="error2">
                    </div>
                    <button type="submit" id="regBtn">Ingresar</button>
                </div>
            </form>
        </main>
    `

loginCont.innerHTML = htmlContentToAppend;

let email = document.getElementById("email");
let password = document.getElementById("password");
let error1 = document.getElementById("error1");
let error2 = document.getElementById("error2");

sessionStorage.setItem("email", email);

function enviarFormulario(evento) {
    evento.preventDefault();

    let emailvalue = email.value;
    let passvalue = password.value;

    if (emailvalue.length === 0) {
        error1.innerHTML = "Ingresa tu email";
        email.style.borderColor = "red";
    }
    if (passvalue.length === 0) {
        error2.innerHTML = "Ingresa tu contraseña";
        password.style.borderColor = "red";
    }
    
    if ((emailvalue.length !== 0) && (passvalue.length !== 0)){
        window.location.href = "index.html";
    }
} 

document.addEventListener("DOMContentLoaded", function (){
    document.getElementById("form").addEventListener('submit', enviarFormulario);
})