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
        data: JSON.stringify({intFavs: JSON.parse(integrantesString)}),
        contentType: "application/json",
        dataType: "json",
        success: function(data){ 
        },
        error: function(data) {
            window.localStorage.setItem("integrantesFavoritos", intFavs);
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
            window.localStorage.setItem("equiposFavoritos", equiposFavoritos);
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

function guardarEstiloEnBD(estilo){
    const estiloString = JSON.stringify(estilo);
   $.ajax({
        url: './api/estilo',
        type: 'POST',
        data: JSON.stringify({estilo: JSON.parse(estiloString)}),
        contentType: "application/json",
        dataType: "json",
        success: function(data){ 
        },
        error: function(data) {
            window.localStorage.setItem("estilo", estiloString);
        }
    });
}


function recuperarEstiloDesdeBD(callback) {
	$.ajax({
	    url: './api/estilo',
	    type: 'GET',
	    success: function(data){ 
	        callback(data);
	    },
	    error: function(data) {
		    var result = window.localStorage.getItem("estilo");
	    }
	});
}

function guardarEstiloEnLocalStorage(estilo) {
    localStorage.setItem("estilo", estilo);        
}

function recuperarEstiloDesdeLocalStorage(){
    var toReturn = window.localStorage.getItem("estilo");
    return toReturn;
}