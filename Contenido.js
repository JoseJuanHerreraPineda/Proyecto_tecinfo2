document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling para los botones dinámicos
    document.querySelectorAll('button[data-scroll]').forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-scroll');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efecto de "Fade In" para secciones al hacer scroll
    const sections = document.querySelectorAll('.section:not(.hero-section)');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // Cuando el 20% de la sección esté visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Dejar de observar una vez que es visible
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('fade-in'); // Añadir la clase para el estado inicial (oculto)
        observer.observe(section);
    });

    // Manejo del formulario de registro (ejemplo básico)
    const registrationForm = document.querySelector('.registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evitar el envío por defecto del formulario

            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const institucion = document.getElementById('institucion').value;

            // Validación básica
            if (nombre === '' || email === '') {
                alert('Por favor, completa todos los campos obligatorios.');
                return;
            }

            if (!validateEmail(email)) {
                alert('Por favor, ingresa un correo electrónico válido.');
                return;
            }

            // Aquí se simularía el envío de datos
            console.log('Formulario enviado:');
            console.log(`Nombre: ${nombre}`);
            console.log(`Email: ${email}`);
            console.log(`Institución: ${institucion}`);

            alert(`¡Gracias, ${nombre}! Te has registrado exitosamente. Pronto recibirás noticias sobre nuestros cursos.`);
            registrationForm.reset(); // Limpiar el formulario
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});
