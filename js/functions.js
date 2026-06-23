/* BOTON DE VOLVER ATRAS */

function volverInteligente() {
  if (document.referrer && document.referrer !== window.location.href) {
    window.location.href = document.referrer;
  } else {
    window.location.href = 'index.html'; 
  }
}