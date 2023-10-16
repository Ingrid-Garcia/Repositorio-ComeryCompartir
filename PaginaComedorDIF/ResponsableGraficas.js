// function Ubicacion(){
//     const comedor = 1;
//     const ubicacionComedorElement = document.getElementById('ubicacionComedor');
    
//     const xhr = new XMLHttpRequest();
    
//     xhr.onload = function() {
//         if (xhr.status === 200) {
//             const result = JSON.parse(xhr.responseText);
//             if (result && result.table && result.table.length > 0) {
//                 // Extract the "Ubicacion" value from the first row (assuming there's only one row)
//                 const ubicacionValue = result.table[0].Ubicacion;
//                 ubicacionComedorElement.textContent = ubicacionValue; // Update the content of the <span> element
//             }
//         } else {
//             ubicacionComedorElement.textContent = 'Error fetching Ubicacion';
//         }
//     };
//     xhr.open('GET',`http://54.197.177.119:8080/ubicacion/${comedor}`);
//     xhr.send();
    
// }
// Ubicacion();


// function racionesDeHoy(){
//     const comedor = 1;
//     const raciones = document.getElementById('raciones');

//     const xhr = new XMLHttpRequest();
//     xhr.onload = function() {
//         if (xhr.status === 200) {
//             const result = JSON.parse(xhr.responseText);
//             if (result && result.table && result.table.length > 0) {
        
//                 const racionesTotal = result.table[0].Raciones;
//                 raciones.textContent = racionesTotal; 
//             }
//         } else {
//             ubicacionComedorElement.textContent = 'Error fetching raciones';
//         }
//     };
//     xhr.open('GET',`http://54.197.177.119:8080/racionesHoy/${comedor}`);
//     xhr.send();
// }

// function donadasDeHoy(){
//     const comedor = 1;
//     const donaciones = document.getElementById('racionesDonadas');

//     const xhr = new XMLHttpRequest();
//     xhr.onload = function() {
//         if (xhr.status === 200) {
//             const result = JSON.parse(xhr.responseText);
//             if (result && result.table && result.table.length > 0) {
        
//                 const donacionesTotal = result.table[0].RacionesDonadas;
//                 donaciones.textContent = donacionesTotal; 
//             }
//         } else {
//             ubicacionComedorElement.textContent = 'Error fetching raciones';
//         }
//     };
//     xhr.open('GET',`http://54.197.177.119:8080/donadasHoy/${comedor}`);
//     xhr.send();
// }

// function caliPromedio(){
//     const comedor = 1;
//     const calificacion = document.getElementById('calificacionComedorPromedio');

//     const xhr = new XMLHttpRequest();
//     xhr.onload = function() {
//         if (xhr.status === 200) {
//             const result = JSON.parse(xhr.responseText);
//             if (result && result.table && result.table.length > 0) {
        
//                 const calificacionPromedio = result.table[0].Promedio;
//                 calificacion.textContent = calificacionPromedio; 
//             }
//         } else {
//             ubicacionComedorElement.textContent = 'Error fetching raciones';
//         }
//     };
//     xhr.open('GET',`http://54.197.177.119:8080/promedioCalidad/${comedor}`);
//     xhr.send();
// }

// function estadoComedor(){
//     const comedor = 1;
//     const estado = document.getElementById('estadoComedor');

//     const xhr = new XMLHttpRequest();
//     xhr.onload = function() {
//         if (xhr.status === 200) {
//             const result = JSON.parse(xhr.responseText);
//             if (result && result.table && result.table.length > 0) {
        
//                 const valorEstado = result.table[0].Estado;
//                 estado.textContent = valorEstado; 
//             }
//         } else {
//             ubicacionComedorElement.textContent = 'Error fetching raciones';
//         }
//     };
//     xhr.open('GET',`http://54.197.177.119:8080/estadoComedor/${comedor}`);
//     xhr.send();
// }

// function estadisticasComedor(){
//     const comedor = 1;
//     const tabla = document.getElementById('calidadComedorEspecifico');

//     const xhr = new XMLHttpRequest();
//     xhr.onload = function() {
//         if (xhr.status === 200) {
//             const result = JSON.parse(xhr.responseText);
//             const tbody = tabla.querySelector('tbody');

//             // Clear the existing rows
//             tbody.innerHTML = '';

//             if (result && result.table && result.table.length > 0) {
//                 result.table.forEach(rowData => {
//                     const row = document.createElement('tr');

//                     // Assuming the order of data in the API response matches the table columns
//                     const columns = ['Calidad', 'Higiene', 'Servicio'];
//                     columns.forEach(column => {
//                         const cell = document.createElement('td');
//                         cell.textContent = rowData[column];
//                         row.appendChild(cell);
//                     });

//                     tbody.appendChild(row);
//                 });
//             } else {
//                 // Handle the case where no data is returned
//                 const noDataRow = document.createElement('tr');
//                 const noDataCell = document.createElement('td');
//                 noDataCell.textContent = 'No data available';
//                 noDataCell.colSpan = columns.length;
//                 noDataRow.appendChild(noDataCell);
//                 tbody.appendChild(noDataRow);
//             }
//         } else {
//             tabla.innerHTML = 'Error fetching data';
//         }
//     };
//     xhr.open('GET',`http://54.197.177.119:8080/estadisticasComedor/${comedor}`);
//     xhr.send();
// }

function colorCeldaCalidad (){
    var table = document.getElementById('calidadComedorEspecifico'); 
    var cells = table.querySelectorAll('td');
    
    cells.forEach(function(cell) {
        var value = parseFloat(cell.textContent.trim()); 
        
        // Assign a background color based on the value
        if (value >= 3.0) {
            cell.style.backgroundColor = 'lightgreen';
        } else if (value >= 2.0) {
            cell.style.backgroundColor = 'yellow';
        } else {
            cell.style.backgroundColor = 'pink';
        }
    });
}

// function preferenciaLugar() {
//     const comedor = 1;
//     const xhr = new XMLHttpRequest();
//     xhr.onload = () => {
//         const data = [];
//         const labels = [];
//         const result = JSON.parse(xhr.responseText);
//         for (let i of result['table']) {
//             data.push(i['Lugar']);
//             labels.push(i['Cantidad']);
//         }
  
//         const ctx = document.getElementById("tendenciaLugarComedor");
//         new Chart(ctx, {
//             type: 'pie',
//             data: {
//                 labels: labels,
//                 datasets: [{
//                     label: "Lugar",
//                     data: data
//                 }]
//             },
//             options: {
//                 plugins: {
//                     title: {
//                         display: true,
//                         text: 'Cantidad'
//                     }
//                 }
//             }
//         });
//     };
//     xhr.open('GET',`http://54.197.177.119:8080/lugarComedor/${comedor}`);
//     xhr.send();
// }


// function asistenciaComedorFechaEspecifica(){
//     const comedor = 1;
//     const inicioFechaInput = document.getElementById('inicioFecha');
//     const finFechaInput = document.getElementById('finFecha');

//     inicioFechaInput.addEventListener('change', function() {
//         const inicioFecha = inicioFechaInput.value;
//         console.log('Inicio fecha changed to: ' + inicioFecha);
//     });

//     finFechaInput.addEventListener('change', function() {
//     const finFecha = finFechaInput.value;
//     console.log('Fin fecha changed to: ' + finFecha);
//     });

//     const xhr = new XMLHttpRequest();
//     xhr.onload = function() {
//         const result = JSON.parse(xhr.responseText);
//             const asistenciasTotalesComedorElement = document.getElementById('asistenciasTotalesComedor');
//             if (asistenciasTotalesComedorElement) {
//                 asistenciasTotalesComedorElement.textContent = result['data']; // Update the content of the <span> element
//             }
//     };
//     xhr.open('GET',`http://54.197.177.119:8080/asistenciasFechaComedor/${comedor}/${inicioFecha}/${finFecha}` );
//     xhr.send();
// }

// function asistenciaComedorMes() {
//     const comedor = 1;
//     const nomes = document.getElementById('nomes');
//     const mes = document.getElementById('mes');


//     const xhr = new XMLHttpRequest();
//     xhr.onload = function() {
//         const labels = [];
//         const data = [];
//         const result = JSON.parse(xhr.responseText);
//         for (let i of result['table']) {
//             labels.push(i['Fecha']);
//             data.push(i['Conteo']);
//         }

//         // Get a reference to the canvas element
//         const chartCanvas = document.getElementById('asistenciaPorMes');

//         // Create a chart using Chart.js
//         new Chart(chartCanvas, {
//             type: 'line',
//             data: {
//                 labels: labels,
//                 datasets: [{
//                     label: 'Asistencia',
//                     data: data,
//                     borderColor: 'blue',
//                     fill: false
//                 }]
//             },
//             options: {
//                 responsive: true,
//                 maintainAspectRatio: false
//             }
//         });
//     };
//     xhr.open('GET', `http://54.197.177.119:8080/asistenciasComedorMes/${comedor}/${nomes}/${mes}`);
//     xhr.send();
// }

function colorCeldaInventario(){
    var table = document.getElementById('inventarioComedor'); // Target the specific table by its id
    var rows = table.querySelectorAll('tr');
    
    for (var i = 1; i < rows.length; i++) { // Start from 1 to skip the table header row
        var valueCell = rows[i].querySelector('td:nth-child(1)'); // Select the third column (Servicio)
        var value = parseFloat(valueCell.textContent.trim()); // Parse the value as a float
        
        // Add a class based on the value
        if (value == 0) {
          rows[i].classList.add('low-value-row');
        }
        // Add more conditions as needed for different value ranges
    }
}

function actualizarInventario() {
    // Get the values from the form elements
    const idProducto = document.getElementById('idProducto').value;
    const cantidad = document.getElementById('cantidad').value;

    // Construct the full URL to the API endpoint
    const apiUrl = `http://54.197.177.119:8080/cantidad`;

    // Create a JSON payload with your data
    const payload = {
        idCom: 1,
        idProd: idProducto,
        cantidad: cantidad,
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data.mensaje);
        const messageDiv = document.getElementById('messageDiv');
        messageDiv.innerHTML = 'Cambio exitoso: <span class="emoji">&#x2705</span> ' + data.mensaje;

        if (data.mensaje != 'Este producto no se encuentra en el Inventario') {
            messageDiv.innerHTML = 'Cambio exitoso: <span class="emoji">&#x2705</span> ' + data.mensaje;
        } else {
            messageDiv.innerHTML = 'Hubo un fallo.  <span class="emoji">&#x274C</span> ' + data.mensaje;
        }
    })
    .catch((error) => {
        console.error(error);
        const messageDiv = document.getElementById('messageDiv');
        messageDiv.innerHTML = '<span class="emoji">&#x274C</span> ' + error.message;
    });
}

function opcionesInventario(){
    var jsonData = [
        {
        "Cantidad": "2",
        "Nombre": "Aceite Vegetal Comestible",
        "Presentacion": "20 LT"
      },
      {
        "Cantidad": "60",
        "Nombre": "Arroz Super Extra",
        "Presentacion": "1 KG"
      },
      {
        "Cantidad": "192",
        "Nombre": "Atun en agua",
        "Presentacion": "140 GR"
      },
      {
        "Cantidad": "1",
        "Nombre": "Azucar estandar",
        "Presentacion": "50 KG"
      },
      {
        "Cantidad": "6",
        "Nombre": "Cafe molido",
        "Presentacion": "400 GR"
      },
      {
        "Cantidad": "72",
        "Nombre": "Chicaros y zanahorias",
        "Presentacion": "400 GR"
      },
      {
        "Cantidad": "2",
        "Nombre": "Chile chipotle adobado",
        "Presentacion": "2.8 KG"
      },
      {
        "Cantidad": "2",
        "Nombre": "Chile Guajillo",
        "Presentacion": "1 KG"
      },
      {
        "Cantidad": "14",
        "Nombre": "Chile jalape\u00f1o en rajas",
        "Presentacion": "220 GR"
      },
      {
        "Cantidad": "12",
        "Nombre": "Concentrado para agua",
        "Presentacion": "1.89 LT"
      },
      {
        "Cantidad": "2",
        "Nombre": "Consome de pollo",
        "Presentacion": "3.5 KG"
      },
      {
        "Cantidad": "72",
        "Nombre": "Elote en lata",
        "Presentacion": "400 GR"
      },
      {
        "Cantidad": "166",
        "Nombre": "Frijol refrito",
        "Presentacion": "430 GR"
      },
      {
        "Cantidad": "40",
        "Nombre": "Galletas salada",
        "Presentacion": "186 GR"
      },
      {
        "Cantidad": "10",
        "Nombre": "Harina de maiz",
        "Presentacion": "1 KG"
      },
      {
        "Cantidad": "2",
        "Nombre": "Huevo",
        "Presentacion": "150 PZ"
      },
      {
        "Cantidad": "66",
        "Nombre": "Leche desalactosada",
        "Presentacion": "1 LT"
      },
      {
        "Cantidad": "30",
        "Nombre": "Lenteja",
        "Presentacion": "500 GR"
      },
      {
        "Cantidad": "2",
        "Nombre": "Aderezo mayonesa",
        "Presentacion": "2.5 KG"
      },
      {
        "Cantidad": "200",
        "Nombre": "Pasta para sopa corta",
        "Presentacion": "200 GR"
      },
      {
        "Cantidad": "100",
        "Nombre": "Pasta tipo spaguetti",
        "Presentacion": "200 GR"
      },
      {
        "Cantidad": "5",
        "Nombre": "Sal",
        "Presentacion": "1 KG"
      },
      {
        "Cantidad": "24",
        "Nombre": "Sardina en tomate",
        "Presentacion": "425 GR"
      },
      {
        "Cantidad": "10",
        "Nombre": "Garbanzo",
        "Presentacion": "500 GR"
      },
      {
        "Cantidad": "4",
        "Nombre": "Pure de tomate",
        "Presentacion": "3 KG"
      }
    ];
  
    // Get a reference to the select element
    var selectElement = document.getElementById('idProducto');
  
    // Add a default option
    var defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = 'Producto';
    selectElement.appendChild(defaultOption);
  
    // Loop through the JSON data and add options to the select element
    jsonData.forEach(function (item, index) {
        var option = document.createElement('option');
        option.value = (index + 1).toString(); // Increment the index to start from 1
        option.text = item.Nombre;
        selectElement.appendChild(option);
    });
    console.log("SELECT OPCIONES");
}

// function tablaInventario(){
//     const numComedorElement = document.getElementById('numComedorElement');
//     //const numComedor = numComedorElement.textContent;
//     const numComedor = numComedorElement.textContent;


//     const xhr = new XMLHttpRequest();
//     xhr.onload = function() {
//         const labels = [];
//         const data = [];
//         const result = JSON.parse(xhr.responseText);
//         const table = document.getElementById('inventarioComedor');
//         for (let i of result['table']) {
//             let row = table.insertRow(-1);
//             let cell1 = row.insertCell(0);
//             let cell2 = row.insertCell(1);
//             let cell3 = row.insertCell(2);
//             cell1.innerHTML = i['Cantidad'];
//             cell2.innerHTML = i['Nombre'];
//             cell3.innerHTML = i['Presentacion'];

//             labels.push(i['Cantidad']);
//             data.push(i['Nombre']);
//         }
//     };
//     xhr.open('GET',`http://54.197.177.119:8080/comedorInventario/${numComedor}` );
//     xhr.send();
//     };
    
// xhr.open('GET',`http://54.197.177.119:8080/comedorInventario/${numComedor}` );


// racionesDeHoy();
// donadasDeHoy();
// caliPromedio();
// estadoComedor();
// estadisticasComedor();
// colorCeldaCalidad ();
// preferenciaLugar();
// asistenciaComedorFechaEspecifica();
colorCeldaInventario();
opcionesInventario();
console.log('Opciones inventario');
// asistenciaComedorMes();
tablaInventario();



// Function to initialize and create the pie chart
// function createPieChart() {
//     var ctx = document.getElementById('tendenciaLugarComedor').getContext('2d');
//     var myChart = new Chart(ctx, {
//       type: 'pie',
//       data: {
//         labels: ['January', 'February', 'March', 'April', 'May'],
//         datasets: [{
//           label: 'Sample Data',
//           data: [12, 19, 3, 5, 2],
//           backgroundColor: 'rgba(75, 192, 192, 0.2)',
//           borderColor: 'rgba(75, 192, 192, 1)',
//           borderWidth: 1
//         }]
//       }
//     });
//   }
    


// function asistenciaPorMes(){
//     var ctx = document.getElementById('asistenciaPorMes').getContext('2d');
//     var myChart = new Chart(ctx, {
//         type: 'line',
//         data: {
//             labels: ['January', 'February', 'March', 'April', 'May'],
//             datasets: [{
//                 label: 'Sample Data',
//                 data: [12, 19, 3, 5, 2],
//                 backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                 borderColor: 'rgba(75, 192, 192, 1)',
//                 borderWidth: 1
//             }]
//         }
//     });
// }
// createPieChart();


