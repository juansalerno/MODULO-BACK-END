'use strict';

let listadoDocumentos = [];

// creacion del evento click para el BOTON AGREGAR:
let btnAgregar = document.querySelector('#btnAgregar');
btnAgregar.addEventListener("click", agregar);


// creacion del evento click para el BOTON VER (AUTOR CON MAS DOCUMENTOS):

let btnVerAutorMasDocs = document.querySelector('#verAutorMasDocs');
btnVerAutorMasDocs.addEventListener("click", verAutorConMasDocumentos);


// creacion del evento click para el BOTON VER (DOCUMENTOS DE UN TEMA DETERMINADO):

let btnDocumentosDeUnTema = document.querySelector('#verDocsDeTema');
btnDocumentosDeUnTema.addEventListener("click", verDocsDeUnTemaElegido);

// creacion del evento click para el BOTON VER (TEMA MAS TRATADO):

let btnTemaMasTratado = document.querySelector('#verTemaMasTratado');
btnTemaMasTratado.addEventListener("click", verTemaMasTratado);

// creacion del evento click para el BOTON VER (TITULO MÁS MODERNO):

let btnTituloMasModerno = document.querySelector('#verTituloMasModerno');
btnTituloMasModerno.addEventListener("click", verTituloMasModerno);

// creacion del evento click para el BOTON VER (TITULO MÁS ANTIGUO):

let btnTituloMasAntiguo = document.querySelector('#verTituloMasAntiguo');
btnTituloMasAntiguo.addEventListener("click", verTituloMasAntiguo);

// creacion del evento click para el BOTON VER (CANT. DOCS + 1 AÑO ANTIG):

let btnCantDocsMasDeUnAñoAntig = document.querySelector('#verDocsAntiguosMasdeUnAño');
btnCantDocsMasDeUnAñoAntig.addEventListener("click", verCantDocsMasDeUnAñoAntiguedad);


// FUNCIONES:
function agregar() {
    console.log('Funcion agregar');
    let temasIngresados = document.querySelector('#input-temas').value;
    let arregloTemas = temasIngresados.split(',');
    let documento = {
        "titulo": document.querySelector('#input-titulo').value,
        "autor": document.querySelector('#input-autor').value,
        "temas": arregloTemas,
        "fecha": document.querySelector('#input-fecha').value
    }

    listadoDocumentos.push(documento);

    mostrarTablaDocumentos();

    document.querySelector('#input-titulo').value = '';
    document.querySelector('#input-autor').value = '';
    document.querySelector('#input-temas').value = '';
    document.querySelector('#input-fecha').value = '';
}


function mostrarTablaDocumentos() {
    let html = '';
    for (let r of listadoDocumentos) {
        html += `
            <tr> Titulo: ${r.titulo} </tr>
            <tr> Autor: ${r.autor}</tr>
            <tr> Temas: ${r.temas} </tr>
            <tr> Fecha de Creación: ${r.fecha}</tr>
            <tr> ------------------------------ </tr>
        `;
    }
    document.querySelector('#tblDocumentos').innerHTML = html;
}



function verAutorConMasDocumentos() {
    let frecuenciaElemento = 1;
    let maximaFrecuenciaElemento = 1;
    let autorConMasDocumentos = listadoDocumentos[0].autor;
    for (let i = 0; i < listadoDocumentos.length; i++) {
        for (let k = i; k < listadoDocumentos.length; k++) {
            if (listadoDocumentos[i].autor == listadoDocumentos[k].autor) {
                frecuenciaElemento++
            }
            if (frecuenciaElemento > maximaFrecuenciaElemento) {
                maximaFrecuenciaElemento = frecuenciaElemento;
                autorConMasDocumentos = listadoDocumentos[i].autor;
            }
        }
        frecuenciaElemento = 1;
    }

    document.querySelector('#autor-mas-docs').innerHTML = `El autor con más documentos es: ${autorConMasDocumentos}`
}


function verDocsDeUnTemaElegido() {
    let temaElegido = document.querySelector('#input-tema-det-analisis').value;
    let docsDelTema = [];
    for (let i = 0; i < listadoDocumentos.length; i++) {
        for (let k = 0; k < (listadoDocumentos[i].temas).length; k++) {
            if ((((listadoDocumentos[i].temas)[k]).toLowerCase().trim()) == temaElegido.toLowerCase()) {
                docsDelTema.push(listadoDocumentos[i].titulo);
            }
        }
    }
    document.querySelector('#docs-de-un-tema').innerHTML 
    = `Listado de títulos de los Documentos que poseen el tema elegido:<br> ${docsDelTema}`;
}


function verTituloMasModerno() {
    let maxMilisegundosSince1970 = 0;
    let tituloMasModerno;
    for (let r of listadoDocumentos) {
        if ((new Date(r.fecha).getTime()) > maxMilisegundosSince1970) {
            maxMilisegundosSince1970 = new Date(r.fecha).getTime();
            tituloMasModerno = r.titulo;
        }
    }
    document.querySelector('#titulo-mas-moderno').innerHTML = `El titulo más moderno es: ${tituloMasModerno}`;
    return tituloMasModerno;
}

function verTituloMasAntiguo() {
    let minMilisegundosSince1970 = new Date('08/24/2019').getTime();
    let tituloMasAntiguo;
    for (let r of listadoDocumentos) {
        if ((new Date(r.fecha).getTime()) < minMilisegundosSince1970) {
            minMilisegundosSince1970 = new Date(r.fecha).getTime();
            tituloMasAntiguo = r.titulo;
        }
    }
    document.querySelector('#titulo-mas-antiguo').innerHTML = `El titulo más antiguo es: ${tituloMasAntiguo}`;
    return tituloMasAntiguo;
}

function verCantDocsMasDeUnAñoAntiguedad() {
    let milisegundosAñoAnterior = new Date('08/24/2018').getTime();
    let contador = 0;
    //let docsAntiguosMasDeUnAño = []
    for (let r of listadoDocumentos) {
        if ((new Date(r.fecha).getTime()) < milisegundosAñoAnterior) {
            contador++
            //   docsAntiguosMasDeUnAño.push(r);
        }
    }
    document.querySelector('#docs-antiguos-mas-de-un-año').innerHTML = `La cantidad de documentos es: ${contador} `
    return contador

}

//funcion auxiliar para crear un arreglo simple sólo de temas para simplificar luego analizar cual es el repetido mas veces
function crearArregloNuevoSoloDeTemas(arregloObjetos) {
    let arregloSoloTemas = [];
    let temaFormateado;
    for (let r of arregloObjetos) {
        for (let i = 0; i < (r.temas).length; i++) {
            temaFormateado = (r.temas[i]).trim().toLowerCase();
            arregloSoloTemas.push(temaFormateado);
        }
    }
    return arregloSoloTemas;
}


function verTemaMasTratado() {

    let arregloGlobalDeTemas = crearArregloNuevoSoloDeTemas(listadoDocumentos);

    let frecuenciaElemento = 1;
    let maxFrecuenciaElem = 1;
    let temaMasTratado = arregloGlobalDeTemas[0];
    
    // se analiza el arreglo de temas para ver el más repetido (idem al caso de autor con más documentos)
    for (let k = 0; k < arregloGlobalDeTemas.length; k++) {
        for (let j = k; j < arregloGlobalDeTemas.length; j++) {
            if (arregloGlobalDeTemas[k] == arregloGlobalDeTemas[j]) {
                frecuenciaElemento++
            }
            if (frecuenciaElemento > maxFrecuenciaElem) {
                maxFrecuenciaElem = frecuenciaElemento
                temaMasTratado = arregloGlobalDeTemas[k];
            }
        }
        frecuenciaElemento = 1;
    }

    document.querySelector('#tema-mas-tratado').innerHTML = `El tema más tratado es: ${temaMasTratado}`
    return temaMasTratado
}
