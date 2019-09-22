'use strict';
let resultadoComentario = document.querySelector('.enviar');
resultadoComentario.addEventListener("click", function(e){
    alert('Su comentario ha sido enviado');
    document.querySelector('.resultado-comentario').innerHTML = 'Su comentario ha sido enviado.'
})