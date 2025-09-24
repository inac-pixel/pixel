
document.addEventListener('DOMContentLoaded', function() {
    const creatorInfoButton = document.getElementById('creatorInfoButton');
    const creatorInfoPanel = document.getElementById('creatorInfoPanel');
    const closePanelButton = document.getElementById('closePanelButton');

    // Función para mostrar/ocultar el panel
    function toggleCreatorInfoPanel() {
        creatorInfoPanel.classList.toggle('active');
    }

    // Event listener para el botón principal
    if (creatorInfoButton) {
        creatorInfoButton.addEventListener('click', toggleCreatorInfoPanel);
    }

    // Event listener para el botón de cerrar
    if (closePanelButton) {
        closePanelButton.addEventListener('click', toggleCreatorInfoPanel);
    }

    // Opcional: Cerrar el panel si se hace clic fuera de él
    document.addEventListener('click', function(event) {
        // Si el clic no fue en el botón del creador, ni dentro del panel del creador
        // Y el panel está activo
        if (creatorInfoPanel.classList.contains('active') &&
            !creatorInfoButton.contains(event.target) &&
            !creatorInfoPanel.contains(event.target)) {
            creatorInfoPanel.classList.remove('active');
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const book = document.getElementById('book');

    book.addEventListener('click', () => {
        book.classList.toggle('open');
    });

});

//panel carga
document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById('progressBar');
    let progress = 0;
    const totalDuration = 4000; // Duración total de la carga en milisegundos (4 segundos)
    const intervalTime = 50;   // Intervalo de actualización en milisegundos
    const increment = (intervalTime / totalDuration) * 100; // Porcentaje de incremento por intervalo

    const destinationPage = 'destino.html'; // <<< ¡IMPORTANTE! Cambia esto a tu página de destino

    const loadingInterval = setInterval(() => {
        progress += increment;
        if (progress >= 100) {
            progress = 100; // Asegura que no se pase de 100%
            progressBar.style.width = `${progress}%`;
            clearInterval(loadingInterval);
            // Redirigir a la nueva página
            window.location.href = destinationPage;
        } else {
            progressBar.style.width = `${progress}%`;
        }
    }, intervalTime);

});