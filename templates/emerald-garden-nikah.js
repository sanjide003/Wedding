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
const couple = d.couple || {};
const content = d.content || {};
const mainEvent = d.mainEvent || {};
const design = d.design || {};
const set = d.settings || {};

    const colors = {
        primary: design.colors?.primary || '#C9A85B',
        bg: design.colors?.bg || '#163B2C',
        text: design.colors?.text || '#F7F1DF'
    };

    const escape = (value, fallback = '') => String(value || fallback)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

    const edit = (key, html, visibilityKey) => {
        if (visibilityKey && set[visibilityKey] === false) {
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

    const groom = escape(couple.groom, 'Groom Name');
    const bride = escape(couple.bride, 'Bride Name');

    const groomPhoto = escape(couple.groomPhoto, '');
    const bridePhoto = escape(couple.bridePhoto, '');

    const bismillah = escape(
        content.bismillah,
        'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ'
    );

    const heading = escape(
        content.heading,
        'Save the Date'
    );

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

    const eventDateRaw = String(mainEvent.date || '').trim();

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

    const dateObject = /^\d{4}-\d{2}-\d{2}$/.test(eventDateRaw)
        ? new Date(`${eventDateRaw}T00:00:00`)
        : null;

    const formattedDate = dateObject
        ? new Intl.DateTimeFormat('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(dateObject)
        : 'Wedding Date';

    const getPhoto = (photo, name, type) => {
        if (photo) {
            return `
                <div class="eg-photo-frame ${type}">
                    <img
                        src="${photo}"
                        alt="${name}"
                        loading="lazy"
                    >
                    <span class="eg-photo-glow"></span>
                </div>
            `;
        }

        return `
            <div class="eg-photo-frame ${type} eg-photo-placeholder">
                <span>
                    <i class="fa-regular fa-user"></i>
                </span>
            </div>
        `;
    };

    const mapButton = safeMapUrl
        ? `
            <a
                class="eg-location-button"
                href="${safeMapUrl}"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get directions to the wedding venue"
            >
                <span class="eg-location-icon">
                    <i class="fa-solid fa-location-dot"></i>
                </span>
                <span>Get Directions</span>
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
        `
        : '';

    return `
        <style>
            .eg-template,
            .eg-template * {
                box-sizing: border-box;
            }

            .eg-template {
                --eg-primary: ${escape(colors.primary, '#C9A85B')};
                --eg-bg: ${escape(colors.bg, '#163B2C')};
                --eg-text: ${escape(colors.text, '#F7F1DF')};

                --eg-muted: color-mix(
                    in srgb,
                    var(--eg-text) 70%,
                    transparent
                );

                --eg-border: color-mix(
                    in srgb,
                    var(--eg-primary) 45%,
                    transparent
                );

                width: 100%;
                min-height: 100vh;

                position: relative;
                overflow: hidden;

                color: var(--eg-text);

                font-family:
                    "Inter",
                    system-ui,
                    sans-serif;

                background:
                    radial-gradient(
                        circle at 8% 7%,
                        color-mix(
                            in srgb,
                            var(--eg-primary) 14%,
                            transparent
                        ) 0,
                        transparent 27%
                    ),
                    radial-gradient(
                        circle at 92% 24%,
                        rgba(255,255,255,.045),
                        transparent 28%
                    ),
                    linear-gradient(
                        180deg,
                        var(--eg-bg) 0%,
                        color-mix(
                            in srgb,
                            var(--eg-bg) 84%,
                            #000
                        ) 55%,
                        var(--eg-bg) 100%
                    );
            }

            .eg-template::before {
                content: "";

                position: absolute;
                inset: 0;

                pointer-events: none;

                opacity: .28;

                background-image:
                    radial-gradient(
                        circle,
                        rgba(255,255,255,.16) 0 1px,
                        transparent 1.5px
                    );

                background-size: 85px 85px;
            }

            .eg-page {
                position: relative;

                width: 100%;
                max-width: 720px;

                margin: 0 auto;

                padding:
                    24px 18px
                    60px;
            }

            .eg-corner {
                position: absolute;

                width: 125px;
                height: 125px;

                border:
                    1px solid var(--eg-border);

                opacity: .65;

                pointer-events: none;
            }

            .eg-corner::before,
            .eg-corner::after {
                content: "";

                position: absolute;

                border:
                    1px solid var(--eg-border);
            }

            .eg-corner::before {
                inset: 10px;
            }

            .eg-corner::after {
                inset: 22px;
            }

            .eg-corner.top-left {
                top: 25px;
                left: -70px;

                border-right: 0;
                border-bottom: 0;

                border-radius:
                    100% 0 0 0;
            }

            .eg-corner.top-right {
                top: 25px;
                right: -70px;

                border-left: 0;
                border-bottom: 0;

                border-radius:
                    0 100% 0 0;
            }

            .eg-corner.bottom-left {
                bottom: 30px;
                left: -70px;

                border-right: 0;
                border-top: 0;

                border-radius:
                    0 0 0 100%;
            }

            .eg-corner.bottom-right {
                bottom: 30px;
                right: -70px;

                border-left: 0;
                border-top: 0;

                border-radius:
                    0 0 100% 0;
            }

            .eg-flower {
                position: absolute;

                width: 70px;
                height: 70px;

                opacity: .75;

                pointer-events: none;

                animation:
                    eg-flower-float
                    7s
                    ease-in-out
                    infinite;
            }

            .eg-flower.left {
                top: 170px;
                left: -17px;
            }

            .eg-flower.right {
                top: 700px;
                right: -18px;

                animation-delay: -3s;
            }

            .eg-flower.bottom {
                bottom: 160px;
                left: 8px;

                animation-delay: -5s;
            }

            .eg-flower span {
                position: absolute;

                left: 27px;
                top: 5px;

                width: 17px;
                height: 34px;

                border:
                    1px solid var(--eg-primary);

                border-radius:
                    100% 0 100% 0;

                transform-origin:
                    8px 30px;
            }

            .eg-flower span:nth-child(1) {
                transform: rotate(0deg) translateY(-10px);
            }

            .eg-flower span:nth-child(2) {
                transform: rotate(45deg) translateY(-10px);
            }

            .eg-flower span:nth-child(3) {
                transform: rotate(90deg) translateY(-10px);
            }

            .eg-flower span:nth-child(4) {
                transform: rotate(135deg) translateY(-10px);
            }

            .eg-flower span:nth-child(5) {
                transform: rotate(180deg) translateY(-10px);
            }

            .eg-flower span:nth-child(6) {
                transform: rotate(225deg) translateY(-10px);
            }

            .eg-flower span:nth-child(7) {
                transform: rotate(270deg) translateY(-10px);
            }

            .eg-flower span:nth-child(8) {
                transform: rotate(315deg) translateY(-10px);
            }

            .eg-flower i {
                position: absolute;

                left: 27px;
                top: 27px;

                width: 16px;
                height: 16px;

                border:
                    1px solid var(--eg-primary);

                border-radius: 50%;

                background: var(--eg-bg);
            }

            .eg-top {
                position: relative;

                min-height: 180px;

                display: flex;
                flex-direction: column;

                align-items: center;
                justify-content: center;

                text-align: center;
            }

            .eg-bismillah {
                color: var(--eg-primary);

                font-family:
                    "Amiri",
                    "Noto Naskh Arabic",
                    serif;

                font-size:
                    clamp(23px, 7vw, 34px);

                line-height: 1.8;
            }

            .eg-top-caption {
                margin-top: 8px;

                color: var(--eg-muted);

                font-size: 8px;
                font-weight: 700;

                letter-spacing: .28em;

                text-transform: uppercase;
            }

            .eg-divider {
                display: flex;

                align-items: center;
                justify-content: center;

                gap: 9px;

                margin: 12px auto;
            }

            .eg-divider::before,
            .eg-divider::after {
                content: "";

                width: 62px;
                height: 1px;

                background:
                    linear-gradient(
                        90deg,
                        transparent,
                        var(--eg-primary)
                    );
            }

            .eg-divider::after {
                background:
                    linear-gradient(
                        90deg,
                        var(--eg-primary),
                        transparent
                    );
            }

            .eg-divider-dot {
                width: 6px;
                height: 6px;

                transform: rotate(45deg);

                background: var(--eg-primary);
            }

            .eg-hero {
                position: relative;

                padding:
                    50px 8px
                    45px;

                text-align: center;
            }

            .eg-hero-small {
                margin-bottom: 14px;

                color: var(--eg-primary);

                font-size: 8px;
                font-weight: 800;

                letter-spacing: .3em;

                text-transform: uppercase;
            }

            .eg-heading {
                margin: 0;

                color: var(--eg-text);

                font-family:
                    "Playfair Display",
                    Georgia,
                    serif;

                font-size:
                    clamp(36px, 11vw, 66px);

                line-height: .98;

                font-weight: 500;

                letter-spacing: -.045em;
            }

            .eg-heading-line {
                width: 75px;
                height: 1px;

                margin:
                    24px auto 0;

                background: var(--eg-primary);
            }

            .eg-couple {
                position: relative;

                display: grid;

                grid-template-columns:
                    minmax(0, 1fr)
                    40px
                    minmax(0, 1fr);

                align-items: center;

                gap: 8px;

                padding:
                    10px 4px
                    40px;
            }

            .eg-person {
                min-width: 0;

                text-align: center;
            }

            .eg-photo-frame {
                position: relative;

                width:
                    clamp(112px, 32vw, 158px);

                height:
                    clamp(112px, 32vw, 158px);

                margin:
                    0 auto 18px;

                padding: 5px;

                border:
                    1px solid var(--eg-primary);

                border-radius: 50%;

                background:
                    rgba(255,255,255,.025);

                box-shadow:
                    0 0 0 7px
                    color-mix(
                        in srgb,
                        var(--eg-primary) 6%,
                        transparent
                    );

                overflow: hidden;
            }

            .eg-photo-frame::before {
                content: "";

                position: absolute;

                inset: 9px;

                border:
                    1px solid
                    color-mix(
                        in srgb,
                        var(--eg-primary) 55%,
                        transparent
                    );

                border-radius: 50%;

                z-index: 2;

                pointer-events: none;
            }

            .eg-photo-frame img {
                width: 100%;
                height: 100%;

                display: block;

                object-fit: cover;

                border-radius: 50%;
            }

            .eg-photo-placeholder {
                display: grid;
                place-items: center;

                color: var(--eg-primary);
            }

            .eg-photo-placeholder span {
                display: grid;
                place-items: center;

                width: 100%;
                height: 100%;

                border-radius: 50%;

                background:
                    radial-gradient(
                        circle,
                        rgba(255,255,255,.08),
                        transparent 70%
                    );

                font-size: 28px;
            }

            .eg-photo-glow {
                position: absolute;

                inset: 0;

                border-radius: 50%;

                background:
                    linear-gradient(
                        120deg,
                        transparent 35%,
                        rgba(255,255,255,.18),
                        transparent 65%
                    );

                transform:
                    translateX(-130%);

                animation:
                    eg-photo-shine
                    7s
                    ease-in-out
                    infinite;

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
                    clamp(19px, 5.5vw, 28px);

                line-height: 1.1;

                overflow-wrap: anywhere;
            }

            .eg-person-role {
                margin-top: 8px;

                color: var(--eg-primary);

                font-size: 8px;
                font-weight: 800;

                letter-spacing: .22em;

                text-transform: uppercase;
            }

            .eg-amp {
                position: relative;

                z-index: 4;

                display: grid;
                place-items: center;

                width: 38px;
                height: 38px;

                margin: 0 auto;

                border:
                    1px solid var(--eg-border);

                border-radius: 50%;

                color: var(--eg-primary);

                font-family:
                    "Playfair Display",
                    Georgia,
                    serif;

                font-size: 21px;

                background: var(--eg-bg);
            }

            .eg-message-section {
                position: relative;

                margin:
                    35px 0
                    25px;

                padding:
                    38px 22px;

                text-align: center;

                border-top:
                    1px solid var(--eg-border);

                border-bottom:
                    1px solid var(--eg-border);
            }

            .eg-message-section::before,
            .eg-message-section::after {
                content: "✦";

                position: absolute;

                top: -9px;

                padding: 0 8px;

                color: var(--eg-primary);

                background: var(--eg-bg);

                font-size: 13px;
            }

            .eg-message-section::before {
                left: 15%;
            }

            .eg-message-section::after {
                right: 15%;
            }

            .eg-message {
                margin: 0;

                color: var(--eg-muted);

                font-family:
                    "Playfair Display",
                    Georgia,
                    serif;

                font-size:
                    clamp(16px, 4.5vw, 20px);

                line-height: 1.8;
            }

            .eg-quote {
                position: relative;

                margin:
                    55px 0
                    35px;

                padding:
                    42px 20px
                    34px;

                text-align: center;

                border:
                    1px solid var(--eg-border);

                background:
                    rgba(255,255,255,.018);
            }

            .eg-quote-symbol {
                position: absolute;

                top: -18px;
                left: 50%;

                display: grid;
                place-items: center;

                width: 36px;
                height: 36px;

                transform:
                    translateX(-50%);

                border:
                    1px solid var(--eg-primary);

                border-radius: 50%;

                color: var(--eg-primary);

                background: var(--eg-bg);

                font-family: Georgia, serif;

                font-size: 25px;
            }

            .eg-arabic {
                margin: 0;

                direction: rtl;

                color: var(--eg-text);

                font-family:
                    "Amiri",
                    "Noto Naskh Arabic",
                    serif;

                font-size:
                    clamp(22px, 6vw, 31px);

                line-height: 2;
            }

            .eg-translation {
                max-width: 520px;

                margin:
                    20px auto 0;

                color: var(--eg-muted);

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

                margin:
                    45px 0
                    30px;

                padding:
                    32px 17px;

                text-align: center;

                border:
                    1px solid var(--eg-border);

                background:
                    rgba(255,255,255,.018);
            }

            .eg-event-kicker {
                margin-bottom: 9px;

                color: var(--eg-primary);

                font-size: 8px;
                font-weight: 800;

                letter-spacing: .28em;

                text-transform: uppercase;
            }

            .eg-event-title {
                margin: 0 0 26px;

                color: var(--eg-text);

                font-family:
                    "Playfair Display",
                    Georgia,
                    serif;

                font-size:
                    clamp(24px, 7vw, 34px);

                line-height: 1.2;
            }

            .eg-event-grid {
                display: grid;

                grid-template-columns:
                    repeat(2, minmax(0, 1fr));

                border-top:
                    1px solid var(--eg-border);

                border-bottom:
                    1px solid var(--eg-border);
            }

            .eg-event-item {
                min-width: 0;

                padding:
                    19px 9px;
            }

            .eg-event-item:nth-child(2n) {
                border-left:
                    1px solid var(--eg-border);
            }

            .eg-event-item:nth-child(n+3) {
                border-top:
                    1px solid var(--eg-border);
            }

            .eg-event-icon {
                margin-bottom: 8px;

                color: var(--eg-primary);

                font-size: 15px;
            }

            .eg-event-label {
                display: block;

                margin-bottom: 5px;

                color: var(--eg-muted);

                font-size: 7px;
                font-weight: 800;

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

                font-size: 14px;

                line-height: 1.4;

                overflow-wrap: anywhere;
            }

            .eg-venue {
                padding-top: 25px;
            }

            .eg-venue-name {
                margin: 0;

                color: var(--eg-text);

                font-family:
                    "Playfair Display",
                    Georgia,
                    serif;

                font-size:
                    clamp(22px, 6vw, 30px);

                line-height: 1.2;

                overflow-wrap: anywhere;
            }

            .eg-address {
                max-width: 500px;

                margin:
                    9px auto 0;

                color: var(--eg-muted);

                font-size: 12px;

                line-height: 1.7;

                overflow-wrap: anywhere;
            }

            .eg-map {
                margin-top: 24px;
            }

            .eg-location-button {
                display: inline-flex;

                align-items: center;
                justify-content: center;

                gap: 10px;

                min-height: 48px;

                max-width: 100%;

                padding:
                    11px 18px;

                border:
                    1px solid var(--eg-primary);

                border-radius: 999px;

                color: var(--eg-text);

                background:
                    color-mix(
                        in srgb,
                        var(--eg-primary) 8%,
                        transparent
                    );

                text-decoration: none;

                font-size: 10px;
                font-weight: 800;

                letter-spacing: .1em;

                text-transform: uppercase;
            }

            .eg-location-icon {
                display: grid;
                place-items: center;

                width: 24px;
                height: 24px;

                border-radius: 50%;

                color: var(--eg-bg);

                background:
                    var(--eg-primary);
            }

            .eg-closing {
                padding:
                    55px 10px
                    20px;

                text-align: center;
            }

            .eg-closing-symbol {
                color: var(--eg-primary);

                font-size: 17px;

                letter-spacing: .35em;
            }

            .eg-closing-text {
                margin-top: 13px;

                color: var(--eg-muted);

                font-size: 8px;
                font-weight: 700;

                letter-spacing: .22em;

                text-transform: uppercase;
            }

            .template-editable {
                position: relative;

                border-radius: 5px;

                outline:
                    1px dashed
                    rgba(37,99,235,.7);

                outline-offset: 5px;
            }

            .template-edit-pen {
                position: absolute;

                top: 7px;
                right: 7px;

                z-index: 50;

                display: grid;
                place-items: center;

                width: 28px;
                height: 28px;

                border-radius: 50%;

                color: #fff;

                background: #2563eb;

                box-shadow:
                    0 4px 14px
                    rgba(37,99,235,.35);

                font-size: 11px;

                pointer-events: none;
            }

            .template-hidden {
                position: relative;

                display: block;

                min-height: 10px;

                opacity: .42;

                outline:
                    1px dashed
                    rgba(37,99,235,.65);

                outline-offset: 5px;
            }

            .template-hidden::after {
                content: "Hidden";

                position: absolute;

                top: 5px;
                right: 5px;

                padding:
                    4px 7px;

                border-radius: 4px;

                color: #fff;

                background: #2563eb;

                font:
                    700 8px/1
                    system-ui,
                    sans-serif;

                letter-spacing: .04em;
            }

            @keyframes eg-flower-float {
                0%,
                100% {
                    transform:
                        translateY(0)
                        rotate(-2deg);
                }

                50% {
                    transform:
                        translateY(-10px)
                        rotate(4deg);
                }
            }

            @keyframes eg-photo-shine {
                0%,
                55%,
                100% {
                    transform:
                        translateX(-130%);
                }

                72% {
                    transform:
                        translateX(130%);
                }
            }

            @media (max-width: 380px) {
                .eg-page {
                    padding-left: 13px;
                    padding-right: 13px;
                }

                .eg-couple {
                    gap: 4px;
                    padding-left: 0;
                    padding-right: 0;
                }

                .eg-amp {
                    width: 32px;
                    height: 32px;
                    font-size: 17px;
                }

                .eg-photo-frame {
                    width: 105px;
                    height: 105px;
                }

                .eg-person-name {
                    font-size: 17px;
                }

                .eg-event {
                    padding-left: 10px;
                    padding-right: 10px;
                }

                .eg-event-value {
                    font-size: 12px;
                }
            }

            @media (min-width: 600px) {
                .eg-page {
                    padding-top: 40px;
                }

                .eg-hero {
                    padding-top: 70px;
                    padding-bottom: 65px;
                }

                .eg-couple {
                    gap: 18px;
                    padding-left: 25px;
                    padding-right: 25px;
                }

                .eg-message-section {
                    padding-left: 55px;
                    padding-right: 55px;
                }

                .eg-quote {
                    padding-left: 50px;
                    padding-right: 50px;
                }

                .eg-event {
                    padding-left: 35px;
                    padding-right: 35px;
                }
            }

            @media (prefers-reduced-motion: reduce) {
                .eg-flower,
                .eg-photo-glow {
                    animation: none;
                }
            }
        </style>

        <main class="eg-template">

            <div
                class="eg-corner top-left"
                aria-hidden="true"
            ></div>

            <div
                class="eg-corner top-right"
                aria-hidden="true"
            ></div>

            <div
                class="eg-corner bottom-left"
                aria-hidden="true"
            ></div>

            <div
                class="eg-corner bottom-right"
                aria-hidden="true"
            ></div>

            <div
                class="eg-flower left"
                aria-hidden="true"
            >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <i></i>
            </div>

            <div
                class="eg-flower right"
                aria-hidden="true"
            >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <i></i>
            </div>

            <div
                class="eg-flower bottom"
                aria-hidden="true"
            >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <i></i>
            </div>

            <div class="eg-page">

                ${edit(
                    'bismillah',
                    `
                    <header class="eg-top">
                        <div
                            class="eg-bismillah"
                            lang="ar"
                        >
                            ${bismillah}
                        </div>

                        <div class="eg-top-caption">
                            In the Name of Allah
                        </div>

                        <div
                            class="eg-divider"
                            aria-hidden="true"
                        >
                            <span class="eg-divider-dot"></span>
                        </div>
                    </header>
                    `,
                    'showBismillah'
                )}

                ${edit(
                    'heading',
                    `
                    <section class="eg-hero">

                        <div class="eg-hero-small">
                            A Beautiful Beginning
                        </div>

                        <h1 class="eg-heading">
                            ${heading}
                        </h1>

                        <div class="eg-heading-line"></div>

                    </section>
                    `,
                    'showHeading'
                )}

                ${edit(
                    'couple',
                    `
                    <section
                        class="eg-couple"
                        aria-label="Bride and Groom"
                    >

                        <div class="eg-person">

                            ${getPhoto(
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
                            class="eg-amp"
                            aria-hidden="true"
                        >
                            &amp;
                        </div>

                        <div class="eg-person">

                            ${getPhoto(
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
                    <section class="eg-message-section">
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

                        <div
                            class="eg-quote-symbol"
                            aria-hidden="true"
                        >
                            “
                        </div>

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

                        <div class="eg-event-kicker">
                            You Are Invited
                        </div>

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
                                    ${formattedDate}
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

                            <div class="eg-event-item">
                                <div class="eg-event-icon">
                                    <i class="fa-solid fa-map"></i>
                                </div>

                                <span class="eg-event-label">
                                    Address
                                </span>

                                <span class="eg-event-value">
                                    ${address}
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
                            set.showMap !== false && safeMapUrl
                                ? `
                                <div class="eg-map">
                                    ${mapButton}
                                </div>
                                `
                                : ''
                        }

                    </section>
                    `,
                    'showEvent'
                )}

                <footer class="eg-closing">

                    <div class="eg-closing-symbol">
                        ✦ · ✦ · ✦
                    </div>

                    <div class="eg-closing-text">
                        With Love and Blessings
                    </div>

                </footer>

            </div>
        </main>
    `;
}

});
