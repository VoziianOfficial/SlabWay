'use strict';

/* =========================================================
   SlabWay — Inner Pages JavaScript
   File: assets/js/inner.js

   Used for:
   - about.html
   - all-services.html
   - contact.html

   Includes:
   - about icon marquee rendering
   - testimonials swiper rendering
   - about FAQ rendering
   - all-services icon strip rendering
   - all-services swiper rendering
   - animated service text panels
   - three steps rendering
   - contact intro rendering
   - local accordion init for dynamically injected content
   ========================================================= */

(function () {
    const config = window.SLABWAY_CONFIG || {};
    const utils = window.SlabWayUtils || {};

    const safeText = utils.safeText || ((value) => value === null || value === undefined ? '' : String(value));
    const escapeHtml = utils.escapeHtml || ((value) => safeText(value));
    const createIcon = utils.createIcon || ((name) => `<i data-lucide="${escapeHtml(name)}" aria-hidden="true"></i>`);

    function refreshPage() {
        if (window.lucide) {
            window.lucide.createIcons();
        }

        if (window.AOS) {
            window.AOS.refreshHard();
        }
    }

    function initLocalAccordions() {
        document.querySelectorAll('[data-accordion]').forEach((accordion) => {
            if (accordion.dataset.accordionReady === 'true') {
                return;
            }

            accordion.dataset.accordionReady = 'true';

            const items = Array.from(accordion.querySelectorAll('.accordion__item'));

            items.forEach((item, index) => {
                const button = item.querySelector('.accordion__button');
                const panel = item.querySelector('.accordion__panel');

                if (!button || !panel) {
                    return;
                }

                const isOpen = item.classList.contains('is-open') || index === 0;

                item.classList.toggle('is-open', isOpen);
                button.setAttribute('aria-expanded', String(isOpen));

                button.addEventListener('click', () => {
                    const willOpen = !item.classList.contains('is-open');

                    items.forEach((otherItem) => {
                        const otherButton = otherItem.querySelector('.accordion__button');

                        otherItem.classList.remove('is-open');
                        otherButton?.setAttribute('aria-expanded', 'false');
                    });

                    if (willOpen) {
                        item.classList.add('is-open');
                        button.setAttribute('aria-expanded', 'true');
                    }
                });
            });
        });
    }

    function renderAboutIconMarquee() {
        const mount = document.querySelector('[data-about-marquee]');

        if (!mount) {
            return;
        }

        const services = config.services || [];
        const duplicatedServices = [...services, ...services, ...services];

        mount.innerHTML = `
            <div class="icon-strip" aria-label="Concrete service category links">
                <div class="icon-strip__track">
                    ${duplicatedServices.map((service) => `
                        <a class="icon-strip__item" href="${escapeHtml(service.url)}" aria-label="${escapeHtml(service.title)}">
                            ${createIcon(service.icon || 'layers')}
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    }

    function renderTestimonials() {
        const mount = document.querySelector('[data-testimonials-swiper]');

        if (!mount) {
            return;
        }

        const testimonials = config.testimonials || [];

        mount.innerHTML = `
            <div class="testimonial-swiper-wrap" data-aos="fade-left">
                <div class="swiper testimonial-swiper">
                    <div class="swiper-wrapper">
                        ${testimonials.map((item) => `
                            <div class="swiper-slide">
                                <article class="testimonial-card shine-surface">
                                    <div>
                                        <span class="testimonial-card__quote" aria-hidden="true">
                                            ${createIcon('quote')}
                                        </span>

                                        <div class="testimonial-card__stars" aria-label="Five star feedback">
                                            ${Array.from({ length: 5 }).map(() => createIcon('star')).join('')}
                                        </div>

                                        <p class="testimonial-card__text">
                                            “${escapeHtml(item.text)}”
                                        </p>
                                    </div>

                                    <footer class="testimonial-card__person">
                                        <span class="testimonial-card__avatar" aria-hidden="true">
                                            ${createIcon('user-round')}
                                        </span>

                                        <span>
                                            <strong class="testimonial-card__name">${escapeHtml(item.name)}</strong>
                                            <span class="testimonial-card__project">${escapeHtml(item.project)}</span>
                                        </span>
                                    </footer>
                                </article>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="swiper-controls">
                    <div class="swiper-pagination testimonial-pagination"></div>

                    <div class="swiper-arrows">
                        <button class="swiper-arrow testimonial-prev" type="button" aria-label="Previous testimonial">
                            ${createIcon('arrow-left')}
                        </button>

                        <button class="swiper-arrow testimonial-next" type="button" aria-label="Next testimonial">
                            ${createIcon('arrow-right')}
                        </button>
                    </div>
                </div>
            </div>
        `;

        if (window.Swiper) {
            new window.Swiper('.testimonial-swiper', {
                slidesPerView: 1,
                loop: true,
                speed: 760,
                spaceBetween: 22,
                grabCursor: true,
                autoplay: {
                    delay: 5200,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                },
                pagination: {
                    el: '.testimonial-pagination',
                    clickable: true
                },
                navigation: {
                    nextEl: '.testimonial-next',
                    prevEl: '.testimonial-prev'
                }
            });
        }
    }

    function renderAboutFaq() {
        const mount = document.querySelector('[data-about-faq]');

        if (!mount) {
            return;
        }

        const items = [
            {
                icon: 'badge-help',
                question: 'What is SlabWay?',
                answer: 'SlabWay is an independent concrete service matching platform that helps homeowners start concrete requests and compare local provider options.'
            },
            {
                icon: 'ban',
                question: 'Does SlabWay perform the concrete work?',
                answer: 'No. SlabWay does not directly pour, install, repair, inspect, guarantee, or perform concrete work.'
            },
            {
                icon: 'layers',
                question: 'What project types can I explore?',
                answer: 'You can explore driveways, patios, slabs, concrete repair, stamped concrete, sidewalks, and walkways.'
            },
            {
                icon: 'clipboard-list',
                question: 'What details should I prepare?',
                answer: 'Helpful details include surface type, approximate size, current condition, finish preferences, timeline, access notes, and the project location.'
            },
            {
                icon: 'git-compare',
                question: 'Can I compare different provider options?',
                answer: 'Yes. The platform is designed to support comparison of local concrete provider options before users choose a path.'
            },
            {
                icon: 'send',
                question: 'What happens after a request is submitted?',
                answer: 'Your submitted details help organize the concrete service category and support the provider-matching request path.'
            }
        ];

        mount.innerHTML = items.map((item, index) => `
            <div class="accordion__item ${index === 0 ? 'is-open' : ''}" data-aos="fade-up" data-aos-delay="${index * 55}">
                <button class="accordion__button" type="button" aria-expanded="${index === 0 ? 'true' : 'false'}">
                    <span class="accordion__icon" aria-hidden="true">
                        ${createIcon(item.icon)}
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

    function renderAllIconsStrip() {
        const mount = document.querySelector('[data-all-icons]');

        if (!mount) {
            return;
        }

        const icons = [
            {
                icon: 'layers',
                label: 'Concrete slabs',
                url: 'concrete-slabs.html'
            },
            {
                icon: 'brick-wall',
                label: 'Concrete surfaces',
                url: 'all-services.html#services-showcase'
            },
            {
                icon: 'construction',
                label: 'Concrete project planning',
                url: 'contact.html#contact-form'
            },
            {
                icon: 'route',
                label: 'Concrete driveways',
                url: 'concrete-driveways.html'
            },
            {
                icon: 'wrench',
                label: 'Concrete repair',
                url: 'concrete-repair.html'
            },
            {
                icon: 'shapes',
                label: 'Stamped concrete',
                url: 'stamped-concrete.html'
            },
            {
                icon: 'clipboard-list',
                label: 'Request details',
                url: 'contact.html#contact-form'
            },
            {
                icon: 'network',
                label: 'Provider matching',
                url: 'about.html'
            },
            {
                icon: 'footprints',
                label: 'Sidewalks and walkways',
                url: 'sidewalks-walkways.html'
            },
            {
                icon: 'ruler',
                label: 'Project size',
                url: 'contact.html#contact-form'
            }
        ];

        mount.innerHTML = `
            <div class="all-icons__grid" aria-label="Concrete category icons">
                ${icons.map((item, index) => `
                    <a class="all-icons__item" href="${escapeHtml(item.url)}" aria-label="${escapeHtml(item.label)}" data-aos="zoom-in" data-aos-delay="${index * 35}">
                        ${createIcon(item.icon)}
                    </a>
                `).join('')}
            </div>
        `;
    }

    function renderStats() {
        const mount = document.querySelector('[data-services-stats]');

        if (!mount) {
            return;
        }

        const stats = [
            {
                value: 6,
                suffix: '+',
                label: 'Concrete service categories'
            },
            {
                value: 1,
                suffix: '',
                label: 'Simple request path'
            },
            {
                value: 100,
                suffix: '%',
                label: 'Independent platform focus'
            },
            {
                custom: '24/7',
                label: 'Online request access'
            }
        ];

        mount.innerHTML = stats.map((stat, index) => `
            <article class="stat-card shine-surface" data-aos="fade-up" data-aos-delay="${index * 70}">
                <strong
                    class="stat-card__number"
                    ${stat.custom ? '' : `data-counter="${stat.value}" data-counter-suffix="${escapeHtml(stat.suffix)}"`}
                >
                    ${stat.custom ? escapeHtml(stat.custom) : `0${escapeHtml(stat.suffix)}`}
                </strong>
                <span class="stat-card__label">${escapeHtml(stat.label)}</span>
            </article>
        `).join('');
    }

    function initDynamicCounters() {
        const counters = document.querySelectorAll('[data-counter]');

        if (!counters.length) {
            return;
        }

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const runCounter = (counter) => {
            if (counter.dataset.counted === 'true') {
                return;
            }

            counter.dataset.counted = 'true';

            const target = Number(counter.getAttribute('data-counter') || '0');
            const suffix = counter.getAttribute('data-counter-suffix') || '';
            const duration = reducedMotion ? 1 : 1300;
            const start = performance.now();

            function update(now) {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const value = Math.round(target * eased);

                counter.textContent = `${value}${suffix}`;

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = `${target}${suffix}`;
                }
            }

            requestAnimationFrame(update);
        };

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        runCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.35
            });

            counters.forEach((counter) => observer.observe(counter));
        } else {
            counters.forEach(runCounter);
        }
    }

    function renderServicesSwiper() {
        const mount = document.querySelector('[data-services-showcase]');

        if (!mount) {
            return;
        }

        const services = config.services || [];

        mount.innerHTML = `
            <div class="services-showcase__media" data-aos="fade-right">
                <div class="swiper service-photo-swiper">
                    <div class="swiper-wrapper">
                        ${services.map((service) => `
                            <div class="swiper-slide">
                                <a class="service-showcase-card shine-surface" href="${escapeHtml(service.url)}">
                                    <img src="${escapeHtml(service.image)}" alt="${escapeHtml(service.title)} concrete service option" width="820" height="940" loading="lazy">

                                    <span class="service-showcase-card__label">
                                        ${createIcon(service.icon || 'layers')}
                                        <span>${escapeHtml(service.title)}</span>
                                    </span>
                                </a>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="service-swiper-controls">
                    <div class="service-progress" aria-hidden="true">
                        <span class="service-progress__bar" data-service-progress></span>
                    </div>

                    <div class="swiper-arrows">
                        <button class="swiper-arrow service-prev" type="button" aria-label="Previous service">
                            ${createIcon('arrow-left')}
                        </button>

                        <button class="swiper-arrow service-next" type="button" aria-label="Next service">
                            ${createIcon('arrow-right')}
                        </button>
                    </div>
                </div>
            </div>

            <div class="services-showcase__content" data-aos="fade-left">
                ${services.map((service, index) => `
                    <article class="services-showcase__panel ${index === 0 ? 'is-active' : ''}" data-service-panel="${index}">
                        <p class="section-kicker section-kicker--light">${escapeHtml(service.hero?.kicker || service.title)}</p>

                        <h2>${escapeHtml(service.title)}</h2>

                        <p>${escapeHtml(service.cardText || service.shortText || '')}</p>

                        <ul class="services-showcase__highlights">
                            ${(service.highlights || []).map((highlight) => `
                                <li>
                                    ${createIcon('check')}
                                    <span>${escapeHtml(highlight)}</span>
                                </li>
                            `).join('')}
                        </ul>

                        <div class="btn-row">
                            <a class="btn btn--primary" href="contact.html#contact-form">
                                ${createIcon('send')}
                                <span>${escapeHtml(service.requestLabel || 'Start Request')}</span>
                            </a>

                            <a class="btn btn--secondary" href="${escapeHtml(service.url)}">
                                ${createIcon('arrow-right')}
                                <span>View Details</span>
                            </a>
                        </div>
                    </article>
                `).join('')}
            </div>
        `;

        const panels = Array.from(mount.querySelectorAll('[data-service-panel]'));
        const progressBar = mount.querySelector('[data-service-progress]');

        function setActivePanel(index) {
            panels.forEach((panel) => {
                panel.classList.toggle('is-active', Number(panel.dataset.servicePanel) === index);
            });

            if (progressBar && services.length) {
                progressBar.style.width = `${((index + 1) / services.length) * 100}%`;
            }
        }

        if (window.Swiper) {
            new window.Swiper('.service-photo-swiper', {
                slidesPerView: 1,
                loop: true,
                speed: 780,
                spaceBetween: 20,
                grabCursor: true,
                autoplay: {
                    delay: 5400,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                },
                navigation: {
                    nextEl: '.service-next',
                    prevEl: '.service-prev'
                },
                on: {
                    init(swiper) {
                        setActivePanel(swiper.realIndex || 0);
                    },
                    slideChange(swiper) {
                        setActivePanel(swiper.realIndex || 0);
                    }
                }
            });
        } else {
            setActivePanel(0);
        }
    }

    function renderThreeSteps() {
        const mount = document.querySelector('[data-three-steps]');

        if (!mount) {
            return;
        }

        const steps = [
            {
                eyebrow: 'Step One',
                title: 'Choose a Service Category',
                text: 'Start with the concrete path that fits your project best, such as driveways, patios, slabs, repair, stamped concrete, or walkways.',
                icon: 'layers'
            },
            {
                eyebrow: 'Step Two',
                title: 'Share Project Details',
                text: 'Add useful details like surface type, approximate size, current condition, finish preferences, access notes, and timeline.',
                icon: 'clipboard-list'
            },
            {
                eyebrow: 'Step Three',
                title: 'Compare Provider Options',
                text: 'Use the request to review possible local concrete service paths and provider options before choosing what fits your project.',
                icon: 'network'
            }
        ];

        mount.innerHTML = steps.map((step, index) => `
            <article class="step-card shine-surface" data-aos="fade-up" data-aos-delay="${index * 80}">
                <span class="step-card__icon" aria-hidden="true">
                    ${createIcon(step.icon)}
                </span>

                <span class="step-card__eyebrow">${escapeHtml(step.eyebrow)}</span>
                <h3>${escapeHtml(step.title)}</h3>
                <p>${escapeHtml(step.text)}</p>
            </article>
        `).join('');
    }

    function renderContactIntroItems() {
        const mount = document.querySelector('[data-contact-intro-items]');

        if (!mount) {
            return;
        }

        const items = [
            {
                icon: 'layers',
                title: 'Project type',
                text: 'Driveway, patio, slab, repair, stamped concrete, or walkway.'
            },
            {
                icon: 'ruler',
                title: 'Approximate size',
                text: 'Share rough dimensions or the area you want to improve.'
            },
            {
                icon: 'clipboard-list',
                title: 'Current condition',
                text: 'Mention cracks, old concrete, new layout, or surface changes.'
            },
            {
                icon: 'calendar-days',
                title: 'Preferred timing',
                text: 'Add any timeline or access notes that may matter.'
            }
        ];

        mount.innerHTML = items.map((item, index) => `
            <article class="contact-intro-item" data-aos="fade-up" data-aos-delay="${index * 70}">
                <span class="contact-intro-item__icon" aria-hidden="true">
                    ${createIcon(item.icon)}
                </span>

                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.text)}</p>
            </article>
        `).join('');
    }

    function renderSectionRail() {
        const mount = document.querySelector('[data-section-rail]');

        if (!mount || mount.innerHTML.trim()) {
            return;
        }

        const railType = mount.getAttribute('data-rail-type') || 'inner';

        const map = {
            about: [
                ['hero', 'Hero'],
                ['marquee', 'Services'],
                ['feedback', 'Feedback'],
                ['platform', 'Platform'],
                ['faq', 'FAQ']
            ],
            services: [
                ['hero', 'Hero'],
                ['icons', 'Icons'],
                ['about-services', 'About'],
                ['services-showcase', 'Showcase'],
                ['steps', 'Steps']
            ],
            contact: [
                ['hero', 'Hero'],
                ['request-details', 'Details'],
                ['contact-form', 'Form'],
                ['before-send', 'Before']
            ],
            inner: [
                ['hero', 'Hero'],
                ['content', 'Content'],
                ['faq', 'FAQ']
            ]
        };

        const links = map[railType] || map.inner;

        mount.innerHTML = `
            <nav class="section-rail" aria-label="Section navigation">
                ${links.map(([id, label], index) => `
                    <a class="section-rail__link ${index === 0 ? 'is-active' : ''}" href="#${escapeHtml(id)}">
                        <span>${escapeHtml(label)}</span>
                    </a>
                `).join('')}
            </nav>
        `;
    }

    document.addEventListener('DOMContentLoaded', () => {
        renderAboutIconMarquee();
        renderTestimonials();
        renderAboutFaq();

        renderAllIconsStrip();
        renderStats();
        renderServicesSwiper();
        renderThreeSteps();

        renderContactIntroItems();
        renderSectionRail();

        initLocalAccordions();
        initDynamicCounters();

        window.setTimeout(refreshPage, 0);
    });
})();