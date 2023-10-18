// Retrieve the name and ID from sessionStorage and update the elements
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

function Ubicacion() {
  const comedor = 1;
  // const idComedor = document.getElementById();
  // const comedor = idComedor.value;

  const ubicacionComedorElement = document.getElementById("ubicacionComedor");

  const xhr = new XMLHttpRequest();

  xhr.onload = function () {
    if (xhr.status === 200) {
      const result = JSON.parse(xhr.responseText);
      if (result) {
        const ubicacionValue = result.ubicacion;
        ubicacionComedorElement.textContent = ubicacionValue; // Update the content of the <span> element
      }
    } else {
      ubicacionComedorElement.textContent = "Error fetching Ubicacion";
    }
  };
  xhr.open("GET", `http://54.197.177.119:8080/ubicacionPrueba/${comedor}`);
  xhr.send();
}
Ubicacion();

function racionesDeHoy() {
  const comedor = 1;
  const raciones = document.getElementById("raciones");

  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status === 200) {
      const result = JSON.parse(xhr.responseText);
      if (result) {
        const racionesTotal = result[0].Raciones;
        raciones.textContent = racionesTotal;
      }
    } else {
      ubicacionComedorElement.textContent = "Error fetching raciones";
    }
  };
  xhr.open("GET", `http://54.197.177.119:8080/racionesHoy/${comedor}`);
  xhr.send();
}

racionesDeHoy();

function donadasDeHoy() {
  const comedor = 1;
  const donaciones = document.getElementById("racionesDonadas");

  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status === 200) {
      const result = JSON.parse(xhr.responseText);
      if (result) {
        const donacionesTotal = result[0].RacionesDonadas;
        donaciones.textContent = donacionesTotal;
      }
    } else {
      ubicacionComedorElement.textContent = "Error fetching raciones";
    }
  };
  xhr.open("GET", `http://54.197.177.119:8080/donadasHoy/${comedor}`);
  xhr.send();
}

donadasDeHoy();

function caliPromedio() {
  const comedor = 1;
  const calificacion = document.getElementById("calificacionComedorPromedio");

  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status === 200) {
      const result = JSON.parse(xhr.responseText);
      if (result) {
        const calificacionPromedio = result[0].Promedio;
        calificacion.textContent = calificacionPromedio;
      }
    } else {
      ubicacionComedorElement.textContent = "Error fetching raciones";
    }
  };
  xhr.open("GET", `http://54.197.177.119:8080/promedioCalidad/${comedor}`);
  xhr.send();
}
caliPromedio();

function estadoComedor() {
  const comedor = 1;
  const estado = document.getElementById("estadoComedor");

  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status === 200) {
      const result = JSON.parse(xhr.responseText);
      if (result) {
        const valorEstado = result[0].Estado;
        estado.textContent = valorEstado;
      }
    } else {
      ubicacionComedorElement.textContent = "Error fetching raciones";
    }
  };
  xhr.open("GET", `http://54.197.177.119:8080/estadoComedor/${comedor}`);
  xhr.send();
}
estadoComedor();

function estadisticasComedor() {
  const comedor = 1;
  const tabla = document.getElementById("calidadComedorEspecifico");

  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status === 200) {
      const result = JSON.parse(xhr.responseText);
      const tbody = tabla.querySelector("tbody");
      if (result) {
        result.forEach((rowData) => {
          let row = tabla.insertRow(-1);

          for (const key in rowData) {
            if (rowData.hasOwnProperty(key)) {
              let cell = row.insertCell(-1);
              cell.innerHTML = rowData[key];
            }
          }
        });
        colorCeldaCalidad();
      } else {
        const noDataRow = document.createElement("tr");
        const noDataCell = document.createElement("td");
        noDataCell.textContent = "No data available";
        noDataCell.colSpan = 3; // Assuming there are three columns: Calidad, Higiene, and Servicio
        noDataRow.appendChild(noDataCell);
        tbody.appendChild(noDataRow);
      }
    } else {
      tabla.innerHTML = "Error fetching data";
    }
  };

  xhr.open("GET", `http://54.197.177.119:8080/estadisticasComedor/${comedor}`);
  xhr.send();
}

estadisticasComedor();

function colorCeldaCalidad() {
  var table = document.getElementById("calidadComedorEspecifico");
  var cells = table.querySelectorAll("td");
  cells.forEach(function (cell) {
    var value = parseFloat(cell.textContent.trim());
    // Assign a background color based on the value
    if (value >= 3.0) {
      cell.style.backgroundColor = "lightgreen";
    } else if (value >= 2.0) {
      cell.style.backgroundColor = "yellow";
    } else {
      cell.style.backgroundColor = "pink";
    }
  });
}

function preferenciaLugar() {
  const comedor = 1;
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    const data = [];
    const labels = [];
    const result = JSON.parse(xhr.responseText);

    for (let i of result) {
      // Use result directly as it's an array, not 'result.table'
      data.push(i["Cantidad"]);
      labels.push(i["Lugar"]);
    }

    const ctx = document
      .getElementById("tendenciaLugarComedor")
      .getContext("2d");
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Lugar",
            data: data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
            ],
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: false,
            text: "Cantidad",
            font: {
              size: 16, // Adjust the font size for the title
            },
          },
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
          },
        },
      },
    });
  };
  xhr.open("GET", `http://54.197.177.119:8080/lugarComedor/${comedor}`);
  xhr.send();
}
preferenciaLugar();

function asistenciaComedorFechaEspecifica() {
  const comedor = 1;
  const inicioFechaInput = document.getElementById("inicioFecha");
  const finFechaInput = document.getElementById("finFecha");

  const inicioFecha = inicioFechaInput.value;
  const finFecha = finFechaInput.value;
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    const result = JSON.parse(xhr.responseText);
    console.log(result);
    const asistenciasTotalesComedorElement = document.getElementById(
      "asistenciasTotalesComedor"
    );
    if (result) {
      const cantidadAsistencias = result[0].Asistencia;
      asistenciasTotalesComedorElement.textContent = cantidadAsistencias;
    }
  };
  xhr.open(
    "GET",
    `http://54.197.177.119:8080/asistenciasFechaComedor/${comedor}/${inicioFecha}/${finFecha}`
  );
  xhr.send();
}

function colorCeldaInventario() {
  var jsonData = [
    {
      Cantidad: "2",
      Nombre: "Aceite Vegetal Comestible",
      Presentacion: "20 LT",
    },
    {
      Cantidad: "60",
      Nombre: "Arroz Super Extra",
      Presentacion: "1 KG",
    },
    {
      Cantidad: "192",
      Nombre: "Atun en agua",
      Presentacion: "140 GR",
    },
    {
      Cantidad: "1",
      Nombre: "Azucar estandar",
      Presentacion: "50 KG",
    },
    {
      Cantidad: "6",
      Nombre: "Cafe molido",
      Presentacion: "400 GR",
    },
    {
      Cantidad: "72",
      Nombre: "Chicaros y zanahorias",
      Presentacion: "400 GR",
    },
    {
      Cantidad: "2",
      Nombre: "Chile chipotle adobado",
      Presentacion: "2.8 KG",
    },
    {
      Cantidad: "2",
      Nombre: "Chile Guajillo",
      Presentacion: "1 KG",
    },
    {
      Cantidad: "14",
      Nombre: "Chile jalape\u00f1o en rajas",
      Presentacion: "220 GR",
    },
    {
      Cantidad: "12",
      Nombre: "Concentrado para agua",
      Presentacion: "1.89 LT",
    },
    {
      Cantidad: "2",
      Nombre: "Consome de pollo",
      Presentacion: "3.5 KG",
    },
    {
      Cantidad: "72",
      Nombre: "Elote en lata",
      Presentacion: "400 GR",
    },
    {
      Cantidad: "166",
      Nombre: "Frijol refrito",
      Presentacion: "430 GR",
    },
    {
      Cantidad: "40",
      Nombre: "Galletas salada",
      Presentacion: "186 GR",
    },
    {
      Cantidad: "10",
      Nombre: "Harina de maiz",
      Presentacion: "1 KG",
    },
    {
      Cantidad: "2",
      Nombre: "Huevo",
      Presentacion: "150 PZ",
    },
    {
      Cantidad: "66",
      Nombre: "Leche desalactosada",
      Presentacion: "1 LT",
    },
    {
      Cantidad: "30",
      Nombre: "Lenteja",
      Presentacion: "500 GR",
    },
    {
      Cantidad: "2",
      Nombre: "Aderezo mayonesa",
      Presentacion: "2.5 KG",
    },
    {
      Cantidad: "200",
      Nombre: "Pasta para sopa corta",
      Presentacion: "200 GR",
    },
    {
      Cantidad: "100",
      Nombre: "Pasta tipo spaguetti",
      Presentacion: "200 GR",
    },
    {
      Cantidad: "5",
      Nombre: "Sal",
      Presentacion: "1 KG",
    },
    {
      Cantidad: "24",
      Nombre: "Sardina en tomate",
      Presentacion: "425 GR",
    },
    {
      Cantidad: "10",
      Nombre: "Garbanzo",
      Presentacion: "500 GR",
    },
    {
      Cantidad: "4",
      Nombre: "Pure de tomate",
      Presentacion: "3 KG",
    },
  ];

  var table = document.getElementById("inventarioComedor");
  var rows = table.querySelectorAll("tr");

  for (var i = 1; i < rows.length; i++) {
    var valueCell = rows[i].querySelector("td:nth-child(1)");
    var value = parseFloat(valueCell.textContent.trim());
    var itemName = rows[i].querySelector("td:nth-child(2)").textContent.trim();
    if (value == 0) {
      rows[i].classList.add("low-value-row");
    }

    // Find the corresponding JSON object based on the item name
    var jsonDataItem = jsonData.find((item) => item.Nombre === itemName);

    if (jsonDataItem) {
      // Compare the value from the JSON with the value in the table
      if (value > parseFloat(jsonDataItem.Cantidad)) {
        rows[i].classList.add("high-value-row");
      }
    }
  }
}

function actualizarInventario() {
  // Get the values from the form elements
  const idProducto = document.getElementById("idProducto").value;
  const cantidad = document.getElementById("cantidad").value;

  // Construct the full URL to the API endpoint
  const apiUrl = `http://54.197.177.119:8080/cantidad`;

  // Create a JSON payload with your data
  const payload = {
    idCom: 1,
    idProd: idProducto,
    cantidad: cantidad,
  };

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.mensaje);
      const messageDiv = document.getElementById("messageDiv");
      messageDiv.innerHTML =
        'Cambio exitoso: <span class="emoji">&#x2705</span> ' + data.mensaje;

      if (data.mensaje != "Este producto no se encuentra en el Inventario") {
        messageDiv.innerHTML =
          'Cambio exitoso: <span class="emoji">&#x2705</span> ' + data.mensaje;
      } else {
        messageDiv.innerHTML =
          'Hubo un fallo.  <span class="emoji">&#x274C</span> ' + data.mensaje;
      }
    })
    .catch((error) => {
      console.error(error);
      const messageDiv = document.getElementById("messageDiv");
      messageDiv.innerHTML =
        '<span class="emoji">&#x274C</span> ' + error.message;
    });
}

function opcionesInventario() {
  var jsonData = [
    {
      Cantidad: "2",
      Nombre: "Aceite Vegetal Comestible",
      Presentacion: "20 LT",
    },
    {
      Cantidad: "60",
      Nombre: "Arroz Super Extra",
      Presentacion: "1 KG",
    },
    {
      Cantidad: "192",
      Nombre: "Atun en agua",
      Presentacion: "140 GR",
    },
    {
      Cantidad: "1",
      Nombre: "Azucar estandar",
      Presentacion: "50 KG",
    },
    {
      Cantidad: "6",
      Nombre: "Cafe molido",
      Presentacion: "400 GR",
    },
    {
      Cantidad: "72",
      Nombre: "Chicaros y zanahorias",
      Presentacion: "400 GR",
    },
    {
      Cantidad: "2",
      Nombre: "Chile chipotle adobado",
      Presentacion: "2.8 KG",
    },
    {
      Cantidad: "2",
      Nombre: "Chile Guajillo",
      Presentacion: "1 KG",
    },
    {
      Cantidad: "14",
      Nombre: "Chile jalape\u00f1o en rajas",
      Presentacion: "220 GR",
    },
    {
      Cantidad: "12",
      Nombre: "Concentrado para agua",
      Presentacion: "1.89 LT",
    },
    {
      Cantidad: "2",
      Nombre: "Consome de pollo",
      Presentacion: "3.5 KG",
    },
    {
      Cantidad: "72",
      Nombre: "Elote en lata",
      Presentacion: "400 GR",
    },
    {
      Cantidad: "166",
      Nombre: "Frijol refrito",
      Presentacion: "430 GR",
    },
    {
      Cantidad: "40",
      Nombre: "Galletas salada",
      Presentacion: "186 GR",
    },
    {
      Cantidad: "10",
      Nombre: "Harina de maiz",
      Presentacion: "1 KG",
    },
    {
      Cantidad: "2",
      Nombre: "Huevo",
      Presentacion: "150 PZ",
    },
    {
      Cantidad: "66",
      Nombre: "Leche desalactosada",
      Presentacion: "1 LT",
    },
    {
      Cantidad: "30",
      Nombre: "Lenteja",
      Presentacion: "500 GR",
    },
    {
      Cantidad: "2",
      Nombre: "Aderezo mayonesa",
      Presentacion: "2.5 KG",
    },
    {
      Cantidad: "200",
      Nombre: "Pasta para sopa corta",
      Presentacion: "200 GR",
    },
    {
      Cantidad: "100",
      Nombre: "Pasta tipo spaguetti",
      Presentacion: "200 GR",
    },
    {
      Cantidad: "5",
      Nombre: "Sal",
      Presentacion: "1 KG",
    },
    {
      Cantidad: "24",
      Nombre: "Sardina en tomate",
      Presentacion: "425 GR",
    },
    {
      Cantidad: "10",
      Nombre: "Garbanzo",
      Presentacion: "500 GR",
    },
    {
      Cantidad: "4",
      Nombre: "Pure de tomate",
      Presentacion: "3 KG",
    },
  ];

  // Get a reference to the select element
  var selectElement = document.getElementById("idProducto");

  // Add a default option
  var defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.text = "Producto";
  selectElement.appendChild(defaultOption);

  // Loop through the JSON data and add options to the select element
  jsonData.forEach(function (item, index) {
    var option = document.createElement("option");
    option.value = (index + 1).toString(); // Increment the index to start from 1
    option.text = item.Nombre;
    selectElement.appendChild(option);
  });
}
opcionesInventario();

function tablaInventario() {
  const numComedor = 1;
  const tabla = document.getElementById("inventarioComedor");
  // const numComedorElement = document.getElementById('numComedorElement');
  // //const numComedor = numComedorElement.textContent;
  // const numComedor = numComedorElement.textContent;

  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status === 200) {
      const result = JSON.parse(xhr.responseText);
      const tbody = tabla.querySelector("tbody");
      if (result) {
        result.forEach((rowData) => {
          let row = tabla.insertRow(-1);

          for (const key in rowData) {
            if (rowData.hasOwnProperty(key)) {
              let cell = row.insertCell(-1);
              cell.innerHTML = rowData[key];
            }
          }
        });
        colorCeldaInventario();
      } else {
        const noDataRow = document.createElement("tr");
        const noDataCell = document.createElement("td");
        noDataCell.textContent = "No data available";
        noDataCell.colSpan = 3; // Assuming there are three columns: Calidad, Higiene, and Servicio
        noDataRow.appendChild(noDataCell);
        tbody.appendChild(noDataRow);
      }
    } else {
      tabla.innerHTML = "Error fetching data";
    }
  };
  xhr.open("GET", `http://54.197.177.119:8080/comedorInventario/${numComedor}`);
  xhr.send();
}

tablaInventario();
