window.registerTemplate({
    id: 'emerald-garden-nikah',
    name: 'Emerald Garden Nikah',
    thumb: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=700&auto=format&fit=crop',
    freeform: false,
    scrollable: true,
    defaults: {
        colors: {
            primary: '#C9A85B',
            bg: '#163B2C',
            text: '#F7F1DF'
        },
        fonts: {
            heading: "'Playfair Display', serif"
        }
    },
    render: function(d, isEditMode) {
        const escape = (value, fallback = '') => String(value || fallback)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');

        const couple = d?.couple || {};
        const content = d?.content || {};
        const mainEvent = d?.mainEvent || {};
        const design = d?.design || {};
        const settings = d?.settings || {};
        const colors = design.colors || {};

        const primary = escape(colors.primary, '#C9A85B');
        const bg = escape(colors.bg, '#163B2C');
        const text = escape(colors.text, '#F7F1DF');

        const groom = escape(couple.groom, 'Groom Name');
        const bride = escape(couple.bride, 'Bride Name');
        const groomPhoto = escape(couple.groomPhoto, '');
        const bridePhoto = escape(couple.bridePhoto, '');

        const bismillah = escape(
            content.bismillah,
            'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ'
        );

        const heading = escape(content.heading, 'Save the Date');

        const message = escape(
            content.message,
            'With the blessings of Allah and the love of our families, we invite you to celebrate our special day with us.'
        );

        const arabicText = escape(
            content.arabicText,
            'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا'
        );

        const translation = escape(
            content.translation,
            'And among His signs is that He created for you spouses from among yourselves so that you may find tranquility in them.'
        );

        const eventTitle = escape(
            mainEvent.title,
            'Wedding Ceremony'
        );

        const eventDate = escape(
            mainEvent.date,
            'Wedding Date'
        );

        const eventTime = escape(
            mainEvent.time,
            'Wedding Time'
        );

        const venue = escape(
            mainEvent.venue,
            'Venue Name'
        );

        const address = escape(
            mainEvent.address,
            'Wedding Address'
        );

        const mapUrlRaw = String(mainEvent.mapUrl || '').trim();

        const safeMapUrl = /^https?:\/\//i.test(mapUrlRaw)
            ? escape(mapUrlRaw)
            : '';

        const edit = (key, html, visibilityKey) => {
            if (visibilityKey && settings[visibilityKey] === false) {
                return isEditMode
                    ? `<div class="template-hidden" data-edit="${key}">${html}</div>`
                    : '';
            }

            return isEditMode
                ? `<div class="template-editable" data-edit="${key}">
                    <span class="template-edit-pen">
                        <i class="fa-solid fa-pen"></i>
                    </span>
                    ${html}
                </div>`
                : html;
        };

        const couplePhoto = (src, alt, fallbackClass) => {
            if (src) {
                return `
                    <div class="portrait-frame ${fallbackClass}">
                        <img
                            src="${src}"
                            alt="${alt}"
                            loading="lazy"
                        >
                        <span class="portrait-shine"></span>
                    </div>
                `;
            }

            return `
                <div
                    class="portrait-frame ${fallbackClass} portrait-placeholder"
                    aria-hidden="true"
                >
                    <i class="fa-regular fa-user"></i>
                </div>
            `;
        };

        const mapAction = safeMapUrl
            ? `
                <a
                    class="location-button"
                    href="${safeMapUrl}"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Get directions to the wedding venue"
                >
                    <span class="location-icon">
                        <i class="fa-solid fa-location-dot"></i>
                    </span>

                    <span>Get Directions</span>

                    <i class="fa-solid fa-arrow-up-right-from-square external-icon"></i>
                </a>
            `
            : '';

        return `
            <style>
                .emerald-garden-template,
                .emerald-garden-template * {
                    box-sizing: border-box;
                }

                .emerald-garden-template {
                    --eg-primary: ${primary};
                    --eg-bg: ${bg};
                    --eg-text: ${text};
                    --eg-soft: color-mix(
                        in srgb,
                        var(--eg-text) 72%,
                        transparent
                    );
                    --eg-line: color-mix(
                        in srgb,
                        var(--eg-primary) 42%,
                        transparent
                    );

                    position: relative;
                    width: 100%;
                    min-height: 100vh;
                    overflow: hidden;

                    background:
                        radial-gradient(
                            circle at 12% 8%,
                            rgba(201, 168, 91, 0.13),
                            transparent 25%
                        ),
                        radial-gradient(
                            circle at 88% 22%,
                            rgba(255, 255, 255, 0.05),
                            transparent 28%
                        ),
                        linear-gradient(
                            180deg,
                            var(--eg-bg) 0%,
                            #102d22 48%,
                            var(--eg-bg) 100%
                        );

                    color: var(--eg-text);
                    font-family: "Inter", system-ui, sans-serif;
                    isolation: isolate;
                }

                .emerald-garden-template::before {
                    content: "";
                    position: absolute;
                    inset: 0;
                    z-index: -1;
                    pointer-events: none;
                    opacity: .35;

                    background-image:
                        radial-gradient(
                            circle at 20% 30%,
                            rgba(255,255,255,.08) 0 1px,
                            transparent 1.5px
                        ),
                        radial-gradient(
                            circle at 80% 65%,
                            rgba(255,255,255,.07) 0 1px,
                            transparent 1.5px
                        );

                    background-size:
                        80px 80px,
                        110px 110px;
                }

                .eg-shell {
                    position: relative;
                    width: 100%;
                    max-width: 680px;
                    margin: 0 auto;
                    padding: 18px 16px 48px;
                }

                .eg-ornament {
                    position: absolute;
                    z-index: -1;

                    width: 170px;
                    height: 170px;

                    border: 1px solid var(--eg-line);
                    border-radius: 50%;

                    opacity: .45;
                    pointer-events: none;
                }

                .eg-ornament::before,
                .eg-ornament::after {
                    content: "";
                    position: absolute;
                    inset: 18px;

                    border: 1px solid var(--eg-line);
                    border-radius: 50%;
                }

                .eg-ornament::after {
                    inset: 36px;
                    border-style: dashed;
                    opacity: .6;
                }

                .eg-ornament.one {
                    top: 45px;
                    left: -115px;
                }

                .eg-ornament.two {
                    top: 500px;
                    right: -115px;
                }

                .eg-flower {
                    position: absolute;
                    width: 58px;
                    height: 58px;

                    opacity: .8;
                    pointer-events: none;

                    animation:
                        eg-float 7s ease-in-out infinite;
                }

                .eg-flower::before,
                .eg-flower::after {
                    content: "";
                    position: absolute;

                    width: 26px;
                    height: 38px;

                    border: 1px solid var(--eg-primary);
                    border-radius: 100% 0 100% 0;

                    transform-origin: bottom center;
                }

                .eg-flower::before {
                    top: 0;
                    left: 16px;
                    transform: rotate(-28deg);
                }

                .eg-flower::after {
                    top: 0;
                    left: 16px;
                    transform:
                        rotate(28deg)
                        scaleX(-1);
                }

                .eg-flower i {
                    position: absolute;

                    width: 10px;
                    height: 10px;

                    left: 24px;
                    top: 22px;

                    border: 1px solid var(--eg-primary);
                    border-radius: 50%;

                    background: var(--eg-bg);
                }

                .eg-flower.a {
                    top: 160px;
                    right: 2px;
                }

                .eg-flower.b {
                    top: 790px;
                    left: 0;

                    transform: scale(.72);

                    animation-delay: -3s;
                }

                .eg-top {
                    padding: 22px 10px 18px;
                    text-align: center;
                }

                .eg-bismillah {
                    color: var(--eg-primary);

                    font-family:
                        "Amiri",
                        "Noto Naskh Arabic",
                        serif;

                    font-size:
                        clamp(22px, 6vw, 31px);

                    line-height: 1.8;

                    text-shadow:
                        0 2px 18px rgba(0,0,0,.18);
                }

                .eg-mini-label {
                    margin-top: 10px;

                    color: var(--eg-soft);

                    font-size: 9px;
                    font-weight: 700;

                    letter-spacing: .32em;
                    text-transform: uppercase;
                }

                .eg-hero {
                    position: relative;

                    padding: 34px 6px 38px;

                    text-align: center;
                }

                .eg-hero::before {
                    content: "";

                    position: absolute;

                    top: 0;
                    left: 50%;

                    width: 1px;
                    height: 28px;

                    background:
                        linear-gradient(
                            var(--eg-primary),
                            transparent
                        );
                }

                .eg-heading {
                    margin: 0 0 22px;

                    color: var(--eg-text);

                    font-family:
                        "Playfair Display",
                        Georgia,
                        serif;

                    font-size:
                        clamp(30px, 9vw, 52px);

                    line-height: 1.05;
                    font-weight: 500;

                    letter-spacing: -.035em;
                }

                .eg-heading::after {
                    content: "";

                    display: block;

                    width: 55px;
                    height: 1px;

                    margin:
                        17px auto 0;

                    background: var(--eg-primary);

                    box-shadow:
                        20px 0 0 rgba(201,168,91,.25),
                        -20px 0 0 rgba(201,168,91,.25);
                }

                .eg-couple {
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    gap:
                        clamp(14px, 5vw, 28px);

                    margin-top: 22px;
                }

                .eg-person {
                    width: min(40%, 190px);
                    text-align: center;
                }

                .portrait-frame {
                    position: relative;

                    width:
                        min(32vw, 150px);

                    height:
                        min(32vw, 150px);

                    min-width: 104px;
                    min-height: 104px;

                    margin: 0 auto 15px;

                    padding: 5px;

                    border:
                        1px solid var(--eg-primary);

                    border-radius: 50%;

                    background:
                        rgba(255,255,255,.035);

                    box-shadow:
                        0 0 0 5px rgba(201,168,91,.055),
                        0 18px 45px rgba(0,0,0,.18);

                    overflow: hidden;
                }

                .portrait-frame::before {
                    content: "";

                    position: absolute;
                    inset: 8px;

                    border:
                        1px solid rgba(201,168,91,.45);

                    border-radius: 50%;

                    pointer-events: none;
                    z-index: 2;
                }

                .portrait-frame img {
                    display: block;

                    width: 100%;
                    height: 100%;

                    object-fit: cover;

                    border-radius: 50%;
                }

                .portrait-placeholder {
                    display: grid;
                    place-items: center;

                    color: var(--eg-primary);
                    font-size: 30px;
                }

                .portrait-shine {
                    position: absolute;
                    inset: 0;

                    border-radius: 50%;

                    background:
                        linear-gradient(
                            125deg,
                            transparent 35%,
                            rgba(255,255,255,.16),
                            transparent 65%
                        );

                    transform: translateX(-130%);

                    animation:
                        eg-shine 6s ease-in-out infinite;

                    pointer-events: none;
                    z-index: 3;
                }

                .eg-person-name {
                    color: var(--eg-text);

                    font-family:
                        "Playfair Display",
                        Georgia,
                        serif;

                    font-size:
                        clamp(18px, 5vw, 25px);

                    line-height: 1.15;

                    word-break: break-word;
                }

                .eg-person-role {
                    margin-top: 6px;

                    color: var(--eg-primary);

                    font-size: 8px;
                    font-weight: 700;

                    letter-spacing: .22em;
                    text-transform: uppercase;
                }

                .eg-and {
                    flex: 0 0 auto;

                    display: grid;
                    place-items: center;

                    width: 38px;
                    height: 38px;

                    margin-top: -25px;

                    color: var(--eg-primary);

                    font-family:
                        "Playfair Display",
                        Georgia,
                        serif;

                    font-size: 21px;

                    border:
                        1px solid var(--eg-line);

                    border-radius: 50%;

                    background: var(--eg-bg);
                }

                .eg-message-card {
                    position: relative;

                    margin: 12px 0 24px;

                    padding: 30px 22px;

                    text-align: center;

                    border-top:
                        1px solid var(--eg-line);

                    border-bottom:
                        1px solid var(--eg-line);
                }

                .eg-message-card::before,
                .eg-message-card::after {
                    content: "✦";

                    position: absolute;

                    top: -8px;

                    color: var(--eg-primary);

                    font-size: 13px;

                    background: var(--eg-bg);

                    padding: 0 8px;
                }

                .eg-message-card::before {
                    left: 12%;
                }

                .eg-message-card::after {
                    right: 12%;
                }

                .eg-message {
                    margin: 0;

                    color: var(--eg-soft);

                    font-family:
                        "Playfair Display",
                        Georgia,
                        serif;

                    font-size:
                        clamp(16px, 4.4vw, 20px);

                    line-height: 1.75;
                }

                .eg-quote {
                    position: relative;

                    margin: 24px 0;

                    padding: 34px 22px 30px;

                    text-align: center;

                    border:
                        1px solid var(--eg-line);

                    border-radius: 2px;

                    background:
                        rgba(255,255,255,.025);
                }

                .eg-quote-mark {
                    position: absolute;

                    top: -17px;
                    left: 50%;

                    transform:
                        translateX(-50%);

                    display: grid;
                    place-items: center;

                    width: 34px;
                    height: 34px;

                    border:
                        1px solid var(--eg-primary);

                    border-radius: 50%;

                    background: var(--eg-bg);

                    color: var(--eg-primary);

                    font-family: Georgia, serif;
                    font-size: 24px;
                }

                .eg-arabic {
                    margin: 0;

                    direction: rtl;

                    font-family:
                        "Amiri",
                        "Noto Naskh Arabic",
                        serif;

                    font-size:
                        clamp(21px, 6vw, 29px);

                    line-height: 2;

                    color: var(--eg-text);
                }

                .eg-translation {
                    margin:
                        18px auto 0;

                    max-width: 500px;

                    color: var(--eg-soft);

                    font-family:
                        "Playfair Display",
                        Georgia,
                        serif;

                    font-size: 14px;
                    line-height: 1.8;

                    font-style: italic;
                }

                .eg-event {
                    position: relative;

                    margin: 34px 0 22px;

                    padding: 28px 18px;

                    text-align: center;

                    border-radius: 4px;

                    background:
                        linear-gradient(
                            rgba(255,255,255,.025),
                            rgba(255,255,255,.025)
                        ),
                        repeating-linear-gradient(
                            45deg,
                            transparent 0,
                            transparent 9px,
                            rgba(201,168,91,.025) 10px
                        );
                }

                .eg-event-title {
                    margin: 0 0 23px;

                    color: var(--eg-primary);

                    font-size: 9px;
                    font-weight: 800;

                    letter-spacing: .28em;
                    text-transform: uppercase;
                }

                .eg-event-grid {
                    display: grid;
                    grid-template-columns:
                        repeat(3, 1fr);

                    border-top:
                        1px solid var(--eg-line);

                    border-bottom:
                        1px solid var(--eg-line);
                }

                .eg-event-item {
                    min-width: 0;
                    padding: 17px 8px;
                }

                .eg-event-item + .eg-event-item {
                    border-left:
                        1px solid var(--eg-line);
                }

                .eg-event-icon {
                    color: var(--eg-primary);

                    font-size: 14px;

                    margin-bottom: 9px;
                }

                .eg-event-label {
                    display: block;

                    margin-bottom: 5px;

                    color: var(--eg-soft);

                    font-size: 7px;
                    font-weight: 700;

                    letter-spacing: .16em;
                    text-transform: uppercase;
                }

                .eg-event-value {
                    display: block;

                    color: var(--eg-text);

                    font-family:
                        "Playfair Display",
                        Georgia,
                        serif;

                    font-size: 13px;
                    line-height: 1.35;

                    overflow-wrap: anywhere;
                }

                .eg-venue {
                    margin-top: 23px;
                    padding: 0 8px;
                }

                .eg-venue-name {
                    margin: 0;

                    color: var(--eg-text);

                    font-family:
                        "Playfair Display",
                        Georgia,
                        serif;

                    font-size:
                        clamp(20px, 6vw, 28px);

                    line-height: 1.25;
                }

                .eg-address {
                    margin: 7px auto 0;

                    max-width: 480px;

                    color: var(--eg-soft);

                    font-size: 12px;
                    line-height: 1.6;
                }

                .eg-location {
                    margin-top: 22px;
                    text-align: center;
                }

                .location-button {
                    display: inline-flex;

                    align-items: center;
                    justify-content: center;

                    gap: 10px;

                    min-height: 48px;
                    max-width: 100%;

                    padding: 12px 17px;

                    border:
                        1px solid var(--eg-primary);

                    border-radius: 999px;

                    color: var(--eg-text);

                    background:
                        rgba(201,168,91,.08);

                    text-decoration: none;

                    font-size: 11px;
                    font-weight: 700;

                    letter-spacing: .08em;
                    text-transform: uppercase;

                    transition:
                        background .25s ease,
                        transform .25s ease;
                }

                .location-button:active {
                    transform: scale(.97);
                }

                .location-icon {
                    display: grid;
                    place-items: center;

                    width: 24px;
                    height: 24px;

                    border-radius: 50%;

                    color: var(--eg-bg);
                    background: var(--eg-primary);
                }

                .external-icon {
                    font-size: 9px;
                    opacity: .7;
                }

                .eg-footer {
                    padding: 34px 10px 8px;
                    text-align: center;
                }

                .eg-footer-symbol {
                    color: var(--eg-primary);

                    font-size: 18px;

                    letter-spacing: .3em;
                }

                .eg-footer-text {
                    margin: 10px 0 0;

                    color: var(--eg-soft);

                    font-size: 9px;

                    letter-spacing: .16em;
                    text-transform: uppercase;
                }

                .template-editable {
                    position: relative;

                    outline:
                        1px dashed rgba(45, 125, 255, .45);

                    outline-offset: 5px;

                    border-radius: 4px;
                }

                .template-edit-pen {
                    position: absolute;

                    top: 7px;
                    right: 7px;

                    z-index: 30;

                    display: grid;
                    place-items: center;

                    width: 27px;
                    height: 27px;

                    border-radius: 50%;

                    color: #fff;
                    background: #1677ff;

                    box-shadow:
                        0 4px 14px rgba(22,119,255,.35);

                    font-size: 11px;

                    pointer-events: none;
                }

                .template-hidden {
                    position: relative;

                    display: block;

                    min-height: 8px;

                    outline:
                        1px dashed rgba(45, 125, 255, .35);

                    outline-offset: 4px;
                }

                .template-hidden::after {
                    content: "Hidden";

                    position: absolute;

                    top: 4px;
                    right: 4px;

                    padding: 3px 6px;

                    border-radius: 4px;

                    color: #fff;
                    background: #1677ff;

                    font:
                        700 8px/1
                        system-ui, sans-serif;

                    letter-spacing: .04em;
                }

                @keyframes eg-float {
                    0%, 100% {
                        transform:
                            translateY(0)
                            rotate(0deg);
                    }

                    50% {
                        transform:
                            translateY(-12px)
                            rotate(5deg);
                    }
                }

                @keyframes eg-shine {
                    0%, 55%, 100% {
                        transform:
                            translateX(-130%);
                    }

                    72% {
                        transform:
                            translateX(130%);
                    }
                }

                @media (max-width: 380px) {
                    .eg-shell {
                        padding-left: 12px;
                        padding-right: 12px;
                    }

                    .eg-couple {
                        gap: 8px;
                    }

                    .portrait-frame {
                        min-width: 92px;
                        min-height: 92px;
                    }

                    .eg-and {
                        width: 31px;
                        height: 31px;
                        font-size: 17px;
                    }

                    .eg-person-name {
                        font-size: 17px;
                    }

                    .eg-event-item {
                        padding-left: 4px;
                        padding-right: 4px;
                    }

                    .eg-event-value {
                        font-size: 12px;
                    }
                }

                @media (min-width: 600px) {
                    .eg-shell {
                        padding-top: 30px;
                    }

                    .eg-hero {
                        padding-top: 50px;
                        padding-bottom: 50px;
                    }

                    .eg-message-card {
                        padding-left: 48px;
                        padding-right: 48px;
                    }

                    .eg-quote {
                        padding-left: 45px;
                        padding-right: 45px;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .eg-flower,
                    .portrait-shine {
                        animation: none;
                    }

                    .location-button {
                        transition: none;
                    }
                }
            </style>

            <main class="emerald-garden-template">

                <div
                    class="eg-ornament one"
                    aria-hidden="true"
                ></div>

                <div
                    class="eg-ornament two"
                    aria-hidden="true"
                ></div>

                <div
                    class="eg-flower a"
                    aria-hidden="true"
                >
                    <i></i>
                </div>

                <div
                    class="eg-flower b"
                    aria-hidden="true"
                >
                    <i></i>
                </div>

                <div class="eg-shell">

                    ${edit(
                        'bismillah',
                        `
                        <div class="eg-top">
                            <div
                                class="eg-bismillah"
                                lang="ar"
                            >
                                ${bismillah}
                            </div>

                            <div class="eg-mini-label">
                                In the name of Allah
                            </div>
                        </div>
                        `,
                        'showBismillah'
                    )}

                    ${edit(
                        'heading',
                        `
                        <section class="eg-hero">
                            <h1 class="eg-heading">
                                ${heading}
                            </h1>
                        </section>
                        `,
                        'showHeading'
                    )}

                    ${edit(
                        'couple',
                        `
                        <section
                            class="eg-couple"
                            aria-label="Couple"
                        >
                            <div class="eg-person">

                                ${couplePhoto(
                                    groomPhoto,
                                    groom,
                                    'groom'
                                )}

                                <div class="eg-person-name">
                                    ${groom}
                                </div>

                                <div class="eg-person-role">
                                    Groom
                                </div>

                            </div>

                            <div
                                class="eg-and"
                                aria-hidden="true"
                            >
                                &amp;
                            </div>

                            <div class="eg-person">

                                ${couplePhoto(
                                    bridePhoto,
                                    bride,
                                    'bride'
                                )}

                                <div class="eg-person-name">
                                    ${bride}
                                </div>

                                <div class="eg-person-role">
                                    Bride
                                </div>

                            </div>
                        </section>
                        `,
                        'showCouple'
                    )}

                    ${edit(
                        'message',
                        `
                        <section class="eg-message-card">
                            <p class="eg-message">
                                ${message}
                            </p>
                        </section>
                        `,
                        'showMessage'
                    )}

                    ${edit(
                        'quran',
                        `
                        <section class="eg-quote">

                            <span
                                class="eg-quote-mark"
                                aria-hidden="true"
                            >
                                “
                            </span>

                            <p
                                class="eg-arabic"
                                lang="ar"
                            >
                                ${arabicText}
                            </p>

                            <p class="eg-translation">
                                ${translation}
                            </p>

                        </section>
                        `,
                        'showQuote'
                    )}

                    ${edit(
                        'mainEvent',
                        `
                        <section class="eg-event">

                            <h2 class="eg-event-title">
                                ${eventTitle}
                            </h2>

                            <div class="eg-event-grid">

                                <div class="eg-event-item">

                                    <div class="eg-event-icon">
                                        <i class="fa-regular fa-calendar"></i>
                                    </div>

                                    <span class="eg-event-label">
                                        Date
                                    </span>

                                    <span class="eg-event-value">
                                        ${eventDate}
                                    </span>

                                </div>

                                <div class="eg-event-item">

                                    <div class="eg-event-icon">
                                        <i class="fa-regular fa-clock"></i>
                                    </div>

                                    <span class="eg-event-label">
                                        Time
                                    </span>

                                    <span class="eg-event-value">
                                        ${eventTime}
                                    </span>

                                </div>

                                <div class="eg-event-item">

                                    <div class="eg-event-icon">
                                        <i class="fa-solid fa-location-dot"></i>
                                    </div>

                                    <span class="eg-event-label">
                                        Venue
                                    </span>

                                    <span class="eg-event-value">
                                        ${venue}
                                    </span>

                                </div>

                            </div>

                            <div class="eg-venue">

                                <h3 class="eg-venue-name">
                                    ${venue}
                                </h3>

                                <p class="eg-address">
                                    ${address}
                                </p>

                            </div>

                            ${
                                settings.showMap === false
                                    ? ''
                                    : `
                                    <div class="eg-location">
                                        ${mapAction}
                                    </div>
                                    `
                            }

                        </section>
                        `,
                        'showEvent'
                    )}

                    ${settings.showEvent === false && settings.showMap !== false
                        ? edit(
                            'mainEvent',
                            `
                            <div class="eg-location">
                                ${mapAction}
                            </div>
                            `,
                            'showMap'
                        )
                        : ''
                    }

                    <footer
                        class="eg-footer"
                        aria-hidden="true"
                    >
                        <div class="eg-footer-symbol">
                            ✦ · ✦ · ✦
                        </div>

                        <div class="eg-footer-text">
                            With love and blessings
                        </div>
                    </footer>

                </div>
            </main>
        `;
    }
});
