/*Función para renderizar las ciudades y el tipo de vivienda en los selects*/
(RenderCitysAndTypes = async () => {
  let i,
    data = await HttpMethod("get", { select: true }),
    citys = JSON.parse(data.split("|")[0]),
    types = JSON.parse(data.split("|")[1]);
  for (i in citys) {
    $("#selectCiudad").append(`<option value="${citys[i]}" >${citys[i]}</option>`);
  }
  for (i in types) {
    $("#selectTipo").append(`<option value="${types[i]}" >${types[i]}</option>`);
  }
  $('select').formSelect();
})();


/*Evento para mostrar todos los registros */
$("#mostrarTodos").click(async () => RenderHTML(JSON.parse(await HttpMethod("get", {
   all: true, }))));

/*Evento para mostrar registros por filtros */
$("#mostrarFiltros").click(async e => {
  e.preventDefault();
  RenderHTML(JSON.parse(await HttpMethod("post", {
    filter1: true,
    city: $("#selectCiudad").val(),
    type: $("#selectTipo").val(),
    range: $("#rangoPrecio").val()
  })));
});

/*Función para pintar las cards en el html */
RenderHTML = data => {
  let dataHtml = [];
  data.forEach(element => {
    dataHtml += `
                <div class="itemMostrado card horizontal">
                <img src="img/home.jpg">
              <div class="card-stacked">
                <div class="card-content">
                  <div>
                    <b>Direccion: </b>${element.Direccion}<p></p>
                  </div>
                  <div>
                    <b>Ciudad: </b>${element.Ciudad}<p></p>
                  </div>
                  <div>
                    <b>Telefono: </b>${element.Telefono}<p></p>
                  </div>
                  <div>
                    <b>Código postal: </b>${element.Codigo_Postal}<p></p>
                  </div>
                  <div class="in">
                    <p class="red-text"><b class="black-text">Precio:</b>${element.Precio}</p>
                  </div>
                  <div>
                <b>Tipo: </b>${element.Tipo}<p></p>
                  </div>
                </div>
                <div class="card-action right-align">
                <a href="#">Ver más</a>
                </div>
              </div>
            </div>
    `;
  });
  data.length > 0 ? $("#dataHtml").html(dataHtml) : alert("No Hay datos para mostrar");
}

/*Función que retorna peticiones ajax */
function HttpMethod(method, data) {
  return $.ajax({ url: "./buscador.php", method, data });
}