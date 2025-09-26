document.addEventListener('DOMContentLoaded', () => {

    // CORRECCIÓN: Usamos un pequeño retraso para asegurar que se ejecute después del renderizado inicial del navegador
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100); // 100ms es suficiente para la mayoría de los navegadores

    // --- Lógica de Animate On Scroll (AOS) usando IntersectionObserver ---
    const aosElements = document.querySelectorAll('[data-aos]');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                // observer.unobserve(entry.target); // Descomenta si quieres que se anime solo una vez
            } else {
                // entry.target.classList.remove('aos-animate'); // Descomenta si quieres que se reinicie
            }
        });
    }, observerOptions);

    aosElements.forEach(element => {
        observer.observe(element);
    });

    // --- Lógica del Panel Lateral y Modal ---
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    const anatomyTypesPanel = document.getElementById('anatomyTypesPanel');
    const closePanelBtn = anatomyTypesPanel.querySelector('.close-panel-btn');
    const anatomyTypesList = document.getElementById('anatomyTypesList');
    const anatomyModal = document.getElementById('anatomyModal');
    const closeModalBtn = anatomyModal.querySelector('.close-modal-btn');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalImage = document.getElementById('modalImage');

    // Datos de ejemplo para los tipos de anatomía
    const anatomyData = {
        "Anatomía Macroscópica": {
            description: "Estudia las estructuras del cuerpo que son visibles a simple vista, sin la necesidad de un microscopio. Incluye la anatomía regional (por partes del cuerpo), la anatomía sistémica (por sistemas de órganos) y la anatomía de superficie.",
            image: "../grup/img/macr.png"
        },
        "Anatomía Microscópica": {
            description: "También conocida como histología, se enfoca en el estudio de los tejidos y las células, que solo pueden observarse con la ayuda de un microscopio. Es crucial para entender la composición interna de los órganos.",
            image: "../grup/img/micro.png"
        },
        "Anatomía Comparada": {
            description: "Examina las similitudes y diferencias en la estructura de diferentes especies. Es fundamental para comprender la evolución y las relaciones filogenéticas entre los organismos.",
            image: "../grup/img/comp.png"
        },
        "Anatomía Patológica": {
            description: "Se dedica al estudio de los cambios estructurales en tejidos y órganos causados por enfermedades. Es vital para el diagnóstico y comprensión de diversas patologías.",
            image: "../grup/img/pato.png"
        },
        "Anatomía Radiológica": {
            description: "Estudia las estructuras del cuerpo utilizando técnicas de imagen como rayos X, tomografía computarizada (TC), resonancia magnética (RM) y ecografía. Es indispensable en el diagnóstico médico moderno.",
            image: "../grup/img/radi.png"
        },
        "Anatomía Humana": {
            description: "Se centra específicamente en el estudio de las estructuras del cuerpo humano, incluyendo huesos, músculos, órganos, nervios y vasos sanguíneos.",
            image: "../grup/img/humn.ong"
        },
        "Anatomía Vegetal": {
            description: "Estudia la estructura interna de las plantas, incluyendo sus tejidos (epidermis, parénquima, xilema, floema) y órganos (raíces, tallos, hojas, flores).",
            image: "../grup/img/vegt.png"
        }
        
        
    };

    function populateAnatomyTypes() {
        anatomyTypesList.innerHTML = '';
        for (const type in anatomyData) {
            const listItem = document.createElement('li');
            listItem.textContent = type;
            listItem.dataset.anatomyType = type;
            anatomyTypesList.appendChild(listItem);
        }
    }

    viewMoreBtn.addEventListener('click', () => {
        anatomyTypesPanel.classList.add('open');
        populateAnatomyTypes();
    });

    closePanelBtn.addEventListener('click', () => {
        anatomyTypesPanel.classList.remove('open');
    });

    anatomyTypesList.addEventListener('click', (event) => {
        const selectedItem = event.target.closest('li');
        if (selectedItem && selectedItem.dataset.anatomyType) {
            const type = selectedItem.dataset.anatomyType;
            const data = anatomyData[type];
            if (data) {
                modalTitle.textContent = type;
                modalDescription.textContent = data.description;
                modalImage.src = data.image;
                modalImage.alt = `Imagen de ${type}`;
                anatomyModal.classList.add('show');
            }
        }
    });

    closeModalBtn.addEventListener('click', () => {
        anatomyModal.classList.remove('show');
    });

    anatomyModal.addEventListener('click', (event) => {
        if (event.target === anatomyModal) {
            anatomyModal.classList.remove('show');
        }
    });
});


