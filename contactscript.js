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

    // Modal functionality
    const modal = document.getElementById('modal');
    const modalContent = document.querySelector('.modal-content');
    const modalIcon = document.querySelector('.modal-icon');
    const modalTitle = document.getElementById('modal-title');
    const modalDetail = document.getElementById('modal-detail');
    const modalAction = document.querySelector('.modal-action');
    const closeModal = document.querySelector('.modal-close');
    const recentlyViewed = document.querySelector('.recently-viewed');

    // Close modal functionality
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Close modal when clicking outside the modal content
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        const formMessage = document.querySelector('.form-message');
        const submitButton = contactForm.querySelector('button[type="submit"]');

        // Real-time validation
        function validateInput(input, type = 'text') {
            const parent = input.parentElement;
            let isValid = true;

            switch (type) {
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    isValid = emailRegex.test(input.value);
                    break;
                case 'phone':
                    // Only validate if there's a value (since phone might be optional)
                    if (input.value.trim()) {
                        const phoneRegex = /^[\d\s\+\-\(\)]{7,15}$/;
                        isValid = phoneRegex.test(input.value);
                    }
                    break;
                default:
                    isValid = input.value.trim() !== '';
            }

            parent.classList.toggle('invalid', !isValid && input.value.trim() !== '');
            return isValid;
        }

        // Add blur event listeners for real-time validation
        if (nameInput) nameInput.addEventListener('blur', () => validateInput(nameInput));
        if (emailInput) emailInput.addEventListener('blur', () => validateInput(emailInput, 'email'));
        if (phoneInput) phoneInput.addEventListener('blur', () => validateInput(phoneInput, 'phone'));
        if (subjectInput) subjectInput.addEventListener('blur', () => validateInput(subjectInput));
        if (messageInput) messageInput.addEventListener('blur', () => validateInput(messageInput));

        // Form submission
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Validate all fields
            const nameValid = validateInput(nameInput);
            const emailValid = validateInput(emailInput, 'email');
            const phoneValid = validateInput(phoneInput, 'phone');
            const subjectValid = validateInput(subjectInput);
            const messageValid = validateInput(messageInput);

            // Check if required fields are valid
            if (!nameValid || !emailValid || !messageValid) {
                formMessage.textContent = 'Please fill out all required fields correctly.';
                formMessage.className = 'form-message error';
                return;
            }

            // Disable submit button during submission
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            formMessage.textContent = '';

            // Prepare form data for submission
            const formData = new FormData();
            formData.append('Name', nameInput.value.trim());
            formData.append('Email', emailInput.value.trim());
            formData.append('Phone', phoneInput.value.trim());
            formData.append('Subject', subjectInput.value.trim());
            formData.append('Message', messageInput.value.trim());
            formData.append('Date', new Date().toISOString());

            try {
                // Replace with your actual Google Apps Script Web App URL
                const scriptURL = 'https://script.google.com/macros/s/AKfycbxQiY6T8nQOCoCYiRqgvqq0WVOiYVMik6wJBqwONpk7KFgoOVugAL5OCS7tDNcd4b4/exec';
                
                const response = await fetch(scriptURL, {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    formMessage.textContent = 'Message sent successfully! We will get back to you soon.';
                    formMessage.className = 'form-message success';
                    contactForm.reset();
                    
                    // Show success modal
                    modalTitle.textContent = 'Message Sent!';
                    modalDetail.textContent = 'Thank you for contacting us. We will get back to you shortly.';
                    modalIcon.innerHTML = '<i class="fas fa-check-circle" style="color: #2e7d32;"></i>';
                    modal.style.display = 'flex';
                } else {
                    throw new Error('Something went wrong. Please try again.');
                }
            } catch (error) {
                formMessage.textContent = error.message || 'Error sending message. Please try again.';
                formMessage.className = 'form-message error';
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }
        });
    }

    // Scroll-based animations for sections
    const sections = document.querySelectorAll('.content-section');
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

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});