'use strict';
let btnAgregar = document.querySelector("#btnAgregar");
btnAgregar.addEventListener("click", agregar);
let btnTotal = document.querySelector("#btnTotal");
btnTotal.addEventListener("click", sumar);
let compras = [];

load();

function agregar() {
    console.log("Funcion Agregar");
    let producto = document.querySelector('#producto').value;
    let precio =
        parseInt(document.querySelector('#precio').value);
    let renglon = {
        "producto_nombre": producto,
        "descripcion": descripcion,
        "precio": precio,
        "IVA_21": precio*0.21
    }
    compras.push(renglon);
    mostrarTablaCompras();
}

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
            <td>${r.producto_nombre}</td>
            <td>${r.descripcion}</td>
            <td>${r.precio}</td>
            <td>${r.IVA_21}</td>
            </tr>
            `;
    }
    document.querySelector("#tblCompras").innerHTML = html;
}

async function load() {
    try {
        //let r = await fetch('/carrito-compras/mock.json'); -->primer paso (desde archivo y no desde URL)
        let r = await fetch('/productos')
        let json = await r.json();
        compras = json //.compras --> primer paso;
        mostrarTablaCompras()
    }
    catch (error) {
        alert(error.message);
    }
}