const nombreComensalElement = document.getElementById("nombre-comensal");
const idUsuarioElement = document.getElementById("id-usuario");

if (nombreComensalElement && idUsuarioElement) {
  const nombreComensal = sessionStorage.getItem("nombre-comensal");
  const idUsuario = sessionStorage.getItem("id-usuario");

  if (nombreComensal && idUsuario) {
    nombreComensalElement.innerText = nombreComensal;
    idUsuarioElement.innerText = idUsuario;
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
      alert("Aviso mandado exitosamente.");
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
      alert("Responsable registrado, su ID es: " + data.IDResponsable);
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
      alert("El estado del comedor ha sido actualizado corrrectamente.");
      console.log(data);
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

  const apiUrl = "http://54.197.177.119:8080/estadores";

  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Estado de responsable actualizado exitosamente.");
      console.log(data);
    })
    .catch((error) => console.error("Error:", error));
}
