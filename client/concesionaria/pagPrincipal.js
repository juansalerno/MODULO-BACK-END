'use strict';

let btnsEleccionTipo = document.querySelectorAll("#btnEleccionTipo");
for (let i = 0; i < btnsEleccionTipo.length; i++) {
    btnsEleccionTipo[i].addEventListener('click', function (e) {
        if (btnsEleccionTipo[i].innerHTML == 'Auto') {
            //document.querySelector('#tipoVehiculo').innerHTML = 'AUTO';
            document.querySelector('#tipo').value = 'AUTO'
        }
        else if (btnsEleccionTipo[i].innerHTML == 'Camioneta') {
            //document.querySelector('#tipoVehiculo').innerHTML = 'CAMIONETA';
            document.querySelector('#tipo').value = 'CAMIONETA';
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

let btnVerIesimo = document.querySelector('#verIEsimo');
btnVerIesimo.addEventListener('click', mostrarIEsimo);

let btnEnvioEditar = document.querySelector("#btnEnvioEditar");
btnEnvioEditar.addEventListener("click", envioEditar);

let btnVerPorDominio = document.querySelector("#btnVerPorDominio");
btnVerPorDominio.addEventListener("click", mostrarPorDominio);

let vehiculos = [];

load();

async function agregar() {
    //let tipo = document.querySelector('#tipoVehiculo').innerHTML;
    let tipo = document.querySelector('#tipo').value;
    let marca = document.querySelector('#marca').value;
    let modelo = document.querySelector('#modelo').value;
    let patente = document.querySelector('#patente').value;
    let año = parseInt(document.querySelector('#año').value);
    let precio = parseInt(document.querySelector('#precio').value);
    switch (tipo) {
        case 'AUTO':
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
                    alert('El año, precio y la capacidad del baúl no pueden ser negativos, por favor reingrese los datos');
                    mostrarTablaVehiculos()
                }
            }
            break;
        case 'CAMIONETA':
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
                    alert('El año, precio y la capacidad de la carga no pueden ser negativos, por favor reingrese los datos');
                    mostrarTablaVehiculos()
                }
            }
            break;
        default: null;
    }
    //document.querySelector('#tipoVehiculo').innerHTML = '';
    document.querySelector('#tipo').value = ''
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

    let btnsDeAccion = document.querySelectorAll(".action button")
    btnsDeAccion.forEach(b => {
        b.classList.add("oculto");
    });
    document.querySelector('#iEsimoAMostrar').classList.add('oculto');
    document.querySelector('#verIEsimo').classList.add('oculto');
    document.querySelector('#dominioElegido').classList.add('oculto');
    document.querySelector('#btnVerPorDominio').classList.add('oculto');
}

async function mostrarSoloCamionetas() {
    let response4 = await fetch('/concesionaria/camionetas');
    let json = await response4.json();
    vehiculos = json;

    mostrarTablaVehiculos();

    let btnsDeAccion = document.querySelectorAll(".action button")
    btnsDeAccion.forEach(b => {
        b.classList.add("oculto");
    });
    document.querySelector('#iEsimoAMostrar').classList.add('oculto');
    document.querySelector('#verIEsimo').classList.add('oculto');
    document.querySelector('#dominioElegido').classList.add('oculto');
    document.querySelector('#btnVerPorDominio').classList.add('oculto');
}

function mostrarTablaVehiculos() {
    let html = '';
    for (let i = 0; i < vehiculos.length; i++) {
        let r = vehiculos[i];
        if (r.tipo == 'AUTO') {
            html += `
        <tr>
            <td>${r.tipo}</td>
            <td>${r.marca}</td>
            <td>${r.modelo}</td>
            <td>${r.patente}</td>
            <td>${r.year}</td>
            <td>${r.precio}</td>
            <td>${r.capacidadBaul}</td>
            <td class="action">
                <button class="btn-editar-vehiculo btn btn-outline-primary" pos="${i}">Editar</button>
                <button class= "btn-delete-vehiculo btn btn-outline-danger" pos="${i}"> Borrar </button> 
            </td>
        </tr>`
        }
        if (r.tipo == 'CAMIONETA') {
            html += `
        <tr>
            <td>${r.tipo}</td>
            <td>${r.marca}</td>
            <td>${r.modelo}</td>
            <td>${r.patente}</td>
            <td>${r.year}</td>
            <td>${r.precio}</td>
            <td>${r.capacidadCarga}</td>
            <td class="action">
                <button class="btn-editar-vehiculo btn btn-outline-primary" pos="${i}">Editar</button>
                <button class= "btn-delete-vehiculo btn btn-outline-danger" pos="${i}"> Borrar </button> 
            </td>
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

    document.querySelector('#iEsimoAMostrar').classList.remove('oculto');
    document.querySelector('#verIEsimo').classList.remove('oculto');
    document.querySelector('#dominioElegido').classList.remove('oculto');
    document.querySelector('#btnVerPorDominio').classList.remove('oculto');
}



async function btnBorrarClick() {
    let pos = this.getAttribute("pos");
    let opcion = confirm("Está seguro que desea borrar este vehículo?");
    if (opcion == true) {

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
}

function btnEditarClick() {
    let pos = this.getAttribute("pos");

    let r = vehiculos[pos];

    //document.querySelector('#tipoVehiculo').innerHTML = r.tipo;
    document.querySelector('#tipo').value = r.tipo;
    document.querySelector('#pos-elem').value = pos;
    document.querySelector('#marca').value = r.marca;
    document.querySelector('#modelo').value = r.modelo;
    document.querySelector('#patente').value = r.patente;
    document.querySelector('#año').value = r.year;
    document.querySelector('#precio').value = r.precio;

    if (r.tipo == 'AUTO') {
        document.querySelector('#capacidad').value = r.capacidadBaul;
    }
    else {
        document.querySelector('#capacidad').value = r.capacidadCarga;
    }

    let btnsEditarNoPresionados = document.querySelectorAll('.btn-editar-vehiculo');
    btnsEditarNoPresionados.forEach(b => {
        b.classList.remove('oculto');
    })
    let btnsBorrarNoPresionados = document.querySelectorAll('.btn-delete-vehiculo');
    btnsBorrarNoPresionados.forEach(d => {
        d.classList.remove('oculto');
    })
    this.classList.add("oculto");
    document.querySelector('#btnAgregarVehiculo').classList.add("display");
    document.querySelector('#btnEnvioEditar').classList.remove("display");
    let botonesBorrar = document.querySelectorAll(".btn-delete-vehiculo");
    botonesBorrar[pos].classList.add("oculto");
}

async function envioEditar() {
    document.querySelector('#btnAgregarVehiculo').classList.remove("display");
    document.querySelector('#btnEnvioEditar').classList.add("display");

    //let tipo = document.querySelector('#tipoVehiculo').innerHTML;
    let tipo = document.querySelector('#tipo').value;
    let pos = document.querySelector('#pos-elem').value;
    let marca = document.querySelector('#marca').value;
    let modelo = document.querySelector('#modelo').value;
    let patente = document.querySelector('#patente').value;
    let año = parseInt(document.querySelector('#año').value);
    let precio = parseInt(document.querySelector('#precio').value);
    switch (tipo) {
        case 'AUTO':
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

            let response9 = await fetch(`/concesionaria/${pos}`, {
                "method": "PUT",
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify(renglon1)
            })
            if (response9.ok) {
                let json = await response9.text();
                if (json != 'ok') {
                    vehiculos.pop(renglon1);
                    alert('El año, precio y la capacidad de la carga no pueden ser negativos');
                    mostrarTablaVehiculos()
                }
                
            }
            
            break;
        case 'CAMIONETA':
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

            let response10 = await fetch(`/concesionaria/${pos}`, {
                "method": "PUT",
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify(renglon2)
            })
            if (response10.ok) {
                let json = await response10.text();
                if (json != 'ok') {
                    vehiculos.pop(renglon2);
                    alert('El año, precio y la capacidad de la carga no pueden ser negativos');
                    mostrarTablaVehiculos()
                }
            }
            
            break;
        default: null;
    }

    //document.querySelector('#tipoVehiculo').innerHTML = '';
    document.querySelector('#tipo').value = ''
    document.querySelector('#pos-elem').value = '';
    document.querySelector('#marca').value = '';
    document.querySelector('#modelo').value = '';
    document.querySelector('#patente').value = '';
    document.querySelector('#año').value = '';
    document.querySelector('#precio').value = '';
    document.querySelector('#capacidad').value = '';

    load();

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
    let iEsimoElegido = document.querySelector('#iEsimoAMostrar').value;

    let response5 = await fetch(`/concesionaria/pos/${iEsimoElegido}`);
    try {
        let json = await response5.json();

        vehiculos = [];
        vehiculos.push(json);

        mostrarTablaVehiculos();

        document.querySelector('#iEsimoAMostrar').value = '';
        document.querySelector('#iEsimoAMostrar').classList.add('oculto');
        document.querySelector('#verIEsimo').classList.add('oculto');
        document.querySelector('#dominioElegido').classList.add('oculto');
        document.querySelector('#btnVerPorDominio').classList.add('oculto');
    }
    catch (err) {
        document.querySelector('#iEsimoAMostrar').value = '';
        alert('Indice incorrecto');
    }
}

async function mostrarPorDominio() {
    let dominioElegido = document.querySelector('#dominioElegido').value;
    try {
    let response11 = await fetch(`/concesionaria/select/${dominioElegido}`);
    console.log(response11);
    let json = await response11.json();

    console.log(json);

    vehiculos = [];
    vehiculos.push(json);

    mostrarTablaVehiculos();

    document.querySelector('#dominioElegido').value = '';
    document.querySelector('#iEsimoAMostrar').classList.add('oculto');
    document.querySelector('#verIEsimo').classList.add('oculto');
    document.querySelector('#dominioElegido').classList.add('oculto');
    document.querySelector('#btnVerPorDominio').classList.add('oculto');
    }
    catch(err) {
        document.querySelector('#dominioElegido').value = '';
        alert('Dominio no encontrado');
    }
}
