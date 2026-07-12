document.addEventListener("DOMContentLoaded", () => {
    
    /* --- Scroll Reveal Animation --- */
    const reveals = document.querySelectorAll(".reveal");
    const revealElements = () => {
        const windowHeight = window.innerHeight;
        for (let i = 0; i < reveals.length; i++) {
            const elementTop = reveals[i].getBoundingClientRect().top;
            if (elementTop < windowHeight - 30) {
                reveals[i].classList.add("active");
            }
        }
    };
    setTimeout(revealElements, 50);
    window.addEventListener("scroll", revealElements);

    /* --- Typing Animation --- */
    const typingElement = document.getElementById("typing-text");
    // Teks sudah diupdate sesuai instruksi
    const textToType = "Jual Beli iPhone Indragiri Hulu - Riau";
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        if (isDeleting) {
            typingElement.innerText = textToType.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.innerText = textToType.substring(0, charIndex + 1);
            charIndex++;
        }
        let typingSpeed = isDeleting ? 40 : 80;
        if (!isDeleting && charIndex === textToType.length) {
            typingSpeed = 3000; 
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            typingSpeed = 1000; 
        }
        setTimeout(typeEffect, typingSpeed);
    }
    setTimeout(typeEffect, 600);

    /* --- Dark/Light Mode Toggle Logic --- */
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");

    // Pastikan ikon awal sesuai dengan status default (Light Mode)
    if (document.body.classList.contains("light-mode")) {
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
    } else {
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        if (document.body.classList.contains("light-mode")) {
            themeIcon.classList.remove("fa-sun");
            themeIcon.classList.add("fa-moon");
        } else {
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
        }
    });

    /* --- 3D Coverflow Carousel Logic --- */
    const carouselItems = document.querySelectorAll('.carousel-item');
    let currentIndex = 1; // Memulai dari index ke-1 (Battery Health di tengah)

    function updateCarousel() {
        carouselItems.forEach((item, index) => {
            item.classList.remove('active', 'prev', 'next', 'hidden');
            
            if (index === currentIndex) {
                item.classList.add('active');
            } else if (index === (currentIndex - 1 + carouselItems.length) % carouselItems.length) {
                item.classList.add('prev');
            } else if (index === (currentIndex + 1) % carouselItems.length) {
                item.classList.add('next');
            } else {
                item.classList.add('hidden');
            }
        });
    }

    function moveNext() {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        updateCarousel();
    }

    let carouselInterval = setInterval(moveNext, 3000);

    carouselItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
            clearInterval(carouselInterval);
            carouselInterval = setInterval(moveNext, 3000);
        });
    });

    updateCarousel();
});
