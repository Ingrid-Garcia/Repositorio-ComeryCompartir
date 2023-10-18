// Retrieve the name and ID from sessionStorage and update the elements
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

function handleAfeccion(event) {
  event.preventDefault();

  const id = document.getElementById("id").value;
  const nuevaAfeccion = document.getElementById("nuevaAfeccion").value;

  const apiUrl = "http://54.197.177.119:8080/agregarAf";

  const data = {
    idCom: id,
    idAf: nuevaAfeccion,
  };

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
      alert("Se ha registrado la afección correctamente.");
      console.log("Afección registered successfully:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
