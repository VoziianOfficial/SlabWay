'use strict';

window.SLABWAY_CONFIG = {
    company: {
        name: 'SlabWay',
        companyId: 'SLABWAY-CONCRETE-2048',
        address: 'USA Service Area',
        serviceArea: 'Independent concrete service matching across selected areas in the United States',
        mapQuery: 'USA Service Area'
    },

    contact: {
        phoneRaw: '+18885550152',
        phoneDisplay: '(888) 555-0152',
        email: 'hello@slabway.com',
        supportHours: 'Mon–Fri, 8:00 AM–7:00 PM',
        formEndpoint: 'contact.php'
    },

    contact: {
        phoneRaw: '+18885550152',
        phoneDisplay: '(888) 555-0152',
        email: 'hello@slabway.com',
        supportHours: 'Mon–Fri, 8:00 AM–7:00 PM',
        formEndpoint: 'contact.php'
    },

    defaults: {
        companyName: 'SlabWay',
        companyId: 'SLABWAY-CONCRETE-2048',
        email: 'hello@slabway.com',
        phoneRaw: '+18885550152',
        phoneDisplay: '(888) 555-0152',
        address: 'USA Service Area'
    },

    brand: {
        name: 'SlabWay',
        accentWord: 'Way',
        logoPath: 'assets/images/logo.svg'
    },

    pages: {
        home: 'index.html',
        about: 'about.html',
        allServices: 'all-services.html',
        contact: 'contact.html',
        privacy: 'privacy-policy.html',
        terms: 'terms-of-service.html',
        cookies: 'cookie-policy.html'
    },

    images: {
        homeHero: 'assets/images/home/hero-concrete-stone.jpg',
        homeAbout: 'assets/images/home/about-concrete-architecture.jpg',
        popularDriveway: 'assets/images/home/popular-driveway.jpg',
        popularPatio: 'assets/images/home/popular-patio.jpg',
        popularRepair: 'assets/images/home/popular-repair.jpg',

        aboutHero: 'assets/images/about/about-hero.jpg',
        aboutSplit: 'assets/images/about/slabway-concrete-about.jpg',

        allServicesHero: 'assets/images/services/all-services-hero.jpg',

        contactHero: 'assets/images/contact/contact-hero.jpg',
        contactDetails: 'assets/images/contact/concrete-request-details.jpg',

        cta: 'assets/images/cta/concrete-cta.jpg'
    },

    services: [
        {
            title: 'Concrete Driveways',
            shortTitle: 'Driveways',
            url: 'concrete-driveways.html',
            icon: 'route',
            image: 'assets/images/services/concrete-driveways.jpg',
            overviewImage: 'assets/images/services/concrete-driveways-overview.jpg',
            shortText: 'Compare driveway project options.',
            cardText: 'Compare provider options for new driveway requests, replacements, widened layouts, and clean front-access concrete surfaces.',
            requestLabel: 'Start Driveway Request',
            hero: {
                kicker: 'CONCRETE DRIVEWAYS',
                heading: 'Compare Driveway Project Options That Fit Your Property',
                text: 'Start a request for new driveway planning, replacement, widening, or surface upgrades and review local concrete provider options for your project.'
            },
            overview: {
                kicker: 'DRIVEWAY REQUESTS',
                heading: 'Сtart Driveway Requests',
                text: 'SlabWay helps homeowners start driveway-related requests and compare local provider options for new driveway planning, replacements, widened access areas, and clean concrete surfaces.',
                list: [
                    'New driveway request paths',
                    'Replacement or widened access areas',
                    'Surface details and project notes',
                    'Local provider option comparison'
                ]
            },
            panels: {
                accent: 'DRIVEWAY',
                heading: 'OPTIONS',
                items: ['NEW POUR', 'REPLACEMENT', 'WIDENING', 'ENTRY ACCESS']
            },
            highlights: [
                'New driveway requests',
                'Replacement and widening',
                'Front access surfaces'
            ]
        },

        {
            title: 'Concrete Patios',
            shortTitle: 'Patios',
            url: 'concrete-patios.html',
            icon: 'layout-panel-top',
            image: 'assets/images/services/concrete-patios.jpg',
            overviewImage: 'assets/images/services/concrete-patios-overview.jpg',
            shortText: 'Plan outdoor concrete spaces.',
            cardText: 'Explore patio project options for outdoor living areas, entertaining zones, seating spaces, and custom backyard layouts.',
            requestLabel: 'Start Patio Request',
            hero: {
                kicker: 'CONCRETE PATIOS',
                heading: 'Plan A Better Outdoor Space With Concrete Patio Options',
                text: 'Explore local provider options for concrete patio layouts, backyard seating zones, entertainment spaces, and clean outdoor surface upgrades.'
            },
            overview: {
                kicker: 'PATIO PROJECTS',
                heading: 'Start Patio Requests',
                text: 'Use SlabWay to start a concrete patio request and organize details for outdoor seating areas, backyard layouts, entertainment spaces, and practical hardscape surfaces.',
                list: [
                    'Backyard patio planning',
                    'Outdoor seating and gathering areas',
                    'Finish and layout preferences',
                    'Provider option comparison'
                ]
            },
            panels: {
                accent: 'PATIO',
                heading: 'USES',
                items: ['BACKYARD', 'DINING', 'SEATING', 'ENTERTAINING']
            },
            highlights: [
                'Backyard patio planning',
                'Outdoor living areas',
                'Seating and gathering spaces'
            ]
        },

        {
            title: 'Concrete Slabs',
            shortTitle: 'Slabs',
            url: 'concrete-slabs.html',
            icon: 'layers',
            image: 'assets/images/services/concrete-slabs.jpg',
            overviewImage: 'assets/images/services/concrete-slabs-overview.jpg',
            shortText: 'Match slab projects with providers.',
            cardText: 'Compare local provider options for garage slabs, shed bases, utility pads, workshop surfaces, and other practical concrete slab projects.',
            requestLabel: 'Start Slab Request',
            hero: {
                kicker: 'CONCRETE SLABS',
                heading: 'Find Slab Project Options For Practical Outdoor And Utility Spaces',
                text: 'Start a request for slab-related projects such as garage slabs, shed bases, utility surfaces, and other concrete foundation-style installations.'
            },
            overview: {
                kicker: 'SLAB PROJECTS',
                heading: 'Start Slab Requests That Fit Your Needs',
                text: 'SlabWay helps users describe concrete slab projects such as shed bases, garage slabs, utility pads, workshop areas, and other flat support surfaces before reviewing provider options.',
                list: [
                    'Garage and shed slab requests',
                    'Utility pad planning',
                    'Size and access notes',
                    'Local service path comparison'
                ]
            },
            panels: {
                accent: 'SLAB',
                heading: 'APPLICATIONS',
                items: ['GARAGE', 'SHED BASE', 'UTILITY PAD', 'WORKSHOP']
            },
            highlights: [
                'Garage and shed slabs',
                'Utility concrete pads',
                'Structural surface planning'
            ]
        },

        {
            title: 'Concrete Repair',
            shortTitle: 'Repair',
            url: 'concrete-repair.html',
            icon: 'wrench',
            image: 'assets/images/services/concrete-repair.jpg',
            overviewImage: 'assets/images/services/concrete-repair-overview.jpg',
            shortText: 'Start repair and resurfacing requests.',
            cardText: 'Start a request for cracked, uneven, chipped, or aging concrete surfaces that may need repair or resurfacing.',
            requestLabel: 'Start Repair Request',
            hero: {
                kicker: 'CONCRETE REPAIR',
                heading: 'Compare Solutions For Damaged Or Worn Concrete Surfaces',
                text: 'Describe cracks, uneven sections, chips, aging surfaces, or resurfacing needs and review provider options that may fit your repair project.'
            },
            overview: {
                kicker: 'REPAIR REQUESTS',
                heading: 'Open Repair Requests That Fit Your Needs',
                text: 'Start a request for cracked, uneven, chipped, aging, or worn concrete surfaces and compare local provider options for repair or resurfacing-related project paths.',
                list: [
                    'Cracks and surface wear',
                    'Uneven or aging concrete',
                    'Repair and resurfacing notes',
                    'Provider comparison path'
                ]
            },
            panels: {
                accent: 'REPAIR',
                heading: 'SURFACES',
                items: ['CRACKS', 'CHIPS', 'UNEVEN', 'RESURFACING']
            },
            highlights: [
                'Cracks and surface wear',
                'Uneven concrete areas',
                'Repair request matching'
            ]
        },

        {
            title: 'Stamped Concrete',
            shortTitle: 'Stamped',
            url: 'stamped-concrete.html',
            icon: 'shapes',
            image: 'assets/images/services/stamped-concrete.jpg',
            overviewImage: 'assets/images/services/stamped-concrete-overview.jpg',
            shortText: 'Explore decorative finish options.',
            cardText: 'Explore decorative concrete finish options for patios, walkways, driveways, and outdoor spaces where texture, pattern, and visual style matter.',
            requestLabel: 'Start Stamped Request',
            hero: {
                kicker: 'STAMPED CONCRETE',
                heading: 'Explore Decorative Concrete Finishes With A More Custom Look',
                text: 'Start a request for stamped concrete ideas and compare local provider options for patios, walkways, and outdoor surfaces with texture and pattern appeal.'
            },
            overview: {
                kicker: 'DECORATIVE CONCRETE',
                heading: 'Start Stamped Concrete Requests That Fit Your Needs',
                text: 'SlabWay helps users start decorative concrete requests for stamped patterns, textured finishes, patios, walkways, driveways, and outdoor surfaces with more visual character.',
                list: [
                    'Decorative finish preferences',
                    'Pattern and texture ideas',
                    'Patio and walkway applications',
                    'Local option comparison'
                ]
            },
            panels: {
                accent: 'STAMPED',
                heading: 'FINISHES',
                items: ['PATTERNS', 'TEXTURE', 'PATIO STYLE', 'WALKWAY LOOK']
            },
            highlights: [
                'Decorative finish options',
                'Patterned concrete surfaces',
                'Patio and walkway upgrades'
            ]
        },

        {
            title: 'Sidewalks & Walkways',
            shortTitle: 'Walkways',
            url: 'sidewalks-walkways.html',
            icon: 'footprints',
            image: 'assets/images/services/sidewalks-walkways.jpg',
            overviewImage: 'assets/images/services/sidewalks-walkways-overview.jpg',
            shortText: 'Connect paths, entries, and yards.',
            cardText: 'Start a request for front-entry paths, garden walkways, side-yard routes, connecting sidewalks, and practical concrete movement areas around the property.',
            requestLabel: 'Start Walkway Request',
            hero: {
                kicker: 'SIDEWALKS & WALKWAYS',
                heading: 'Create Cleaner Paths And Better Flow Around The Property',
                text: 'Review local provider options for front-entry walkways, connecting paths, garden routes, and practical concrete sidewalks around the home.'
            },
            overview: {
                kicker: 'WALKWAY REQUESTS',
                heading: 'Start Walkway Requests That Fit Your Needs',
                text: 'Start a request for front-entry walkways, garden paths, side-yard routes, connecting sidewalks, and practical concrete movement areas around the home.',
                list: [
                    'Entry path planning',
                    'Garden and side-yard routes',
                    'Connecting concrete walkways',
                    'Provider option comparison'
                ]
            },
            panels: {
                accent: 'WALKWAYS',
                heading: 'PATHS',
                items: ['ENTRY', 'GARDEN', 'SIDE YARD', 'CONNECTING']
            },
            highlights: [
                'Entry and garden paths',
                'Side-yard walkways',
                'Connecting concrete routes'
            ]
        }
    ],

    navigation: {
        main: [
            {
                label: 'Home',
                url: 'index.html'
            },
            {
                label: 'About',
                url: 'about.html'
            },
            {
                label: 'Services',
                url: 'all-services.html'
            },
            {
                label: 'Contact',
                url: 'contact.html'
            }
        ],

        homeAnchors: [
            {
                label: 'Start',
                url: 'index.html#home'
            },
            {
                label: 'About Platform',
                url: 'index.html#about'
            },
            {
                label: 'Popular Services',
                url: 'index.html#popular'
            },
            {
                label: 'Questions',
                url: 'index.html#questions'
            }
        ]
    },

    home: {
        hero: {
            kicker: 'INDEPENDENT CONCRETE MATCHING',
            heading: 'Compare Concrete Service Options With a Solid Start',
            text: 'SlabWay helps homeowners connect with local concrete service providers for driveways, patios, slabs, repairs, stamped concrete, and walkways — all through one simple request path.',
            primaryButton: 'Start a Concrete Request',
            secondaryButton: 'View Services'
        },

        about: {
            kicker: 'ABOUT SLABWAY',
            heading: 'Concrete Project Planning Starts With Better Options',
            text: 'SlabWay is an independent concrete service matching platform that helps homeowners compare local provider options for driveways, patios, slabs, repairs, stamped concrete, and walkways. Instead of searching one contractor at a time, users can start one clear request and review concrete service options that fit their project.',
            badge: 'Independent platform',
            button: 'Learn How It Works'
        },

        popular: {
            kicker: 'POPULAR CONCRETE SERVICES',
            heading: 'Popular Project Paths Homeowners Start With',
            text: 'Explore the most requested concrete project categories and compare local provider options for the spaces that matter most around the home.',
            button: 'View All Services'
        },

        accordion: {
            kicker: 'CONCRETE PROJECT QUESTIONS',
            heading: 'Before You Start a Concrete Request',
            text: 'Clear answers help homeowners describe the project better, compare provider options more easily, and understand what details may affect concrete service quotes.',
            items: [
                {
                    question: 'What concrete services can I start through SlabWay?',
                    answer: 'You can start requests for concrete driveways, patios, slabs, repairs, stamped concrete, sidewalks, and walkways.'
                },
                {
                    question: 'Is SlabWay a concrete contractor?',
                    answer: 'No. SlabWay is an independent provider-matching platform. It does not directly pour, install, repair, inspect, guarantee, or perform concrete work.'
                },
                {
                    question: 'What details should I include in my request?',
                    answer: 'Helpful details include the project category, approximate size, surface condition, location, finish preferences, timeline, and access notes.'
                },
                {
                    question: 'Can I compare more than one concrete option?',
                    answer: 'Yes. SlabWay is built to help homeowners review concrete service paths and compare local provider options before choosing what feels right.'
                },
                {
                    question: 'Does stamped concrete belong in the same request process?',
                    answer: 'Yes. Stamped concrete is one of the main service categories and can be started through the same request path.'
                },
                {
                    question: 'What happens after I submit a concrete request?',
                    answer: 'Your request information helps organize the project category and supports comparison of local provider options connected to your concrete service path.'
                }
            ]
        }
    },

    innerHeroes: {
        about: {
            kicker: 'ABOUT SLABWAY',
            heading: 'A Clearer Way To Explore Concrete Project Options',
            text: 'SlabWay is an independent concrete service matching platform designed to help homeowners compare local provider options for driveways, patios, slabs, repairs, stamped concrete, and walkways.',
            image: 'assets/images/about/about-hero.jpg',
            primaryButton: 'Learn About the Platform',
            primaryUrl: 'about.html#platform',
            secondaryButton: 'View Services',
            secondaryUrl: 'all-services.html'
        },

        allServices: {
            kicker: 'ALL CONCRETE SERVICES',
            heading: 'Explore Concrete Project Categories In One Place',
            text: 'Browse the main concrete service categories available through SlabWay and start with the option that best fits your project goals, surface type, and outdoor space.',
            image: 'assets/images/services/all-services-hero.jpg',
            primaryButton: 'Explore Services',
            primaryUrl: 'all-services.html#services-showcase',
            secondaryButton: 'Start a Request',
            secondaryUrl: 'contact.html#contact-form'
        },

        contact: {
            kicker: 'CONTACT SLABWAY',
            heading: 'Start Your Concrete Request With Confidence',
            text: 'Use the contact form to share your project details and begin comparing local concrete provider options for driveways, patios, slabs, repairs, stamped finishes, and walkways.',
            image: 'assets/images/contact/contact-hero.jpg',
            primaryButton: 'Go to Contact Form',
            primaryUrl: 'contact.html#contact-form',
            secondaryButton: 'View Services',
            secondaryUrl: 'all-services.html'
        }
    },

    testimonials: [
        {
            name: 'Daniel R.',
            project: 'Concrete driveway request',
            text: 'SlabWay made it easier to organize my driveway request. I liked being able to describe the project once and think through the options before making calls.'
        },
        {
            name: 'Megan L.',
            project: 'Concrete patio planning',
            text: 'We were planning a backyard patio and needed a clearer starting point. The platform helped us focus on project details before comparing local options.'
        },
        {
            name: 'Carlos M.',
            project: 'Concrete repair request',
            text: 'I had cracked concrete around the side path and did not know what category it fit into. SlabWay made the repair request feel more straightforward.'
        },
        {
            name: 'Rachel T.',
            project: 'Concrete slab project',
            text: 'The service categories were easy to understand. It helped us separate slab work from patio work and prepare better information for provider comparison.'
        },
        {
            name: 'Olivia K.',
            project: 'Stamped concrete options',
            text: 'We wanted decorative concrete but were not ready to choose a finish right away. SlabWay gave us a simple way to start with stamped concrete options.'
        },
        {
            name: 'Marcus B.',
            project: 'Sidewalks and walkways',
            text: 'Our walkway project was small, but we still wanted to compare paths before choosing anyone. The request process felt clean and easy.'
        }
    ],

    footer: {
        description: 'SlabWay is an independent concrete service matching platform that helps homeowners compare local provider options for driveways, patios, slabs, repairs, stamped concrete, sidewalks, and walkways.',
        copyright: 'All rights reserved.'
    },

    cta: {
        heading: 'Ready To Start A Concrete Request?',
        text: 'Choose a concrete category and share your project details to begin comparing local provider options through SlabWay.',
        primaryButton: 'Start Request',
        primaryUrl: 'contact.html#contact-form',
        secondaryButton: 'View Services',
        secondaryUrl: 'all-services.html',
        image: 'assets/images/cta/concrete-cta.jpg'
    },

    legal: {
        disclaimer: 'SlabWay is an independent provider-matching platform. SlabWay does not directly pour, install, repair, inspect, guarantee, or perform concrete work.',

        privacyIntro: 'This Privacy Policy explains how SlabWay may collect, use, and protect information submitted through this website when users start concrete service requests or contact the platform.',

        termsIntro: 'These Terms of Service explain the conditions for using SlabWay as an independent concrete service matching platform.',

        cookieIntro: 'This Cookie Policy explains how SlabWay may use cookies and similar browser storage to support basic website functionality, analytics preferences, and user experience.',

        sections: {
            platformRole: {
                title: 'Platform Role',
                text: 'SlabWay helps users organize concrete project requests and compare local provider options. SlabWay is not a direct concrete contractor and does not perform concrete work.'
            },
            userRequests: {
                title: 'User Requests',
                text: 'When users submit a request, they may provide contact details, project category, project notes, surface condition, approximate size, timing preferences, and related information.'
            },
            noGuarantee: {
                title: 'No Direct Work Guarantee',
                text: 'SlabWay does not guarantee that any specific provider will accept, quote, schedule, or complete a project. Users should review provider information before choosing any option.'
            },
            contact: {
                title: 'Contact',
                text: 'Questions about SlabWay, this website, or legal information can be sent to the contact email listed on this site.'
            }
        }
    },

    cookieBanner: {
        storageKey: 'slabway_cookie_consent',
        text: 'SlabWay uses cookies and local storage to keep the website working smoothly, remember basic choices, and improve the browsing experience.',
        acceptText: 'Accept',
        declineText: 'Decline'
    }
};