document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu');
    const mobileNav = document.getElementById('mobile-nav');
    const overlay = document.getElementById('overlay');
    const mainNavLinks = document.querySelectorAll('.mobile-nav ul li a');

    const whatsappFloatButton = document.getElementById('whatsapp-float');
    const scrollTopButton = document.getElementById('scroll-to-top-float');

    // Función para abrir el menú
    function openMobileMenu() {
        mobileNav.classList.add('open');
        overlay.classList.add('visible');
        document.body.classList.add('no-scroll');
    }

    // Función para cerrar el menú
    function closeMobileMenu() {
        mobileNav.classList.remove('open');
        overlay.classList.remove('visible');
        document.body.classList.remove('no-scroll');
    }

    // Evento para abrir el menú al hacer clic en el botón de hamburguesa
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', openMobileMenu);
    }

    // Evento para cerrar el menú al hacer clic en el overlay
    if (overlay) {
        overlay.addEventListener('click', closeMobileMenu);
    }

    // Evento para cerrar el menú cuando se hace clic en un enlace del menú móvil
    mainNavLinks.forEach(link => {
        link.addEventListener('click', () => { // Ya no es necesario 'e' si no vas a prevenir el default aquí
            closeMobileMenu();
        });
    });

    // Desplazamiento suave para todos los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerOffset = document.querySelector('header').offsetHeight;
                const offsetPosition = targetElement.offsetTop - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Lógica para los botones flotantes
    function toggleFloatingButtonsVisibility() {
        const currentSection = getCurrentSection();
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;

        // Visibilidad del botón de WhatsApp
        if (whatsappFloatButton) {
            if (currentSection === 'inicio' || currentSection === 'contacto') {
                whatsappFloatButton.style.opacity = '0';
                whatsappFloatButton.style.visibility = 'hidden';
            } else {
                whatsappFloatButton.style.opacity = '1';
                whatsappFloatButton.style.visibility = 'visible';
            }
        }

        // Visibilidad del botón "Volver Arriba"
        if (scrollTopButton) {
            if (scrollPosition > 200) { // Muestra el botón si el scroll es mayor a 200px
                scrollTopButton.classList.add('show');
            } else {
                scrollTopButton.classList.remove('show');
            }
        }
    }

    // Función auxiliar para obtener la sección actual visible
    function getCurrentSection() {
        const sections = document.querySelectorAll('section[id]');
        let currentActiveSection = 'inicio'; // Por defecto, si estás al principio
        const scrollFromTop = window.scrollY + document.querySelector('header').offsetHeight + 1; // Añade la altura del header para que sea más preciso

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollFromTop >= sectionTop && scrollFromTop < sectionBottom) {
                currentActiveSection = section.id;
            }
        });
        return currentActiveSection;
    }

    // Eventos para controlar la visibilidad de los botones
    window.addEventListener('scroll', toggleFloatingButtonsVisibility);
    // También se ejecuta al cargar la página para establecer el estado inicial
    toggleFloatingButtonsVisibility();

    // Evento para el botón "Volver Arriba"
    if (scrollTopButton) {
        scrollTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});