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
      console.log(data);
    })
    .catch((error) => console.error("Error:", error));
}
