function mostrarEnfrentamientos (datosBO5){
     for (i = 0; i < datosBO5.bo5.length; i++) {
       var bo5 = datosBO5.bo5[i];
       $("#enfrentamientos").append($("<li></li>").addClass("list-group-item").addClass("muestras").text("Enfrentamiento:" + (i+1) + " Dia: " + bo5.dia + " Hora: "+ bo5.hora));
       $("#enfrentamientos").append($("<li></li>").addClass("list-group-item").addClass("muestras").text(bo5.nickIntegrante1 +" vs " + bo5.nickIntegrante2));
       $("#enfrentamientos").append($("<li></li>").addClass("list-group-item").addClass("muestras").text("Ganador: " + bo5.Resultado));
       $("#enfrentamientos").append($("<br></br>"));
    }
}


var jsonBO5 = JSON.parse($.getJSON({'url': "json/bo5.json", 'async': false}).responseText);

$(document).ready(mostrarEnfrentamientos(jsonBO5));