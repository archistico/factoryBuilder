function log(testo) {
    console.log(testo);
}

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

class Elemento {
    constructor(id, nome, acquisto, vendita) {
        this.id = id;
        this.nome = nome;
        this.acquisto = acquisto;
        this.vendita = vendita;
    }

    toString() {
        return 'id: ' + pad(this.id, 4) + ' | nome: ' + pad(this.nome, 4) + ' \t| prezzo di acquisto: € ' + pad(this.acquisto.toFixed(2), 4) + ' | prezzo di vendita: € ' + pad(this.vendita.toFixed(2), 4);
    }
}

class ElementoInventario {
    constructor(elemento, quantita) {
        this.elemento = elemento;
        this.quantita = quantita;
    }

    toString() {
        return 'qt: ' + pad(this.quantita, 4) + ' | ' + this.elemento.toString();
    }

    btnAdd() {
        if (this.quantita < 9999) {
            this.quantita += 1;
        }
    }

    btnRemove() {
        if (this.quantita > 0) {
            this.quantita -= 1;
        }
    }
}

class Inventario {
    constructor() {
        this.inventario = [];
    }

    Add(elemento, quantita) {
        var elementoInventario = new ElementoInventario(elemento, quantita);
        this.inventario.push(elementoInventario);
    }

    toString() {
        let risultato = '';
        this.inventario.forEach(function (elemento) {
            risultato += elemento.toString() + '\n';
        });
        return risultato;
    }

    Visualize() {
        let app_div = document.getElementById("app");
        app_div.innerHTML = null;

        this.inventario.forEach(function (elementoInventario) {
            let el = document.createElement("div");
            el.className = "elemento";

            let quantita = document.createElement("div");
            quantita.innerHTML = 'Quantità: '+pad(elementoInventario.quantita, 4);
            quantita.className = "quantita";

            // let id = document.createElement("div");
            // id.innerHTML = pad(elementoInventario.elemento.id, 4);
            // id.className = "id";

            let nome = document.createElement("div");
            nome.innerHTML = elementoInventario.elemento.nome
            nome.className = "nome";

            let acquisto = document.createElement("div");
            acquisto.innerHTML = 'Acquisto: € ' + elementoInventario.elemento.acquisto.toFixed(2);
            acquisto.className = "acquisto";

            let vendita = document.createElement("div");
            vendita.innerHTML = 'Vendita : € ' + elementoInventario.elemento.vendita.toFixed(2);
            vendita.className = "vendita";

            let add = document.createElement("button");
            add.onclick = function () { 
                if(elementoInventario.quantita<9999) {
                    elementoInventario.btnAdd();
                    portafoglio.Remove(elementoInventario.elemento.acquisto); 
                }
                UpdateScreen(); 
            };
            add.innerHTML = "+";
            add.className = "button buttonAdd";

            let remove = document.createElement("button");
            remove.onclick = function () { 
                if(elementoInventario.quantita>0) {
                    elementoInventario.btnRemove(); 
                    portafoglio.Add(elementoInventario.elemento.vendita); 
                }                
                UpdateScreen(); 
            };
            remove.innerHTML = "-";
            remove.className = "button buttonRemove";

            el.appendChild(quantita);
            // el.appendChild(id);
            el.appendChild(nome);
            el.appendChild(acquisto);
            el.appendChild(vendita);
            el.appendChild(add);
            el.appendChild(remove);

            app_div.appendChild(el);
        });
    }
}

class Portafoglio {
    constructor(denaro) {
        this.denaro = denaro;
    }

    Add(denaro) {
        this.denaro += denaro;
    }

    Remove(denaro) {
        this.denaro -= denaro;
    }

    toString() {
        return '€ ' + this.denaro.toFixed(2);
    }

    Visualize() {
        let portafoglio_div = document.getElementById("portafoglio");
        portafoglio_div.innerHTML = null;

        let attuale = document.createElement("div");
        attuale.innerHTML = this.toString();

        portafoglio_div.appendChild(attuale);
    }
}

/**
 * Elementi
 */

let cemento = new Elemento(1, 'Cemento', 5, 4);
let acqua = new Elemento(2, 'Acqua', 0.01, 0);
let legno = new Elemento(3, 'Legno', 2, 1.5);
let ferro = new Elemento(4, 'Ferro', 1.5, 1);

/**
 * Inventario
 */

let inventario = new Inventario();
inventario.Add(cemento, 5);
inventario.Add(acqua, 100);
inventario.Add(legno, 20);
inventario.Add(ferro, 20);

inventario.Visualize();

/**
 * Portafoglio
 */
let portafoglio = new Portafoglio(1000);
portafoglio.Visualize();

//log(portafoglio.toString());
//log(inventario.toString());

/**
 * Update screen value
 */

function UpdateScreen() {
    inventario.Visualize();
    portafoglio.Visualize();
}