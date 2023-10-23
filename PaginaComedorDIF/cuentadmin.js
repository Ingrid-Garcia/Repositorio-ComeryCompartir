/*
  Llamadas a la API necesarias para que se despliegue la información del administrador y acceda a sus opciones de perfil y el visualizador de datos. 
  Lógica general de html de la cuenta.
*/

const nombreComensalElement = document.getElementById("nombre-comensal");
const idUsuarioElement = document.getElementById("id-usuario");

if (nombreComensalElement && idUsuarioElement) {
  const nombreComensal = sessionStorage.getItem("nombre-comensal");
  const idUsuario = sessionStorage.getItem("id-usuario");

  if (nombreComensal && idUsuario) {
    nombreComensalElement.innerText = nombreComensal;
    idUsuarioElement.innerText = "ID: " + idUsuario;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const cerrarSesionLink = document.getElementById("cerrar-sesion");

  if (cerrarSesionLink) {
    cerrarSesionLink.addEventListener("click", function (event) {
      event.preventDefault();

      sessionStorage.removeItem("nombre-comensal");
      sessionStorage.removeItem("id-usuario");
      sessionStorage.removeItem("isLoggedIn");
      sessionStorage.removeItem("account-selected");

      location.assign("index.html");
    });
  }
});

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

function registerRes(event) {
  event.preventDefault();

  const curp = document.getElementById("curp").value;
  const nombre = document.getElementById("nombre").value;
  const contraseña = document.getElementById("contraseña").value;
  const estadoRES = document.getElementById("estadoRES").value;

  const requestBody = {
    curp: curp,
    nombre: nombre,
    pass: contraseña,
    estado: estadoRES,
  };

  if (!curp || !nombre || !contraseña || !estadoRES) {
    alert("Por favor llena todos los campos requeridos.");
    return;
  }

  if (curp.length !== 18) {
    alert("El CURP es incorrecto, por favor ingrésalo de nuevo.");
    return;
  }

  if (
    estadoRES.toLowerCase() !== "activo" &&
    estadoRES.toLowerCase() !== "inactivo" &&
    estadoRES.toLowerCase() !== "activa" &&
    estadoRES.toLowerCase() !== "inactiva"
  ) {
    alert(
      "El estado sólo puede ser Activo(a) o Inactivo(a), inténtalo de nuevo."
    );
    return;
  }

  const apiUrl = "http://54.197.177.119:8080/responsable";

  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.mensaje && data.mensaje === "Este responsable ya existe") {
        alert("Este responsable ya existe.");
      } else {
        alert(
          "Has registrado al responsable exitosamente, su ID es: " +
            data.IDResponsable
        );
        console.log("Registration successful:", data);
      }
    })
    .catch((error) => console.error("Error:", error));
}

function isNumeric(value) {
  return !isNaN(value) && isFinite(value) && Number.isInteger(Number(value));
}

function handleAvisos(event) {
  event.preventDefault();

  const idComd = document.getElementById("idComd").value;
  const aviso = document.getElementById("aviso").value;

  const requestBody = {
    idCom: idComd,
    aviso: aviso,
  };

  if (!idComd || !aviso) {
    alert("Por favor llena todos los campos requeridos.");
    return;
  }

  if (!isNumeric(idComd) || idComd < 1 || idComd > 42) {
    alert("Este comedor no existe.");
    return;
  }

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
      alert("Aviso mandado exitosamente.");
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

  if (!idComedor || !estado) {
    alert("Por favor llena todos los campos requeridos.");
    return;
  }

  if (!isNumeric(idComedor)) {
    alert("El ID debe ser un número.");
    return;
  }

  if (
    estado.toLowerCase() !== "abierto" &&
    estado.toLowerCase() !== "cerrado"
  ) {
    alert("El estado sólo puede ser Abierto o Cerrado, inténtalo de nuevo.");
    return;
  }

  const apiUrl = "http://54.197.177.119:8080/comedorest";

  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.mensaje && data.mensaje === "Este comedor no existe") {
        alert("Este comedor no existe, inténtalo de nuevo.");
      } else {
        alert("El estado del comedor ha sido actualizado corrrectamente.");
        console.log(data);
      }
    })
    .catch((error) => console.error("Error:", error));
}

function handleEstadoRes(event) {
  event.preventDefault();

  const idRes = document.getElementById("idRes").value;
  const estado = document.getElementById("estado-res").value;

  const requestBody = {
    idRes: idRes,
    estado: estado,
  };

  if (!idRes || !estado) {
    alert("Por favor llena todos los campos requeridos.");
    return;
  }

  if (!isNumeric(idRes)) {
    alert("El ID debe ser un número.");
    return;
  }

  if (
    estado.toLowerCase() !== "activo" &&
    estado.toLowerCase() !== "inactivo" &&
    estado.toLowerCase() !== "activa" &&
    estado.toLowerCase() !== "inactiva"
  ) {
    alert(
      "El estado sólo puede ser Activo(a) o Inactivo(a), inténtalo de nuevo."
    );
    return;
  }

  const apiUrl = "http://54.197.177.119:8080/estadores";

  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.mensaje && data.mensaje === "La responsable no existe") {
        alert("El ID de responsable no existe, inténtalo de nuevo.");
      } else {
        alert("El estado de responsable ha sido actualizado correctamente.");
        console.log(data);
      }
    })
    .catch((error) => console.error("Error:", error));
}
