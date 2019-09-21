'use strict';
let btnAgregar = document.querySelector("#btnAgregar");
btnAgregar.addEventListener("click", agregar);
let btnEliminar = document.querySelector("#btnEliminar");
btnEliminar.addEventListener("click", eliminar);
let btnModificar = document.querySelector("#btnModificar");
btnModificar.addEventListener("click", modificar);
let btnConsultar = document.querySelector("#btnConsultar");
btnConsultar.addEventListener("click", posicion);
​
let chkSelTodos = document.querySelector("#chkSelTodos")
chkSelTodos.addEventListener("click",seldesel)
​
let btnTotal = document.querySelector("#btnTotal");
btnTotal.addEventListener("click", sumar);
​
let compras = [];
load();
​
// let btnsElim = document.querySelectorAll(".btnElimPorPos")
// btnsElim.forEach(a => {a.addEventListener("click", eliminarPosicion)});
// let btnsEdit = document.querySelectorAll(".btnEditPorPos")
// btnsEdit.forEach(b => {b.addEventListener("click", editarPosicion)});
// let btnsModi = document.querySelectorAll(".btnModiPorPos")
// btnsModi.forEach(c => {c.addEventListener("click", modificarPosicion)});
​
function agregar() {
    console.log("Funcion Agregar");
    let producto = document.querySelector('#producto').value;
    let precio = parseInt(document.querySelector('#precio').value);
    let descripcion = document.querySelector('#descripcion').value;
    let iva = parseFloat(document.querySelector('#iva').value);
    document.querySelector('#producto').value="";
    document.querySelector('#precio').value="";
    document.querySelector('#descripcion').value="";
    document.querySelector('#iva').value="";
    let renglon = {
        "producto": `${producto}`,
        "precio": `${precio}`,
        "descripcion": `${descripcion}`,
        "iva": `${iva}`
    };
    if (agregarAServidor(renglon)) 
        load();
    else
        alert ("Error grabando en servidor");
}
​
function eliminar() {
    console.log("Funcion Eliminar");
    let checks = document.getElementsByClassName("idx");
    for (let c of checks) {
        if (c.checked) {
            let renglon = {
                "producto": `${c.value}`,
                "precio": `0`,
                "descripcion": ``,
                "iva": `0`
            };
            if (!eliminarDeServidor(renglon)) 
                alert ("Error eliminando en servidor");
        }
    }
    load();
}
function eliminarPosicion() {
    console.log("Funcion Eliminar Posicion");
    let posicion = this.getAttribute("idx");
    if (!eliminarDeServidor("", posicion)) 
        alert ("Error eliminando en servidor");
    load();
}
​
function editarPosicion() {
    console.log("Funcion Editar Posicion");
    this.classList.toggle("oculto");
    let posicion = this.getAttribute("idx");
    let btnsModi = document.querySelectorAll(".btnModiPorPos");
    btnsModi[posicion].classList.toggle("oculto");
    let datos = this.getAttribute("datos").split(',');
    document.querySelector('#producto').value=datos[0];
    document.querySelector('#precio').value=datos[1];
    document.querySelector('#descripcion').value=datos[2];
    document.querySelector('#iva').value=datos[3];
}
​
function modificar() {
    console.log("Funcion Modificar");
    let precio = parseInt(document.querySelector('#precio').value);
    let descripcion = document.querySelector('#descripcion').value;
    let iva = parseFloat(document.querySelector('#iva').value);
    document.querySelector('#producto').value="";
    document.querySelector('#precio').value="";
    document.querySelector('#descripcion').value="";
    document.querySelector('#iva').value="";
    let checks = document.getElementsByClassName("idx");
    for (let c of checks) {
        if (c.checked) {
            let renglon = {
                "producto": `${c.value}`,
                "precio": `${precio}`,
                "descripcion": `${descripcion}`,
                "iva": `${iva}`
            };
            if (!modificarEnServidor(renglon)) 
                alert ("Error modificando en servidor");
        }
    }
    load();
}
function modificarPosicion() {
    console.log("Funcion Modificar Posicion");
    let posicion = this.getAttribute("idx");
    this.classList.toggle("oculto");
    let producto = document.querySelector('#producto').value;
    let precio = parseInt(document.querySelector('#precio').value);
    let descripcion = document.querySelector('#descripcion').value;
    let iva = parseFloat(document.querySelector('#iva').value);
    document.querySelector('#producto').value="";
    document.querySelector('#precio').value="";
    document.querySelector('#descripcion').value="";
    document.querySelector('#iva').value="";
    let renglon = {
        "producto": `${producto}`,
        "precio": `${precio}`,
        "descripcion": `${descripcion}`,
        "iva": `${iva}`
    };
    if (!modificarEnServidor(renglon, posicion)) 
        alert ("Error modificando en servidor");
    load();
}
​
function sumar() {
    console.log("Funcion Sumar");
    let total = 0;
    let totalconiva = 0;
    for (let i = 0; i <  compras.length; i++) {
        total += parseInt(compras[i].precio);
        totalconiva += parseInt(compras[i].precio)*(1+(parseFloat(compras[i].iva)/100));
    }
    let max = compras[0].precio;
    for (let r of compras) {
        if(max <  r.precio)
            max = r.precio;
    }
    document.querySelector("#total").innerHTML = `<p class="total">Total: $ ${total} Total con IVA: $ ${totalconiva.toFixed(2)} Maximo: $ ${max}</p>`;
}
​
function seldesel () {
    let checks = document.getElementsByClassName("idx");
    for (let c of checks) {
        if (c.checked) 
            c.checked = false;
        else
            c.checked = true;
    }
}
​
function mostrarTablaCompras() {
    html = "";
    let i=0;
    for (let r of compras) {
        console.log(r);
        html += `
            <tr>
                <td class="sel"><input type="checkbox" class="idx" name="" value="${r.producto}"></td>
                <td class="txt">${r.producto}</td>   
                <td class="num">${r.precio}</td>     
                <td class="txt">${r.descripcion}</td>
                <td class="num">${r.iva}</td>
                <td class="num"><button type="button" class="btnElimPorPos" idx=${i}>B</button></td>
                <td class="txt"><button type="button" class="btnEditPorPos" idx=${i} datos=${r.producto},${r.precio},${r.descripcion},${r.iva}>E</button>
                <button type="button" class="btnModiPorPos" idx=${i}>M</button></td>
            </tr>`; 
        i++;
    }
    document.querySelector("#tblCompras").innerHTML = html;
​
    let btnsElim = document.querySelectorAll(".btnElimPorPos")
    btnsElim.forEach(e => {e.addEventListener("click", eliminarPosicion)});
    let btnsEdit = document.querySelectorAll(".btnEditPorPos")
    btnsEdit.forEach(e => {e.addEventListener("click", editarPosicion); e.classList.add("oculto"); e.classList.toggle("oculto")});
    let btnsModi = document.querySelectorAll(".btnModiPorPos")
    btnsModi.forEach(e => {e.addEventListener("click", modificarPosicion); e.classList.add("oculto")});
}
​
async function load() {
    try {
        let r = await fetch("/codigo-mauricio");
        let json = await r.json();
        compras = json;
        mostrarTablaCompras();
    } catch (err) {
        alert(err.message);
    }
}
​
async function posicion() {
    let clave = document.querySelector('#clave').value;
    let url = "";
    if (clave != "") {
        url = `/codigo-mauricio/${clave}`;
    } else {
        url = "/codigo-mauricio";
    }
    try {
        let r = await fetch(url);
        let json = await r.json();
        if (clave != "") {
            compras = [];
            compras.push(json);
        } else {
            compras = json;
        }
        mostrarTablaCompras();
    } catch (err) {
        alert(err.message);
    }
}
​
async function agregarAServidor(registro) {
    let r = await fetch("/codigo-mauricio", { "method": "POST", "headers": { "Content-Type": "application/json" }, "body": JSON.stringify(registro) })
    return (r.ok);
}
async function eliminarDeServidor(registro, posicion) {
    let r;
    if (posicion!='')
        r = await fetch(`/codigo-mauricio/${posicion}`, { "method": "DELETE", "headers": { "Content-Type": "application/json" } })
    else
        r = await fetch("/codigo-mauricio", { "method": "DELETE", "headers": { "Content-Type": "application/json" }, "body": JSON.stringify(registro) })
    return (r.ok);
}
async function modificarEnServidor(registro, posicion) {
    let r;
    if (posicion!='')
        r = await fetch(`/codigo-mauricio/${posicion}`, { "method": "PUT", "headers": { "Content-Type": "application/json" }, "body": JSON.stringify(registro) })
    else
        r = await fetch("/codigo-mauricio", { "method": "PUT", "headers": { "Content-Type": "application/json" }, "body": JSON.stringify(registro) })
    return (r.ok);
}