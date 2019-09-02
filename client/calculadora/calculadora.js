'use strict';
let btnsOpcionOperacion = document.querySelectorAll('.dropdown-item');
for(let i=0; i<btnsOpcionOperacion.length; i++) {
btnsOpcionOperacion[i].addEventListener('click', function(e){
    let contenedor = this.innerHTML;
    document.querySelector('#operacion').innerHTML = contenedor;
});
}
let btnCalcular = document.querySelector('#calcular');
btnCalcular.addEventListener('click', calcular);
let calculos = [];

async function calcular() {
    try {
        /*como el servidor no permite libremente el simbolo "%", en caso de elegirse se cambia
        la variable para poder usar el switch en el metodo del servicio. Tambien en el metodo 
        se cambia a la "/" al final para mostrar el ícono correcto de division
        */
        let simbolo = '%';
        let operacionElegida = document.querySelector('#operacion').innerHTML;
        if (operacionElegida == simbolo) {
            operacionElegida = 'division';
        }
        let num1 = parseFloat(document.querySelector('#num1').value);
        let num2 = parseFloat(document.querySelector('#num2').value);
        document.querySelector('#operacion').value = '';
        document.querySelector('#num1').value = '';
        document.querySelector('#num2').value = '';
        let response = await fetch(`/calcular/${operacionElegida}/${num1}/${num2}`);
        let json = await response.json();
        calculos.push(json);
        mostrarTablaCalculos();
    }
    catch (error) {
        alert(error.message);
    }
}

function mostrarTablaCalculos() {
    let html = '';
    for (let r of calculos) {
        html += `
        <tr>
                <td>${r.num1}</td>
                <td>${r.operacionElegida}</td>
                <td>${r.num2}</td>
                <td>${r.resultado}</td>
            </tr>
        `;
    }
    document.querySelector('#tblOperaciones').innerHTML = html;
}

