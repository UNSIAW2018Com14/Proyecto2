function mostrarRankingEquipos (datosEquipos, datosBO5, datosIntegrantes){
    var arrPuntajes = obtenerPuntajeEquipos(datosEquipos, datosBO5, datosIntegrantes);
    for (i = 0; i < arrPuntajes.length; i++) {
        var equipoPuntaje = arrPuntajes[i];
        var nombre = equipoPuntaje[0];
        var puntaje = equipoPuntaje[1];
        $("#rankingEquipos").append($("<li></li>").text(nombre + " : " + puntaje).append("<hr></hr>"));
    }
}

function mostrarRankingIntegrantes (datosIntegrantes,datosBO5){
    var arrPuntajes = obtenerPuntajes(datosBO5, datosIntegrantes);
    for (var i = 0; i< arrPuntajes.length; i++) {
        var jugadorPuntaje = arrPuntajes[i];
        var nick = jugadorPuntaje[0];
        var puntaje = jugadorPuntaje[1];
        $("#rankingIntegrantes").append($("<li></li>").text(nick + " : " + puntaje).append("<hr></hr>"));
    }
}

function obtenerJugadores (datosIntegrantes) {
    var arrJugadores = [];
    for (var i = 0; i < datosIntegrantes.integrantes.length; i++){
        var jugador = datosIntegrantes.integrantes[i];
        arrJugadores[i] = jugador.nickname;
    }
    return arrJugadores;
}

function obtenerPuntajes (datosBO5, datosIntegrantes){
    var arrJugadores = obtenerJugadores(datosIntegrantes);
    var arrPuntajes = [];
    for (var h = 0; h < datosIntegrantes.integrantes.length; h++){
        var puntajeJugador = [];
        var jugador = arrJugadores[h];
        puntajeJugador [0] = jugador;
        puntajeJugador[1] = obtenerPuntajeJugador(jugador, datosBO5);
        arrPuntajes[h] = puntajeJugador;
    }
    arrPuntajes.sort(function(a, b){
        if (a[1] === b[1]) {
            return 0;
            }
        else {
        return (a[1] < b[1]) ? 1 : -1;
                }
            });
    return arrPuntajes;   
}

function obtenerPuntajeJugador (jugador, datosBO5) {
    var toReturn = 0;
    for (var i = 0; i < datosBO5.bo5.length;i++) {
        if (datosBO5.bo5[i].Resultado === jugador) {
            toReturn++;
        }
    }
    return toReturn;
}

function obtenerPuntajeEquipos(datosEquipos, datosBO5) {
    
    var arrPuntajesEquipos = [];
    for(var i=0; i<datosEquipos.equipos.length;i++){ 
        var puntaje = calcularPuntajeEquipo(datosBO5, datosEquipos.equipos[i]);
        var arrAux = [];
        arrAux[0] = datosEquipos.equipos[i].nombre;
        arrAux[1] = puntaje;
        arrPuntajesEquipos[i] = arrAux;   
    }
    arrPuntajesEquipos.sort(function(a, b){
        if (a[1] === b[1]) {
            return 0;
            }
        else {
        return (a[1] < b[1]) ? 1 : -1;
            }
        });
    return arrPuntajesEquipos;
}

function calcularPuntajeEquipo (datosBO5, equipo) {
    var suma = 0;
    for(var i=0; i< equipo.integrantes.length; i++){
        suma += obtenerPuntajeJugador(equipo.integrantes[i].nickname, datosBO5);
    }
    return suma;
}

var jsonIntegrantes = JSON.parse($.getJSON({'url': "json/integrantes.json", 'async': false}).responseText);
var jsonEquipos = JSON.parse($.getJSON({'url': "json/equipos.json", 'async': false}).responseText);
var jsonBO5 = JSON.parse($.getJSON({'url': "json/bo5.json", 'async': false}).responseText);

$(document).ready(mostrarRankingEquipos(jsonEquipos,jsonBO5,jsonIntegrantes));
$(document).ready(mostrarRankingIntegrantes(jsonIntegrantes, jsonBO5));


