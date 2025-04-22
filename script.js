document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Modal functionality for service, feature, and testimonial cards
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDetail = document.getElementById('modal-detail');
    const closeModal = document.querySelector('.modal-close');

    // Handle clicks for service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title');
            const detail = card.getAttribute('data-detail');
            modalTitle.textContent = title;
            modalDetail.textContent = detail;
            modal.style.display = 'flex';
        });
    });

    // Handle clicks for feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title');
            const detail = card.getAttribute('data-detail');
            modalTitle.textContent = title;
            modalDetail.textContent = detail;
            modal.style.display = 'flex';
        });
    });

    // Handle clicks for testimonial cards
    document.querySelectorAll('.testimonial-card').forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title');
            const detail = card.getAttribute('data-detail');
            modalTitle.textContent = title;
            modalDetail.textContent = detail;
            modal.style.display = 'flex';
        });
    });

    // Close modal when clicking the close button
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside the modal content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // CTA buttons scroll to About section
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('#about').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Scroll-based animations for sections and images
    const sections = document.querySelectorAll('.content-section');
    const images = document.querySelectorAll('.animated-image');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    images.forEach(image => {
        imageObserver.observe(image);
    });

    // Flower animation scroll effect
    const flowerSvg = document.querySelector('.flower-svg');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const scale = 0.8 + scrollPosition / 2000;
        const rotate = scrollPosition / 5;
        flowerSvg.style.transform = `scale(${scale}) rotate(${rotate}deg)`;
    });
});