function obtenerCreditosGuardados() {
    var creditosGuardados = window.localStorage.getItem('creditos');
    return JSON.parse(creditosGuardados) || [];
}

function guardarCreditos(creditos) {
    window.localStorage.setItem('creditos', JSON.stringify(creditos));
}
