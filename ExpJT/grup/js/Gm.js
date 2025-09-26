// Gm.js

document.addEventListener('DOMContentLoaded', () => {

    /* --- Variables Globales --- */
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    const welcomeTextElement = document.querySelector('.welcome-text');

    const navbar = document.getElementById('vertical-navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const closeNavbarButton = document.querySelector('.close-navbar-button');
    const navbarOverlay = document.getElementById('navbar-overlay');
    const navLinks = document.querySelectorAll('#vertical-navbar ul li a');

    const projectCards = document.querySelectorAll('.project-card');
    const projectModal = document.getElementById('project-modal');
    const closeModalButton = projectModal.querySelector('.close-button');
    const modalProjectTitle = document.getElementById('modal-project-title');
    const modalProjectDescription = document.getElementById('modal-project-description');
    const modalProjectFeatures = document.getElementById('modal-project-features');
    const liveDemoButton = projectModal.querySelector('.live-demo-button');
    const repoButton = projectModal.querySelector('.repo-button');

    /* --- Datos de Proyectos (Para el Modal) --- */
    const projectsData = {
        1: {
            title: "PeliPlus SV",
            description: "un espacio digital centralizado y ordenado que simplifica la vida del consumidor de contenido, mientras provee a los equipos de gestión las herramientas para mantener un catálogo de alta calidad y veracidad.",
            features: [
                
            ],
            demoLink: "#",
            repoLink: "#"
        },
        2: {
            title: "Corazones Solidarios",
            description: "la plataforma es un puente digital que conecta la oferta de ropa donada con la demanda y gestión de proyectos sociales, todo ello bajo una misión central de beneficencia.",
            features: [
                
            ],
            demoLink: "#",
            repoLink: "#"
        },
        3: {
            title: "Guardería Huellitas",
            description: "Guardería Huellitas es la columna vertebral digital que asegura que la guardería pueda ofrecer un servicio de alta calidad, manteniendo todos los datos de clientes, mascotas y servicios de forma ordenada y accesible.",
            features: [
               
            ],
            demoLink: "#",
            repoLink: "#"
        },
        4: {
            title: "Hotel Paraiso Tropical",
            description: "El proyecto es una plataforma web de gestión hotelera diseñada para automatizar el proceso de reservas de habitaciones y centralizar la administración de la información.",
            features: [
           
            ],
            demoLink: "#",
            repoLink: "#"
        }
    };

    /* --- Funciones --- */

    // 1. Efecto de Máquina de Escribir en Splash Screen
    const typeWriter = (element, text, speed) => {
        let i = 0;
        element.textContent = ''; // Limpiar contenido inicial
        element.style.maxWidth = '0'; // Establecer ancho inicial a 0
        const interval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                element.style.maxWidth = '100%'; // Asegura que el contenedor se expanda
            } else {
                clearInterval(interval);
                element.style.borderRight = 'none'; // Ocultar el cursor al terminar
            }
        }, speed);
    };

    // 2. Control de Splash Screen y Carga de Contenido
    const initSplashScreen = () => {
        const textToType = welcomeTextElement.dataset.text;
        typeWriter(welcomeTextElement, textToType, 100); // Velocidad de escritura

        setTimeout(() => {
            splashScreen.classList.add('hidden');
        }, 3500); // Tiempo total para splash screen (ajustar según animación)

        splashScreen.addEventListener('transitionend', () => {
            if (splashScreen.classList.contains('hidden')) {
                // Iniciar observador de scroll para animaciones
                observeSections();
            }
        }, { once: true }); // Solo ejecutar una vez
    };

    // 3. Animaciones al Hacer Scroll (Intersection Observer)
    const sections = document.querySelectorAll('.content-section');

    const observerOptions = {
        root: null, // El viewport es el root
        rootMargin: '0px',
        threshold: 0.2 // Cuando el 20% de la sección es visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Dejar de observar una vez visible
            }
        });
    }, observerOptions);

    const observeSections = () => {
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    };

    // 4. Funcionalidad de la Barra de Navegación
    const toggleNavbar = () => {
        navbar.classList.toggle('active');
        navbarOverlay.classList.toggle('active');
    };

    const closeNavbar = () => {
        navbar.classList.remove('active');
        navbarOverlay.classList.remove('active');
    };

    // 5. Gestión del Modal de Proyectos
    const openProjectModal = (projectId) => {
        const project = projectsData[projectId];
        if (project) {
            modalProjectTitle.textContent = project.title;
            modalProjectDescription.textContent = project.description;

            // Limpiar y añadir características
            modalProjectFeatures.innerHTML = '';
            project.features.forEach(feature => {
                const li = document.createElement('li');
                li.innerHTML = `<i class='bx bx-check-circle'></i> ${feature}`;
                modalProjectFeatures.appendChild(li);
            });

            liveDemoButton.href = project.demoLink;
            repoButton.href = project.repoLink;

            projectModal.classList.add('active');
        }
    };

    const closeProjectModal = () => {
        projectModal.classList.remove('active');
    };

    // 6. Cursor Personalizado y Efecto de Estela
    const customCursor = document.getElementById('custom-cursor');
    const cursorTrailContainer = document.getElementById('cursor-trail-container');

    const initCustomCursor = () => {
        document.addEventListener('mousemove', (e) => {
            if (customCursor) {
                customCursor.style.left = `${e.clientX}px`;
                customCursor.style.top = `${e.clientY}px`;
            }

            if (cursorTrailContainer) {
                const dot = document.createElement('div');
                dot.classList.add('cursor-trail-dot');
                dot.style.left = `${e.clientX}px`;
                dot.style.top = `${e.clientY}px`;
                cursorTrailContainer.appendChild(dot);

                setTimeout(() => {
                    dot.remove();
                }, 500); // Elimina el rastro después de 0.5 segundos
            }
        });
    };


    /* --- Event Listeners --- */

    // Iniciar Splash Screen al cargar el DOM
    initSplashScreen();
    initCustomCursor();

    // Eventos de la Barra de Navegación
    menuToggle.addEventListener('click', toggleNavbar);
    closeNavbarButton.addEventListener('click', closeNavbar);
    navbarOverlay.addEventListener('click', closeNavbar);

    // Cerrar menú al hacer clic en un enlace de navegación y scroll suave
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Evitar el salto inmediato
            const targetId = link.getAttribute('href').substring(1); // Obtener el ID sin '#'
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // Ajusta el offset si tienes un header fijo
                    behavior: 'smooth'
                });
            }
            closeNavbar(); // Cerrar el menú después de hacer clic
        });
    });

    // Eventos para abrir el Modal de Proyectos
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Asegurarse de que el clic no sea directamente en el botón "Ver Detalles"
            // si el evento se propaga desde un elemento hijo
            if (!e.target.classList.contains('view-details-btn') && !e.target.closest('.view-details-btn')) {
                const projectId = card.dataset.projectId;
                openProjectModal(projectId);
            }
        });

        // Asegurarse de que el botón también abra el modal
        const viewDetailsBtn = card.querySelector('.view-details-btn');
        if (viewDetailsBtn) {
            viewDetailsBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Evitar que el clic en el botón active el evento de la tarjeta
                const projectId = card.dataset.projectId;
                openProjectModal(projectId);
            });
        }
    });


    // Eventos para cerrar el Modal de Proyectos
    closeModalButton.addEventListener('click', closeProjectModal);
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) { // Cierra si se hace clic fuera del contenido del modal
            closeProjectModal();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            closeProjectModal();
        }
    });

    // Envío del formulario de contacto (ejemplo, solo para demostrar la captura de datos)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevenir el envío por defecto del formulario

            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            console.log("Datos del formulario enviados:", data);
            alert("¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.");
            contactForm.reset(); // Limpiar el formulario
        });
    }


});


