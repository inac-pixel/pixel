document.addEventListener('DOMContentLoaded', () => {
    const loadingWrapper = document.querySelector('.loading-wrapper');
    const loadingContainer = document.querySelector('.loading-container'); 
    const welcomeSection = document.querySelector('.welcome-section');
    const welcomeTitle = document.querySelector('.welcome-title');
    const welcomeSummary = document.querySelector('.welcome-summary');
    const welcomeButtons = document.querySelector('.welcome-buttons');

    // Obtener referencias a los botones
    const btnVerMas = document.querySelector('.btn-primary');
    const btnAdelanto = document.querySelector('.btn-secondary');

    // Asegurarse de que la animación fadeIn se aplique después de que el DOM esté listo
    loadingContainer.style.animation = 'fadeIn 1s ease-out forwards';

    // Simula un proceso de carga
    setTimeout(() => {
        // Oculta la pantalla de carga
        loadingWrapper.classList.add('hide');
        
        // Cuando la transición de la pantalla de carga termina, muestra la sección de bienvenida
        loadingWrapper.addEventListener('transitionend', () => {
            console.log('Carga completa. Contenido principal listo.');
            welcomeSection.classList.remove('hide-content'); // Muestra la sección de bienvenida

            // Aplica las animaciones con retraso para el texto y botones
            welcomeTitle.style.animationDelay = '0.3s';
            welcomeTitle.style.animation = 'fadeInSlideUp 0.8s ease-out forwards';

            welcomeSummary.style.animationDelay = '0.6s';
            welcomeSummary.style.animation = 'fadeInSlideUp 0.8s ease-out forwards';

            welcomeButtons.style.animationDelay = '0.9s';
            welcomeButtons.style.animation = 'fadeInSlideUp 0.8s ease-out forwards';

            // Añadir los eventos de clic a los botones


        }, { once: true }); // El { once: true } asegura que el evento solo se dispare una vez
    }, 3000); // 3 segundos de simulación de carga
    
    
});