document.addEventListener('DOMContentLoaded', function() {
    // Selecciona todos los botones con la clase 'ver-mas' que activan las modales
    const botonesVerMas = document.querySelectorAll('.ver-mas');
    // Selecciona todas las ventanas modales en la página
    const modals = document.querySelectorAll('.modal');
    // Selecciona todos los botones de cerrar (la 'X') dentro de las modales
    const closeButtons = document.querySelectorAll('.close-button');

    /**
     * Abre una ventana modal específica.
     * @param {string} modalId - El ID de la ventana modal a abrir.
     */
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            // Añade la clase 'active' para hacer visible la modal y aplicar animaciones de entrada
            modal.classList.add('active');
            // Añade una clase al body para evitar el scroll del contenido de fondo
            document.body.classList.add('modal-active');
        }
    }

    /**
     * Cierra una ventana modal específica.
     * @param {HTMLElement} modalElement - El elemento DOM de la ventana modal a cerrar.
     */
    function closeModal(modalElement) {
        if (modalElement) {
            // Quita la clase 'active' para ocultar la modal y aplicar animaciones de salida
            modalElement.classList.remove('active');
            // Quita la clase del body para restaurar el scroll del contenido de fondo
            document.body.classList.remove('modal-active');
        }
    }

    // Itera sobre cada botón "Ver detalles" y añade un escuchador de eventos 'click'
    botonesVerMas.forEach(boton => {
        boton.addEventListener('click', function() {
            // Obtiene el ID de la modal objetivo desde el atributo 'data-target' del botón
            const targetModalId = this.dataset.target;
            openModal(targetModalId); // Llama a la función para abrir la modal
        });
    });

    // Itera sobre cada botón de cerrar ('X') y añade un escuchador de eventos 'click'
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Encuentra el elemento modal padre más cercano al botón de cerrar
            const modalElement = this.closest('.modal');
            closeModal(modalElement); // Llama a la función para cerrar la modal
        });
    });

    // Itera sobre cada modal y añade un escuchador de eventos 'click'
    // Esto permite cerrar la modal haciendo clic en el fondo semi-transparente
    modals.forEach(modal => {
        modal.addEventListener('click', function(event) {
            // Comprueba si el clic ocurrió directamente sobre el elemento modal (el fondo),
            // y no sobre su contenido (modal-content)
            if (event.target === modal) {
                closeModal(modal); // Cierra la modal si se hace clic en el fondo
            }
        });
    });
});
