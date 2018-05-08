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

