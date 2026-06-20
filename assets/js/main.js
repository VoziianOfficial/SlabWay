'use strict';

/* =========================================================
   SlabWay — Main JavaScript
   File: assets/js/main.js

   Includes:
   - config injection
   - header/footer/mobile menu rendering
   - Lucide icons init
   - AOS init
   - sticky header scroll state
   - services dropdown support
   - accordions
   - cookie banner
   - global CTA injection
   - counters helper
   - section rail
   ========================================================= */

(function () {
    const config = window.SLABWAY_CONFIG || {};
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const selectors = {
        headerMount: '[data-site-header]',
        mobileMenuMount: '[data-mobile-menu]',
        footerMount: '[data-site-footer]',
        globalCtaMount: '[data-global-cta]',
        cookieMount: '[data-cookie-banner]',
        sectionRailMount: '[data-section-rail]'
    };

    function getConfigValue(path, fallback = '') {
        if (!path || typeof path !== 'string') {
            return fallback;
        }

        return path.split('.').reduce((acc, key) => {
            if (acc && Object.prototype.hasOwnProperty.call(acc, key)) {
                return acc[key];
            }

            return undefined;
        }, config) ?? fallback;
    }

    function safeText(value) {
        if (value === null || value === undefined) {
            return '';
        }

        return String(value);
    }

    function escapeHtml(value) {
        return safeText(value)
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#039;');
    }

    function normalizeUrl(value, type = 'url') {
        const raw = safeText(value).trim();

        if (!raw) {
            return '#';
        }

        if (type === 'email') {
            return `mailto:${raw}`;
        }

        if (type === 'phone') {
            return `tel:${raw}`;
        }

        if (type === 'map') {
            return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(raw)}`;
        }

        return raw;
    }

    function getCurrentPageName() {
        const path = window.location.pathname;
        const file = path.substring(path.lastIndexOf('/') + 1);

        return file || 'index.html';
    }

    function isCurrentUrl(url) {
        const current = getCurrentPageName();
        const cleanUrl = safeText(url).split('#')[0] || 'index.html';

        return cleanUrl === current;
    }

    function createIcon(name, attrs = '') {
        return `<i data-lucide="${escapeHtml(name)}" ${attrs} aria-hidden="true"></i>`;
    }

    function getBrandMarkup() {
        const logoPath = config.brand?.logoPath || config.images?.logo || 'assets/images/logo.svg';

        /*
           Single source of truth:
           Change company.name in config.js and the logo text changes everywhere.
        */
        const name = config.company?.name || config.brand?.name || 'SlabWay';
        const accentWord = config.brand?.accentWord || '';

        const escapedName = escapeHtml(name);
        const escapedAccent = escapeHtml(accentWord);

        let brandText = escapedName;

        if (accentWord && escapedName.endsWith(escapedAccent)) {
            const baseWord = escapedName.slice(0, escapedName.length - escapedAccent.length);
            brandText = `${baseWord}<span class="site-brand__accent">${escapedAccent}</span>`;
        }

        return `
        <a class="site-brand" href="index.html" aria-label="${escapedName} home">
            <span class="site-brand__mark" aria-hidden="true">
                <img src="${escapeHtml(logoPath)}" alt="" width="82" height="64">
            </span>
            <span class="site-brand__text">
                ${brandText}
            </span>
        </a>
    `;
    }

    function getMainNavMarkup() {
        const mainLinks = config.navigation?.main || [];
        const serviceLinks = config.services || [];

        return `
            <nav class="site-nav" aria-label="Primary navigation">
                ${mainLinks.map((link) => {
            const isServices = link.label === 'Services';

            if (isServices) {
                return `
                            <div class="site-nav__item site-nav__item--services">
                                <a class="nav-link ${isCurrentUrl(link.url) ? 'is-active' : ''}" href="${escapeHtml(link.url)}">
                                    ${escapeHtml(link.label)}
                                </a>

                                <div class="services-dropdown" aria-label="Concrete service pages">
                                    <div class="services-dropdown__panel">
                                        ${serviceLinks.map((service) => `
                                            <a class="services-dropdown__link" href="${escapeHtml(service.url)}">
                                                <span>${escapeHtml(service.title)}</span>
                                            </a>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                        `;
            }

            return `
                        <div class="site-nav__item">
                            <a class="nav-link ${isCurrentUrl(link.url) ? 'is-active' : ''}" href="${escapeHtml(link.url)}">
                                ${escapeHtml(link.label)}
                            </a>
                        </div>
                    `;
        }).join('')}
            </nav>
        `;
    }

    function renderHeader() {
        const mount = document.querySelector(selectors.headerMount);

        if (!mount) {
            return;
        }

        const phoneRaw = config.contact?.phoneRaw || '';
        const email = config.contact?.email || '';

        mount.innerHTML = `
            <header class="site-header" data-header>
                <div class="site-header__shell">
                    <div class="site-header__inner">
                        ${getBrandMarkup()}

                        ${getMainNavMarkup()}

                        <div class="site-header__actions">
                            <a class="icon-button" href="${normalizeUrl(phoneRaw, 'phone')}" aria-label="Call ${escapeHtml(config.company?.name || 'SlabWay')}">
                                ${createIcon('phone')}
                            </a>

                            <a class="icon-button" href="contact.html#contact-form" aria-label="Open contact form">
                                ${createIcon('mail')}
                            </a>

                            <button class="burger-button" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu" data-menu-open>
                                ${createIcon('menu')}
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        `;
    }

    function renderMobileMenu() {
        const mount = document.querySelector(selectors.mobileMenuMount);

        if (!mount) {
            return;
        }

        const mainLinks = config.navigation?.main || [];
        const serviceLinks = config.services || [];
        const phoneRaw = config.contact?.phoneRaw || '';
        const phoneDisplay = config.contact?.phoneDisplay || phoneRaw;
        const email = config.contact?.email || '';

        mount.innerHTML = `
            <div class="mobile-menu" id="mobile-menu" aria-hidden="true" data-menu>
                <div class="mobile-menu__panel" role="dialog" aria-modal="true" aria-label="Mobile navigation">
                    <div class="mobile-menu__top">
                        ${getBrandMarkup()}

                        <button class="mobile-menu__close" type="button" aria-label="Close menu" data-menu-close>
                            ${createIcon('x')}
                        </button>
                    </div>

                    <div class="mobile-menu__group">
                        <p class="mobile-menu__label">Pages</p>
                        <div class="mobile-menu__links">
                            ${mainLinks.map((link) => `
                                <a class="mobile-menu__link" href="${escapeHtml(link.url)}">
                                    <span>${escapeHtml(link.label)}</span>
                                </a>
                            `).join('')}
                        </div>
                    </div>

                    <div class="mobile-menu__group">
                        <p class="mobile-menu__label">Concrete Services</p>
                        <div class="mobile-menu__links">
                            ${serviceLinks.map((service) => `
                                <a class="mobile-menu__link" href="${escapeHtml(service.url)}">
                                    <span>${escapeHtml(service.title)}</span>
                                </a>
                            `).join('')}
                        </div>
                    </div>

                    <div class="mobile-menu__contact">
                        <a class="btn btn--primary" href="${normalizeUrl(phoneRaw, 'phone')}">
                            ${createIcon('phone')}
                            <span>${escapeHtml(phoneDisplay)}</span>
                        </a>

                        <a class="btn btn--secondary" href="${normalizeUrl(email, 'email')}">
                            ${createIcon('mail')}
                            <span>Email</span>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    function renderFooter() {
        const mount = document.querySelector(selectors.footerMount);

        if (!mount) {
            return;
        }

        const services = config.services || [];
        const pages = [
            { label: 'Home', url: 'index.html' },
            { label: 'About', url: 'about.html' },
            { label: 'All Services', url: 'all-services.html' },
            { label: 'Contact', url: 'contact.html' }
        ];

        const legalPages = [
            { label: 'Privacy Policy', url: 'privacy-policy.html' },
            { label: 'Terms of Service', url: 'terms-of-service.html' },
            { label: 'Cookie Policy', url: 'cookie-policy.html' }
        ];

        const phoneRaw = config.contact?.phoneRaw || '';
        const phoneDisplay = config.contact?.phoneDisplay || phoneRaw;
        const email = config.contact?.email || '';
        const address = config.company?.address || '';
        const mapQuery = config.company?.mapQuery || address;
        const year = new Date().getFullYear();

        mount.innerHTML = `
            <footer class="site-footer">
                <div class="container">
                    <div class="site-footer__top">
                        <div class="site-footer__brand">
                            ${getBrandMarkup()}

                            <p class="site-footer__description" data-config="footer.description">
                                ${escapeHtml(config.footer?.description || '')}
                            </p>

                            <p class="site-footer__disclaimer" data-config="legal.disclaimer">
                                ${escapeHtml(config.legal?.disclaimer || '')}
                            </p>
                        </div>

                        <div class="site-footer__col">
                            <p class="site-footer__title">Services</p>
                            <div class="site-footer__links">
                                ${services.map((service) => `
                                    <a class="footer-link" href="${escapeHtml(service.url)}">
                                        ${escapeHtml(service.title)}
                                    </a>
                                `).join('')}
                            </div>
                        </div>

                        <div class="site-footer__col">
                            <p class="site-footer__title">Pages</p>
                            <div class="site-footer__links">
                                ${pages.map((page) => `
                                    <a class="footer-link" href="${escapeHtml(page.url)}">
                                        ${escapeHtml(page.label)}
                                    </a>
                                `).join('')}
                            </div>

                            <div class="site-footer__links" style="margin-top: 22px;">
                                ${legalPages.map((page) => `
                                    <a class="footer-link" href="${escapeHtml(page.url)}">
                                        ${escapeHtml(page.label)}
                                    </a>
                                `).join('')}
                            </div>
                        </div>

                        <div class="site-footer__col">
                            <p class="site-footer__title">Contact</p>
                            <div class="site-footer__contact">
                                <a href="${normalizeUrl(email, 'email')}">
                                    ${createIcon('mail')}
                                    <span>${escapeHtml(email)}</span>
                                </a>

                                <a href="${normalizeUrl(phoneRaw, 'phone')}">
                                    ${createIcon('phone')}
                                    <span>${escapeHtml(phoneDisplay)}</span>
                                </a>

                                <a href="${normalizeUrl(mapQuery, 'map')}" target="_blank" rel="noopener noreferrer">
                                    ${createIcon('map-pin')}
                                    <span>${escapeHtml(address)}</span>
                                </a>

                                <span>
                                    ${createIcon('badge-check')}
                                    <span>${escapeHtml(config.company?.companyId || '')}</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="site-footer__bottom">
                        <p>© <span data-current-year>${year}</span> <span data-config="company.name">${escapeHtml(config.company?.name || 'SlabWay')}</span>. <span data-config="footer.copyright">${escapeHtml(config.footer?.copyright || '')}</span></p>
                        <p>${escapeHtml(config.company?.serviceArea || '')}</p>
                    </div>
                </div>
            </footer>
        `;
    }

    function renderGlobalCta() {
        const mounts = document.querySelectorAll(selectors.globalCtaMount);

        if (!mounts.length) {
            return;
        }

        const cta = config.cta || {};

        mounts.forEach((mount) => {
            mount.innerHTML = `
                <section class="global-cta" aria-label="Start a concrete request">
                    <div class="container">
                        <div class="global-cta__card shine-surface" data-aos="fade-up">
                            <div class="global-cta__bg" aria-hidden="true">
                                <img src="${escapeHtml(cta.image || 'assets/images/cta/concrete-cta.jpg')}" alt="" width="1400" height="520" loading="lazy">
                            </div>

                            <div class="global-cta__content">
                                <p class="section-kicker section-kicker--light">${escapeHtml('Concrete Request')}</p>
                                <h2>${escapeHtml(cta.heading || 'Ready To Start A Concrete Request?')}</h2>
                                <p>${escapeHtml(cta.text || '')}</p>
                            </div>

                            <div class="global-cta__actions">
                                <a class="btn btn--primary" href="${escapeHtml(cta.primaryUrl || 'contact.html#contact-form')}">
                                    ${createIcon('send')}
                                    <span>${escapeHtml(cta.primaryButton || 'Start Request')}</span>
                                </a>

                                <a class="btn btn--secondary" href="${escapeHtml(cta.secondaryUrl || 'all-services.html')}">
                                    ${createIcon('layers')}
                                    <span>${escapeHtml(cta.secondaryButton || 'View Services')}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            `;
        });
    }

    function renderCookieBanner() {
        const mount = document.querySelector(selectors.cookieMount);

        if (!mount) {
            return;
        }

        const cookie = config.cookieBanner || {};
        const storageKey = cookie.storageKey || 'slabway_cookie_consent';

        if (localStorage.getItem(storageKey)) {
            mount.innerHTML = '';
            return;
        }

        mount.innerHTML = `
            <div class="cookie-banner" data-cookie-panel>
                <div class="cookie-banner__inner">
                    <div>
                        <p class="cookie-banner__text">${escapeHtml(cookie.text || 'This website uses cookies to improve browsing experience.')}</p>

                        <div class="cookie-banner__links">
                            <a href="privacy-policy.html">Privacy Policy</a>
                            <a href="cookie-policy.html">Cookie Policy</a>
                            <a href="terms-of-service.html">Terms of Service</a>
                        </div>
                    </div>

                    <div class="cookie-banner__actions">
                        <button class="btn btn--secondary" type="button" data-cookie-decline>
                            ${escapeHtml(cookie.declineText || 'Decline')}
                        </button>

                        <button class="btn btn--primary" type="button" data-cookie-accept>
                            ${escapeHtml(cookie.acceptText || 'Accept')}
                        </button>
                    </div>
                </div>
            </div>
        `;

        const panel = mount.querySelector('[data-cookie-panel]');
        const acceptButton = mount.querySelector('[data-cookie-accept]');
        const declineButton = mount.querySelector('[data-cookie-decline]');

        requestAnimationFrame(() => {
            panel?.classList.add('is-visible');
        });

        function closeCookieBanner(value) {
            localStorage.setItem(storageKey, value);
            panel?.classList.remove('is-visible');

            window.setTimeout(() => {
                mount.innerHTML = '';
            }, 360);
        }

        acceptButton?.addEventListener('click', () => closeCookieBanner('accepted'));
        declineButton?.addEventListener('click', () => closeCookieBanner('declined'));
    }

    function injectConfigValues() {
        document.querySelectorAll('[data-config]').forEach((element) => {
            const path = element.getAttribute('data-config');
            element.textContent = safeText(getConfigValue(path));
        });

        document.querySelectorAll('[data-config-text]').forEach((element) => {
            const path = element.getAttribute('data-config-text');
            element.textContent = safeText(getConfigValue(path));
        });

        document.querySelectorAll('[data-config-html]').forEach((element) => {
            const path = element.getAttribute('data-config-html');
            element.innerHTML = escapeHtml(getConfigValue(path));
        });

        document.querySelectorAll('[data-config-href]').forEach((element) => {
            const path = element.getAttribute('data-config-href');
            const type = element.getAttribute('data-config-href-type') || 'url';
            const value = getConfigValue(path);

            element.setAttribute('href', normalizeUrl(value, type));
        });

        document.querySelectorAll('[data-current-year]').forEach((element) => {
            element.textContent = String(new Date().getFullYear());
        });
    }

    function syncSiteIdentity() {
        const defaults = config.defaults || {};

        const current = {
            companyName: config.company?.name || '',
            companyId: config.company?.companyId || '',
            email: config.contact?.email || '',
            phoneRaw: config.contact?.phoneRaw || '',
            phoneDisplay: config.contact?.phoneDisplay || '',
            address: config.company?.address || '',
            mapQuery: config.company?.mapQuery || config.company?.address || '',
            formEndpoint: config.contact?.formEndpoint || 'contact.php'
        };

        const replacements = [
            [defaults.companyName || 'SlabWay', current.companyName],
            [defaults.companyId || 'SLABWAY-CONCRETE-2048', current.companyId],
            [defaults.email || 'hello@slabway.com', current.email],
            [defaults.phoneRaw || '+18885550152', current.phoneRaw],
            [defaults.phoneDisplay || '(888) 555-0152', current.phoneDisplay],
            [defaults.address || 'USA Service Area', current.address]
        ].filter(([from, to]) => from && to && from !== to);

        function replaceValue(value) {
            let nextValue = safeText(value);

            replacements.forEach(([from, to]) => {
                nextValue = nextValue.split(from).join(to);
            });

            return nextValue;
        }

       
        function replaceTextNodes(root) {
            if (!root) {
                return;
            }

            const blockedTags = new Set([
                'SCRIPT',
                'STYLE',
                'NOSCRIPT',
                'TEXTAREA',
                'INPUT',
                'SELECT',
                'OPTION',
                'SVG',
                'PATH'
            ]);

            const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
                acceptNode(node) {
                    const parent = node.parentElement;

                    if (!parent || blockedTags.has(parent.tagName)) {
                        return NodeFilter.FILTER_REJECT;
                    }

                    if (!node.nodeValue || !node.nodeValue.trim()) {
                        return NodeFilter.FILTER_REJECT;
                    }

                    return NodeFilter.FILTER_ACCEPT;
                }
            });

            const nodes = [];

            while (walker.nextNode()) {
                nodes.push(walker.currentNode);
            }

            nodes.forEach((node) => {
                node.nodeValue = replaceValue(node.nodeValue);
            });
        }

        function replaceAttributes(root) {
            if (!root) {
                return;
            }

            const attributes = [
                'title',
                'aria-label',
                'alt',
                'placeholder',
                'value',
                'content'
            ];

            root.querySelectorAll('*').forEach((element) => {
                attributes.forEach((attr) => {
                    if (element.hasAttribute(attr)) {
                        element.setAttribute(attr, replaceValue(element.getAttribute(attr)));
                    }
                });
            });
        }

    
        injectConfigValues();

      
        replaceTextNodes(document.body);
        replaceAttributes(document);

       
        document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
            link.setAttribute('href', normalizeUrl(current.email, 'email'));

            if (link.textContent.trim() === defaults.email) {
                link.textContent = current.email;
            }
        });

      
        document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
            link.setAttribute('href', normalizeUrl(current.phoneRaw, 'phone'));

            if (
                link.textContent.trim() === defaults.phoneDisplay ||
                link.textContent.trim() === defaults.phoneRaw
            ) {
                link.textContent = current.phoneDisplay;
            }
        });

     
        document.querySelectorAll('a[href*="google.com/maps"], a[data-config-href-type="map"]').forEach((link) => {
            link.setAttribute('href', normalizeUrl(current.mapQuery, 'map'));
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        });

    
        document.querySelectorAll('form[data-contact-form], form[action="contact.php"]').forEach((form) => {
            form.setAttribute('action', current.formEndpoint);
        });


        document.title = replaceValue(document.title);

        document.querySelectorAll('meta[name="description"], meta[property="og:title"], meta[property="og:description"]').forEach((meta) => {
            if (meta.hasAttribute('content')) {
                meta.setAttribute('content', replaceValue(meta.getAttribute('content')));
            }
        });
    }

    function initHeaderScroll() {
        const header = document.querySelector('[data-header]');

        if (!header) {
            return;
        }

        const updateHeader = () => {
            header.classList.toggle('is-scrolled', window.scrollY > 18);
        };

        updateHeader();
        window.addEventListener('scroll', updateHeader, { passive: true });
    }

    function initMobileMenu() {
        const menu = document.querySelector('[data-menu]');
        const openButton = document.querySelector('[data-menu-open]');
        const closeButton = document.querySelector('[data-menu-close]');
        const menuLinks = menu?.querySelectorAll('a') || [];

        if (!menu || !openButton) {
            return;
        }

        function openMenu() {
            menu.classList.add('is-open');
            menu.setAttribute('aria-hidden', 'false');
            openButton.setAttribute('aria-expanded', 'true');
            document.body.classList.add('is-menu-open');

            window.setTimeout(() => {
                const firstLink = menu.querySelector('a, button');
                firstLink?.focus({ preventScroll: true });
            }, 60);
        }

        function closeMenu() {
            menu.classList.remove('is-open');
            menu.setAttribute('aria-hidden', 'true');
            openButton.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('is-menu-open');
            openButton.focus({ preventScroll: true });
        }

        openButton.addEventListener('click', openMenu);
        closeButton?.addEventListener('click', closeMenu);

        menu.addEventListener('click', (event) => {
            if (event.target === menu) {
                closeMenu();
            }
        });

        menuLinks.forEach((link) => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && menu.classList.contains('is-open')) {
                closeMenu();
            }
        });
    }

    function initAccordions() {
        document.querySelectorAll('[data-accordion]').forEach((accordion) => {
            const items = Array.from(accordion.querySelectorAll('.accordion__item'));

            items.forEach((item, index) => {
                const button = item.querySelector('.accordion__button');
                const panel = item.querySelector('.accordion__panel');

                if (!button || !panel) {
                    return;
                }

                const buttonId = button.id || `accordion-button-${Math.random().toString(16).slice(2)}`;
                const panelId = panel.id || `accordion-panel-${Math.random().toString(16).slice(2)}`;

                button.id = buttonId;
                panel.id = panelId;
                button.setAttribute('aria-controls', panelId);
                panel.setAttribute('aria-labelledby', buttonId);

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

    function initCounters() {
        const counters = document.querySelectorAll('[data-counter]');

        if (!counters.length) {
            return;
        }

        const runCounter = (counter) => {
            if (counter.dataset.counted === 'true') {
                return;
            }

            counter.dataset.counted = 'true';

            const target = Number(counter.getAttribute('data-counter') || '0');
            const prefix = counter.getAttribute('data-counter-prefix') || '';
            const suffix = counter.getAttribute('data-counter-suffix') || '';
            const duration = reducedMotion ? 1 : Number(counter.getAttribute('data-counter-duration') || '1300');
            const start = performance.now();

            function update(now) {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const value = Math.round(target * eased);

                counter.textContent = `${prefix}${value}${suffix}`;

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = `${prefix}${target}${suffix}`;
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

    function initSectionRail() {
        const mount = document.querySelector(selectors.sectionRailMount);

        if (!mount) {
            return;
        }

        const links = Array.from(mount.querySelectorAll('.section-rail__link'));
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

    function initExternalLinks() {
        document.querySelectorAll('a[target="_blank"]').forEach((link) => {
            if (!link.getAttribute('rel')) {
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });
    }

    function initLibraries() {
        if (window.lucide) {
            window.lucide.createIcons();
        }

        if (window.AOS) {
            window.AOS.init({
                duration: reducedMotion ? 0 : 850,
                easing: 'ease-out-cubic',
                once: true,
                offset: 80,
                disable: reducedMotion
            });
        }
    }

    function refreshIconsAndAos() {
        if (window.lucide) {
            window.lucide.createIcons();
        }

        if (window.AOS) {
            window.AOS.refreshHard();
        }
    }

    window.SlabWayUtils = {
        getConfigValue,
        safeText,
        escapeHtml,
        normalizeUrl,
        createIcon,
        refreshIconsAndAos,
        reducedMotion
    };

    document.addEventListener('DOMContentLoaded', () => {
        renderHeader();
        renderMobileMenu();
        renderFooter();
        renderGlobalCta();
        renderCookieBanner();

        injectConfigValues();
        syncSiteIdentity();

        initHeaderScroll();
        initMobileMenu();
        initAccordions();
        initCounters();
        initSectionRail();
        initExternalLinks();
        initLibraries();

        refreshIconsAndAos();

    
        window.setTimeout(syncSiteIdentity, 0);
        window.setTimeout(syncSiteIdentity, 250);
    });
})();