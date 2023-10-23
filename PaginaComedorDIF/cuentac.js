/*
  Llamadas a la API necesarias para que se despliegue la información del comensal y acceda a sus opciones de perfil. Lógica general de html de la cuenta.
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

function isNumeric(value) {
  return !isNaN(value) && isFinite(value) && Number.isInteger(Number(value));
}

function handleAfeccion(event) {
  event.preventDefault();

  const id = document.getElementById("id").value;
  const nuevaAfeccion = document.getElementById("nuevaAfeccion").value;

  const apiUrl = "http://54.197.177.119:8080/agregarAf";

  const data = {
    idCom: id,
    idAf: nuevaAfeccion,
  };

  if (!id || !nuevaAfeccion) {
    alert("Por favor llena todos los campos requeridos.");
    return;
  }

  if (!isNumeric(nuevaAfeccion) || nuevaAfeccion < 1 || nuevaAfeccion > 17) {
    alert("Afección debe ser un número entre 1 y 17.");
    return;
  }

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.mensaje && data.mensaje === "Este comensal no existe") {
        alert("El ID no existe, inténtalo de nuevo.");
      } else {
        alert("Se ha registrado la afección correctamente.");
        console.log("Afección registered successfully:", data);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
