'use strict';

/* =========================================================
   SlabWay — Home Page JavaScript
   File: assets/js/home.js

   Includes:
   - home intro service cards rendering
   - popular services cards rendering
   - home FAQ rendering
   - home section rail rendering
   - small page-specific refresh for Lucide/AOS
   ========================================================= */

(function () {
    const config = window.SLABWAY_CONFIG || {};
    const utils = window.SlabWayUtils || {};

    const safeText = utils.safeText || ((value) => value === null || value === undefined ? '' : String(value));
    const escapeHtml = utils.escapeHtml || ((value) => safeText(value));
    const createIcon = utils.createIcon || ((name) => `<i data-lucide="${escapeHtml(name)}" aria-hidden="true"></i>`);

    function renderIntroCards() {
        const mount = document.querySelector('[data-home-intro-cards]');

        if (!mount) {
            return;
        }

        const services = config.services || [];

        mount.innerHTML = services.map((service, index) => `
            <a class="home-intro-card shine-surface" href="${escapeHtml(service.url)}" data-aos="fade-up" data-aos-delay="${index * 70}">
                <span class="home-intro-card__icon" aria-hidden="true">
                    ${createIcon(service.icon || 'layers')}
                </span>

                <span>
                    <h3>${escapeHtml(service.title)}</h3>
                    <p>${escapeHtml(service.shortText || 'Compare local provider options.')}</p>
                </span>

                <span class="home-intro-card__arrow">
                    <span>Explore</span>
                    ${createIcon('arrow-right')}
                </span>
            </a>
        `).join('');
    }

    function renderPopularCards() {
        const mount = document.querySelector('[data-home-popular-cards]');

        if (!mount) {
            return;
        }

        const services = config.services || [];
        const popularUrls = [
            'concrete-driveways.html',
            'concrete-patios.html',
            'concrete-repair.html'
        ];

        const popularServices = popularUrls
            .map((url) => services.find((service) => service.url === url))
            .filter(Boolean);

        const popularImages = {
            'concrete-driveways.html': config.images?.popularDriveway || 'assets/images/home/popular-driveway.jpg',
            'concrete-patios.html': config.images?.popularPatio || 'assets/images/home/popular-patio.jpg',
            'concrete-repair.html': config.images?.popularRepair || 'assets/images/home/popular-repair.jpg'
        };

        mount.innerHTML = popularServices.map((service, index) => `
            <a class="home-popular-card shine-surface" href="${escapeHtml(service.url)}" data-aos="fade-up" data-aos-delay="${index * 90}">
                <span class="home-popular-card__bg" aria-hidden="true">
                    <img src="${escapeHtml(popularImages[service.url] || service.image)}" alt="" width="760" height="920" loading="lazy">
                </span>

                <span class="home-popular-card__icon" aria-hidden="true">
                    ${createIcon(service.icon || 'layers')}
                </span>

                <span class="home-popular-card__content">
                    <h3>${escapeHtml(service.title)}</h3>
                    <p>${escapeHtml(service.cardText || service.shortText || '')}</p>
                    <span class="home-popular-card__link underlined-link">View service</span>
                </span>
            </a>
        `).join('');
    }

    function renderHomeAccordion() {
        const mount = document.querySelector('[data-home-accordion]');

        if (!mount) {
            return;
        }

        const items = config.home?.accordion?.items || [];

        mount.innerHTML = items.map((item, index) => `
            <div class="accordion__item ${index === 0 ? 'is-open' : ''}" data-aos="fade-up" data-aos-delay="${index * 55}">
                <button class="accordion__button" type="button" aria-expanded="${index === 0 ? 'true' : 'false'}">
                    <span class="accordion__icon" aria-hidden="true">
                        ${createIcon(index === 1 ? 'badge-alert' : 'circle-help')}
                    </span>

                    <span class="accordion__title">${escapeHtml(item.question)}</span>

                    <span class="accordion__toggle" aria-hidden="true">
                        ${createIcon('plus')}
                    </span>
                </button>

                <div class="accordion__panel">
                    <div class="accordion__content">
                        <p>${escapeHtml(item.answer)}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function renderHomeSectionRail() {
        const mount = document.querySelector('[data-section-rail]');

        if (!mount) {
            return;
        }

        const links = [
            {
                id: 'home',
                label: 'Start'
            },
            {
                id: 'about',
                label: 'About'
            },
            {
                id: 'quality',
                label: 'Quality'
            },
            {
                id: 'popular',
                label: 'Popular'
            },
            {
                id: 'questions',
                label: 'Questions'
            },
            {
                id: 'compare',
                label: 'Compare'
            }
        ];

        mount.innerHTML = `
            <nav class="section-rail" aria-label="Home page section navigation">
                ${links.map((link, index) => `
                    <a class="section-rail__link ${index === 0 ? 'is-active' : ''}" href="#${escapeHtml(link.id)}">
                        <span>${escapeHtml(link.label)}</span>
                    </a>
                `).join('')}
            </nav>
        `;
    }

    /* =========================================================
   Home Quality Animated Progress Lines
   Fill by data-percent value
   ========================================================= */

    (function () {
        'use strict';

        function animateNumber(element, target) {
            if (!element) return;

            let start = 0;
            const duration = 1200;
            const startTime = performance.now();

            function update(currentTime) {
                const progress = Math.min((currentTime - startTime) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const currentValue = Math.round(start + (target - start) * eased);

                element.textContent = `${currentValue}%`;

                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }

            requestAnimationFrame(update);
        }

        function initQualityLines() {
            const lines = document.querySelectorAll('[data-quality-line]');

            if (!lines.length) {
                return;
            }

            const activateLine = (line) => {
                const percent = Number(line.dataset.percent || 0);
                const safePercent = Math.max(0, Math.min(percent, 100));
                const number = line.querySelector('strong');

                line.style.setProperty('--quality-width', `${safePercent}%`);
                line.classList.add('is-visible');

                animateNumber(number, safePercent);
            };

            if (!('IntersectionObserver' in window)) {
                lines.forEach(activateLine);
                return;
            }

            const observer = new IntersectionObserver((entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    activateLine(entry.target);
                    currentObserver.unobserve(entry.target);
                });
            }, {
                threshold: 0.35
            });

            lines.forEach((line) => observer.observe(line));
        }

        document.addEventListener('DOMContentLoaded', initQualityLines);
    })();

    function refreshPage() {
        if (window.lucide) {
            window.lucide.createIcons();
        }

        if (window.AOS) {
            window.AOS.refreshHard();
        }

        document.dispatchEvent(new CustomEvent('slabway:home-ready'));
    }



    document.addEventListener('DOMContentLoaded', () => {
        renderIntroCards();
        renderPopularCards();
        renderHomeAccordion();
        renderHomeSectionRail();

        window.setTimeout(refreshPage, 0);
    });
})();