// Variable para almacenar las teclas presionadas
let secuenciaActual = "";
// Define aquí el número que servirá como contraseña
const codigoDesbloqueo = "160620"; 

document.addEventListener('keydown', function(e) {
    // Evitar registrar teclas que no sean números si solo quieres códigos numéricos
    if (!/^[0-9]$/.test(e.key)) return;

    secuenciaActual += e.key;

    // Mantener la longitud de la cadena igual a la longitud de tu código
    if (secuenciaActual.length > codigoDesbloqueo.length) {
        secuenciaActual = secuenciaActual.slice(-codigoDesbloqueo.length);
    }

    // Comprobar si se ha escrito la secuencia correcta
    if (secuenciaActual === codigoDesbloqueo) {
        
        // 1. Eliminar bloqueos de JavaScript
        ['contextmenu', 'copy', 'selectstart', 'dragstart', 'mousedown'].forEach(evt => {
            document.addEventListener(evt, function(event) {
                event.stopPropagation();
            }, true);
        });

        // 2. Sobrescribir reglas CSS
        const estiloDesbloqueo = document.createElement('style');
        estiloDesbloqueo.innerHTML = `
            * {
                -webkit-user-select: auto !important;
                -moz-user-select: auto !important;
                -ms-user-select: auto !important;
                user-select: auto !important;
            }
            img, * {
                pointer-events: auto !important;
                -webkit-user-drag: auto !important;
            }
        `;
        document.head.appendChild(estiloDesbloqueo);

        // Confirmación visual opcional (puedes borrar esta línea si quieres que sea 100% invisible)
        alert('✅ Herramienta activada: Copia de imágenes habilitada.');
        
        // Reiniciar la secuencia
        secuenciaActual = "";
    }
});