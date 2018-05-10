function mostrarEquipos () {
    $.get("./api/instancias", function(instancias) {
        $.get("./api/enfrentamientos", function(enfrentamientos) {
            obtenerEquipos(instancias,enfrentamientos);
        });
    });
}

function obtenerEquipos (instancias, enfrentamientos){
    for (k=0; k < instancias.length; k++) {
        for (j = 0; j< instancias[k].enfrentamientos.length; j++){
            for (i=0; i< enfrentamientos.length; i++){ 
                var fechaEnfrentamiento = obtenerFecha(instancias[k].fechaFin);
                if (instancias[k].enfrentamientos[j] === enfrentamientos[i].idEnfrentamiento){
                    if (esFechaFutura(fechaEnfrentamiento)) {
                        var fecha = $("#fecha").append($("<tr></tr>"));
                        var equipo1 = $("#equipo1").append($("<tr></tr>"));
                        var equipo2 = $("#equipo2").append($("<tr></tr>"));
                        if (i % 2 === 0)
                        fecha.append($("<td></td>").text(instancias[k].nombre));
                        else
                        fecha.append($("<td></td").text(instancias[k].fechaInicio + " - " + instancias[k].fechaFin));
                        equipo1.append($("<td></td").text(enfrentamientos[i].equipo1));
                        equipo2.append($("<td></td").text(enfrentamientos[i].equipo2));
                    }
                }
            }
        }
    }
}

function esFechaFutura (fechaEnfrentamiento){
    today = obtenerFechaActual();
    var cumple = false;
    if (fechaEnfrentamiento.getFullYear() > today.getFullYear())
        cumple = true;
    else
        if (fechaEnfrentamiento.getFullYear() === today.getFullYear())
            if (fechaEnfrentamiento.getMonth() > today.getMonth())
                cumple = true;
            else 
                if (fechaEnfrentamiento.getMonth() === today.getMonth())
                    if (fechaEnfrentamiento.getDate() > today.getDate())
                        cumple = true;
            return cumple;
}

function obtenerFechaActual (){
    //formato dd/mm/yyyy
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yy = today.getFullYear();
    if(dd<10) {
        dd = '0'+dd;
    } 
    if(mm<10) {
        mm = '0'+mm;
    } 
    today.setMonth(mm);
    today.setDate(dd);
    today.setFullYear(yy);
    return today;   
}

function obtenerFecha (strFecha){
    parts = strFecha.split('/');
    var mydate = new Date();
    // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
    // January - 0, February - 1, etc.
    var dd = parts[0];
    var mm = parts[1];
    var yy = parts[2];
    mydate.setMonth(mm);
    mydate.setDate(dd);
    mydate.setFullYear(yy);
    return mydate;
}

$(document).ready(mostrarEquipos());


