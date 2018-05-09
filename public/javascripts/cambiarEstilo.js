var estilo;

$(function(){
    
    var recuperarEstilo = recuperarEstiloDesdeBD(function(estiloRecuperado){
        setEstilo(estiloRecuperado);
    });
    
    if(recuperarEstilo == undefined)
        estilo = recuperarEstiloDesdeLocalStorage();
    if (recuperarEstilo == undefined)
        setEstilo(0);
    else 
        estilo = recuperarEstilo;

    $("#btnEstilo").click(function() {
       guardarEstiloEnLocalStorage(estilo);
       guardarEstiloEnBD(estilo);
       estilo = setEstilo(estilo);
    });

});


function setEstilo(estilo){
    if(estilo==0){ 
        $("link[href='stylesheets/estilo.css']").attr("href", "stylesheets/estilo2.css");
        estilo = 1;
    }
    else{
        $("link[href='stylesheets/estilo2.css']").attr("href", "stylesheets/estilo.css");
        estilo=0;
    }
    return estilo;
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

