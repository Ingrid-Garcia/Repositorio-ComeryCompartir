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

  if (isLoggedIn === "true" || accountLoggedIn === "cuentac.html") {
    miCuentaLink.href = "cuentac.html";
  } else if (isLoggedIn === "true" || accountLoggedIn === "cuentar.html") {
    miCuentaLink.href = "cuentar.html";
  } else if (isLoggedIn === "true" || accountLoggedIn === "cuentadmin.html") {
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

    if (response.status === 200 && apiEndpoint == "/login") {
      alert("Login exitoso");
      location.assign("cuentac.html");
      miCuentaLink.href = "cuentac.html";
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("account-selected", "cuentac.html");
    } else if (response.status == 200 && apiEndpoint == "/loginres") {
      alert("Login exitoso");
      location.assign("cuentar.html");
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("account-selected", "cuentar.html");
    } else if (response.status == 200 && apiEndpoint == "/loginadmin") {
      alert("Login exitoso");
      location.assign("cuentadmin.html");
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("account-selected", "cuentadmin.html");
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
      console.log("Registration successful:", data);
      openModal(data.IDComensal);
    })
    .catch((error) => {
      console.error("Error registering user:", error);
    });
}

function openModal(id) {
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
        console.log("Recuperación de ID exitosa", data);
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
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));
  }
}

function handleAfeccion(event) {
  event.preventDefault();

  const afeccionMapping = {
    1: "Artritis",
    2: "Ceguera",
    3: "Diabetes",
    4: "Sordera",
    5: "Uso de silla de ruedas",
    6: "Embarazo",
    7: "Lactancia",
    8: "Tercera edad",
    9: "Hipertensión",
    10: "Uso de apoyo para movilidad",
    11: "Protesis",
    12: "Violencia",
    13: "Desempleo",
    14: "Inmigrante",
    15: "Situación de calle",
    16: "Enfermedad cardiovascular",
    17: "Epilepsia",
  };

  const id = document.getElementById("id").value;
  const afeccionId = parseInt(document.getElementById("nuevaAfeccion").value);

  const afeccionText = afeccionMapping[afeccionId] || "";

  const requestBody = {
    idCom: id,
    idAf: afeccionId,
  };

  const apiUrl = "http://54.197.177.119:8080/agregarAf";

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      updateAfeccionesInTable([afeccionText]);
    })
    .catch((error) => console.error("Error:", error));
}

function updateAfeccionesInTable(afeccionText) {
  const afeccionesDiv = document.getElementById("afecciones-comensal");
  const currentAfecciones = afeccionesDiv.innerText.split(": ")[1].trim();

  if (currentAfecciones === '"Ninguna"') {
    afeccionesDiv.innerText = "Afecciones: " + afeccionText;
  } else {
    afeccionesDiv.innerText =
      "Afecciones: " + currentAfecciones + ", " + afeccionText;
  }

  localStorage.setItem("afecciones", updatedAfecciones);
}

document.addEventListener("DOMContentLoaded", function () {
  const afeccionesDiv = document.getElementById("afecciones-comensal");
  const storedAfecciones = localStorage.getItem("afecciones");

  if (storedAfecciones) {
    afeccionesDiv.innerText = "Afecciones: " + storedAfecciones;
  } else {
    afeccionesDiv.innerText = "Afecciones: Ninguna";
  }
});

function handleAvisos(event) {
  event.preventDefault();

  const idComd = document.getElementById("idComd").value;
  const aviso = document.getElementById("aviso").value;

  const requestBody = {
    idCom: idComd,
    aviso: aviso,
  };

  const apiUrl = "http://54.197.177.119:8080/avisos";

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.error("Error:", error));
}

function registerRes(event) {
  event.preventDefault();

  const curp = document.getElementById("curp").value;
  const nombre = document.getElementById("nombre").value;
  const contraseña = document.getElementById("contraseña").value;
  const estado = document.getElementById("estado").value;

  const requestBody = {
    curp: curp,
    nombre: nombre,
    pass: contraseña,
    estado: estado,
  };

  const apiUrl = "http://54.197.177.119:8080/responsable";

  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.error("Error:", error));
}

function handleEstadoCom(event) {
  event.preventDefault();

  const idComedor = document.getElementById("idComedor").value;
  const estado = document.getElementById("estado").value;

  const requestBody = {
    idComedor: idComedor,
    estado: estado,
  };

  const apiUrl = "http://54.197.177.119:8080/comedorest";

  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.error("Error:", error));
}

function toggleForms() {
  var comensalForms = document
    .getElementById("account-form")
    .getElementsByTagName("form");

  for (var i = 0; i < comensalForms.length; i++) {
    var form = comensalForms[i];
    form.style.display =
      form.style.display === "none" || form.style.display === ""
        ? "block"
        : "none";
  }
}
