const cuerpo = document.querySelector("body");

//Modo oscuro
const modo = document.getElementById("modo");
modo.addEventListener("click", cambiarfondo);

function cambiarfondo() {
  cuerpo.classList.toggle("dark-mode");

  if (cuerpo.className.includes("dark-mode")) {
    localStorage.setItem("modo", "dark-mode");
  } else {
    localStorage.setItem("modo", "none");
  }
}

// funcion para que conserve el colo de fondo de la ultima vez que el usuario ingreso
function aplicarColorFondo(color) {
  cuerpo.classList.toggle(color);
}

window.onload = function () {
  const colorGuardado = localStorage.getItem("modo");
  if (colorGuardado) {
    aplicarColorFondo(colorGuardado);
  }
};

//Proceso de Login
class Usuario {
  constructor(nombre, userName, password, avatar) {
    this.nombre = nombre;
    this.userName = userName;
    this.password = password;
  }

  validarCredenciales(userName, password) {
    return this.userName === userName && this.password === password;
  }

  //sobrecarga de metodos
  validarCredenciales(userName) {
    return this.userName === userName;
  }
}

// Usuario de prueba
const usuarios = [new Usuario("Kevin Mosquera", "zhartil", "1234")];

//Login
const login = document.getElementById("login");

login.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("passwordL").value;

  if (!username || !password) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Por favor ingresa ambos campos",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    const usuario = usuarios.find((u) =>
      u.validarCredenciales(username, password)
    );

    if (usuario) {
      localStorage.setItem("sesionActiva", JSON.stringify(usuario));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `¡Bienvenido, ${usuario.nombre}!`,
        showConfirmButton: false,
        timer: 3000,
      });
      window.location.href = "productos.html";
    } else {
      Swal.fire("Error", "Usuario o Contraseña incorrecto", "error");
    }
  }
});

//Registrar nuevo usuario
const registrar = document.getElementById("signup");

// 1._ capturar los datos del formulario
registrar.addEventListener("submit", (evert) => {
  evert.preventDefault();

  const name = document.getElementById("name").value;
  const userName = document.getElementById("usernameR").value;
  const password = document.getElementById("passwordR").value;

  //Validamos que los campos esten completamente diligenciados
  if (!name || !userName || !password) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Por favor completar todos los campos",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    // validamos que el nuevo usuario no este registrado ya 
    const usuario = usuarios.find((u) => u.validarCredenciales(userName));
    // si  no esta registrado entonces lo agregamos al  array usuarios 
    if (!usuario) {
      localStorage.setItem("new user", JSON.stringify(userName));

      usuarios.push([new Usuario(`${name}`, `${userName}`, `${password}`)]);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `¡Bienvenido, ${name}!  su registro fue Exitoso!`,
        showConfirmButton: false,
        timer: 3000,
      });

      
    } else {
      Swal.fire("Error", "Usuario ya se encuentra registrado", "error");
    }


    
  }
});

// 2._ guardarlos en el localStorage
// 3._ recuperarlos del localStorage
// 4._ guardarlos en el array de usuarios

//Validar que los usuarios que se registren queden guardados en el array de usarios
// y validar que el  titulo quede  en la nueva pantalla al iniciar sesion correctamente

// Al enviar el formulario, guarda los datos en localStorage y muestra un mensaje de confirmación.
// login.addEventListener("submit" , (evento)=>{
//     evento.preventDefault();

//     const datosformL = {
//       email : document.getElementById('emailL').value,
//       contraseña : document.getElementById('passwordL').value
//     }

//      localStorage.setItem("datosForm", JSON.stringify(datosformL))

//      Swal.fire({
//       title: '¡Exito!',
//       text: 'Este el formulario fue enviado correctamente',
//       icon: 'success',
//       confirmButtonText: 'OK',
//       timer: 6000
//     });

//     form1.reset()
