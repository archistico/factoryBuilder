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
}

class Inventario {
    constructor() {
        this.inventario = [];
    }

    Add(elemento, quantita) {
        var elementoInventario = new ElementoInventario(elemento, quantita);
        this.inventario.push(elementoInventario);
        bloccoInventario(elementoInventario);
    }

    toString() {
        let risultato = '';
        this.inventario.forEach(function(elemento) {
            risultato+=elemento.toString()+'\n';
        });
        return risultato;
    }
}

let cemento = new Elemento(1, 'Cemento', 5, 4);
let acqua = new Elemento(2, 'Acqua', 0.01, 0);
let legno = new Elemento(3, 'Legno', 2, 1.5);
let ferro = new Elemento(4, 'Ferro', 1.5, 1);

let inventario = new Inventario();
inventario.Add(cemento, 5);
inventario.Add(acqua, 100);
inventario.Add(legno, 20);
inventario.Add(ferro, 20);

log(inventario.toString());

function bloccoInventario(elementoInventario) {
    let el = document.createElement("div");
    el.className = "elemento";
    
    let quantita = document.createElement("div");
    quantita.innerHTML = pad(elementoInventario.quantita,4);
    quantita.className = "quantita";

    let id = document.createElement("div");
    id.innerHTML = pad(elementoInventario.elemento.id,4);
    id.className = "id";

    let nome = document.createElement("div");
    nome.innerHTML = elementoInventario.elemento.nome
    nome.className = "nome";

    let acquisto = document.createElement("div");
    acquisto.innerHTML = '€ ' + elementoInventario.elemento.acquisto.toFixed(2);
    acquisto.className = "acquisto";

    let vendita = document.createElement("div");
    vendita.innerHTML = '€ ' + elementoInventario.elemento.vendita.toFixed(2);
    vendita.className = "vendita";

    let add = document.createElement("button");
    add.innerHTML = "add";
    add.className = "add";

    let remove = document.createElement("button");
    remove.innerHTML = "remove";
    remove.className = "remove";

    el.appendChild(quantita);
    el.appendChild(id);
    el.appendChild(nome);
    el.appendChild(acquisto);
    el.appendChild(vendita);
    el.appendChild(add);
    el.appendChild(remove);

    // var t = document.createTextNode("CLICK ME");
    // btn.appendChild(t);
    app_div = document.getElementById("app");
    app_div.appendChild(el);
}