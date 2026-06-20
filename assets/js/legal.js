'use strict';



(function () {
    const config = window.SLABWAY_CONFIG || {};
    const utils = window.SlabWayUtils || {};

    const safeText = utils.safeText || ((value) => value === null || value === undefined ? '' : String(value));
    const escapeHtml = utils.escapeHtml || ((value) => safeText(value));
    const normalizeUrl = utils.normalizeUrl || ((value) => value || '#');
    const createIcon = utils.createIcon || ((name) => `<i data-lucide="${escapeHtml(name)}" aria-hidden="true"></i>`);

    function refreshPage() {
        if (window.lucide) {
            window.lucide.createIcons();
        }

        if (window.AOS) {
            window.AOS.refreshHard();
        }
    }

    function renderLegalContactCards() {
        const mounts = document.querySelectorAll('[data-legal-contact-card]');

        if (!mounts.length) {
            return;
        }

        const email = config.contact?.email || '';
        const phoneRaw = config.contact?.phoneRaw || '';
        const phoneDisplay = config.contact?.phoneDisplay || phoneRaw;
        const address = config.company?.address || '';
        const mapQuery = config.company?.mapQuery || address;
        const companyId = config.company?.companyId || '';

        mounts.forEach((mount) => {
            mount.innerHTML = `
                <div class="legal-contact-card">
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
                        <span>${escapeHtml(companyId)}</span>
                    </span>
                </div>
            `;
        });
    }

    function renderLegalSidebarNav() {
        const mounts = document.querySelectorAll('[data-legal-sidebar-nav]');

        if (!mounts.length) {
            return;
        }

        const links = [
            {
                id: 'overview',
                label: 'Overview'
            },
            {
                id: 'platform-role',
                label: 'Platform Role'
            },
            {
                id: 'information',
                label: 'Information'
            },
            {
                id: 'choices',
                label: 'User Choices'
            },
            {
                id: 'contact-legal',
                label: 'Contact'
            }
        ];

        mounts.forEach((mount) => {
            mount.innerHTML = links.map((link, index) => `
                <a class="legal-sidebar__link ${index === 0 ? 'is-active' : ''}" href="#${escapeHtml(link.id)}">
                    <span>${escapeHtml(link.label)}</span>
                </a>
            `).join('');
        });
    }

    function initLegalSidebarActiveState() {
        const links = Array.from(document.querySelectorAll('.legal-sidebar__link'));
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

    function renderLegalUpdatedNotes() {
        const mounts = document.querySelectorAll('[data-legal-updated]');

        if (!mounts.length) {
            return;
        }

        const date = new Date();
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        mounts.forEach((mount) => {
            mount.innerHTML = `
                <span class="legal-update-note">
                    ${createIcon('calendar-days')}
                    <span>Last updated: ${escapeHtml(formattedDate)}</span>
                </span>
            `;
        });
    }

    function renderLegalDisclaimerStrips() {
        const mounts = document.querySelectorAll('[data-legal-disclaimer-strip]');

        if (!mounts.length) {
            return;
        }

        const disclaimer = config.legal?.disclaimer || '';

        mounts.forEach((mount) => {
            mount.innerHTML = `
                <section class="legal-disclaimer-strip" aria-label="SlabWay legal disclaimer">
                    <div class="container">
                        <div class="legal-disclaimer-strip__inner" data-aos="fade-up">
                            <span class="legal-disclaimer-strip__icon" aria-hidden="true">
                                ${createIcon('shield-alert')}
                            </span>

                            <p>${escapeHtml(disclaimer)}</p>
                        </div>
                    </div>
                </section>
            `;
        });
    }

    function renderLegalPageTitle() {
        const pageType = document.body.getAttribute('data-legal-page');

        if (!pageType) {
            return;
        }

        const titleMap = {
            privacy: 'Privacy Policy | SlabWay',
            terms: 'Terms of Service | SlabWay',
            cookies: 'Cookie Policy | SlabWay'
        };

        if (titleMap[pageType]) {
            document.title = titleMap[pageType];
        }
    }

    function initLegalSmoothLinks() {
        document.querySelectorAll('.legal-sidebar__link[href^="#"]').forEach((link) => {
            link.addEventListener('click', (event) => {
                const id = link.getAttribute('href')?.replace('#', '');
                const target = id ? document.getElementById(id) : null;

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
                    block: 'start'
                });

                history.replaceState(null, '', `#${id}`);
            });
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        renderLegalPageTitle();
        renderLegalSidebarNav();
        renderLegalContactCards();
        renderLegalUpdatedNotes();
        renderLegalDisclaimerStrips();

        initLegalSidebarActiveState();
        initLegalSmoothLinks();

        window.setTimeout(refreshPage, 0);
    });
})();