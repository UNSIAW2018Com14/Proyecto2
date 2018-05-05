function mostrarEquipos (datosEquipos){
    for (i = 0; i < datosEquipos.equipos.length; i++) {
       var id = "equipo"+(i+1);
       var equipo = datosEquipos.equipos[i];
       $("#muestraEquipos").append($("<li></li>").addClass("list-group-item").addClass("muestras").attr("id",id).prop("equipo", i).text(equipo.nombre));
    }
}

function mostrarIntegrantes(datosEquipos, idEquipo) {
    for (i = 0; i < datosEquipos.equipos[idEquipo].integrantes.length; i++) {
       var id = "integrante" + (i+1);
       var integrante = datosEquipos.equipos[idEquipo].integrantes[i];
       var equipo = datosEquipos.equipos[idEquipo];
       $("#muestraIntegrantes").append($("<li></li>").addClass("list-group-item").addClass("muestras").attr("id",id).prop("integrante", i).text(integrante.nickname));
    }
    return equipo.icono;
}

function mostrarIntegrantesVacio (){
   for (i = 0; i < 3; i++) {
       var text = "Integrante " + (i+1);
       $("#muestraIntegrantes").append($("<li></li>").addClass("list-group-item").addClass("muestras").text(text));
   }
}

function mostrarInformacionVacia (){
    $("#nombre").text("Nombre: ").addClass("muestras");
    $("#apellido").text("Apellido: ").addClass("muestras");
    $("#edad").text("Edad: ").addClass("muestras");
    $("#favCard").text("Carta Favorita: ").addClass("muestras");
    $("#favClass").text("Clase Favorita: ").addClass("muestras");
}

function mostrarInformacion (datosEquipos, equipoElegido, datosIntegrantes, integranteElegido){
    var integrantes = ordenarIntegrantes (datosEquipos, equipoElegido, datosIntegrantes);
    var integrante = integrantes[integranteElegido];
    $("#nombre").text("Nombre: " + integrante.nombre);
    $("#apellido").text("Apellido: "+ integrante.apellido);
    $("#edad").text("Edad: " + integrante.edad);
    $("#favCard").text("Carta Favorita: " + integrante.cartaFavorita);
    $("#favClass").text("Clase Favorita: " + integrante.claseFavorita);
    return integrante.foto;
}

function ordenarIntegrantes (datosEquipos, equipoElegido, datosIntegrantes) {
    var arrIntegrantes = [];
    var equipo = datosEquipos.equipos[equipoElegido];
    for (j = 0; j < equipo.integrantes.length;j++) {
        for (i = 0; i < datosIntegrantes.integrantes.length; i++) {
            var integrante = datosIntegrantes.integrantes[i];
            if (equipo.integrantes[j].nickname === integrante.nickname) {
                arrIntegrantes[j] = datosIntegrantes.integrantes[i];
            }
        }
    }
    return arrIntegrantes;
}

function mostrarIcono(icono) {
   var src = "./imagenes/" + icono;
   $("#equipoLogo").append('<img id="logo" alt="Logo del equipo" src= ' +src+' class="logo"/>');   
}

function mostrarFoto (foto){
    var src = "./imagenes/" + foto;
    $("#integranteFoto").append('<img id="foto" alt="Foto del integrante" src= ' +src+' class="logo"/>');   
}

function clickEquipo (e) {
    $("#muestraIntegrantes").empty();
    $("#equipoLogo").empty();
    $("#integranteFoto").empty();
    var equipo = $(e.target).prop("equipo");
    var icono = mostrarIntegrantes(jsonEquipos,equipo);
    mostrarIcono(icono);
    $("#muestraIntegrantes").children().on("click", {x:equipo},clickIntegrante);
    $(e.target).removeClass("muestras");
    $(e.target).addClass("equipoCSS");
    $(e.target).siblings().removeClass("equipoCSS");
    $(e.target).siblings().addClass("muestras");
    }
    
 function clickIntegrante (e) {
    $("#integranteFoto").empty();
    var integrante = $(e.target).prop("integrante");
    var foto = mostrarInformacion(jsonEquipos,e.data.x,jsonIntegrantes,integrante);
    mostrarFoto (foto);
    $(e.target).removeClass("muestras");
    $(e.target).addClass("equipoCSS");
    $(e.target).siblings().addClass("muestras");
 }

var jsonIntegrantes = JSON.parse($.getJSON({'url': "json/integrantes.json", 'async': false}).responseText);
var jsonEquipos = JSON.parse($.getJSON({'url': "json/equipos.json", 'async': false}).responseText);

$(document).ready(mostrarEquipos(jsonEquipos));
$(document).ready(mostrarIntegrantesVacio());
$(document).ready(mostrarInformacionVacia());
$(document).ready($("#muestraEquipos").children().click(clickEquipo));