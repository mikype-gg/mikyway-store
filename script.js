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

    /* --- Video Mute/Unmute Logic --- */
    const promoVideo = document.getElementById("promoVideo");
    const muteToggle = document.getElementById("mute-toggle");
    const muteIcon = document.getElementById("mute-icon");

    if (promoVideo && muteToggle && muteIcon) {

        promoVideo.defaultMuted = true;
        promoVideo.muted = true;
        promoVideo.volume = 0;

        promoVideo.play().catch(()=>{});

        const updateMuteUI = () => {
            if (promoVideo.muted) {
                muteIcon.className = "fa-solid fa-volume-xmark";
                muteToggle.setAttribute("aria-label","Aktifkan Suara");
            } else {
                muteIcon.className = "fa-solid fa-volume-high";
                muteToggle.setAttribute("aria-label","Matikan Suara");
            }
        };

        updateMuteUI();

        muteToggle.addEventListener("click", async (e)=>{
            e.preventDefault();
            try{
                if(promoVideo.muted){
                    promoVideo.defaultMuted=false;
                    promoVideo.muted=false;
                    promoVideo.volume=1;
                    await promoVideo.play();
                }else{
                    promoVideo.defaultMuted=true;
                    promoVideo.muted=true;
                    promoVideo.volume=0;
                }
                updateMuteUI();
            }catch(err){
                console.log(err);
            }
        });
    }

    /* --- 3D Coverflow Carousel Logic --- */
    const carouselItems = document.querySelectorAll('.carousel-item');
    let currentIndex = 1; 

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
