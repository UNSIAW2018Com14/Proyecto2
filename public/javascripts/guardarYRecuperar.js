function guardarEquiposFavoritosEnLocalStorage(favoritos){
    localStorage.setItem("favoritos", favoritos);        
}

function recuperarEquiposFavoritosDesdeLocalStorage(){
    var result = window.localStorage.getItem("favoritos");
    if(result != null)
        return result;
    else
        return [];
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
            window.localStorage.setItem("favoritos", equiposString);
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
		    return window.localStorage.getItem("favoritos");
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