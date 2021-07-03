var miCliente = new Cliente("0", "Ramon", "Diaz", 0);
$("#tabla-creditos").hide();
var tablaVisible = false;
var SALARIO_CAMBIO_CATEGORIA = 1000
var TASA_ANUAL = 0.37;
var INTERES_MENSUAL = TASA_ANUAL / 12;
var MAXIMO_CATEGORIA_1 = 1500;

function ingresarSalario() {
    var salario = parseInt(prompt("Ingrese su salario"));
    if(!salario) {
        return;
    }
    miCliente.setSalario(salario)
    alert("Su salario es " + miCliente.getSalario());
    return salario;
}

function sumarCredito(salario) {

    if (!salario) {
        return;
    }
    if (salario <= SALARIO_CAMBIO_CATEGORIA) {
        var confirmarSolicitud = confirm(
            "Usted puede solicitar un crédito por un valor máximo de $"
            + MAXIMO_CATEGORIA_1
            + ". Con un interes mensual del " 
            + (INTERES_MENSUAL * 100).toFixed(2)
            + "% ¿Desea solicitarlo?");
        if(!confirmarSolicitud) {
            return;
        }
    }
    var credito = prompt("Ingrese el valor del credito");
    if (salario <= SALARIO_CAMBIO_CATEGORIA) {
        while (credito < 1 || credito > MAXIMO_CATEGORIA_1) {
            credito = prompt("Debe ingresar un valor entre 1 y 1500 Ingrese el valor del credito");
            if(!credito) return;
        }    
    }
    var valorCreditoConInteres = (credito * (1 + INTERES_MENSUAL)).toFixed(2);
    var mensajeCalculo =
        "un crédito por $" 
        + credito 
        + ". Deberás pagar al mes siguiente $" 
        + valorCreditoConInteres;
    confirmarSolicitud = confirm("Usted puede solicitar " + mensajeCalculo + ". ¿Desea solicitarlo?");
    miCliente.solicitarCredito(credito);
    alert("Solicitaste " + mensajeCalculo);
    return credito;
}

function iniciarFormulario() {
    var valorSalario = ingresarSalario();
    var credito = sumarCredito(valorSalario);
    if(credito) {
        actualizarListaCreditos();
    }
}

function buscarCreditoPorId(creditos, id) {
    return creditos.find(function(credito){
        return credito.id === id;
    });
}

function conciliarConServidor(creditos, callback) {
    obtenerCreditosDelServidor(function(data) {
        for (let credito of data) {
            if(!buscarCreditoPorId(creditos, credito.id)) {
                creditos.push(credito);
            }
        }
        callback(creditos);
    });
}

function actualizarListaCreditos() {
    var parrafoVacio = $("#estado-no-creditos-pedidos");
    var creditos = miCliente.getCreditos();
    var listaCreditos = $("#lista-creditos-pedidos");

    if (parrafoVacio) {
        parrafoVacio.remove();
    }
    listaCreditos.html("");
    for (var credito of creditos) {
        var liCredito = "<li>" + "Monto: " + credito.valor + "- Estado: " + credito.estado + "</li>";
        listaCreditos.append(liCredito);
    }

    if(!tablaVisible) {
        tablaVisible = true;
        $("#ver-creditos").slideUp(1, function() {
            $("#tabla-creditos").slideDown(1000);
        })
    }
}

function mostrarCreditos() {
    var creditos = obtenerCreditosGuardados(); // del localStorage
    conciliarConServidor(creditos, function(creditosConciliados) {
        miCliente.setCreditos(creditosConciliados)
        guardarCreditos(creditosConciliados);
        actualizarListaCreditos();
    });
}

function abrirDialogoAgente() {
    prompt("Enviale un mensaje a tu agente:");
}

$("#ver-creditos").click(mostrarCreditos);
$("#solicitar-credito").click(iniciarFormulario);
$("#btn-contactar-agente").click(abrirDialogoAgente);
$(document).keydown(function (event) {
    if (event.key === "Enter") {
        abrirDialogoAgente();
    }
});
