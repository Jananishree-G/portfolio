/* ==========================================================================
   Jananishree G - Developer Portfolio Javascript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- Sticky Navbar on Scroll ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Hamburger Menu Drawer ---
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        // Close menu when clicking navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    // --- Scroll Spy (Active Navigation Highlight) ---
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Highlight a little early (offset 150px)
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // --- Hero Text Auto-Typing Effect ---
    const typingTarget = document.querySelector('.typing-target');
    if (typingTarget) {
        const roles = [
            "Full Stack Developer",
            "AI-ML Engineer",
            "CSE (AIML) Scholar",
            "Problem Solver"
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                // Delete characters
                typingTarget.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50; // Deletes faster
            } else {
                // Type characters
                typingTarget.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100; // Normal typing speed
            }

            // If word is complete, pause and start deleting
            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typingSpeed = 1500; // Pause at end of word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length; // Move to next word
                typingSpeed = 500; // Pause before typing next word
            }

            setTimeout(type, typingSpeed);
        }

        // Start typing loop
        setTimeout(type, 1000);
    }

    // --- Project Category Filters ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active state from all buttons and apply to current
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    // Show matching cards
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    // Hide non-matching cards
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300); // Wait for transition out
                }
            });
        });
    });

    // --- Contact Form Client Validation & Submission ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('form-submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Form inputs
            const nameInput = document.getElementById('form-name');
            const emailInput = document.getElementById('form-email');
            const subjectInput = document.getElementById('form-subject');
            const messageInput = document.getElementById('form-message');

            let isValid = true;

            // Simple Validation Helpers
            const setInvalid = (input, show) => {
                const parent = input.parentElement;
                if (show) {
                    parent.classList.add('invalid');
                    isValid = false;
                } else {
                    parent.classList.remove('invalid');
                }
            };

            // Name check
            if (nameInput.value.trim() === '') {
                setInvalid(nameInput, true);
            } else {
                setInvalid(nameInput, false);
            }

            // Email check
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                setInvalid(emailInput, true);
            } else {
                setInvalid(emailInput, false);
            }

            // Subject check
            if (subjectInput.value.trim() === '') {
                setInvalid(subjectInput, true);
            } else {
                setInvalid(subjectInput, false);
            }

            // Message check
            if (messageInput.value.trim() === '') {
                setInvalid(messageInput, true);
            } else {
                setInvalid(messageInput, false);
            }

            if (isValid) {
                // Show loading status
                submitBtn.disabled = true;
                const btnText = submitBtn.querySelector('span');
                const originalText = btnText.textContent;
                btnText.textContent = "Sending...";

                // Simulate form submission delay
                setTimeout(() => {
                    // Success feedback
                    formStatus.className = 'form-status success';
                    formStatus.innerHTML = `<strong>Success!</strong> Message sent. Thank you for reaching out, Jananishree will get back to you soon.`;
                    
                    // Reset form fields
                    contactForm.reset();
                    submitBtn.disabled = false;
                    btnText.textContent = originalText;

                    // Prefilled Mailto Fallback opens in background/new tab
                    const mailtoUrl = `mailto:jananishreeg1@gmail.com?subject=${encodeURIComponent(subjectInput.value)}&body=Hi Jananishree,%0D%0A%0D%0A${encodeURIComponent(messageInput.value)}%0D%0A%0D%0ABest regards,%0D%0A${encodeURIComponent(nameInput.value)} (${encodeURIComponent(emailInput.value)})`;
                    window.location.href = mailtoUrl;

                    // Fade status out after 6 seconds
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                    }, 6000);
                }, 1500);
            } else {
                // Error feedback
                formStatus.className = 'form-status error';
                formStatus.innerHTML = `<strong>Error!</strong> Please fill in all fields correctly before sending.`;
                formStatus.style.display = 'block';
            }
        });
    }
});
