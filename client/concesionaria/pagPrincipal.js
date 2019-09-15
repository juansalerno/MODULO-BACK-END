'use strict';
let btnsEleccionTipo = document.querySelectorAll("#btnEleccionTipo");
for (let i = 0; i < btnsEleccionTipo.length; i++) {
    btnsEleccionTipo[i].addEventListener('click', function (e) {
        if (btnsEleccionTipo[i].innerHTML == 'Auto') {
            document.querySelector('#tipoVehiculo').innerHTML = 'A';
        }
        else if (btnsEleccionTipo[i].innerHTML == 'Camioneta') {
            document.querySelector('#tipoVehiculo').innerHTML = 'C';
        }
    })
}

let btnAgregar = document.querySelector('#btnAgregarVehiculo');
btnAgregar.addEventListener('click', agregar);

let btnMostrarTodos = document.querySelector('#btnVerVehiculosTodos');
btnMostrarTodos.addEventListener('click', load);

let btnVerSoloAutos = document.querySelector('#btnVerSoloAutos');
btnVerSoloAutos.addEventListener('click', mostrarSoloAutos);

let btnVerSoloCamionetas = document.querySelector('#btnVerSoloCamionetas');
btnVerSoloCamionetas.addEventListener('click', mostrarSoloCamionetas);

let vehiculos = [];

load();

async function agregar() {
    let tipo = document.querySelector('#tipoVehiculo').innerHTML;
    let marca = document.querySelector('#marca').value;
    let modelo = document.querySelector('#modelo').value;
    let patente = document.querySelector('#patente').value;
    let año = parseInt(document.querySelector('#año').value);
    let precio = parseInt(document.querySelector('#precio').value);
    switch (tipo) {
        case 'A':
            let capacidadBaul = parseInt(document.querySelector('#capacidad').value);
            let renglon1 = {
                "tipo": tipo,
                "marca": marca,
                "modelo": modelo,
                "patente": patente,
                "year": año,
                "precio": precio,
                "capacidadBaul": capacidadBaul
            }
            vehiculos.push(renglon1);
            mostrarTablaVehiculos();

            let response1 = await fetch('/concesionaria', {
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify(renglon1)
            })
            if (response1.ok) {
                let json = await response1.text();
                if (json != 'ok') {
                    vehiculos.pop(renglon1);
                    mostrarTablaVehiculos()
                }
            }
            break;
        case 'C':
            let capacidadCarga = parseInt(document.querySelector('#capacidad').value)
            let renglon2 = {
                "tipo": tipo,
                "marca": marca,
                "modelo": modelo,
                "patente": patente,
                "year": año,
                "precio": precio,
                "capacidadCarga": capacidadCarga
            }
            vehiculos.push(renglon2);
            mostrarTablaVehiculos();

            let response2 = await fetch('/concesionaria', {
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify(renglon2)
            })
            if (response2.ok) {
                let json = await response2.text();
                if (json != 'ok') {
                    vehiculos.pop(renglon2);
                    mostrarTablaVehiculos()
                }
            }
            break;
        default: null;
    }
}

/*async function mostrarTablaVehiculosTotales() {
    let response5 = await fetch('/concesionaria');
    let json = await response5.json();
    vehiculos = json;
    let html = '';
    for (let r of vehiculos) {
        if (r.tipo == 'A') {
            html += `
        <tr>
        <td>${r.tipo}</td>
        <td>${r.marca}</td>
        <td>${r.modelo}</td>
        <td>${r.patente}</td>
        <td>${r.year}</td>
        <td>${r.precio}</td>
        <td>${r.capacidadBaul}</td>
        </tr>`
        }
        if (r.tipo == 'C') {
            html += `
        <tr>
        <td>${r.tipo}</td>
        <td>${r.marca}</td>
        <td>${r.modelo}</td>
        <td>${r.patente}</td>
        <td>${r.year}</td>
        <td>${r.precio}</td>
        <td>${r.capacidadCarga}</td>
        </tr>`
        }
    }
    document.querySelector('#tblVehiculos').innerHTML = html;
}
*/
async function mostrarSoloAutos() {
    let response3 = await fetch('/concesionaria/autos');
    let json = await response3.json();
    vehiculos = json;
    let html = '';
    for(let r of vehiculos) {
        html += `
        <tr>
        <td>${r.tipo}</td>
        <td>${r.marca}</td>
        <td>${r.modelo}</td>
        <td>${r.patente}</td>
        <td>${r.year}</td>
        <td>${r.precio}</td>
        <td>${r.capacidadBaul}</td>
        </tr>
        `
    }
    document.querySelector('#tblVehiculos').innerHTML = html;
}

async function mostrarSoloCamionetas() {
    let response4 = await fetch('/concesionaria/camionetas');
    let json = await response4.json();
    vehiculos = json;
    let html = '';
    for(let r of vehiculos) {
        html += `
        <tr>
        <td>${r.tipo}</td>
        <td>${r.marca}</td>
        <td>${r.modelo}</td>
        <td>${r.patente}</td>
        <td>${r.year}</td>
        <td>${r.precio}</td>
        <td>${r.capacidadCarga}</td>
        </tr>
        `
    }
    document.querySelector('#tblVehiculos').innerHTML = html;
}

function mostrarTablaVehiculos() {
    let html = '';
    for (let r of vehiculos) {
        if (r.tipo == 'A') {
        html += `
        <tr>
        <td>${r.tipo}</td>
        <td>${r.marca}</td>
        <td>${r.modelo}</td>
        <td>${r.patente}</td>
        <td>${r.year}</td>
        <td>${r.precio}</td>
        <td>${r.capacidadBaul}</td>
        </tr>`
        }
        if (r.tipo == 'C') {
            html += `
        <tr>
        <td>${r.tipo}</td>
        <td>${r.marca}</td>
        <td>${r.modelo}</td>
        <td>${r.patente}</td>
        <td>${r.year}</td>
        <td>${r.precio}</td>
        <td>${r.capacidadCarga}</td>
        </tr>`
        }
    }
    document.querySelector('#tblVehiculos').innerHTML = html;

}
async function load() {
    try {
        let r = await fetch('/concesionaria');
        let json = await r.json();
        vehiculos = json;
        mostrarTablaVehiculos()
    }
    catch (error) {
        alert(error.message);
    }
}