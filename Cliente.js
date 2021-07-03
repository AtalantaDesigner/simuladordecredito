class Cliente {
    constructor (id, nombre, edad, salario) {
        this.id = id;
        this.nombre = nombre;
        this.edad = edad;
        this.salario = salario;
        this.creditos = [];
    }
    
    getEdad = function () { return this.edad; } 
    getNombre = function () { return this.nombre; } 
    getSalario = function () { return this.salario; } 
    
    setSalario = function (salario) { this.salario = salario }

    solicitarCredito = function (valorCredito) {
        var credito = {
            valor: valorCredito,
            estado: "PENDIENTE"
        };
        this.creditos.push(credito);
        guardarCreditos(this.creditos);
    };

    getCreditos = function () {
        function comparar(credito1, credito2) {
            if (credito1.valor < credito2.valor) {
                return -1;
              }
              if (credito1.valor > credito2.valor) {
                return 1;
              }
              return 0;
        }

        var creditosOrdenados = this.creditos.sort(comparar);
        return creditosOrdenados; 
    }

    setCreditos = function (creditos) {
        this.creditos = creditos;
    }

}
