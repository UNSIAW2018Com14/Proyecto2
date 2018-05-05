function clickEquipo (e) {
    $("#muestraIntegrantes").empty();
    $("#equipoLogo").empty();
    $("#integranteFoto").empty();
    var equipo = e.target.id;
    mostrarIntegrantes(equipo);
    $("#muestraIntegrantes").children().on("click", {x:equipo},clickIntegrante);
    $(e.target).removeClass("muestras");
    $(e.target).addClass("equipoCSS");
    $(e.target).siblings().removeClass("equipoCSS");
    $(e.target).siblings().addClass("muestras");
    }

function mostrarIntegrantes(equipo) {
  $.get("./api/equipos", function(equipos) {
      $.each(equipos,function(key,Equipos){
        if (Equipos.nombre === equipo){
          icono = Equipos.icono;
          for (i=0; i< Equipos.integrantes.length; i++){
            var nickname = Equipos.integrantes[i];
            $("#muestraIntegrantes").append($("<li></li>").addClass("list-group-item").addClass("muestras").attr("id",nickname).text(nickname));
          }
          var src = "./images/" + icono;
          $("#equipoLogo").append('<img id="logo" alt="Logo del equipo" src= ' +src+' class="logo"/>');
          $("#muestraIntegrantes").children().on("click", {x:equipo},clickIntegrante); 
        }
      });
    });
}

function clickIntegrante (e) {
    $("#integranteFoto").empty();
    var integrante = e.target.id;
    var foto = mostrarInformacion(e.data.x,integrante);
    $(e.target).removeClass("muestras");
    $(e.target).addClass("equipoCSS");
    $(e.target).siblings().addClass("muestras");
 }

function mostrarInformacion (equipoElegido, integranteElegido){
$.get("./api/equipos", function(equipos) {
  $.get("./api/integrantes", function(integrantes) {
      $.each(equipos,function(key,Equipos){
        if (Equipos.nombre === equipoElegido){
          $.each(integrantes,function(key,Integrantes){
            if (Integrantes.nickname === integranteElegido){
              $("#nombre").text("Nombre: " + Integrantes.nombre);
              $("#apellido").text("Apellido: "+ Integrantes.apellido);
              $("#edad").text("Edad: " + Integrantes.edad);
              $("#favCard").text("Carta Favorita: " + Integrantes.cartaFavorita);
              $("#favClass").text("Clase Favorita: " + Integrantes.claseFavorita);
              var src = "./images/" + Integrantes.foto;
              $("#integranteFoto").append('<img id="foto" alt="Foto del integrante" src= ' +src+' class="logo"/>');  
            }
        });
      }
      });
    });
});
}

$('#muestraIntegrantes').one("click",function(){
  $("#infoIntegrante").append('<h2><div class="titulos"> Información personal del integrante</div> </h2>');
  $("#infoIntegrante").append('<ul class="list-group" id = "informacionIntegrante">');
  $("#informacionIntegrante").append('<li class="list-group-item muestras" id="nombre"></li>');
  $("#informacionIntegrante").append('<li class="list-group-item muestras" id="apellido" ></li>');
  $("#informacionIntegrante").append('<li class="list-group-item muestras" id="edad" ></li>');
  $("#informacionIntegrante").append('<li class="list-group-item muestras" id="favCard"> </li>');
  $("#informacionIntegrante").append('<li class="list-group-item muestras" id = "favClass"></li>');
  $("#informacionIntegrante").append('</ul>'); 
});

$('#muestraEquipos').one("click",function (){
  $("#tituloIntegrantes").prepend('<h2><div class="titulos">Listado de integrantes</div> </h2>');
});

$(document).ready($("#muestraEquipos").children().click(clickEquipo));

