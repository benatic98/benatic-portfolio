document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Scroll Styling
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // 3. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve once revealed
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(elem => revealObserver.observe(elem));

    // 4. Counter Statistics Animation
    const statsElements = document.querySelectorAll('.achievement-num, .stat-value[data-target]');
    
    const animateCounter = (element) => {
        const target = parseFloat(element.getAttribute('data-target'));
        const prefix = element.getAttribute('data-prefix') || '';
        const suffix = element.getAttribute('data-suffix') || '';
        const duration = 1500; // ms
        const steps = 60;
        const stepTime = duration / steps;
        let current = 0;
        const increment = target / steps;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                element.textContent = prefix + target + suffix;
            } else {
                // If float, display with decimal, otherwise round
                const displayVal = Number.isInteger(target) ? Math.floor(current) : current.toFixed(1);
                element.textContent = prefix + displayVal + suffix;
            }
        }, stepTime);
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    statsElements.forEach(stat => statsObserver.observe(stat));

    // 5. Active Section Indicator on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

    const scrollActiveIndicator = () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', scrollActiveIndicator);

    // 6. Project Showcase Modal Database
    const projectsData = {
        'pm-mementos': {
            title: 'PM Mementos',
            tag: 'E-Auction Platform',
            image: 'assets/project-pm-mementos.png',
            client: 'Government e-Marketplace',
            role: 'Lead Frontend Developer & UI Consultant',
            duration: '8 Months',
            tech: ['Vue.js', 'Pinia', 'JavaScript', 'HTML5', 'CSS3', 'REST APIs', 'SCSS'],
            desc: 'PM Mementos is a highly secure, high-traffic e-auction platform built to facilitate the public auctioning of prestigious mementos and gifts received by high-ranking dignitaries. The platform integrates real-time stateful bidding systems, live timers, and secure multi-channel payment options.',
            contributions: [
                'Designed and developed the core bidding interface with reactive timers and automatic outbid notifications using Vue.js and stateful Pinia stores.',
                'Optimized high-volume concurrent network requests, reducing dashboard latency by 35% during peak auction hours.',
                'Implemented pixel-perfect responsive layouts ensuring full mobile accessibility for on-the-go bidders.',
                'Collaborated with cybersecurity specialists to embed secure CSRF protections, content sanitization, and verification pipelines for bidder compliance.'
            ],
            metrics: ['1000+ Transactions Processed', '35% Latency Reduction', '100% Secure Payment Delivery']
        },
        'crude-oil': {
            title: 'Crude Oil e-Procurement',
            tag: 'Enterprise Procurement Portal',
            image: 'assets/project-crude-oil.png',
            client: 'Indian Oil Corporation Ltd.',
            role: 'Frontend UI Lead',
            duration: '12 Months',
            tech: ['Vue.js', 'Vuex', 'Vuetify', 'JavaScript', 'MSSQL', 'JSON'],
            desc: 'A robust, mission-critical enterprise procurement platform developed for Indian Oil to coordinate international and domestic crude purchase pipelines. The application handles massive inventory lists, tender declarations, secure corporate logins, multi-stage approvals, and custom document uploads.',
            contributions: [
                'Created modular reusable form components, reducing development cycle time for new purchase requests by 25%.',
                'Developed highly complex inventory tables with client-side sorting, paginating, and heavy nested-row details without performance degradation.',
                'Constructed stateful audit trail tracking visualizers to log procurement workflow actions from tender submission to contract sign-off.',
                'Configured responsive desktop grids that integrate legacy corporate databases via highly structured REST services.'
            ],
            metrics: ['Used by 1500+ Indian Oil Staff', '25% Faster Form Submissions', 'Zero Critical Data Breaches']
        },
        'tn-dashboard': {
            title: 'TN Dashboard',
            tag: 'Government Analytics Portal',
            image: 'assets/project-tn-dashboard.png',
            client: 'Government of Tamil Nadu',
            role: 'Frontend Developer & UI Specialist',
            duration: '14 Months',
            tech: ['Vue.js', 'Pinia', 'Vuetify', 'Sass', 'GitLab', 'REST APIs'],
            desc: 'A central dashboard used by government administrators to track tenders, state procurement compliance, project execution metrics, and district-level key performance indices across Tamil Nadu. Features map visualizers and analytics charts.',
            contributions: [
                'Architected clean state management using Pinia for caching department records, decreasing API queries by 30%.',
                'Collaborated with backend teams to normalize JSON responses for efficient front-end charting and geospatial maps.',
                'Refactored styles to align with state web standards, delivering 100% compliance with digital accessibility guidelines.',
                'Constructed dynamic PDF exports for department reports directly generated from stateful dashboard states.'
            ],
            metrics: ['Used by State Ministers & IAS Officers', '30% Reduction in API Overload', '100% Web Accessibility Compliance']
        },
        'cancer-conference': {
            title: 'International Conference on Cancer',
            tag: 'Responsive Event Portal',
            image: 'assets/project-iit-cancer.png',
            client: 'IIT Madras',
            role: 'Lead UI Consultant',
            duration: '4 Months',
            tech: ['JavaScript', 'HTML5', 'CSS3', 'Sass', 'Bootstrap', 'GitLab'],
            desc: 'An elegant, responsive web portal designed to host abstract submissions, schedule timetables, speaker rosters, and ticket reservations for an international scientific symposium organized by the Indian Institute of Technology Madras.',
            contributions: [
                'Created a custom conference schedule filter where attendees can filter panels by research tracks, speaker names, or room numbers.',
                'Designed a glassmorphic event landing experience featuring micro-animations, high-end scientific illustrations, and interactive maps.',
                'Optimized image bundles and layout structures, boosting mobile page speed load times by 40% on 3G connections.',
                'Integrated abstract submission file uploads with custom front-end validation safeguards.'
            ],
            metrics: ['1200+ Abstracts Submitted Online', '40% Fast Load Speed Boost', '100% Mobile responsive layout']
        },
        'magnify': {
            title: 'Magnify El-Shaddai',
            tag: 'E-Learning & Workshop Platform',
            image: 'assets/project-magnify.png',
            client: 'El-Shaddai Training Center',
            role: 'Frontend Developer & Architect',
            duration: '6 Months',
            tech: ['Vue.js', 'Pinia', 'Vuetify', 'SCSS', 'REST APIs', 'MSSQL'],
            desc: 'A comprehensive, modern faith-based e-learning academy that provides live webinar listings, video-on-demand playback, quizzes, workshop enrollment pipelines, and certificates of completion for global students.',
            contributions: [
                'Engineered an custom video progress tracker that remembers user playback checkpoints and resumes automatically upon login.',
                'Integrated interactive quiz templates with client-side scoring and dynamic glassmorphic card overlays.',
                'Designed and styled all dashboard pages using custom SCSS rules, creating a premium digital school environment.',
                'Collaborated on database integration via REST endpoints to fetch student records, grades, and enrollments.'
            ],
            metrics: ['5000+ Enrolled Global Students', '100% Automatic Certificate Delivery', '25% Fewer Support Tickets']
        }
    };

    const modalOverlay = document.querySelector('.modal-overlay');
    const modalCloseBtn = document.querySelector('.modal-close');
    const projectCards = document.querySelectorAll('.project-card[data-project]');

    const openModal = (projectId) => {
        const data = projectsData[projectId];
        if (!data) return;

        // Populate Modal Fields
        modalOverlay.querySelector('.modal-hero-img img').src = data.image;
        modalOverlay.querySelector('.modal-hero-img img').alt = data.title;
        modalOverlay.querySelector('.modal-tag').textContent = data.tag;
        modalOverlay.querySelector('.modal-title').textContent = data.title;
        
        modalOverlay.querySelector('.modal-client').textContent = data.client;
        modalOverlay.querySelector('.modal-role').textContent = data.role;
        modalOverlay.querySelector('.modal-duration').textContent = data.duration;
        
        modalOverlay.querySelector('.modal-desc').textContent = data.desc;

        // Populate Technologies
        const techContainer = modalOverlay.querySelector('.modal-tech-list');
        techContainer.innerHTML = '';
        data.tech.forEach(techName => {
            const span = document.createElement('span');
            span.className = 'tech-tag';
            span.textContent = techName;
            techContainer.appendChild(span);
        });

        // Populate Contributions
        const contribContainer = modalOverlay.querySelector('.modal-contrib-list');
        contribContainer.innerHTML = '';
        data.contributions.forEach(contrib => {
            const li = document.createElement('li');
            li.textContent = contrib;
            contribContainer.appendChild(li);
        });

        // Populate Metrics
        const metricsContainer = modalOverlay.querySelector('.modal-metrics-list');
        metricsContainer.innerHTML = '';
        data.metrics.forEach(metric => {
            const li = document.createElement('li');
            li.textContent = metric;
            metricsContainer.appendChild(li);
        });

        // Toggle Modal Visibility
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop background scrolling
    };

    const closeModal = () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto'; // Re-enable scroll
    };

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            openModal(projectId);
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // 7. Interactive Contact Form Submission Handler
    const contactForm = document.getElementById('contact-form');
    const formStatus = contactForm ? contactForm.querySelector('.form-status') : null;

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending Message... <span class="pulse-dot" style="display:inline-block; margin-left: 5px;"></span>';
            formStatus.style.display = 'none';

            // Simulate form submission
            setTimeout(() => {
                const nameInput = document.getElementById('form-name');
                const emailInput = document.getElementById('form-email');
                const msgInput = document.getElementById('form-message');

                if (nameInput.value.trim() === '' || emailInput.value.trim() === '' || msgInput.value.trim() === '') {
                    formStatus.className = 'form-status error';
                    formStatus.textContent = 'Please fill out all fields before submitting.';
                    formStatus.style.display = 'block';
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                } else {
                    formStatus.className = 'form-status success';
                    formStatus.textContent = `Thank you, ${nameInput.value}! Your message has been sent successfully. I will get back to you shortly.`;
                    formStatus.style.display = 'block';
                    
                    // Clear inputs
                    contactForm.reset();
                    
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }
            }, 1200);
        });
    }
});
