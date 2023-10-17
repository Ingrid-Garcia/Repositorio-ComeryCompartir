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
}
