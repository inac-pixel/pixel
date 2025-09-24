document.addEventListener('DOMContentLoaded', () => {

    // --- Animación de Salida de Portal ---
    const body = document.body;

    // Cuando la página se ha cargado completamente (incluyendo imágenes y otros recursos)
    // Se elimina la clase 'portal-exit' que está inicialmente en el <body> del HTML
    window.addEventListener('load', () => {
        body.classList.remove('portal-exit');
    });

    // --- Menú de Navegación Móvil (Hamburguesa) ---
    // NOTA: Estos elementos están ocultos por CSS con !important,
    // por lo que este bloque de código no tendrá efecto.
    // Lo mantengo por si decides reintroducir la navegación en el futuro.
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) { // Asegurarse de que existan antes de añadir listeners
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            // Cambiar icono de Boxicons
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('bx-menu');
                icon.classList.add('bx-x'); // Icono de 'X' para cerrar
            } else {
                icon.classList.remove('bx-x');
                icon.classList.add('bx-menu'); // Icono de hamburguesa
            }
        });

        // Cierra el menú cuando se hace clic en un enlace (en móvil)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    menuToggle.querySelector('i').classList.remove('bx-x');
                    menuToggle.querySelector('i').classList.add('bx-menu');
                }
            });
        });
    }


    // --- Carrusel de Mensajes en Hero Section ---
    const carouselItems = document.querySelectorAll('.carousel-messages .carousel-item');
    const dots = document.querySelectorAll('.carousel-indicators .dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        carouselItems.forEach(item => {
            item.classList.remove('active');
            item.style.animation = ''; // Limpiar animación anterior
        });
        dots.forEach(dot => dot.classList.remove('active'));

        if (carouselItems.length > 0 && carouselItems.hasOwnProperty(index)) {
            carouselItems.item(index).classList.add('active');
            carouselItems.item(index).style.animation = 'fadeIn 0.8s ease-out';
        }
        if (dots.length > 0 && dots.hasOwnProperty(index)) {
            dots.item(index).classList.add('active');
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % carouselItems.length;
        showSlide(currentSlide);
    }

    function startCarousel() {
        stopCarousel();
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopCarousel() {
        clearInterval(slideInterval);
    }

    if (carouselItems.length > 0) {
        showSlide(currentSlide);
        startCarousel();

        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                stopCarousel();
                currentSlide = index;
                showSlide(currentSlide);
                startCarousel();
            });
        });

        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', stopCarousel);
            heroSection.addEventListener('mouseleave', startCarousel);
        }
    }


    // --- Navegación Activa en Sidebar y Animación de Secciones al Scroll ---
    const sidebarItems = document.querySelectorAll('.quick-access-sidebar .sidebar-item');
    const contentSections = document.querySelectorAll('main .content-section');
    // mainNav está oculto, por lo que navLinks tampoco será funcional para la barra superior
    const navLinks = document.querySelectorAll('.main-nav a');


    function updateActiveStates() {
        let currentActiveSectionId = null;
        // Obtener la altura del header solo si existe, sino 0
        const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0;
        // Ajuste para la barra lateral fija y un pequeño offset para que se active antes
        const scrollOffset = headerHeight + 50; 

        contentSections.forEach(section => {
            const sectionTop = section.offsetTop - scrollOffset;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentActiveSectionId = section.id;
            }

            // Animación de fade-in para secciones (fade-in y slide-up)
            // Se activa cuando el 80% de la ventana de visualización ha pasado la parte superior de la sección
            if (window.scrollY + window.innerHeight * 0.8 > section.offsetTop) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });

        // Activar elementos de la barra lateral
        sidebarItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.targetSection === currentActiveSectionId) {
                item.classList.add('active');
            }
        });

        // Activar enlaces de navegación principal
        // Este bloque no funcionará si .main-nav está oculto con !important en CSS
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.sectionId === currentActiveSectionId) {
                link.classList.add('active');
            }
        });
    }

    // Ejecutar al cargar y al hacer scroll
    window.addEventListener('scroll', updateActiveStates);
    updateActiveStates(); // Llamada inicial para establecer el estado al cargar

    // --- Animación escalonada de la barra lateral al cargar ---
    // Reducir el delay en pantallas pequeñas para una animación más rápida y compacta
    const isMobile = window.innerWidth <= 992; // Usamos 992px como nuestro breakpoint móvil principal
    sidebarItems.forEach((item, index) => {
        const delay = isMobile ? index * 0.05 : index * 0.1; // Menor delay en móvil (0.05s vs 0.1s)
        item.style.setProperty('--animation-delay', `${delay}s`);
    });


    // --- Smooth Scroll al hacer clic en enlaces internos ---
    // Ajustar el smooth scroll para compensar la barra lateral centrada
    document.querySelectorAll('.main-nav a, .hero-cta-buttons a, .quick-access-sidebar a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                let targetElement = document.getElementById(targetId);

                // Si el enlace es de la barra lateral y apunta a una subsección (ej. #curriculum-details)
                // necesitamos el padre principal para el scroll (ej. #curriculum)
                if (this.classList.contains('sidebar-item') && this.dataset.targetSection) {
                    targetElement = document.getElementById(this.dataset.targetSection) || targetElement;
                }

                if (targetElement) {
                    // La altura del header ya no importa si está oculto o no es sticky relevante
                    // El offset ahora debe considerar que el contenido principal puede tener padding-top para evitar la barra lateral
                    const offsetCompensation = window.innerWidth <= 992 ? 80 : 20; // 80px para móvil, 20px para desktop
                    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                    const offsetPosition = elementPosition - offsetCompensation; 

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                    // Cerrar el menú móvil si está abierto después de hacer clic en un enlace
                    // Este bloque no funcionará si .main-nav está oculto con !important en CSS
                    if (mainNav && mainNav.classList.contains('active')) {
                        mainNav.classList.remove('active');
                        if (menuToggle) {
                            menuToggle.querySelector('i').classList.remove('bx-x');
                            menuToggle.querySelector('i').classList.add('bx-menu');
                        }
                    }
                }
            }
        });
    });
});