function mostrarRankings (){
    $.get("./api/integrantes", function(integrantes) {
        $.get("./api/bo5s", function(bo5s) {
            $.get("./api/equipos", function(equipos) {
                mostrarIntegrantes(integrantes,bo5s);
                mostrarEquipos(integrantes,bo5s,equipos);
            });
        });
    });
}

function mostrarIntegrantes (integrantes,bo5s){
    var arrPuntajes = obtenerPuntajes(bo5s, integrantes);
    for (var i = 0; i< arrPuntajes.length; i++) {
        var jugadorPuntaje = arrPuntajes[i];
        var nick = jugadorPuntaje[0];
        var puntaje = jugadorPuntaje[1];
        favs = $("#rankingIntegrantes").append($("<li></li>").text(nick + " : " + puntaje).attr("id",nick).append("<hr></hr>").click(clickEquipo));
    }

    recuperarIntegrantesFavoritosDesdeBD(function(integrantesRecuperados){
        if(integrantesRecuperados == undefined){
            integrantesRecuperados = recuperarIntegrantesFavoritosDesdeLocalStorage();
        }
        for(var i = 0; i < integrantesRecuperados.length; i++){
            document.getElementById(integrantesRecuperados[i]).classList.add('equipoCSS');
            if (integrantesRecuperados[i] == favs.attr("id")){   
                favs.addClass("EquipoCSS");
            }
        } 
    });
}

function obtenerPuntajes (bo5s, integrantes){
    var arrJugadores = obtenerJugadores(integrantes);
    var arrPuntajes = [];
    for (var h = 0; h < integrantes.length; h++){
        var puntajeJugador = [];
        var jugador = arrJugadores[h];
        puntajeJugador [0] = jugador;
        puntajeJugador[1] = obtenerPuntajeJugador(jugador, bo5s);
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

function obtenerJugadores (integrantes) {
    var arrJugadores = [];
    for (var i = 0; i < integrantes.length; i++){
        var jugador = integrantes[i];
        arrJugadores[i] = jugador.nickname;
    }
    return arrJugadores;
}

function mostrarEquipos (integrantes, bo5s, equipos){
    var arrPuntajes = obtenerPuntajeEquipos(equipos, bo5s);
    for (i = 0; i < arrPuntajes.length; i++) {
        var equipoPuntaje = arrPuntajes[i];
        var nombre = equipoPuntaje[0];
        var puntaje = equipoPuntaje[1];
        var favs = $("#rankingEquipos").append($("<li></li>").text(nombre + " : " + puntaje).append("<hr></hr>").attr("id",nombre).click(clickEquipo));
    }
    recuperarEquiposFavoritosDesdeBD(function(equiposRecuperados){
        if(equiposRecuperados == undefined){
            equiposRecuperados = recuperarEquiposFavoritosDesdeLocalStorage();
        }
        for(var i = 0; i < equiposRecuperados.length; i++){
            document.getElementById(equiposRecuperados[i]).classList.add('equipoCSS');
            if (equiposRecuperados[i] == favs.attr("id")){   
                favs.addClass("EquipoCSS");
            }
        } 
    });
}

function obtenerPuntajeEquipos(equipos, bo5s) {
    
    var arrPuntajesEquipos = [];
    for(var i=0; i<equipos.length;i++){ 
        var puntaje = calcularPuntajeEquipo(bo5s, equipos[i]);
        var arrAux = [];
        arrAux[0] = equipos[i].nombre;
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

function calcularPuntajeEquipo (bo5s, equipo) {
    var suma = 0;
    for(var i=0; i< equipo.integrantes.length; i++){
        suma += obtenerPuntajeJugador(equipo.integrantes[i], bo5s);
    }
    return suma;
}

function obtenerPuntajeJugador (jugador, bo5s) {
    var toReturn = 0;
    for (var i = 0; i < bo5s.length;i++) {
        if (bo5s[i].Resultado === jugador) {
            toReturn++;
        }
    }
    return toReturn;
}

function clickEquipo (e) {
    $(e.target).toggleClass("equipoCSS");
    }

 $(function(){ 
    $("body").on("click","#btnEquiposFavoritos",function(e) {
        
        var marcados = $("#rankingEquipos").children();  
        seleccionados = [];
    
        for(var i = 0; i < marcados.length; i++){
            if ($(marcados[i]).hasClass("equipoCSS"))
            seleccionados.push(marcados[i].id);            
        }

        guardarEquiposFavoritosEnLocalStorage(seleccionados);
        guardarEquiposFavoritosEnBD(seleccionados);
    });
});

$(function(){ 
    $("body").on("click","#btnIntegrantesFavoritos",function(e) {
        
        var marcados = $("#rankingIntegrantes").children();
        seleccionados = [];
    
        for(var i = 0; i < marcados.length; i++){
            if ($(marcados[i]).hasClass("equipoCSS"))
            seleccionados.push(marcados[i].id);            
        }

        guardarIntegrantesFavoritosEnLocalStorage(seleccionados);
        guardarIntegrantesFavoritosEnBD(seleccionados);
    });
});


$(document).ready(mostrarRankings());
