'use strict';

//import { response } from "express";

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

let btnVerIesimo = document.querySelector('#verI-esimo');
btnVerIesimo.addEventListener('click', mostrarIEsimo);

let btnEnvioEditar = document.querySelector("#btnEnvioEditar");
btnEnvioEditar.addEventListener("click", envioEditar);

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
    document.querySelector('#tipoVehiculo').innerHTML = '';
    document.querySelector('#marca').value = '';
    document.querySelector('#modelo').value = '';
    document.querySelector('#patente').value = '';
    document.querySelector('#año').value = '';
    document.querySelector('#precio').value = '';
    document.querySelector('#capacidad').value = '';
}

async function mostrarSoloAutos() {
    let response3 = await fetch('/concesionaria/autos');
    let json = await response3.json();
    vehiculos = json;
    
    mostrarTablaVehiculos();
}

async function mostrarSoloCamionetas() {
    let response4 = await fetch('/concesionaria/camionetas');
    let json = await response4.json();
    vehiculos = json;
    
    mostrarTablaVehiculos()
}

function mostrarTablaVehiculos() {
    let html = '';
    for (let i = 0; i < vehiculos.length; i++) {
        let r = vehiculos[i];
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
        <td><button class="btn-editar-vehiculo" pos="${i}">Editar</button></td>
        <td> <button class= "btn-delete-vehiculo" pos="${i}"> Borrar </button> </td>
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
            <td><button class="btn-editar-vehiculo" pos="${i}">Editar</button></td>
            <td> <button class= "btn-delete-vehiculo" pos="${i}"> Borrar </button> </td>
            </tr>`
        }
    }
    document.querySelector('#tblVehiculos').innerHTML = html;

    let botonesBorrar = document.querySelectorAll(".btn-delete-vehiculo");
    botonesBorrar.forEach(e => {
        e.addEventListener("click", btnBorrarClick);
    });

    let botonesEditar = document.querySelectorAll(".btn-editar-vehiculo");
    botonesEditar.forEach(e => {
        e.addEventListener("click", btnEditarClick);
    })
}



async function btnBorrarClick() {
    let pos = this.getAttribute("pos");
    let response6 = await fetch(`/concesionaria/${pos}`, {
        "method": "DELETE",
        "headers": {
            "Content-Type": "application/json"
        }
    })
    if (response6.ok) {
        load();
    }
}

 function btnEditarClick() {
    let pos = this.getAttribute("pos");
    //let response7 = await fetch(`/concesionaria/${pos}`);
    //let json = response7.json();
     
    let r = vehiculos[pos];
    
    document.querySelector('#tipoVehiculo').innerHTML = r.tipo;
    document.querySelector('#pos-elem').value = pos;
    document.querySelector('#marca').value = r.marca;
    document.querySelector('#modelo').value = r.modelo;
    document.querySelector('#patente').value = r.patente;
    document.querySelector('#año').value = r.year;
    document.querySelector('#precio').value = r.precio;
    
    if(r.tipo == 'A') {
        document.querySelector('#capacidad').value = r.capacidadBaul;
    }
    else {
        document.querySelector('#capacidad').value = r.capacidadCarga;
    }
   
    document.querySelector('.btn-editar-vehiculo').classList.add("oculto");
    document.querySelector('#btnAgregarVehiculo').classList.add("oculto");
    document.querySelector('#btnEnvioEditar').classList.remove("oculto");
    
}

async function envioEditar() {
    document.querySelector('#btnAgregarVehiculo').classList.remove("oculto");
    document.querySelector('#btnEnvioEditar').classList.add("oculto");
    
    let tipo = document.querySelector('#tipoVehiculo').innerHTML;
    let pos = document.querySelector('#pos-elem').value;
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
            //vehiculos.push(renglon1);
            //mostrarTablaVehiculos();

            let response9 = await fetch(`/concesionaria/${pos}`, {
                "method": "PUT",
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify(renglon1)
            })
            /*if (response9.ok) {
                let json = await response9.text();
                if (json != 'ok') {
                    vehiculos.pop(renglon1);
                    mostrarTablaVehiculos()
                }
                
            }
            */
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
            //vehiculos.push(renglon2);
            //mostrarTablaVehiculos();

            let response10 = await fetch(`/concesionaria/${pos}`, {
                "method": "PUT",
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify(renglon2)
            })
            /*if (response10.ok) {
                let json = await response10.text();
                if (json != 'ok') {
                    vehiculos.pop(renglon2);
                    mostrarTablaVehiculos()
                }
            }
            */
            break;
        default: null;
    }
    
    document.querySelector('#tipoVehiculo').innerHTML = '';
    document.querySelector('#pos-elem').value = '';
    document.querySelector('#marca').value = '';
    document.querySelector('#modelo').value = '';
    document.querySelector('#patente').value = '';
    document.querySelector('#año').value = '';
    document.querySelector('#precio').value = '';
    document.querySelector('#capacidad').value = '';
    
    load();
    
}

function mostrarVehiculoElegido(veh) {
    let html = '';
    if (veh.tipo == 'A') {
        html = `
        <tr>
        <td>${veh.tipo}</td>
        <td>${veh.marca}</td>
        <td>${veh.modelo}</td>
        <td>${veh.patente}</td>
        <td>${veh.year}</td>
        <td>${veh.precio}</td>
        <td>${veh.capacidadBaul}</td>
        </tr>`
    }
    else if (veh.tipo == 'C') {
        html = `
        <tr>
        <td>${veh.tipo}</td>
        <td>${veh.marca}</td>
        <td>${veh.modelo}</td>
        <td>${veh.patente}</td>
        <td>${veh.year}</td>
        <td>${veh.precio}</td>
        <td>${veh.capacidadCarga}</td>
        </tr>`
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

async function mostrarIEsimo() {
    let iEsimoElegido = document.querySelector('#i-esimoAMostrar').value;

    let response5 = await fetch(`/concesionaria/${iEsimoElegido}`);
    let json = await response5.json();

    mostrarVehiculoElegido(json);

}