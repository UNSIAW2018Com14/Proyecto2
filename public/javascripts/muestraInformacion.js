var esEditor = $('#some-link').data('id');

function mostrarEnfrentamientos (bo5s){
	$.get("./api/bo5s", function(bo5s) {
	     for (i = 0; i < bo5s.length; i++) {
		   var bo5 = bo5s[i];
		   var dia = obtenerFecha(bo5s[i].dia);
		   if (!esFechaFutura(dia)){
				$("#enfrentamientos").append($("<li></li>").addClass("list-group-item").addClass("muestras").text("Enfrentamiento " + bo5.idBo5));
				$("#enfrentamientos").append($("<li></li>").addClass("list-group-item").addClass("muestras").text(" Dia: " + bo5.dia));
                $("#enfrentamientos").append($("<li></li>").addClass("list-group-item").addClass("muestras").text(bo5.nickIntegrante1 +" vs " + bo5.nickIntegrante2));
                if (bo5.Resultado)
                    $("#enfrentamientos").append($("<li></li>").addClass("list-group-item").addClass("muestras").text("Ganador: " + bo5.Resultado));
                if (bo5.comentarios.length != 0)
                    $("#enfrentamientos").append($("<li></li>").addClass("list-group-item").addClass("muestras").text("Comentarios: " + bo5.comentarios));
                    /*
                if (esEditor) {
                    var comentario = $("#enfrentamientos").append($("<li></li>").addClass("list-group-item").addClass("muestras")); 
                }
                */
				$("#enfrentamientos").append($("<br></br>"));
			}
	    }
	});
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
    //formato dd/mm
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

$(document).ready(mostrarEnfrentamientos());
