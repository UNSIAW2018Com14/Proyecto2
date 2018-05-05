function mostrarEquipos (datosInstancias, datosEnfrentamientos) {
    for (k=0; k < datosInstancias.instancias.length; k++) {
        for (j = 0; j< datosInstancias.instancias[k].enfrentamientos.length; j++){
            for (i=0; i< datosEnfrentamientos.enfrentamientos.length; i++){
                if (datosInstancias.instancias[k].enfrentamientos[j].idEnfrentamiento === datosEnfrentamientos.enfrentamientos[i].idEnfrentamiento){
                    var fecha = $("#fecha").append($("<tr></tr>"));
                    var equipo1 = $("#equipo1").append($("<tr></tr>"));
                    var equipo2 = $("#equipo2").append($("<tr></tr>"));
                    if (i % 2 === 0)
                       fecha.append($("<td></td>").text(datosInstancias.instancias[k].nombre));
                    else
                    fecha.append($("<td></td").text(datosInstancias.instancias[k].diaInicio + " - " + datosInstancias.instancias[k].diaFin));
                    equipo1.append($("<td></td").text(datosEnfrentamientos.enfrentamientos[i].equipo1));
                    equipo2.append($("<td></td").text(datosEnfrentamientos.enfrentamientos[i].equipo2));
                }
            }
        }
    }
}

var jsonInstancias = JSON.parse($.getJSON({'url': "json/instancias.json", 'async': false}).responseText);
var jsonEnfrentamientos = JSON.parse($.getJSON({'url': "json/enfrentamientos.json", 'async': false}).responseText);

$(document).ready(mostrarEquipos(jsonInstancias, jsonEnfrentamientos));

