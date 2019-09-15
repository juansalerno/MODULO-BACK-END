'use strict';
let btnAgregar = document.querySelector("#btnAgregar");
btnAgregar.addEventListener("click", agregar);
let btnTotal = document.querySelector("#btnTotal");
btnTotal.addEventListener("click", sumar);
let btnPosicion = document.querySelector("#btnPosicion");
btnPosicion.addEventListener("click", posicion);
let compras = [];

load();

async function agregar() {
    console.log("Funcion Agregar");
    let producto = document.querySelector('#producto').value;
    let precio =
        parseInt(document.querySelector('#precio').value);
    let renglon = {
        "nombreProducto": producto,
        "precio": precio
    }
    document.querySelector('#producto').value = "";
    document.querySelector('#precio').value = "";
    compras.push(renglon);
    mostrarTablaCompras();

    let response = await fetch("/ejemploClase3", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(renglon)
    })
    if (response.ok) {
        let json = await response.text();
        if (json != "ok") {
            // alert("error en datos");
            compras.pop();
            mostrarTablaCompras();
        }
    }
}

//setInterval(load, 250);

function sumar() {
    console.log("Funcion Sumar");
    let total = 0;
    for (let i = 0; i < compras.length; i++) {
        total += compras[i].precio;
    }
    let max = compras[0].precio;
    for (let r of compras) {
        if (max < r.precio)
            max = r.precio;
    }
    document.querySelector("#total").innerHTML =
        "<p>Total: $" + total + "</p>" +
        "<p>Maximo: $" + max + "</p>"
}

function mostrarTablaCompras() {
    let html = "";
    for (let r of compras) {
        html += `
            <tr>
            <td>${r.nombreProducto}</td>
            <td>${r.precio}</td>
            </tr>
            `;
    }
    document.querySelector("#tblCompras").innerHTML = html;
}

function mostrarCompra(compra) {
    let html = `
            <tr>
            <td>${compra.nombreProducto}</td>
            <td>${compra.precio}</td>
            </tr>
            `;
    document.querySelector("#tblCompras").innerHTML = html;
}
async function load() {
    /*try {
        let r = await fetch('/ejemplo-clase-3.1/mock.json');// -->primer paso (desde archivo y no desde URL)
        //let r = await fetch('/productos');
        let json = await r.json();
        compras = json.compras
        mostrarTablaCompras()
    }
    catch (error) {
        alert(error.message);
    }
*/
    try {
        let posicion = document.querySelector('#posicion').value;
        let p = posicion.split(" ");
        document.querySelector('#posicion').value = "";
        let r = await fetch("/ejemploClase3");
        let json = await r.json();
        compras = json;
        //Comun a ambas versiones arma el html de la tabla
        mostrarTablaCompras();
    } catch (err) {
        alert(err.message);
    }
}

async function posicion() {
    try {
        let posicion = document.querySelector('#posicion').value;
        document.querySelector('#posicion').value = "";
        let r = await fetch(`/ejemploClase3/${posicion}`);
        let json = await r.json();
        //compras = json;
        //Comun a ambas versiones arma el html de la tabla
        mostrarCompra(json);

    } catch (err) {
        alert(err.message);
    }
}