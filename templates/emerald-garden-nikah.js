window.registerTemplate({
    id: 'royal-emerald-nikah',
    name: 'Royal Emerald & Gold Nikah',
    thumb: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80',
    freeform: false,
    scrollable: true,
    defaults: {
        colors: {
            primary: '#D4AF37',     // Royal Metallic Gold
            bg: '#0F2C20',          // Deep Royal Emerald Green
            text: '#FBF8EE'         // Cream Pearl White
        },
        fonts: {
            heading: "'Playfair Display', serif"
        }
    },
    render: function(d, isEditMode) {
        const colors = {
            primary: d?.design?.colors?.primary || this.defaults.colors.primary,
            bg: d?.design?.colors?.bg || this.defaults.colors.bg,
            text: d?.design?.colors?.text || this.defaults.colors.text
        };
        const set = d?.settings || {};

        // Safe HTML escaping helper
        const escape = (val, fallback = '') => String(val || fallback)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');

        // Studio standard edit wrapper
        const edit = (key, contentHtml, visibilityKey) => {
            if (visibilityKey && set[visibilityKey] === false) {
                return isEditMode ? `<div class="template-hidden" data-edit="${key}">${contentHtml}</div>` : '';
            }
            return isEditMode
                ? `<div class="template-editable" data-edit="${key}">
                     <span class="template-edit-pen" title="Edit this section"><i class="fa-solid fa-pen"></i></span>
                     ${contentHtml}
                   </div>`
                : contentHtml;
        };

        const bismillahText = escape(d?.content?.bismillah, 'بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ');
        const headingText = escape(d?.content?.heading, 'Together with their families');
        const groomName = escape(d?.couple?.groom, 'Sanjid');
        const brideName = escape(d?.couple?.bride, 'Fathima');
        const groomPhoto = d?.couple?.groomPhoto;
        const bridePhoto = d?.couple?.bridePhoto;
        const invitationMsg = escape(d?.content?.message, 'Cordially invite you to share in the joy and blessings of their wedding ceremony as they unite in holy matrimony.');
        const arabicQuote = escape(d?.content?.arabicText, 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا');
        const translationQuote = escape(d?.content?.translation, '"And among His signs is that He created for you mates that you may find peace in them."');
        const eventTitle = escape(d?.mainEvent?.title, 'Nikah Ceremony & Reception');
        const eventDate = escape(d?.mainEvent?.date, '2026-10-25');
        const eventTime = escape(d?.mainEvent?.time, '11:00 AM');
        const eventVenue = escape(d?.mainEvent?.venue, 'Grand Heritage Palace');
        const eventAddress = escape(d?.mainEvent?.address, 'Calicut, Kerala');
        const mapUrl = d?.mainEvent?.mapUrl;
        const isValidMapUrl = typeof mapUrl === 'string' && /^https?:\/\//i.test(mapUrl.trim());
        const safeMapUrl = isValidMapUrl ? escape(mapUrl.trim()) : '';

        const styles = `
            <style>
                .rnk-container {
                    background-color: ${colors.bg};
                    color: ${colors.text};
                    font-family: 'Poppins', sans-serif;
                    min-height: 100%;
                    width: 100%;
                    max-width: 480px;
                    margin: 0 auto;
                    position: relative;
                    box-sizing: border-box;
                    padding: 36px 18px 52px;
                    overflow: hidden;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                    background-image: 
                        radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.18) 0%, transparent 60%),
                        radial-gradient(circle at 50% 100%, rgba(212, 175, 55, 0.12) 0%, transparent 50%),
                        linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 100%);
                }

                /* Islamic Arch & Royal Border Frames */
                .rnk-border-outer {
                    position: absolute;
                    inset: 12px;
                    border: 1.5px solid ${colors.primary};
                    border-radius: 28px;
                    pointer-events: none;
                    opacity: 0.75;
                    box-shadow: inset 0 0 15px rgba(212, 175, 55, 0.15);
                }
                .rnk-border-inner {
                    position: absolute;
                    inset: 18px;
                    border: 1px dashed ${colors.primary};
                    border-radius: 22px;
                    pointer-events: none;
                    opacity: 0.4;
                }

                /* Corner Ornaments */
                .rnk-corner {
                    position: absolute;
                    width: 32px;
                    height: 32px;
                    pointer-events: none;
                    opacity: 0.85;
                }
                .rnk-corner-tl { top: 12px; left: 12px; border-top: 3px solid ${colors.primary}; border-left: 3px solid ${colors.primary}; border-top-left-radius: 28px; }
                .rnk-corner-tr { top: 12px; right: 12px; border-top: 3px solid ${colors.primary}; border-right: 3px solid ${colors.primary}; border-top-right-radius: 28px; }
                .rnk-corner-bl { bottom: 12px; left: 12px; border-bottom: 3px solid ${colors.primary}; border-left: 3px solid ${colors.primary}; border-bottom-left-radius: 28px; }
                .rnk-corner-br { bottom: 12px; right: 12px; border-bottom: 3px solid ${colors.primary}; border-right: 3px solid ${colors.primary}; border-bottom-right-radius: 28px; }

                /* Studio Edit Pen Indicator */
                .template-editable {
                    position: relative;
                    cursor: pointer;
                    transition: outline 0.2s ease, background-color 0.2s ease;
                    border-radius: 14px;
                }
                .template-editable:hover {
                    outline: 2px dashed #3B82F6;
                    background-color: rgba(59, 130, 246, 0.08);
                }
                .template-edit-pen {
                    position: absolute;
                    top: -10px;
                    right: -10px;
                    width: 28px;
                    height: 28px;
                    background: linear-gradient(135deg, #2563EB, #1D4ED8);
                    color: #FFFFFF;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    box-shadow: 0 3px 8px rgba(0,0,0,0.35);
                    z-index: 50;
                }
                .template-hidden {
                    opacity: 0.35;
                    filter: grayscale(80%);
                    position: relative;
                    cursor: pointer;
                    margin-bottom: 12px;
                }
                .template-hidden::after {
                    content: "Hidden Layer (Tap to edit)";
                    display: block;
                    font-size: 9px;
                    text-align: center;
                    color: #EF4444;
                    font-weight: 700;
                    margin-top: 4px;
                    letter-spacing: 0.1em;
                }

                /* Luxury Glassmorphism Card */
                .rnk-card {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(212, 175, 55, 0.32);
                    border-radius: 22px;
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
                }

                .rnk-gold-gradient {
                    background: linear-gradient(135deg, #FFEAA7 0%, ${colors.primary} 50%, #C3922E 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .rnk-gold-btn {
                    background: linear-gradient(135deg, #D4AF37 0%, #AA8022 100%);
                    color: #0F2C20;
                    font-weight: 700;
                    box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .rnk-gold-btn:active {
                    transform: scale(0.97);
                }

                /* Keyframe Animations */
                @keyframes rnkRotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes rnkPulseGlow {
                    0%, 100% { box-shadow: 0 0 12px rgba(212, 175, 55, 0.25); }
                    50% { box-shadow: 0 0 25px rgba(212, 175, 55, 0.65); }
                }
                @keyframes rnkFloat {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-6px); }
                }
                @keyframes rnkShimmer {
                    0% { opacity: 0.7; }
                    50% { opacity: 1; }
                    100% { opacity: 0.7; }
                }

                .rnk-spin { animation: rnkRotate 30s linear infinite; transform-origin: center; }
                .rnk-floating { animation: rnkFloat 5s ease-in-out infinite; }
                .rnk-glow { animation: rnkPulseGlow 3.5s infinite; }
                .rnk-shimmer { animation: rnkShimmer 2.5s infinite; }

                @media (prefers-reduced-motion: reduce) {
                    .rnk-spin, .rnk-floating, .rnk-glow, .rnk-shimmer {
                        animation: none !important;
                    }
                }
            </style>
        `;

        const mandalaSvg = `
            <div class="text-center mb-6 relative">
                <svg class="rnk-spin mx-auto w-20 h-20" viewBox="0 0 100 100" fill="none" stroke="${colors.primary}" stroke-width="1.3" aria-hidden="true">
                    <circle cx="50" cy="50" r="44" stroke-dasharray="2 3" opacity="0.6"/>
                    <circle cx="50" cy="50" r="32" opacity="0.8"/>
                    <circle cx="50" cy="50" r="10" fill="${colors.primary}" fill-opacity="0.15"/>
                    <path d="M50 6 C40 28, 28 40, 6 50 C28 60, 40 72, 50 94 C60 72, 72 60, 94 50 C72 40, 60 28, 50 6 Z" stroke-width="1.6"/>
                    <circle cx="50" cy="6" r="2.5" fill="${colors.primary}"/>
                    <circle cx="94" cy="50" r="2.5" fill="${colors.primary}"/>
                    <circle cx="50" cy="94" r="2.5" fill="${colors.primary}"/>
                    <circle cx="6" cy="50" r="2.5" fill="${colors.primary}"/>
                </svg>
            </div>
        `;

        const bismillahSection = edit('bismillah', `
            <div class="text-center mb-5 px-3">
                <p class="font-arabic text-2xl md:text-3xl font-bold rnk-gold-gradient leading-loose tracking-wide">
                    ${bismillahText}
                </p>
                <div class="w-16 h-0.5 mx-auto mt-2 opacity-60" style="background: linear-gradient(90deg, transparent, ${colors.primary}, transparent);"></div>
            </div>
        `, 'showBismillah');

        const headingSection = edit('heading', `
            <div class="text-center mb-6 px-4">
                <span class="inline-block text-[11px] uppercase tracking-[0.3em] font-semibold opacity-90 rnk-shimmer" style="color: ${colors.primary};">
                    ${headingText}
                </span>
            </div>
        `, 'showHeading');

        let photosHtml = '';
        if (groomPhoto || bridePhoto) {
            photosHtml = `
                <div class="flex items-center justify-center gap-4 mb-5">
                    ${groomPhoto ? `
                        <div class="relative w-20 h-20 rounded-full p-1 rnk-glow" style="border: 2px solid ${colors.primary};">
                            <img src="${groomPhoto}" alt="${groomName}" class="w-full h-full object-cover rounded-full" />
                        </div>
                    ` : ''}
                    ${(groomPhoto && bridePhoto) ? `
                        <span class="rnk-gold-gradient text-2xl font-serif italic opacity-80">&amp;</span>
                    ` : ''}
                    ${bridePhoto ? `
                        <div class="relative w-20 h-20 rounded-full p-1 rnk-glow" style="border: 2px solid ${colors.primary};">
                            <img src="${bridePhoto}" alt="${brideName}" class="w-full h-full object-cover rounded-full" />
                        </div>
                    ` : ''}
                </div>
            `;
        }

        const coupleSection = edit('couple', `
            <div class="rnk-card p-6 text-center my-5 rnk-floating relative overflow-hidden">
                <div class="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-yellow-500/5 blur-xl pointer-events-none"></div>
                ${photosHtml}
                <div class="space-y-1">
                    <h1 class="font-serif text-3xl md:text-4xl font-bold tracking-wide rnk-gold-gradient leading-tight">
                        ${groomName}
                    </h1>
                    <div class="py-1">
                        <span class="inline-block font-script text-2xl md:text-3xl opacity-80" style="color: ${colors.primary};">&amp;</span>
                    </div>
                    <h1 class="font-serif text-3xl md:text-4xl font-bold tracking-wide rnk-gold-gradient leading-tight">
                        ${brideName}
                    </h1>
                </div>
                <div class="w-20 h-[1.5px] mx-auto mt-4 opacity-40" style="background: ${colors.primary};"></div>
                <p class="text-[10px] uppercase tracking-[0.25em] mt-3 opacity-80" style="color: ${colors.primary};">
                    The Wedding Celebration
                </p>
            </div>
        `, 'showCouple');

        const messageSection = edit('message', `
            <div class="text-center my-6 px-4">
                <p class="text-xs md:text-sm leading-relaxed opacity-90 font-light italic font-serif" style="color: ${colors.text}; max-width: 380px; margin: 0 auto;">
                    "${invitationMsg}"
                </p>
            </div>
        `, 'showMessage');

        const quranSection = edit('quran', `
            <div class="rnk-card p-5 my-6 text-center" style="border-left: 3px solid ${colors.primary}; border-right: 3px solid ${colors.primary};">
                <p class="font-arabic text-lg md:text-xl leading-loose font-bold rnk-gold-gradient mb-2">
                    ${arabicQuote}
                </p>
                <p class="text-[11px] uppercase tracking-wider opacity-85 leading-normal" style="color: ${colors.text};">
                    ${translationQuote}
                </p>
            </div>
        `, 'showQuote');

        let eventMapHtml = '';
        if (set.showMap !== false && isValidMapUrl && !isEditMode) {
            eventMapHtml = `
                <div class="mt-5 pt-4" style="border-top: 1px solid rgba(212, 175, 55, 0.2);">
                    <a href="${safeMapUrl}" target="_blank" rel="noopener noreferrer" class="rnk-gold-btn inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs uppercase tracking-wider no-underline">
                        <i class="fa-solid fa-location-dot"></i> Get Directions
                    </a>
                </div>
            `;
        } else if (isEditMode) {
            eventMapHtml = `
                <div class="mt-4 pt-3" style="border-top: 1px dashed rgba(212, 175, 55, 0.3);">
                    <span class="inline-flex items-center gap-1 text-[11px] opacity-80" style="color: ${colors.primary};">
                        <i class="fa-solid fa-map-pin"></i> ${isValidMapUrl ? 'Location Linked' : 'Location / Map Button'}
                    </span>
                </div>
            `;
        }

        const mainEventSection = edit('mainEvent', `
            <div class="rnk-card p-6 my-6 text-center">
                <div class="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center rnk-glow" style="border: 1.5px solid ${colors.primary}; color: ${colors.primary}; background: rgba(0,0,0,0.2);">
                    <i class="fa-solid fa-calendar-heart text-base"></i>
                </div>
                
                <h2 class="font-serif text-xl font-bold tracking-wider uppercase rnk-gold-gradient mb-3">
                    ${eventTitle}
                </h2>

                <div class="space-y-1.5 mb-4 text-xs md:text-sm">
                    <p class="font-semibold tracking-wider opacity-95">
                        <i class="fa-regular fa-calendar-days mr-2" style="color: ${colors.primary};"></i> ${eventDate}
                    </p>
                    <p class="opacity-85 font-light">
                        <i class="fa-regular fa-clock mr-2" style="color: ${colors.primary};"></i> ${eventTime}
                    </p>
                </div>

                <div class="py-2.5 px-4 rounded-xl inline-block mb-2" style="background: rgba(0,0,0,0.3); border: 1px solid rgba(212, 175, 55, 0.2);">
                    <p class="font-medium text-xs tracking-wide rnk-gold-gradient">${eventVenue}</p>
                    <p class="text-[11px] opacity-75 tracking-wider mt-0.5">${eventAddress}</p>
                </div>

                <!-- Live Countdown Timer Display -->
                <div class="grid grid-cols-4 gap-2 pt-4 mt-3" style="border-top: 1px solid rgba(212, 175, 55, 0.2);" data-countdown-date="${eventDate} ${eventTime}">
                    <div class="p-2 rounded-xl" style="background: rgba(0,0,0,0.25); border: 1px solid rgba(212, 175, 55, 0.2);">
                        <span class="cd-days block font-bold text-base rnk-gold-gradient">00</span>
                        <span class="text-[9px] uppercase tracking-wider opacity-70">Days</span>
                    </div>
                    <div class="p-2 rounded-xl" style="background: rgba(0,0,0,0.25); border: 1px solid rgba(212, 175, 55, 0.2);">
                        <span class="cd-hours block font-bold text-base rnk-gold-gradient">00</span>
                        <span class="text-[9px] uppercase tracking-wider opacity-70">Hours</span>
                    </div>
                    <div class="p-2 rounded-xl" style="background: rgba(0,0,0,0.25); border: 1px solid rgba(212, 175, 55, 0.2);">
                        <span class="cd-mins block font-bold text-base rnk-gold-gradient">00</span>
                        <span class="text-[9px] uppercase tracking-wider opacity-70">Mins</span>
                    </div>
                    <div class="p-2 rounded-xl" style="background: rgba(0,0,0,0.25); border: 1px solid rgba(212, 175, 55, 0.2);">
                        <span class="cd-secs block font-bold text-base rnk-gold-gradient">00</span>
                        <span class="text-[9px] uppercase tracking-wider opacity-70">Secs</span>
                    </div>
                </div>

                ${eventMapHtml}
            </div>
        `, 'showEvent');

        let blessingActionHtml = '';
        if (!isEditMode) {
            blessingActionHtml = `
                <div class="text-center my-6">
                    <button onclick="if(typeof window.triggerConfettiShower === 'function'){ window.triggerConfettiShower(); } else { alert('Barakallahu lakuma! Blessings showered.'); }" class="rnk-gold-btn px-6 py-2.5 rounded-full text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 mx-auto">
                        <i class="fa-solid fa-sparkles"></i> Shower Blessings
                    </button>
                </div>
            `;
        }

        const footerSection = `
            <div class="text-center mt-10 pt-4 pb-2 relative opacity-70">
                <div class="w-12 h-0.5 mx-auto mb-3 opacity-40" style="background: ${colors.primary};"></div>
                <p class="font-serif italic text-sm rnk-gold-gradient">${groomName} &amp; ${brideName}</p>
                <p class="text-[9px] tracking-[0.25em] uppercase mt-1 opacity-70">Royal Nikah Celebration</p>
            </div>
        `;

        return `
            ${styles}
            <div class="rnk-container">
                <div class="rnk-border-outer"></div>
                <div class="rnk-border-inner"></div>
                <div class="rnk-corner rnk-corner-tl"></div>
                <div class="rnk-corner rnk-corner-tr"></div>
                <div class="rnk-corner rnk-corner-bl"></div>
                <div class="rnk-corner rnk-corner-br"></div>

                <div class="relative z-10">
                    ${mandalaSvg}
                    ${bismillahSection}
                    ${headingSection}
                    ${coupleSection}
                    ${messageSection}
                    ${quranSection}
                    ${mainEventSection}
                    ${blessingActionHtml}
                    ${footerSection}
                </div>
            </div>
        `;
    }
});