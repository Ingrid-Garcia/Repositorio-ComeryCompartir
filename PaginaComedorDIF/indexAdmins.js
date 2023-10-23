/*
  Maneja la lógica de todo el panel de administrador.
*/

function vistaInfoGeneral() {
  const infoGeneral = document.getElementById("infoGeneral");
  const inventariosInfo = document.getElementById("inventariosInfo");
  const calidadInfo = document.getElementById("calidadInfo");
  const incidentesInfo = document.getElementById("incidentesInfo");
  const avisosInfo = document.getElementById("avisosInfo");

  infoGeneral.style.display = "block";
  inventariosInfo.style.display = "none";
  calidadInfo.style.display = "none";
  incidentesInfo.style.display = "none";
  avisosInfo.style.display = "none";
}

function vistaInventarios() {
  const infoGeneral = document.getElementById("infoGeneral");
  const inventariosInfo = document.getElementById("inventariosInfo");
  const calidadInfo = document.getElementById("calidadInfo");
  const incidentesInfo = document.getElementById("incidentesInfo");
  const avisosInfo = document.getElementById("avisosInfo");

  infoGeneral.style.display = "none";
  inventariosInfo.style.display = "block";
  calidadInfo.style.display = "none";
  incidentesInfo.style.display = "none";
  avisosInfo.style.display = "none";
}

function vistaCalidad() {
  const infoGeneral = document.getElementById("infoGeneral");
  const inventariosInfo = document.getElementById("inventariosInfo");
  const calidadInfo = document.getElementById("calidadInfo");
  const incidentesInfo = document.getElementById("incidentesInfo");
  const avisosInfo = document.getElementById("avisosInfo");
  infoGeneral.style.display = "none";
  inventariosInfo.style.display = "none";
  calidadInfo.style.display = "block";
  incidentesInfo.style.display = "none";
  avisosInfo.style.display = "none";
}

function vistaIncidentes() {
  const infoGeneral = document.getElementById("infoGeneral");
  const inventariosInfo = document.getElementById("inventariosInfo");
  const calidadInfo = document.getElementById("calidadInfo");
  const incidentesInfo = document.getElementById("incidentesInfo");
  const avisosInfo = document.getElementById("avisosInfo");

  infoGeneral.style.display = "none";
  inventariosInfo.style.display = "none";
  calidadInfo.style.display = "none";
  incidentesInfo.style.display = "block";
  avisosInfo.style.display = "none";
}

function vistaAvisos() {
  const infoGeneral = document.getElementById("infoGeneral");
  const inventariosInfo = document.getElementById("inventariosInfo");
  const calidadInfo = document.getElementById("calidadInfo");
  const incidentesInfo = document.getElementById("incidentesInfo");
  const avisosInfo = document.getElementById("avisosInfo");

  infoGeneral.style.display = "none";
  inventariosInfo.style.display = "none";
  calidadInfo.style.display = "none";
  incidentesInfo.style.display = "none";
  avisosInfo.style.display = "block";
}

function totalComensales() {
  const totalComensales = document.getElementById("totalComensalesRegistrados");

  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status === 200) {
      const result = JSON.parse(xhr.responseText);
      if (result) {
        const total = result[0].Comensales;
        totalComensales.textContent = total;
      }
    } else {
      totalComensales.textContent = "Error fetching raciones";
    }
  };
  xhr.open("GET", `http://54.197.177.119:8080/totalComensales`);
  xhr.send();
}

totalComensales();

function absRaciones() {
  const totalRaciones = document.getElementById("totalRaciones");

  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status === 200) {
      const result = JSON.parse(xhr.responseText);
      if (result) {
        const total = result[0].AbsRaciones;
        totalRaciones.textContent = total;
      }
    } else {
      totalRaciones.textContent = "Error fetching raciones";
    }
  };
  xhr.open("GET", `http://54.197.177.119:8080/totalRaciones`);
  xhr.send();
}

absRaciones();

function conteoAbiertos() {
  const conteoAbi = document.getElementById("cantidadAbiertos");

  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status === 200) {
      const result = JSON.parse(xhr.responseText);
      if (result) {
        const total = result[0].Abiertos;
        conteoAbi.textContent = total;
      }
    } else {
      conteoAbi.textContent = "Error fetching raciones";
    }
  };
  xhr.open("GET", `http://54.197.177.119:8080/conteoAbiertos`);
  xhr.send();
}
conteoAbiertos();

function conteoCerrados() {
  const conteoCerr = document.getElementById("cantidadCerrados");

  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status === 200) {
      const result = JSON.parse(xhr.responseText);
      if (result) {
        const total = result[0].Cerrados;
        conteoCerr.textContent = total;
      }
    } else {
      conteoCerr.textContent = "Error fetching raciones";
    }
  };
  xhr.open("GET", `http://54.197.177.119:8080/conteoCerrados`);
  xhr.send();
}
conteoCerrados();

function ubicacionAbierto() {
  const tabla = document.getElementById("ubiAbiertos");

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
  xhr.open("GET", `http://54.197.177.119:8080/ubicacionAbierto`);
  xhr.send();
}

ubicacionAbierto();

function ubicacionCerrado() {
  const tabla = document.getElementById("ubiCerrados");

  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status === 200) {
      const result = JSON.parse(xhr.responseText);
      const tbody = tabla.querySelector("tbody");
      if (result) {
        result.forEach((rowData) => {
          let row = tabla.insertRow(-1);
          //   for (const key in rowData) {
          //     if (rowData.hasOwnProperty(key)) {
          //         let cell = row.insertCell(-1);

          //         if (key === "Ubicacion") {
          //             // Limit the text to the first period occurrence
          //             const text = rowData[key];
          //             const firstPeriodIndex = text.indexOf('.');
          //             if (firstPeriodIndex !== -1) {
          //                 cell.innerHTML = text.substring(0, firstPeriodIndex);
          //             } else {
          //                 cell.innerHTML = text;
          //             }
          //         } else {
          //             cell.innerHTML = rowData[key];
          //         }
          //     }
          // }

          for (const key in rowData) {
            if (rowData.hasOwnProperty(key)) {
              let cell = row.insertCell(-1);
              cell.innerHTML = rowData[key];
            }
          }
        });
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
  xhr.open("GET", `http://54.197.177.119:8080/ubicacionCerrado`);
  xhr.send();
}

ubicacionCerrado();

function hoyRaciones() {
  const racionesHoy = document.getElementById("racionesHoy");

  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status === 200) {
      const result = JSON.parse(xhr.responseText);
      if (result) {
        const total = result[0].Raciones;
        racionesHoy.textContent = total;
      }
    } else {
      racionesHoy.textContent = "Error fetching raciones";
    }
  };
  xhr.open("GET", `http://54.197.177.119:8080/hoyRaciones`);
  xhr.send();
}
hoyRaciones();

function hoyDonadas() {
  const donadasHoy = document.getElementById("racionesDonHoy");

  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status === 200) {
      const result = JSON.parse(xhr.responseText);
      if (result) {
        const total = result[0].Raciones_Donadas;
        donadasHoy.textContent = total;
      }
    } else {
      donadasHoy.textContent = "Error fetching raciones";
    }
  };
  xhr.open("GET", `http://54.197.177.119:8080/hoyDonadas`);
  xhr.send();
}
hoyDonadas();

function infoComedoresHoy() {
  const tabla = document.getElementById("tablaInfoComedores");
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
        colorRaciones();
      } else {
        const noDataRow = document.createElement("tr");
        const noDataCell = document.createElement("td");
        noDataCell.textContent = "No data available";
        noDataCell.colSpan = 4;
        noDataRow.appendChild(noDataCell);
        tbody.appendChild(noDataRow);
      }
    } else {
      tabla.innerHTML = "Error fetching data";
    }
  };
  xhr.open("GET", `http://54.197.177.119:8080/infoComedoresHoy`);
  xhr.send();
}

infoComedoresHoy();

function colorRaciones() {
  var table = document.getElementById("tablaInfoComedores");
  var recaudacionCells = table.querySelectorAll("td:nth-child(2)");
  recaudacionCells.forEach(function (cell) {
    var value = parseFloat(cell.textContent);
    if (value >= 100) {
      cell.style.backgroundColor = "lightgreen";
    } else if (value >= 50) {
      cell.style.backgroundColor = "yellow";
    } else {
      cell.style.backgroundColor = "pink";
    }
  });

  var racionesDonadasCells = table.querySelectorAll("td:nth-child(4)");
  racionesDonadasCells.forEach(function (cell) {
    var value = parseFloat(cell.textContent);
    if (value >= 26) {
      cell.style.backgroundColor = "pink";
    } else if (value >= 13) {
      cell.style.backgroundColor = "yellow";
    } else {
      cell.style.backgroundColor = "lightgreen";
    }
  });
}

function asistenciasGenero() {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    const data = [];
    const labels = [];
    const result = JSON.parse(xhr.responseText);

    for (let i of result) {
      data.push(i["Cantidad"]);
      labels.push(i["Genero"]);
    }

    const ctx = document.getElementById("graficaGenero").getContext("2d");
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Genero",
            data: data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgb(93, 63, 211)",
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
              size: 16,
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
  xhr.open("GET", `http://54.197.177.119:8080/asistenciasGenero`);
  xhr.send();
}
asistenciasGenero();

function asistenciasEdad() {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    const data = [];
    const labels = [];
    const result = JSON.parse(xhr.responseText);

    for (let i of result) {
      data.push(i["Cantidad"]);
      labels.push(i["GrupoEdad"]);
    }
    const ctx = document.getElementById("graficaEdad").getContext("2d");
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Genero",
            data: data,
            backgroundColor: [
              "lightgray",
              "blue",
              "gold",
              "lightpink",
              "purple",
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
              size: 16,
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
  xhr.open("GET", `http://54.197.177.119:8080/edadGrafica`);
  xhr.send();
}
asistenciasEdad();

function preferenciaLugar() {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    const data = [];
    const labels = [];
    const result = JSON.parse(xhr.responseText);

    for (let i of result) {
      data.push(i["Cantidad"]);
      labels.push(i["Lugar"]);
    }
    const ctx = document
      .getElementById("graficaPreferenciaLugar")
      .getContext("2d");
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Genero",
            data: data,
            backgroundColor: ["gold", "lightpink", "purple"],
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: false,
            text: "Cantidad",
            font: {
              size: 16,
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
  xhr.open("GET", `http://54.197.177.119:8080/lugarComer`);
  xhr.send();
}
preferenciaLugar();

function asistenciasEdad() {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    const data = [];
    const labels = [];
    const result = JSON.parse(xhr.responseText);

    for (let i of result) {
      data.push(i["Cantidad"]);
      labels.push(i["GrupoEdad"]);
    }

    const ctx = document.getElementById("graficaEdad").getContext("2d");
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Genero",
            data: data,
            backgroundColor: [
              "lightgray",
              "blue",
              "gold",
              "lightpink",
              "purple",
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
              size: 16,
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
  xhr.open("GET", `http://54.197.177.119:8080/edadGrafica`);
  xhr.send();
}
asistenciasEdad();

function tipoCondiciones() {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    const data = [];
    const labels = [];
    const result = JSON.parse(xhr.responseText);

    for (let i of result) {
      data.push(i["Cantidad"]);
      labels.push(i["Tipo"]);
    }

    const ctx = document.getElementById("grafiaCondiciones").getContext("2d");
    new Chart(ctx, {
      type: "polarArea",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Genero",
            data: data,
            backgroundColor: [
              "rgba(255, 204, 204, 0.6)",
              "rgba(255, 221, 153, 0.6)",
              "rgba(255, 255, 153, 0.6)",
              "rgba(204, 255, 204, 0.6)",
              "rgba(173, 216, 230, 0.6)",
              "rgba(221, 160, 221, 0.6)",
              "rgba(255, 182, 193, 0.6)",
              "rgba(230, 230, 250, 0.6)",
              "rgba(255, 204, 153, 0.6)",
              "rgba(152, 255, 204, 0.6)",
              "rgba(200, 162, 200, 0.6)",
              "rgba(250, 128, 114, 0.6)",
              "rgba(0, 128, 128, 0.6)",
              "rgba(245, 245, 220, 0.6)",
              "rgba(255, 127, 80, 0.6)",
              "rgba(64, 224, 208, 0.6)",
              "rgba(204, 204, 255, 0.6)",
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
              size: 16,
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
  xhr.open("GET", `http://54.197.177.119:8080/tipoCondiciones`);
  xhr.send();
}
tipoCondiciones();

function opcionesComedor() {
  var jsonData = [
    {
      Ubicacion:
        "CINCO DE MAYO. Calle Porfirio D\u00edaz # 27, Colonia 5 de Mayo",
    },
    {
      Ubicacion: "MEXICO 86. Calle Italia # 53 Colonia Mexico 86",
    },
    {
      Ubicacion:
        "CARDENAS DEL RIO. Calle Gral. C\u00e1rdenas del R\u00edo Mz. 14 LT 10",
    },
    {
      Ubicacion:
        "MONTE MAR\u00ccA. Calle Monte Real Mz 406 LT 11 Colonia Lomas de Monte Mar\u00eda",
    },
    {
      Ubicacion: "CERRO GRANDE. Calle Teotihuacan #15 Col. Cerro Grande ",
    },
    {
      Ubicacion:
        "MARGARITA MAZA. Calle Francisco Javier Mina #12, Colonia Margarita Maza de Juarez",
    },
    {
      Ubicacion: "AMP. PEnITAS. Cda. Gardenias #3 Col. Amp Penitas ",
    },
    {
      Ubicacion:
        "SAN JOSE JARAL 2. Calle Jazm\u00edn #22 Col. San Jose el Jaral 2",
    },
    {
      Ubicacion: "Calle Clavelinas #24 Col. San Jos\u00e9 el Jaral",
    },
    {
      Ubicacion:
        "AMP. EMILIANO ZAPATA. Av. Ej\u00e9rcito Mexicano s/n, Col. Ampl. Emiliano Zapata ",
    },
    {
      Ubicacion:
        "DIF CENTRAL. Av. Ruiz Cortines esq. Acambay Lomas de Atizap\u00e1n",
    },
    {
      Ubicacion: "LOS OLIVOS.  Avenida Jalisco s/n Casa de la Juventud",
    },
    {
      Ubicacion:
        "ADOLFO LOPEZ MATEOS. Adolfo L\u00f3pez Mateos. Privada Zacatecas no. 6 ",
    },
    {
      Ubicacion:
        "HOGARES. Retorno de la Tranquilidad No. 8A Hogares de Atizap\u00e1n.",
    },
    {
      Ubicacion: "RINCONADA BONFIL.Rinconada Bonfil. Calle Rosas MZ 4 Lt 15",
    },
    {
      Ubicacion:
        "SAN JUAN BOSCO. San Juan Bosco. Calle Profesor Roberto Barrio No. 2",
    },
    {
      Ubicacion:
        "Mexico Nuevo. Pioneros de Rochandell esquina con calle Veracruz S/N Col. M\u00e9xico Nuevo (Deportivo )",
    },
    {
      Ubicacion:
        "LAS PE\u00d1ITAS. Pe\u00f1itas. Mirador # 100 Col. Las Pe\u00f1itas.",
    },
    {
      Ubicacion:
        "RANCHO CASTRO.  Rancho Castro, Calle del Puerto s/n Rancho sal\u00f3n de usos m\u00faltiplos.",
    },
    {
      Ubicacion:
        "VILLAS DE LAS PALMAS. Villas de las palmas Calle avena Mz. 5 Lt. 12 col. Amp villa de las Palmas",
    },
    {
      Ubicacion: "UAM. Calle Ingenieria Industrial Mz 24 Lt 45 Col. UAM",
    },
    {
      Ubicacion:
        "BOSQUES DE IXTACALA. Cerrada  Sauces Mz 12 Lt 13- C #6 col.Bosques de Ixtacala",
    },
    {
      Ubicacion:
        "LOMAS DE TEPALCAPA. Calle seis # 14 Colonia Lomas de Tepalcapa",
    },
    {
      Ubicacion:
        "VILLA DE LAS TORRES. Calle Villa Alba Mza. 17 lote 9, esquina Bicentenario, Col. Villa de las Torres",
    },
    {
      Ubicacion:
        "CRISTOBAL HIGUERA. Cristobal Higuera - Calle Sand\u00eda # 24. Col. Prof. Cristobal Higuera",
    },
    {
      Ubicacion:
        "LOMAS DE GUADALUPE. Lomas de Guadalupe -  Calle Vicente Guerrero N\u00famero 2, Colonia Lomas de Guadalupe",
    },
    {
      Ubicacion:
        "LAZARO CARDENAS. L\u00e1zaro Cardenas - Calle Chihuahua 151-A Col. L\u00e1zaro Cardenas",
    },
    {
      Ubicacion:
        "EL CHAPARRAL. El Chaparral - Calle T\u00facan # 48. Colonia el Chaparral",
    },
    {
      Ubicacion:
        "PRIMERO DE SEPTIEMBRE. Primero de Septiembre - Calle Belisario Dominguez Colonia 44 Primero de Septiembre",
    },
    {
      Ubicacion:
        "LAS AGUILAS. Las Aguilas - Pavo Real # 18 Colonia Las Aguilas ",
    },
    {
      Ubicacion: "EL CERRITO. El Cerrito. Paseo Buenavista # 1Col. El Cerrito",
    },
    {
      Ubicacion:
        "VILLAS DE LA HACIENDA. Calle de las Chaparreras   #5 Col. Villas de la Hacienda",
    },
    {
      Ubicacion: "SEGURIDAD PUBLICA",
    },
    {
      Ubicacion:
        "SAN JUAN IXTACALA PLANO NORTE 1. Loma San Juan 194.San Juan Ixtacala Plano Norte",
    },
    {
      Ubicacion:
        "PRADOS DE IXTACALA 2DA. SECC. Clavel no. 13 mz13 lt 17.Prados Ixtacala 2da. secc. ",
    },
    {
      Ubicacion:
        "VILLA JARDIN. Villa Jardin . Cda . Francisco Villa S/N. Col. Villa Jardin ",
    },
    {
      Ubicacion:
        "AMP. CRISTOBAL HIGUERA. Calle Aldama #17 Col Amp Cristobal Higuera ",
    },
    {
      Ubicacion:
        "AMP. ADOLFO LOPEZ MATEOS. Calle Leon  #1 esquina Coatzacoalcos Col Amp.Adolfo L\u00f3pez Mateos ",
    },
    {
      Ubicacion: "LOMAS DE SAN MIGUEL. Jacarandas #5  Col. Lomas de San Miguel",
    },
    {
      Ubicacion:
        "SAN JUAN IXTACALA PLANO NORTE 2. Boulevar Ignacio Zaragoza , Loma Alta #82. Col San Juan Ixtacala Plano Norte ",
    },
    {
      Ubicacion:
        "LOS OLIVOS 2. Calle M\u00e9rida numero 10, colonia los Olivos",
    },
    {
      Ubicacion:
        "TIERRA DE EN MEDIO. Hacienda de la Flor #14 Col. Tierra de en medio",
    },
  ];

  var selectElement = document.getElementById("idNumComedor");

  var defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.text = "Comedor";
  selectElement.appendChild(defaultOption);

  jsonData.forEach(function (item, index) {
    var option = document.createElement("option");
    console.log(option);
    option.value = (index + 1).toString();
    option.text = item.Ubicacion;
    selectElement.appendChild(option);
  });
}

opcionesComedor();

function tablaInventario() {
  const tabla = document.getElementById("inventarioComedorEsp");
  const tbody = tabla.querySelector("tbody");
  const numComedorElement = document.getElementById("idNumComedor");
  const comedor = numComedorElement.value;

  tbody.innerHTML = "";

  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status === 200) {
      const result = JSON.parse(xhr.responseText);
      if (result) {
        result.forEach((rowData) => {
          let row = tbody.insertRow(-1);

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
        noDataCell.colSpan = 3;
        noDataRow.appendChild(noDataCell);
        tbody.appendChild(noDataRow);
      }
    } else {
      tabla.innerHTML = "Error fetching data";
    }
  };
  xhr.open("GET", `http://54.197.177.119:8080/comedorInventario/${comedor}`);
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

  var table = document.getElementById("inventarioComedorEsp");
  var rows = table.querySelectorAll("tr");

  for (var i = 1; i < rows.length; i++) {
    var valueCell = rows[i].querySelector("td:nth-child(1)");
    var value = parseFloat(valueCell.textContent.trim());
    var itemName = rows[i].querySelector("td:nth-child(2)").textContent.trim();
    if (value == 0) {
      rows[i].classList.add("low-value-row");
    }

    var jsonDataItem = jsonData.find((item) => item.Nombre === itemName);

    if (jsonDataItem) {
      if (value > parseFloat(jsonDataItem.Cantidad)) {
        rows[i].classList.add("high-value-row");
      }
    }
  }
}

function estadisticasComedorGeneral() {
  const tabla = document.getElementById("calidadComedoresGeneral");

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
        colorCeldaCalidadGeneral(tabla);
      } else {
        const noDataRow = document.createElement("tr");
        const noDataCell = document.createElement("td");
        noDataCell.textContent = "No data available";
        noDataCell.colSpan = 4;
        noDataRow.appendChild(noDataCell);
        tbody.appendChild(noDataRow);
      }
    } else {
      tabla.innerHTML = "Error fetching data";
    }
  };

  xhr.open("GET", `http://54.197.177.119:8080/encuestaComedores`);
  xhr.send();
}

estadisticasComedorGeneral();

function colorCeldaCalidadGeneral(tabla) {
  var table = tabla;
  var rows = table.getElementsByTagName("tr");

  for (var i = 1; i < rows.length; i++) {
    var cells = rows[i].getElementsByTagName("td");

    for (var j = 1; j < cells.length; j++) {
      var cell = cells[j];
      var value = parseFloat(cell.textContent.trim());

      if (value >= 3.0) {
        cell.style.backgroundColor = "lightgreen";
      } else if (value >= 2.0) {
        cell.style.backgroundColor = "yellow";
      } else {
        cell.style.backgroundColor = "pink";
      }
    }
  }
}

function maxIncidentes() {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    const data = [];
    const labels = [];
    const result = JSON.parse(xhr.responseText);

    for (let i of result) {
      data.push(i["Cantidad"]);
      labels.push(i["Ubicacion"]);
    }

    const ctx = document.getElementById("graficaIncidentes").getContext("2d");
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Genero",
            data: data,
            backgroundColor: [
              "rgba(255, 204, 204, 0.6)",
              "rgba(255, 221, 153, 0.6)",
              "rgba(255, 255, 153, 0.6)",
              "rgba(204, 255, 204, 0.6)",
              "rgba(173, 216, 230, 0.6)",
              "rgba(221, 160, 221, 0.6)",
              "rgba(255, 182, 193, 0.6)",
              "rgba(230, 230, 250, 0.6)",
              "rgba(255, 204, 153, 0.6)",
              "rgba(152, 255, 204, 0.6)",
              "rgba(200, 162, 200, 0.6)",
              "rgba(250, 128, 114, 0.6)",
              "rgba(0, 128, 128, 0.6)",
              "rgba(245, 245, 220, 0.6)",
              "rgba(255, 127, 80, 0.6)",
              "rgba(64, 224, 208, 0.6)",
              "rgba(204, 204, 255, 0.6)",
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
              size: 16,
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
  xhr.open("GET", `http://54.197.177.119:8080/maxResponsableIncidente`);
  xhr.send();
}
maxIncidentes();

function incidentesTabla() {
  const tabla = document.getElementById("tablaIncidentes");

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
      } else {
        const noDataRow = document.createElement("tr");
        const noDataCell = document.createElement("td");
        noDataCell.textContent = "No data available";
        noDataCell.colSpan = 4;
        noDataRow.appendChild(noDataCell);
        tbody.appendChild(noDataRow);
      }
    } else {
      tabla.innerHTML = "Error fetching data";
    }
  };

  xhr.open("GET", `http://54.197.177.119:8080/incidentesAct`);
  xhr.send();
}
incidentesTabla();

function avisosMensuales() {
  const tabla = document.getElementById("avisosMensuales");

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
      } else {
        const noDataRow = document.createElement("tr");
        const noDataCell = document.createElement("td");
        noDataCell.textContent = "No data available";
        noDataCell.colSpan = 4;
        noDataRow.appendChild(noDataCell);
        tbody.appendChild(noDataRow);
      }
    } else {
      tabla.innerHTML = "Error fetching data";
    }
  };

  xhr.open("GET", `http://54.197.177.119:8080/infoAvisos`);
  xhr.send();
}
avisosMensuales();
