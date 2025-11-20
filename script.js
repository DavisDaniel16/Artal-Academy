document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ANIMACIÓN DE ONDAS ---
    const canvas = document.getElementById('waveCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let waves = [];

        function init() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            
            waves = [
                { y: height * 0.75, length: 0.008, amplitude: 40, speed: 0.02, color: 'rgba(32, 201, 151, 0.1)' },
                { y: height * 0.75, length: 0.004, amplitude: 60, speed: 0.015, color: 'rgba(5, 94, 111, 0.08)' },
                { y: height * 0.8, length: 0.015, amplitude: 25, speed: 0.03, color: 'rgba(32, 201, 151, 0.15)' }
            ];
        }

        let increment = 0;
        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, width, height);
            increment += 0.01;

            waves.forEach(wave => {
                ctx.beginPath();
                ctx.moveTo(0, wave.y);
                for (let i = 0; i < width; i++) {
                    ctx.lineTo(i, wave.y + Math.sin(i * wave.length + increment * 5 * wave.speed) * wave.amplitude * Math.sin(increment));
                }
                ctx.lineTo(width, height);
                ctx.lineTo(0, height);
                ctx.fillStyle = wave.color;
                ctx.fill();
            });
        }

        window.addEventListener('resize', init);
        init();
        animate();
    }

    // --- 2. EFECTO TILT ---
    const cards = document.querySelectorAll('.program-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
        });
    });

    // --- 3. MENU SCROLL SPY ---
    const nav = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section, footer'); 
    const navLinks = document.querySelectorAll('.nav-links a');

    const handleScroll = () => {
        // Estilo Navbar al bajar
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        let current = '';
        
        // Detección normal de secciones
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        // --- CORRECCIÓN CLAVE: DETECTAR FINAL DE PÁGINA ---
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
            current = 'ubicacion';
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (current && link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
});
