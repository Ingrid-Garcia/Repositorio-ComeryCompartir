/*
  Lógica de la mayoría de los archivos html en la página para que sea responsiva, igualmente, validación de registro, recuperación de id y 
  restablecimiento de contraseña, y registro de comensal.
*/

var modal = document.getElementById("id01");
const userButton1 = document.getElementById("user-button-1");
const userButton2 = document.getElementById("user-button-2");
const userButton3 = document.getElementById("user-button-3");

let isHighlighted = false;
let highlightedButton = null;
let apiEndpoint = null;

document.addEventListener("DOMContentLoaded", () => {
  miCuentaLink = document.getElementById("miCuentaLink");
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const accountLoggedIn = sessionStorage.getItem("account-selected");

  if (isLoggedIn === "true" && accountLoggedIn === "cuentac.html") {
    miCuentaLink.href = "cuentac.html";
  } else if (isLoggedIn === "true" && accountLoggedIn === "cuentar.html") {
    miCuentaLink.href = "cuentar.html";
  } else if (isLoggedIn === "true" && accountLoggedIn === "cuentadmin.html") {
    miCuentaLink.href = "cuentadmin.html";
  }
});

function onClick(button) {
  if (highlightedButton && highlightedButton !== button) {
    highlightedButton.classList.remove("highlighted");
    highlightedButton = null;
  }

  button.classList.toggle("highlighted");

  if (button.classList.contains("highlighted")) {
    highlightedButton = button;

    if (button === userButton1) {
      apiEndpoint = "/login";
    } else if (button === userButton2) {
      apiEndpoint = "/loginres";
    } else if (button === userButton3) {
      apiEndpoint = "/loginadmin";
    }
  } else {
    highlightedButton = null;
    apiEndpoint = null;
  }
}

userButton1.addEventListener("click", function () {
  onClick(userButton1);
});

userButton2.addEventListener("click", function () {
  onClick(userButton2);
});

userButton3.addEventListener("click", function () {
  onClick(userButton3);
});

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

const iniciarSesionButton = document.querySelector("#iniciarSesionButton");

iniciarSesionButton.addEventListener("click", function () {
  const id = document.getElementById("id").value;
  const contraseña = document.getElementById("contraseña").value;

  const idError = document.getElementById("idError");
  const contraseñaError = document.getElementById("contraseñaError");

  cuentaError.textContent = "";
  idError.textContent = "";
  contraseñaError.textContent = "";

  if (!apiEndpoint) {
    cuentaError.textContent = "Por favor selecciona tu tipo de cuenta.";
    return;
  }

  if (!id) {
    idError.textContent = "Por favor ingresa tu usuario.";
    return;
  }

  if (!contraseña) {
    contraseñaError.textContent = "Por favor ingresa tu contraseña.";
    return;
  }

  login(apiEndpoint);
});

async function login(apiEndpoint) {
  const id = document.getElementById("id").value;
  const contraseña = document.getElementById("contraseña").value;

  const requestBody = {
    id: id,
    pass: contraseña,
  };

  const apiUrl = "http://54.197.177.119:8080" + apiEndpoint;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (response.status === 200) {
      const data = await response.json();
      sessionStorage.setItem("nombre-comensal", data.nombre);
      sessionStorage.setItem("id-usuario", data.id);

      alert("Login exitoso");
      location.assign(
        apiEndpoint === "/login"
          ? "cuentac.html"
          : apiEndpoint === "/loginres"
          ? "cuentar.html"
          : "cuentadmin.html"
      );
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem(
        "account-selected",
        apiEndpoint === "/login"
          ? "cuentac.html"
          : apiEndpoint === "/loginres"
          ? "cuentar.html"
          : "cuentadmin.html"
      );
    } else {
      alert("Login falló, id o contraseña incorrectos.");
    }
  } catch (error) {
    console.error("Error durante el login:", error);
  }
}

function registerUser(event) {
  event.preventDefault();

  const curp = document.getElementById("curp").value;
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const contraseña = document.getElementById("contraseña").value;
  const fechaNacimiento = document.getElementById("fecha-nacimiento").value;
  const sexo = document.getElementById("sexo").value;

  const requestBody = {
    curp: curp,
    nombre: nombre,
    apellido: apellido,
    fecha: fechaNacimiento,
    genero: sexo,
    pass: contraseña,
  };

  if (
    !curp ||
    !nombre ||
    !apellido ||
    !contraseña ||
    !sexo ||
    !fechaNacimiento
  ) {
    alert("Por favor llena todos los campos requeridos.");
    return;
  }

  if (curp.length !== 18) {
    alert("El CURP es incorrecto, por favor ingrésalo de nuevo.");
    return;
  }

  if (
    sexo.toLowerCase() !== "femenino" &&
    sexo.toLowerCase() !== "masculino" &&
    sexo.toLowerCase() !== "neutral"
  ) {
    alert(
      "El género solo puede ser Femenino, Masculino o Neutral. Por favor, ingrésalo de nuevo."
    );
    return;
  }

  const apiUrl = "http://54.197.177.119:8080/comensal";

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.mensaje && data.mensaje === "Este CURP ya existe") {
        alert("Este CURP ya existe.");
      } else {
        alert("Te has registrado exitosamente, tu ID es: " + data.IDComensal);
        console.log("Registration successful:", data);
      }
    })
    .catch((error) => {
      console.error("Error registering user:", error);
    });
}

function openModalRegistro(id, claimed) {
  const modal = document.getElementById("idModal");
  const generatedIdElement = document.getElementById("generatedId");

  generatedIdElement.textContent = id;

  modal.style.display = "block";
}

function openModalRecupID(id) {
  const modal = document.getElementById("idModal");
  const generatedIdElement = document.getElementById("generatedId");

  generatedIdElement.textContent = id;

  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("idModal");
  modal.style.display = "none";
}

function handleSubmit(event) {
  event.preventDefault();

  const curp = document.getElementById("curp").value;
  const password = document.getElementById("contraseña").value;

  const requestBody = {
    curp: curp,
  };

  const requestBody2 = {
    curp: curp,
    newPass: password,
  };

  const apiUrlID = "http://54.197.177.119:8080/idrec";
  const apiUrlNPass = "http://54.197.177.119:8080/cont";

  if (!curp) {
    alert("Por favor llena todos los campos requeridos.");
    return;
  }

  if (curp.length !== 18) {
    alert("El CURP es incorrecto, por favor ingrésalo de nuevo.");
    return;
  }

  if (curp) {
    fetch(apiUrlID, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.mensaje && data.mensaje === "No te has registrado") {
          alert("Este CURP no está registrado, inténtalo de nuevo.");
        } else {
          alert("Recuperación exitosa, tu ID es: " + data.ID);
        }
      })
      .catch((error) => console.error("Error:", error));
  }
  if (password) {
    fetch(apiUrlNPass, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ CURP: curp, newPass: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Contraseña restablecida");
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));
  }
}
