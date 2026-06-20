'use strict';



(function () {
    const config = window.SLABWAY_CONFIG || {};
    const utils = window.SlabWayUtils || {};

    const safeText = utils.safeText || ((value) => value === null || value === undefined ? '' : String(value));
    const escapeHtml = utils.escapeHtml || ((value) => safeText(value));

    function refreshPage() {
        if (window.lucide) {
            window.lucide.createIcons();
        }

        if (window.AOS) {
            window.AOS.refreshHard();
        }
    }

    function renderServiceOptions() {
        const selects = document.querySelectorAll('[data-service-select]');

        if (!selects.length) {
            return;
        }

        const services = config.services || [];

        selects.forEach((select) => {
            const currentValue = select.getAttribute('data-selected') || '';

            select.innerHTML = `
                <option value="">Choose a concrete category</option>
                ${services.map((service) => `
                    <option value="${escapeHtml(service.title)}" ${currentValue === service.title ? 'selected' : ''}>
                        ${escapeHtml(service.title)}
                    </option>
                `).join('')}
                <option value="Not sure yet" ${currentValue === 'Not sure yet' ? 'selected' : ''}>
                    Not sure yet
                </option>
            `;
        });
    }

    function setMessage(form, type, text) {
        const message = form.querySelector('[data-form-message]');

        if (!message) {
            return;
        }

        message.classList.remove('is-success', 'is-error', 'is-visible');
        message.classList.add(type === 'success' ? 'is-success' : 'is-error', 'is-visible');
        message.textContent = text;
    }

    function clearMessage(form) {
        const message = form.querySelector('[data-form-message]');

        if (!message) {
            return;
        }

        message.classList.remove('is-success', 'is-error', 'is-visible');
        message.textContent = '';
    }

    function getField(form, name) {
        return form.querySelector(`[name="${name}"]`);
    }

    function getFieldValue(form, name) {
        return getField(form, name)?.value.trim() || '';
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    }

    function markInvalid(field, isInvalid) {
        if (!field) {
            return;
        }

        field.setAttribute('aria-invalid', String(isInvalid));

        if (isInvalid) {
            field.classList.add('is-invalid');
        } else {
            field.classList.remove('is-invalid');
        }
    }

    function validateForm(form) {
        const fullNameField = getField(form, 'fullName');
        const emailField = getField(form, 'email');
        const phoneField = getField(form, 'phone');
        const serviceField = getField(form, 'service');
        const messageField = getField(form, 'message');

        const fullName = getFieldValue(form, 'fullName');
        const email = getFieldValue(form, 'email');
        const phone = getFieldValue(form, 'phone');
        const service = getFieldValue(form, 'service');
        const message = getFieldValue(form, 'message');

        let isValid = true;

        const rules = [
            {
                field: fullNameField,
                invalid: fullName.length < 2,
                message: 'Please enter your full name.'
            },
            {
                field: emailField,
                invalid: !isValidEmail(email),
                message: 'Please enter a valid email address.'
            },
            {
                field: phoneField,
                invalid: phone.length < 6,
                message: 'Please enter a valid phone number.'
            },
            {
                field: serviceField,
                invalid: !service,
                message: 'Please choose a concrete service category.'
            },
            {
                field: messageField,
                invalid: message.length < 10,
                message: 'Please add a few project details.'
            }
        ];

        for (const rule of rules) {
            markInvalid(rule.field, rule.invalid);

            if (rule.invalid) {
                isValid = false;
                setMessage(form, 'error', rule.message);
                rule.field?.focus();
                break;
            }
        }

        return isValid;
    }

    function setSubmitting(form, isSubmitting) {
        const button = form.querySelector('[type="submit"]');

        if (!button) {
            return;
        }

        button.disabled = isSubmitting;
        button.classList.toggle('is-loading', isSubmitting);

        const text = button.querySelector('[data-submit-text]');

        if (text) {
            text.textContent = isSubmitting ? 'Sending...' : (button.dataset.defaultText || 'Submit Concrete Request');
        }
    }

    function buildFormData(form) {
        const formData = new FormData(form);

        if (!formData.get('sourcePage')) {
            formData.set('sourcePage', document.title || window.location.pathname);
        }

        formData.set('siteName', config.company?.name || 'SlabWay');
        formData.set('companyEmail', config.contact?.email || '');

        return formData;
    }

    async function submitForm(form) {
        clearMessage(form);

        if (!validateForm(form)) {
            return;
        }

        const endpoint = config.contact?.formEndpoint || form.getAttribute('action') || 'contact.php';
        const formData = buildFormData(form);

        setSubmitting(form, true);

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: 'application/json'
                }
            });

            let result = null;

            try {
                result = await response.json();
            } catch (jsonError) {
                result = null;
            }

            if (!response.ok || !result?.success) {
                const errorMessage = result?.message || 'Something went wrong. Please try again or email SlabWay directly.';
                setMessage(form, 'error', errorMessage);
                return;
            }

            form.reset();
            renderServiceOptions();

            setMessage(
                form,
                'success',
                result.message || 'Thank you. Your concrete request details were sent successfully.'
            );
        } catch (error) {
            setMessage(
                form,
                'error',
                'Unable to send the form right now. Please try again or contact SlabWay by email.'
            );
        } finally {
            setSubmitting(form, false);
        }
    }

    function initContactForms() {
        const forms = document.querySelectorAll('[data-contact-form]');

        forms.forEach((form) => {
            form.setAttribute('novalidate', 'true');

            const submitButton = form.querySelector('[type="submit"]');
            const submitText = submitButton?.querySelector('[data-submit-text]');

            if (submitButton && submitText) {
                submitButton.dataset.defaultText = submitText.textContent.trim();
            }

            form.addEventListener('submit', (event) => {
                event.preventDefault();
                submitForm(form);
            });

            form.querySelectorAll('input, textarea, select').forEach((field) => {
                field.addEventListener('input', () => {
                    markInvalid(field, false);
                });

                field.addEventListener('change', () => {
                    markInvalid(field, false);
                });
            });
        });
    }

    function preselectServiceFromUrl() {
        const params = new URLSearchParams(window.location.search);
        const serviceParam = params.get('service');

        if (!serviceParam) {
            return;
        }

        const normalized = serviceParam.toLowerCase().replaceAll('-', ' ');
        const services = config.services || [];

        const matched = services.find((service) => {
            return service.title.toLowerCase() === normalized ||
                service.shortTitle?.toLowerCase() === normalized ||
                service.url.replace('.html', '').replaceAll('-', ' ') === normalized;
        });

        if (!matched) {
            return;
        }

        document.querySelectorAll('[data-service-select]').forEach((select) => {
            select.setAttribute('data-selected', matched.title);
        });
    }

    function initSmoothFormFocus() {
        const hash = window.location.hash;

        if (hash !== '#contact-form') {
            return;
        }

        window.setTimeout(() => {
            const formSection = document.querySelector('#contact-form');

            if (!formSection) {
                return;
            }

            formSection.scrollIntoView({
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
                block: 'start'
            });
        }, 350);
    }

    document.addEventListener('DOMContentLoaded', () => {
        preselectServiceFromUrl();
        renderServiceOptions();
        initContactForms();
        initSmoothFormFocus();

        window.setTimeout(refreshPage, 0);
    });
})();