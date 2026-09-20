window.registerTemplate({
    id: 'emerald-garden-nikah',
    name: 'Emerald Garden Nikah',
    thumb: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=700&auto=format&fit=crop',
    freeform: false,
    scrollable: true,

    defaults: {
        colors: {
            primary: '#D7B76A',
            bg: '#102F25',
            text: '#FFF8E8'
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
        const colors = design.colors || {};
        const set = d.settings || {};

        const primary = colors.primary || '#D7B76A';
        const bg = colors.bg || '#102F25';
        const text = colors.text || '#FFF8E8';

        const escape = (value, fallback = '') =>
            String(value || fallback)
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
                ? `
                    <div class="template-editable" data-edit="${key}">
                        <span class="template-edit-pen">
                            <i class="fa-solid fa-pen"></i>
                        </span>
                        ${html}
                    </div>
                `
                : html;
        };

        const getPhoto = (value, fallback) => {
            const src = String(value || '').trim();
            return src || fallback;
        };

        const groom = escape(couple.groom, 'Groom Name');
        const bride = escape(couple.bride, 'Bride Name');

        const groomPhoto = escape(
            getPhoto(
                couple.groomPhoto,
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=700&auto=format&fit=crop'
            )
        );

        const bridePhoto = escape(
            getPhoto(
                couple.bridePhoto,
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=700&auto=format&fit=crop'
            )
        );

        const eventDateRaw = String(mainEvent.date || '').trim();
        const eventTimeRaw = String(mainEvent.time || '').trim();

        let formattedDate = escape(eventDateRaw, 'Wedding Date');

        if (/^\d{4}-\d{2}-\d{2}$/.test(eventDateRaw)) {
            const parsedDate = new Date(eventDateRaw + 'T00:00:00');

            if (!Number.isNaN(parsedDate.getTime())) {
                formattedDate = escape(
                    parsedDate.toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })
                );
            }
        }

        const mapUrl = String(mainEvent.mapUrl || '').trim();
        const validMapUrl = /^https?:\/\//i.test(mapUrl);

        const mapButton = validMapUrl
            ? `
                <a
                    class="eg-map-button"
                    href="${escape(mapUrl)}"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open wedding location"
                >
                    <span class="eg-map-icon">
                        <i class="fa-solid fa-location-arrow"></i>
                    </span>
                    <span>
                        <small>LOCATION</small>
                        <strong>View on Map</strong>
                    </span>
                    <i class="fa-solid fa-arrow-up-right-from-square eg-map-arrow"></i>
                </a>
            `
            : '';

        const reminderAllowed =
            /^\d{4}-\d{2}-\d{2}$/.test(eventDateRaw) &&
            /^\d{2}:\d{2}$/.test(eventTimeRaw);

        const reminderTitle = encodeURIComponent(
            `${mainEvent.title || 'Wedding Ceremony'} - ${couple.groom || 'Groom'} & ${couple.bride || 'Bride'}`
        );

        const reminderLocation = encodeURIComponent(
            `${mainEvent.venue || 'Wedding Venue'}${mainEvent.address ? ', ' + mainEvent.address : ''}`
        );

        const reminderButton = reminderAllowed
            ? (
                isEditMode
                    ? `
                        <span class="eg-reminder-button eg-reminder-preview">
                            <i class="fa-regular fa-bell"></i>
                            Add Reminder
                        </span>
                    `
                    : `
                        <button
                            type="button"
                            class="eg-reminder-button"
                            onclick="addWeddingReminder(this)"
                            data-title="${escape(reminderTitle)}"
                            data-location="${escape(reminderLocation)}"
                            data-date="${escape(eventDateRaw)}"
                            data-time="${escape(eventTimeRaw)}"
                        >
                            <i class="fa-regular fa-bell"></i>
                            Add Reminder
                        </button>
                    `
            )
            : '';

        return `
<style>
    .eg-template,
    .eg-template * {
        box-sizing: border-box;
    }

    .eg-template {
        --eg-primary: ${escape(primary)};
        --eg-bg: ${escape(bg)};
        --eg-text: ${escape(text)};
        --eg-soft: #f8f0dd;
        --eg-gold-light: #f2d995;

        position: relative;
        width: 100%;
        max-width: 520px;
        min-height: 100vh;
        margin: 0 auto;
        overflow: hidden;
        color: var(--eg-text);
        background:
            radial-gradient(circle at 50% 8%, rgba(215,183,106,.18), transparent 30%),
            radial-gradient(circle at 0% 48%, rgba(215,183,106,.10), transparent 28%),
            radial-gradient(circle at 100% 78%, rgba(215,183,106,.09), transparent 28%),
            linear-gradient(180deg, #153A2D 0%, var(--eg-bg) 42%, #0A211A 100%);
        font-family: "Inter", system-ui, sans-serif;
        isolation: isolate;
    }

    .eg-template::before {
        content: "";
        position: absolute;
        inset: 12px;
        border: 1px solid rgba(215,183,106,.34);
        border-radius: 24px;
        pointer-events: none;
        z-index: 20;
    }

    .eg-template::after {
        content: "";
        position: absolute;
        inset: 22px;
        border: 1px solid rgba(255,248,232,.08);
        border-radius: 18px;
        pointer-events: none;
        z-index: 20;
    }

    .eg-content {
        position: relative;
        z-index: 5;
        padding: 58px 28px 55px;
    }

    .eg-glow {
        position: absolute;
        width: 260px;
        height: 260px;
        border-radius: 50%;
        background: rgba(215,183,106,.10);
        filter: blur(60px);
        pointer-events: none;
        animation: egGlow 7s ease-in-out infinite alternate;
    }

    .eg-glow.one {
        top: -90px;
        left: -100px;
    }

    .eg-glow.two {
        top: 420px;
        right: -130px;
        animation-delay: 2s;
    }

    .eg-floating {
        position: absolute;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--eg-gold-light);
        box-shadow:
            0 0 12px rgba(242,217,149,.9),
            0 0 25px rgba(215,183,106,.5);
        opacity: .55;
        pointer-events: none;
        animation: egFloat 6s ease-in-out infinite;
    }

    .eg-floating.f1 {
        top: 19%;
        left: 12%;
    }

    .eg-floating.f2 {
        top: 33%;
        right: 14%;
        animation-delay: 1.5s;
    }

    .eg-floating.f3 {
        top: 62%;
        left: 10%;
        animation-delay: 3s;
    }

    .eg-floating.f4 {
        top: 76%;
        right: 12%;
        animation-delay: 4.2s;
    }

    .eg-hero {
        position: relative;
        text-align: center;
        padding: 8px 4px 46px;
        animation: egReveal 1s cubic-bezier(.2,.8,.2,1) both;
    }

    .eg-bismillah {
        margin: 0 auto 24px;
        color: var(--eg-gold-light);
        font-family: "Amiri", serif;
        font-size: clamp(25px, 7vw, 36px);
        line-height: 1.7;
        text-shadow: 0 0 22px rgba(215,183,106,.25);
    }

    .eg-kicker {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 15px;
        color: rgba(255,248,232,.72);
        font-size: 9px;
        font-weight: 700;
        letter-spacing: .28em;
    }

    .eg-kicker::before,
    .eg-kicker::after {
        content: "";
        width: 28px;
        height: 1px;
        background: linear-gradient(
            90deg,
            transparent,
            var(--eg-primary)
        );
    }

    .eg-kicker::after {
        transform: rotate(180deg);
    }

    .eg-heading {
        margin: 0;
        color: var(--eg-soft);
        font-family: "Playfair Display", serif;
        font-size: clamp(34px, 10vw, 52px);
        font-weight: 500;
        line-height: 1.04;
        letter-spacing: -.035em;
    }

    .eg-heading span {
        display: block;
        color: var(--eg-primary);
        font-style: italic;
        font-size: .68em;
        margin-top: 9px;
    }

    .eg-ornament {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 9px;
        margin: 24px auto 0;
    }

    .eg-ornament span {
        width: 5px;
        height: 5px;
        border: 1px solid var(--eg-primary);
        transform: rotate(45deg);
    }

    .eg-ornament::before,
    .eg-ornament::after {
        content: "";
        width: 46px;
        height: 1px;
        background: linear-gradient(
            90deg,
            transparent,
            var(--eg-primary)
        );
    }

    .eg-ornament::after {
        transform: rotate(180deg);
    }

    .eg-couple {
        position: relative;
        margin: 8px 0 42px;
        padding: 24px 0;
        animation: egReveal 1s .15s cubic-bezier(.2,.8,.2,1) both;
    }

    .eg-couple::before {
        content: "";
        position: absolute;
        inset: 0 18px;
        border-top: 1px solid rgba(215,183,106,.24);
        border-bottom: 1px solid rgba(215,183,106,.24);
    }

    .eg-portraits {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }

    .eg-person {
        position: relative;
        width: calc(50% - 22px);
        max-width: 170px;
        text-align: center;
    }

    .eg-photo-wrap {
        position: relative;
        width: 100%;
        aspect-ratio: .82;
        padding: 6px;
        border: 1px solid rgba(215,183,106,.8);
        border-radius: 80px 80px 12px 12px;
        background: linear-gradient(
            145deg,
            rgba(215,183,106,.24),
            rgba(255,248,232,.03)
        );
        box-shadow:
            0 18px 45px rgba(0,0,0,.25),
            inset 0 0 25px rgba(215,183,106,.06);
        transform: translateY(0);
        transition: transform .5s ease, box-shadow .5s ease;
    }

    .eg-person:hover .eg-photo-wrap {
        transform: translateY(-7px);
        box-shadow:
            0 25px 55px rgba(0,0,0,.34),
            0 0 30px rgba(215,183,106,.12);
    }

    .eg-photo {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        border-radius: 72px 72px 8px 8px;
        filter: saturate(.92) contrast(1.02);
    }

    .eg-photo-wrap::after {
        content: "";
        position: absolute;
        inset: 5px;
        border-radius: 72px 72px 8px 8px;
        border: 1px solid rgba(255,248,232,.15);
        pointer-events: none;
    }

    .eg-name {
        margin: 14px 0 0;
        color: var(--eg-soft);
        font-family: "Playfair Display", serif;
        font-size: 19px;
        line-height: 1.2;
    }

    .eg-side-label {
        margin-top: 5px;
        color: rgba(255,248,232,.45);
        font-size: 8px;
        letter-spacing: .25em;
        text-transform: uppercase;
    }

    .eg-amp {
        flex: 0 0 36px;
        width: 36px;
        height: 36px;
        display: grid;
        place-items: center;
        margin-top: -30px;
        color: var(--eg-primary);
        border: 1px solid rgba(215,183,106,.65);
        border-radius: 50%;
        background: var(--eg-bg);
        box-shadow: 0 0 0 5px var(--eg-bg);
        font-family: "Playfair Display", serif;
        font-size: 18px;
        font-style: italic;
        z-index: 3;
        animation: egPulse 3s ease-in-out infinite;
    }

    .eg-message {
        position: relative;
        margin: 0 4px 42px;
        padding: 31px 23px;
        text-align: center;
        border: 1px solid rgba(215,183,106,.24);
        border-radius: 22px;
        background:
            linear-gradient(
                145deg,
                rgba(255,248,232,.055),
                rgba(255,248,232,.018)
            );
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        animation: egReveal 1s .3s cubic-bezier(.2,.8,.2,1) both;
    }

    .eg-message::before,
    .eg-message::after {
        content: "✦";
        position: absolute;
        color: var(--eg-primary);
        font-size: 12px;
    }

    .eg-message::before {
        top: 12px;
        left: 14px;
    }

    .eg-message::after {
        right: 14px;
        bottom: 12px;
    }

    .eg-message p {
        margin: 0;
        color: rgba(255,248,232,.78);
        font-family: "Playfair Display", serif;
        font-size: 16px;
        line-height: 1.8;
    }

    .eg-quote {
        position: relative;
        margin: 0 0 43px;
        padding: 30px 20px;
        text-align: center;
        animation: egReveal 1s .45s cubic-bezier(.2,.8,.2,1) both;
    }

    .eg-quote-mark {
        display: block;
        margin-bottom: -7px;
        color: rgba(215,183,106,.42);
        font-family: Georgia, serif;
        font-size: 64px;
        line-height: .7;
    }

    .eg-arabic {
        margin: 0;
        color: var(--eg-soft);
        font-family: "Amiri", serif;
        font-size: clamp(23px, 6.5vw, 31px);
        line-height: 1.9;
        text-shadow: 0 0 20px rgba(215,183,106,.08);
    }

    .eg-translation {
        margin: 14px auto 0;
        max-width: 390px;
        color: rgba(255,248,232,.56);
        font-size: 12px;
        line-height: 1.7;
    }

    .eg-event {
        position: relative;
        margin: 0 0 24px;
        padding: 32px 21px 27px;
        border-radius: 28px;
        background:
            linear-gradient(
                145deg,
                rgba(255,248,232,.10),
                rgba(255,248,232,.035)
            );
        border: 1px solid rgba(215,183,106,.45);
        box-shadow:
            0 25px 70px rgba(0,0,0,.20),
            inset 0 1px 0 rgba(255,255,255,.08);
        overflow: hidden;
        animation: egReveal 1s .6s cubic-bezier(.2,.8,.2,1) both;
    }

    .eg-event::before {
        content: "";
        position: absolute;
        width: 160px;
        height: 160px;
        top: -100px;
        right: -80px;
        border-radius: 50%;
        background: rgba(215,183,106,.12);
        filter: blur(8px);
    }

    .eg-event-label {
        position: relative;
        margin-bottom: 9px;
        color: var(--eg-primary);
        font-size: 9px;
        font-weight: 800;
        letter-spacing: .32em;
        text-transform: uppercase;
    }

    .eg-event-title {
        position: relative;
        margin: 0 0 22px;
        color: var(--eg-soft);
        font-family: "Playfair Display", serif;
        font-size: 27px;
        font-weight: 500;
        line-height: 1.2;
    }

    .eg-event-grid {
        position: relative;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1px;
        overflow: hidden;
        border: 1px solid rgba(215,183,106,.17);
        border-radius: 17px;
        background: rgba(215,183,106,.12);
    }

    .eg-event-item {
        min-width: 0;
        padding: 17px 12px;
        text-align: center;
        background: rgba(10,33,26,.58);
    }

    .eg-event-item i {
        display: block;
        margin-bottom: 9px;
        color: var(--eg-primary);
        font-size: 15px;
    }

    .eg-event-item small {
        display: block;
        margin-bottom: 5px;
        color: rgba(255,248,232,.4);
        font-size: 7px;
        letter-spacing: .18em;
        text-transform: uppercase;
    }

    .eg-event-item strong {
        display: block;
        color: rgba(255,248,232,.88);
        font-size: 11px;
        font-weight: 600;
        line-height: 1.45;
        word-break: break-word;
    }

    .eg-address {
        position: relative;
        margin: 19px 5px 0;
        color: rgba(255,248,232,.55);
        font-size: 11px;
        line-height: 1.65;
        text-align: center;
    }

    .eg-actions {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 21px;
    }

    .eg-map-button,
    .eg-reminder-button {
        width: 100%;
        min-height: 54px;
        border-radius: 15px;
        text-decoration: none;
        cursor: pointer;
        transition:
            transform .3s ease,
            box-shadow .3s ease,
            background .3s ease;
    }

    .eg-map-button {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 9px 12px;
        color: var(--eg-text);
        border: 1px solid rgba(215,183,106,.28);
        background: rgba(255,248,232,.045);
    }

    .eg-map-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 30px rgba(0,0,0,.18);
        background: rgba(255,248,232,.08);
    }

    .eg-map-icon {
        width: 36px;
        height: 36px;
        flex: 0 0 36px;
        display: grid;
        place-items: center;
        border-radius: 11px;
        color: var(--eg-bg);
        background: var(--eg-primary);
    }

    .eg-map-button small {
        display: block;
        margin-bottom: 2px;
        color: rgba(255,248,232,.42);
        font-size: 7px;
        letter-spacing: .18em;
    }

    .eg-map-button strong {
        color: var(--eg-soft);
        font-size: 12px;
    }

    .eg-map-arrow {
        margin-left: auto;
        color: rgba(255,248,232,.42);
        font-size: 11px;
    }

    .eg-reminder-button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 9px;
        padding: 14px 18px;
        color: var(--eg-bg);
        border: 0;
        background: linear-gradient(
            135deg,
            var(--eg-gold-light),
            var(--eg-primary)
        );
        box-shadow:
            0 10px 28px rgba(215,183,106,.16),
            inset 0 1px 0 rgba(255,255,255,.4);
        font-size: 11px;
        font-weight: 800;
        letter-spacing: .08em;
    }

    .eg-reminder-button:hover {
        transform: translateY(-2px);
        box-shadow:
            0 15px 35px rgba(215,183,106,.23),
            inset 0 1px 0 rgba(255,255,255,.5);
    }

    .eg-reminder-button i {
        font-size: 14px;
    }

    .eg-closing {
        padding: 40px 10px 8px;
        text-align: center;
        animation: egReveal 1s .75s cubic-bezier(.2,.8,.2,1) both;
    }

    .eg-closing-line {
        width: 80px;
        height: 1px;
        margin: 0 auto 17px;
        background: linear-gradient(
            90deg,
            transparent,
            var(--eg-primary),
            transparent
        );
    }

    .eg-closing p {
        margin: 0;
        color: rgba(255,248,232,.45);
        font-family: "Playfair Display", serif;
        font-size: 13px;
        font-style: italic;
        line-height: 1.7;
    }

    .eg-flower {
        position: absolute;
        width: 105px;
        height: 105px;
        pointer-events: none;
        opacity: .38;
        z-index: 1;
        animation: egSway 8s ease-in-out infinite;
    }

    .eg-flower::before,
    .eg-flower::after {
        content: "";
        position: absolute;
        border: 1px solid rgba(215,183,106,.55);
        border-radius: 100% 0 100% 0;
        transform-origin: bottom right;
    }

    .eg-flower::before {
        width: 70px;
        height: 38px;
        transform: rotate(-28deg);
        left: 8px;
        top: 25px;
    }

    .eg-flower::after {
        width: 60px;
        height: 34px;
        transform: rotate(35deg);
        right: 5px;
        top: 12px;
    }

    .eg-flower.one {
        top: 20px;
        left: -32px;
    }

    .eg-flower.two {
        top: 300px;
        right: -40px;
        transform: rotate(180deg);
        animation-delay: 2s;
    }

    .eg-flower.three {
        top: 760px;
        left: -42px;
        transform: rotate(35deg);
        animation-delay: 4s;
    }

    .template-editable {
        position: relative;
    }

    .template-edit-pen {
        position: absolute;
        top: 8px;
        right: 8px;
        z-index: 50;
        width: 30px;
        height: 30px;
        display: grid;
        place-items: center;
        border-radius: 50%;
        color: #fff;
        background: #1677ff;
        box-shadow: 0 6px 18px rgba(22,119,255,.35);
        font-size: 12px;
        cursor: pointer;
    }

    .template-hidden {
        position: relative;
        min-height: 24px;
    }

    @keyframes egReveal {
        from {
            opacity: 0;
            transform: translateY(25px);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes egGlow {
        from {
            transform: scale(.9) translate3d(0,0,0);
            opacity: .55;
        }

        to {
            transform: scale(1.12) translate3d(18px,15px,0);
            opacity: .9;
        }
    }

    @keyframes egFloat {
        0%, 100% {
            transform: translate3d(0,0,0) scale(1);
        }

        50% {
            transform: translate3d(8px,-24px,0) scale(1.3);
        }
    }

    @keyframes egPulse {
        0%, 100% {
            box-shadow:
                0 0 0 5px var(--eg-bg),
                0 0 0 rgba(215,183,106,0);
        }

        50% {
            box-shadow:
                0 0 0 5px var(--eg-bg),
                0 0 25px rgba(215,183,106,.25);
        }
    }

    @keyframes egSway {
        0%, 100% {
            transform: rotate(-3deg) translateY(0);
        }

        50% {
            transform: rotate(4deg) translateY(-7px);
        }
    }

    @media (max-width: 370px) {
        .eg-content {
            padding-left: 22px;
            padding-right: 22px;
        }

        .eg-heading {
            font-size: 32px;
        }

        .eg-name {
            font-size: 17px;
        }

        .eg-event {
            padding-left: 17px;
            padding-right: 17px;
        }
    }

    @media (min-width: 480px) {
        .eg-content {
            padding-left: 38px;
            padding-right: 38px;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .eg-template *,
        .eg-template *::before,
        .eg-template *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
            scroll-behavior: auto !important;
        }
    }
</style>

<div class="eg-template">

    <div class="eg-glow one"></div>
    <div class="eg-glow two"></div>

    <span class="eg-floating f1"></span>
    <span class="eg-floating f2"></span>
    <span class="eg-floating f3"></span>
    <span class="eg-floating f4"></span>

    <div class="eg-flower one"></div>
    <div class="eg-flower two"></div>
    <div class="eg-flower three"></div>

    <main class="eg-content">

        ${edit(
            'bismillah',
            `
            <section class="eg-hero">
                <div class="eg-bismillah">
                    ${escape(
                        content.bismillah,
                        'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ'
                    )}
                </div>

                <div class="eg-kicker">
                    WITH LOVE & GRATITUDE
                </div>
            </section>
            `,
            'showBismillah'
        )}

        ${edit(
            'heading',
            `
            <section class="eg-hero" style="padding-top:0;">
                <h1 class="eg-heading">
                    ${escape(content.heading, 'Together With Love')}
                    <span>we begin forever</span>
                </h1>

                <div class="eg-ornament">
                    <span></span>
                </div>
            </section>
            `,
            'showHeading'
        )}

        ${edit(
            'couple',
            `
            <section class="eg-couple">

                <div class="eg-portraits">

                    <div class="eg-person">
                        <div class="eg-photo-wrap">
                            <img
                                class="eg-photo"
                                src="${groomPhoto}"
                                alt="${groom}"
                                loading="lazy"
                            >
                        </div>

                        <h2 class="eg-name">${groom}</h2>
                        <div class="eg-side-label">GROOM</div>
                    </div>

                    <div class="eg-amp">&amp;</div>

                    <div class="eg-person">
                        <div class="eg-photo-wrap">
                            <img
                                class="eg-photo"
                                src="${bridePhoto}"
                                alt="${bride}"
                                loading="lazy"
                            >
                        </div>

                        <h2 class="eg-name">${bride}</h2>
                        <div class="eg-side-label">BRIDE</div>
                    </div>

                </div>

            </section>
            `,
            'showCouple'
        )}

        ${edit(
            'message',
            `
            <section class="eg-message">
                <p>
                    ${escape(
                        content.message,
                        'With the blessings of Allah and the love of our families, we invite you to celebrate this beautiful beginning with us.'
                    )}
                </p>
            </section>
            `,
            'showMessage'
        )}

        ${edit(
            'quran',
            `
            <section class="eg-quote">

                <span class="eg-quote-mark">“</span>

                <p class="eg-arabic">
                    ${escape(
                        content.arabicText,
                        'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا'
                    )}
                </p>

                <p class="eg-translation">
                    ${escape(
                        content.translation,
                        'And among His signs is that He created for you spouses from among yourselves.'
                    )}
                </p>

            </section>
            `,
            'showQuote'
        )}

        ${edit(
            'mainEvent',
            `
            <section class="eg-event">

                <div class="eg-event-label">
                    SAVE THE DATE
                </div>

                <h2 class="eg-event-title">
                    ${escape(mainEvent.title, 'Wedding Ceremony')}
                </h2>

                <div class="eg-event-grid">

                    <div class="eg-event-item">
                        <i class="fa-regular fa-calendar"></i>
                        <small>DATE</small>
                        <strong>${formattedDate}</strong>
                    </div>

                    <div class="eg-event-item">
                        <i class="fa-regular fa-clock"></i>
                        <small>TIME</small>
                        <strong>
                            ${escape(mainEvent.time, 'Wedding Time')}
                        </strong>
                    </div>

                    <div class="eg-event-item">
                        <i class="fa-solid fa-location-dot"></i>
                        <small>VENUE</small>
                        <strong>
                            ${escape(mainEvent.venue, 'Wedding Venue')}
                        </strong>
                    </div>

                    <div class="eg-event-item">
                        <i class="fa-solid fa-heart"></i>
                        <small>CELEBRATION</small>
                        <strong>
                            With Family &amp; Friends
                        </strong>
                    </div>

                </div>

                <p class="eg-address">
                    ${escape(mainEvent.address, 'Wedding Address')}
                </p>

                <div class="eg-actions">
                    ${reminderButton}
                </div>

            </section>
            `,
            'showEvent'
        )}

        ${edit(
            'mainEvent',
            `
            ${
                validMapUrl
                    ? `
                    <section style="margin-bottom:24px;">
                        ${mapButton}
                    </section>
                    `
                    : ''
            }
            `,
            'showMap'
        )}

        <footer class="eg-closing">
            <div class="eg-closing-line"></div>

            <p>
                May this beautiful journey be filled with
                love, mercy, peace and endless blessings.
            </p>
        </footer>

    </main>
</div>
`;
    }
});