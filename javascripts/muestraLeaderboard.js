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
        
        var equiposMarcados = $("#rankingEquipos").children();  
        equiposSeleccionados = [];
    
        for(var i = 0; i < equiposMarcados.length; i++){
            if ($(equiposMarcados[i]).hasClass("equipoCSS"))
            equiposSeleccionados.push(equiposMarcados[i].id);            
        }

        guardarEquiposFavoritosEnLocalStorage(equiposSeleccionados);
        guardarEquiposFavoritosEnBD(equiposSeleccionados);
    });
});

$(function(){ 
    $("body").on("click","#btnIntegrantesFavoritos",function(e) {
        
        var integrantesMarcados = $("#rankingIntegrantes").children();
        integrantesSeleccionados = [];
    
        for(var i = 0; i < integrantesMarcados.length; i++){
            if ($(integrantesMarcados[i]).hasClass("equipoCSS"))
            integrantesSeleccionados.push(integrantesMarcados[i].id);            
        }

        guardarIntegrantesFavoritosEnLocalStorage(integrantesSeleccionados);
        guardarIntegrantesFavoritosEnBD(integrantesSeleccionados);
    });
});

function guardarEquiposFavoritosEnLocalStorage(equiposFavoritos){
    localStorage.setItem("equiposFavoritos", JSON.stringify(equiposFavoritos));        
}

function recuperarEquiposFavoritosDesdeLocalStorage(){
    var result = JSON.parse(window.localStorage.getItem("equiposFavoritos"));
    if(result != null)
        return result;
    else
        return [];
}

function guardarIntegrantesFavoritosEnLocalStorage(integrantesFavoritos){
    localStorage.setItem("integrantesFavoritos", JSON.stringify(integrantesFavoritos));        
}

function recuperarIntegrantesFavoritosDesdeLocalStorage(){
    var result = JSON.parse(window.localStorage.getItem("integrantesFavoritos"));
    if(result != null)
        return result;
    else
        return [];
}

function guardarIntegrantesFavoritosEnBD(integrantes){
    const integrantesString = JSON.stringify(integrantes);
   $.ajax({
        url: './api/integrantesFavoritos',
        type: 'POST',
        data: JSON.stringify({integrantesFavoritos: JSON.parse(integrantesString)}),
        contentType: "application/json",
        dataType: "json",
        success: function(data){ 
        },
        error: function(data) {
            window.localStorage.setItem("integrantesFavoritos", integrantesString);
        }
    });
}

function recuperarIntegrantesFavoritosDesdeBD(callback) {
	$.ajax({
	    url: './api/integrantesFavoritos',
	    type: 'GET',
	    success: function(data){ 
	        callback(data);
	    },
	    error: function(data) {
		    return window.localStorage.getItem("integrantesFavoritos");
	    }
	});
}

function guardarEquiposFavoritosEnBD(equipos){
    const equiposString = JSON.stringify(equipos);
   $.ajax({
        url: './api/equiposFavoritos',
        type: 'POST',
        data: JSON.stringify({equiposFavoritos: JSON.parse(equiposString)}),
        contentType: "application/json",
        dataType: "json",
        success: function(data){ 
        },
        error: function(data) {
            window.localStorage.setItem("equiposFavoritos", equiposString);
        }
    });
}

function recuperarEquiposFavoritosDesdeBD(callback) {
	$.ajax({
	    url: './api/equiposFavoritos',
	    type: 'GET',
	    success: function(data){ 
	        callback(data);
	    },
	    error: function(data) {
		    return window.localStorage.getItem("equiposFavoritos");
	    }
	});
}



$(document).ready(mostrarRankings());
