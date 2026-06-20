'use strict';



(function () {
    const config = window.SLABWAY_CONFIG || {};
    const utils = window.SlabWayUtils || {};

    const safeText = utils.safeText || ((value) => value === null || value === undefined ? '' : String(value));
    const escapeHtml = utils.escapeHtml || ((value) => safeText(value));
    const createIcon = utils.createIcon || ((name) => `<i data-lucide="${escapeHtml(name)}" aria-hidden="true"></i>`);

    function getCurrentService() {
        const bodyService = document.body.getAttribute('data-service');

        if (bodyService) {
            return (config.services || []).find((service) => {
                return service.url === `${bodyService}.html` || service.url === bodyService;
            });
        }

        const currentFile = window.location.pathname.split('/').pop() || '';
        return (config.services || []).find((service) => service.url === currentFile);
    }

    function getServiceByUrl(url) {
        return (config.services || []).find((service) => service.url === url);
    }

    function refreshPage() {
        if (window.lucide) {
            window.lucide.createIcons();
        }

        if (window.AOS) {
            window.AOS.refreshHard();
        }
    }

    function renderServiceHero(service) {
        const mount = document.querySelector('[data-service-hero]');

        if (!mount || !service) {
            return;
        }

        mount.innerHTML = `
            <section class="shared-hero" id="hero" aria-labelledby="service-hero-title">
                <div class="shared-hero__bg" aria-hidden="true">
                    <img src="${escapeHtml(service.image)}" alt="" width="1800" height="1100">
                </div>

                <div class="shared-hero__content" data-aos="fade-up">
                    <span class="shared-hero__frame" aria-hidden="true"></span>

                    <p class="section-kicker section-kicker--light" data-aos="fade-up">
                        ${escapeHtml(service.hero?.kicker || service.title)}
                    </p>

                    <h1 id="service-hero-title" data-aos="fade-up" data-aos-delay="80">
                        ${escapeHtml(service.hero?.heading || service.title)}
                    </h1>

                    <p data-aos="fade-up" data-aos-delay="140">
                        ${escapeHtml(service.hero?.text || service.shortText || '')}
                    </p>

                    <div class="btn-row" data-aos="zoom-in" data-aos-delay="210">
                        <a class="btn btn--primary" href="contact.html#contact-form">
                            ${createIcon('send')}
                            <span>${escapeHtml(service.requestLabel || 'Start Request')}</span>
                        </a>

                        <a class="btn btn--secondary" href="all-services.html">
                            ${createIcon('layers')}
                            <span>View All Services</span>
                        </a>
                    </div>
                </div>
            </section>
        `;
    }

    function renderServiceIconStrip(service) {
        const mount = document.querySelector('[data-service-icons]');

        if (!mount) {
            return;
        }

        const services = config.services || [];

        mount.innerHTML = `
            <div class="service-icon-strip__grid" aria-label="Concrete service navigation">
                ${services.map((item, index) => `
                    <a
                        class="service-icon-strip__item ${service && item.url === service.url ? 'is-active' : ''}"
                        href="${escapeHtml(item.url)}"
                        aria-label="${escapeHtml(item.title)}"
                        data-aos="zoom-in"
                        data-aos-delay="${index * 45}"
                    >
                        ${createIcon(item.icon || 'layers')}
                    </a>
                `).join('')}
            </div>
        `;
    }

    function renderServiceOverview(service) {
        const mount = document.querySelector('[data-service-overview]');

        if (!mount || !service) {
            return;
        }

        const list = service.overview?.list || [];

        mount.innerHTML = `
            <div class="service-overview__grid">
                <div class="service-overview__content" data-aos="fade-right">
                    <p class="section-kicker">
                        ${escapeHtml(service.overview?.kicker || service.hero?.kicker || service.title)}
                    </p>

                    <h2>
                        ${escapeHtml(service.overview?.heading || service.hero?.heading || service.title)}
                    </h2>

                    <p>
                        ${escapeHtml(service.overview?.text || service.hero?.text || '')}
                    </p>

                    <ul class="service-overview__list">
                        ${list.map((item, index) => `
                            <li data-aos="fade-up" data-aos-delay="${index * 55}">
                                ${createIcon('check')}
                                <span>${escapeHtml(item)}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div class="service-overview__media" data-aos="fade-left">
                    <figure class="service-overview__photo photo-cover shine-surface">
                        <img src="${escapeHtml(service.overviewImage || service.image)}" alt="${escapeHtml(service.title)} overview" width="900" height="980" loading="lazy">
                    </figure>

                    <span class="service-overview__badge">
                        ${createIcon(service.icon || 'layers')}
                        <span>Provider options</span>
                    </span>
                </div>
            </div>
        `;
    }

    function getPanelImage(service, index) {
        const fallback = service.image || 'assets/images/services/concrete-driveways.jpg';

        const imageMap = {
            'concrete-driveways.html': [
                'assets/images/services/concrete-driveways.jpg',
                'assets/images/services/concrete-driveways-overview.jpg',
                'assets/images/home/popular-driveway.jpg',
                'assets/images/cta/concrete-cta.jpg'
            ],
            'concrete-patios.html': [
                'assets/images/services/concrete-patios.jpg',
                'assets/images/services/concrete-patios-overview.jpg',
                'assets/images/home/popular-patio.jpg',
                'assets/images/contact/concrete-request-details.jpg'
            ],
            'concrete-slabs.html': [
                'assets/images/services/concrete-slabs.jpg',
                'assets/images/services/concrete-slabs-overview.jpg',
                'assets/images/services/all-services-hero.jpg',
                'assets/images/cta/concrete-cta.jpg'
            ],
            'concrete-repair.html': [
                'assets/images/services/concrete-repair.jpg',
                'assets/images/services/concrete-repair-overview.jpg',
                'assets/images/home/popular-repair.jpg',
                'assets/images/contact/concrete-request-details.jpg'
            ],
            'stamped-concrete.html': [
                'assets/images/services/stamped-concrete.jpg',
                'assets/images/services/stamped-concrete-overview.jpg',
                'assets/images/home/popular-patio.jpg',
                'assets/images/services/concrete-patios.jpg'
            ],
            'sidewalks-walkways.html': [
                'assets/images/services/sidewalks-walkways.jpg',
                'assets/images/services/sidewalks-walkways-overview.jpg',
                'assets/images/contact/concrete-request-details.jpg',
                'assets/images/services/concrete-driveways.jpg'
            ]
        };

        return imageMap[service.url]?.[index] || fallback;
    }

    function renderServiceTypes(service) {
        const mount = document.querySelector('[data-service-types]');

        if (!mount || !service) {
            return;
        }

        const panels = service.panels?.items || [];
        const accent = service.panels?.accent || service.shortTitle || service.title;
        const heading = service.panels?.heading || 'OPTIONS';

        mount.innerHTML = `
            <div class="service-types__grid">
                <div class="service-types__panels">
                    ${panels.map((panel, index) => `
                        <article class="service-type-panel shine-surface" data-aos="fade-up" data-aos-delay="${index * 70}">
                            <span class="service-type-panel__bg" aria-hidden="true">
                                <img src="${escapeHtml(getPanelImage(service, index))}" alt="" width="520" height="900" loading="lazy">
                            </span>

                            <h3 class="service-type-panel__label">
                                ${escapeHtml(panel)}
                            </h3>
                        </article>
                    `).join('')}
                </div>

                <aside class="service-types__accent" data-aos="fade-left">
                    <span class="service-types__accent-word">${escapeHtml(accent)}</span>

                    <div>
                        <h2>${escapeHtml(heading)}</h2>
                        <p>Explore common project paths before starting a clearer request through SlabWay.</p>
                    </div>
                </aside>
            </div>
        `;
    }

    function renderServiceReminder() {
        const mount = document.querySelector('[data-service-reminder]');

        if (!mount) {
            return;
        }

        mount.innerHTML = `
            <div class="service-reminder__wrap" data-aos="fade-up">
                <div class="service-reminder__quote" aria-hidden="true">“</div>

                <div class="service-reminder__text">
                    <p>
                        <strong>SlabWay is an independent concrete service matching platform.</strong>
                        This page helps homeowners understand common project paths and start a clearer request before they
                        <strong>compare local provider options.</strong>
                    </p>

                    <p>
                        SlabWay is <strong>not a direct concrete contractor</strong> and does not directly pour, install, repair,
                        inspect, guarantee, or perform concrete work.
                    </p>
                </div>
            </div>
        `;
    }

    function renderRelatedServices(service) {
        const mount = document.querySelector('[data-related-services]');

        if (!mount || !service) {
            return;
        }

        const related = (config.services || [])
            .filter((item) => item.url !== service.url)
            .slice(0, 3);

        mount.innerHTML = `
            <div class="related-services__top">
                <div>
                    <p class="section-kicker section-kicker--light">OTHER CONCRETE PATHS</p>
                    <h2>Review More Concrete Service Categories</h2>
                </div>

                <p>
                    Compare other concrete request paths and choose the category that best matches your project details.
                </p>
            </div>

            <div class="related-services__grid">
                ${related.map((item, index) => `
                    <a class="related-service-card shine-surface" href="${escapeHtml(item.url)}" data-aos="fade-up" data-aos-delay="${index * 80}">
                        <span class="related-service-card__bg" aria-hidden="true">
                            <img src="${escapeHtml(item.image)}" alt="" width="720" height="520" loading="lazy">
                        </span>

                        <span class="related-service-card__icon" aria-hidden="true">
                            ${createIcon(item.icon || 'layers')}
                        </span>

                        <span>
                            <h3>${escapeHtml(item.title)}</h3>
                            <span class="related-service-card__link">View service</span>
                        </span>
                    </a>
                `).join('')}
            </div>
        `;
    }

    function renderServiceRail() {
        const mount = document.querySelector('[data-section-rail]');

        if (!mount) {
            return;
        }

        const links = [
            ['hero', 'Hero'],
            ['icons', 'Icons'],
            ['overview', 'Overview'],
            ['types', 'Types'],
            ['reminder', 'Platform'],
            ['request', 'Request']
        ];

        mount.innerHTML = `
            <nav class="section-rail" aria-label="Service page section navigation">
                ${links.map(([id, label], index) => `
                    <a class="section-rail__link ${index === 0 ? 'is-active' : ''}" href="#${escapeHtml(id)}">
                        <span>${escapeHtml(label)}</span>
                    </a>
                `).join('')}
            </nav>
        `;
    }

    function initServiceRailActiveState() {
        const links = Array.from(document.querySelectorAll('.section-rail__link'));
        const sections = links
            .map((link) => {
                const id = link.getAttribute('href')?.replace('#', '');
                return id ? document.getElementById(id) : null;
            })
            .filter(Boolean);

        if (!links.length || !sections.length || !('IntersectionObserver' in window)) {
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                const id = entry.target.id;

                links.forEach((link) => {
                    link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
                });
            });
        }, {
            rootMargin: '-45% 0px -45% 0px',
            threshold: 0.01
        });

        sections.forEach((section) => observer.observe(section));
    }

    document.addEventListener('DOMContentLoaded', () => {
        const service = getCurrentService();

        if (!service) {
            return;
        }

        document.title = `${service.title} | SlabWay`;

        renderServiceHero(service);
        renderServiceIconStrip(service);
        renderServiceOverview(service);
        renderServiceTypes(service);
        renderServiceReminder();
        renderRelatedServices(service);
        renderServiceRail();
        initServiceRailActiveState();

        window.setTimeout(refreshPage, 0);
    });
})();