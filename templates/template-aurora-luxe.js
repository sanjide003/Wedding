/*
 * Wedding Studio External Template
 * Template: Aurora Luxe
 * Compatible with wedding_studio.html registerTemplate() API
 */

window.registerTemplate({
    id: 'aurora-luxe',
    name: 'Aurora Luxe',
    thumb: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=700&auto=format&fit=crop',
    freeform: false,
    defaults: {
        colors: {
            primary: '#D8B27C',
            bg: '#0A0A0B',
            text: '#F7F2EA'
        },
        fonts: {
            heading: "'Playfair Display', serif"
        }
    },
    render: function(d, isEditMode) {
        const colors = d.design?.colors || this.defaults.colors;
        const fonts = d.design?.fonts || this.defaults.fonts;
        const set = d.settings || {};
        const couple = d.couple || {};
        const content = d.content || {};
        const event = d.mainEvent || {};
        const safe = (value, fallback = '') => String(value ?? fallback)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
        const photo = (src, fallback) => src || fallback;
        const editWrap = (key, contentHtml, hideKey) => {
            const hidden = hideKey && set[hideKey] === false;
            if (!isEditMode) return hidden ? '' : contentHtml;
            return `<div class="al-editable ${hidden ? 'al-hidden' : ''}" data-edit="${key}">
                <span class="al-edit-badge"><i class="fa-solid fa-pen"></i></span>${contentHtml}
            </div>`;
        };

        const primary = safe(colors.primary, '#D8B27C');
        const bg = safe(colors.bg, '#0A0A0B');
        const text = safe(colors.text, '#F7F2EA');
        const groom = safe(couple.groom, 'Groom Name');
        const bride = safe(couple.bride, 'Bride Name');
        const heading = safe(content.heading, 'Together with their families');
        const message = safe(content.message, 'Invite you to celebrate a beautiful beginning, a promise made for a lifetime.');
        const arabic = safe(content.arabicText, 'وَخَلَقْنَاكُمْ أَزْوَاجًا');
        const translation = safe(content.translation, 'And We created you in pairs');
        const eventTitle = safe(event.title, 'The Nikah Ceremony');
        const date = safe(event.date, '20 September 2026');
        const time = safe(event.time, '11:00 AM');
        const venue = safe(event.venue, 'Grand Wedding Hall');
        const address = safe(event.address, 'Calicut, Kerala');
        const groomPhoto = photo(couple.groomPhoto, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop');
        const bridePhoto = photo(couple.bridePhoto, 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500&auto=format&fit=crop');
        const map = event.mapUrl ? safe(event.mapUrl) : '';

        return `
<style>
.al-root{--al-primary:${primary};--al-bg:${bg};--al-text:${text};--al-heading:${fonts.heading || "'Playfair Display',serif"};position:relative;min-height:100%;overflow:hidden;background:${bg};color:${text};font-family:Poppins,sans-serif;isolation:isolate}
.al-root *{box-sizing:border-box}
.al-noise{position:absolute;inset:0;opacity:.075;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.45'/%3E%3C/svg%3E")}
.al-glow{position:absolute;border-radius:999px;filter:blur(55px);pointer-events:none;opacity:.22;animation:alFloat 9s ease-in-out infinite alternate}
.al-glow.a{width:240px;height:240px;right:-100px;top:90px;background:${primary}}
.al-glow.b{width:190px;height:190px;left:-100px;bottom:170px;background:#7355A4;animation-delay:-3s}
.al-orb{position:absolute;width:330px;height:330px;right:-210px;top:420px;border:1px solid rgba(255,255,255,.12);border-radius:50%;animation:alSpin 28s linear infinite}
.al-orb:before,.al-orb:after{content:"";position:absolute;inset:30px;border:1px solid rgba(255,255,255,.07);border-radius:50%}
.al-orb:after{inset:72px}
.al-shell{position:relative;z-index:2;min-height:800px;padding:26px 22px 34px;display:flex;flex-direction:column}
.al-top{display:flex;align-items:center;justify-content:space-between;animation:alRise .9s cubic-bezier(.2,.8,.2,1) both}
.al-monogram{width:38px;height:38px;border:1px solid rgba(255,255,255,.24);border-radius:50%;display:grid;place-items:center;color:var(--al-primary);font-family:var(--al-heading);font-size:14px}
.al-label{font-size:8px;letter-spacing:.32em;text-transform:uppercase;opacity:.56}
.al-bismillah{margin-top:38px;text-align:center;color:var(--al-primary);font-family:Amiri,serif;font-size:23px;animation:alReveal 1.1s .15s both}
.al-hero{text-align:center;margin-top:24px}
.al-heading{font-size:9px;letter-spacing:.25em;text-transform:uppercase;opacity:.58;margin-bottom:16px;animation:alReveal 1s .2s both}
.al-names{font-family:var(--al-heading);font-size:46px;line-height:.91;font-weight:500;letter-spacing:-.035em;animation:alRise 1s .3s both}
.al-name{display:block}
.al-amp{display:block;font-family:var(--al-heading);font-size:20px;color:var(--al-primary);font-style:italic;margin:8px 0}
.al-rule{width:72px;height:1px;background:var(--al-primary);opacity:.55;margin:20px auto}
.al-message{max-width:315px;margin:0 auto;font-size:10px;line-height:1.9;opacity:.67;animation:alReveal 1s .55s both}
.al-portraits{display:flex;justify-content:center;align-items:center;margin:26px 0 25px;animation:alRise 1.1s .45s both}
.al-photo{width:106px;height:132px;object-fit:cover;border-radius:54px 54px 10px 10px;border:1px solid rgba(255,255,255,.22);padding:4px;background:rgba(255,255,255,.04);box-shadow:0 18px 45px rgba(0,0,0,.35)}
.al-photo:first-child{transform:rotate(-5deg) translateX(8px)}
.al-photo:last-child{transform:rotate(5deg) translateX(-8px)}
.al-photo-mid{width:54px;height:54px;border-radius:50%;display:grid;place-items:center;background:${bg};border:1px solid var(--al-primary);color:var(--al-primary);z-index:3;font-family:var(--al-heading);font-size:20px}
.al-quote{margin:4px auto 25px;padding:17px 10px;border-top:1px solid rgba(255,255,255,.12);border-bottom:1px solid rgba(255,255,255,.12);text-align:center;animation:alReveal 1s .65s both}
.al-arabic{font-family:Amiri,serif;font-size:23px;line-height:1.5;color:var(--al-primary)}
.al-translation{font-size:8px;letter-spacing:.08em;opacity:.5;margin-top:6px}
.al-event{position:relative;margin-top:auto;padding:21px;border:1px solid rgba(255,255,255,.13);border-radius:22px;background:linear-gradient(145deg,rgba(255,255,255,.08),rgba(255,255,255,.025));backdrop-filter:blur(14px);box-shadow:0 22px 55px rgba(0,0,0,.22);animation:alRise 1.1s .75s both}
.al-event:before{content:"";position:absolute;inset:5px;border:1px solid rgba(216,178,124,.13);border-radius:18px;pointer-events:none}
.al-event-title{font-size:8px;letter-spacing:.25em;text-transform:uppercase;color:var(--al-primary);margin-bottom:12px}
.al-date{font-family:var(--al-heading);font-size:22px;line-height:1.1}
.al-time{font-size:9px;opacity:.55;margin-top:4px}
.al-venue{font-size:11px;font-weight:600;margin-top:16px}
.al-address{font-size:8px;opacity:.5;margin-top:3px}
.al-map{display:inline-flex;align-items:center;gap:7px;margin-top:14px;padding:9px 15px;border:1px solid var(--al-primary);border-radius:999px;color:var(--al-primary);font-size:8px;letter-spacing:.15em;text-transform:uppercase;text-decoration:none;transition:.3s ease}
.al-map:hover{background:var(--al-primary);color:${bg};transform:translateY(-2px)}
.al-footer{text-align:center;font-size:7px;letter-spacing:.22em;text-transform:uppercase;opacity:.35;margin-top:20px}
.al-editable{position:relative;cursor:pointer;border-radius:12px;transition:.2s ease}
.al-editable:hover{outline:2px solid #3B82F6;outline-offset:3px;background:rgba(59,130,246,.05)}
.al-edit-badge{position:absolute;right:5px;top:5px;width:25px;height:25px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#3B82F6;color:#fff;font-size:10px;opacity:0;transform:scale(.75);transition:.2s ease;z-index:20;box-shadow:0 5px 15px rgba(0,0,0,.25)}
.al-editable:hover .al-edit-badge{opacity:1;transform:scale(1)}
.al-hidden{opacity:.3;filter:grayscale(1)}
@keyframes alRise{from{opacity:0;transform:translateY(22px) scale(.985)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes alReveal{from{opacity:0;clip-path:inset(0 0 100% 0)}to{opacity:1;clip-path:inset(0 0 0 0)}}
@keyframes alFloat{from{transform:translate3d(0,0,0) scale(1)}to{transform:translate3d(15px,-18px,0) scale(1.08)}}
@keyframes alSpin{to{transform:rotate(360deg)}}
@media(prefers-reduced-motion:reduce){.al-root *,.al-glow,.al-orb{animation:none!important;transition:none!important}}
</style>

<div class="al-root">
    <div class="al-noise"></div><div class="al-glow a"></div><div class="al-glow b"></div><div class="al-orb"></div>
    <div class="al-shell">
        <div class="al-top">
            <div class="al-monogram">W</div>
            <div class="al-label">A beginning, beautifully written</div>
        </div>

        ${editWrap('content', `<div class="al-bismillah">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</div>`, 'showBismillah')}

        <div class="al-hero">
            ${editWrap('content', `<div class="al-heading">${heading}</div>`, 'showHeading')}
            ${editWrap('couple', `<div class="al-names"><span class="al-name">${groom}</span><span class="al-amp">&amp;</span><span class="al-name">${bride}</span></div>`, 'showCouple')}
            ${editWrap('content', `<div><div class="al-rule"></div><p class="al-message">${message.replace(/\n/g,'<br>')}</p></div>`, 'showMessage')}
        </div>

        ${editWrap('couple', `<div class="al-portraits"><img class="al-photo" src="${groomPhoto}" alt="Groom"><div class="al-photo-mid">&amp;</div><img class="al-photo" src="${bridePhoto}" alt="Bride"></div>`, 'showCouple')}

        ${editWrap('quran', `<div class="al-quote"><div class="al-arabic">${arabic}</div><div class="al-translation">${translation}</div></div>`, 'showQuote')}

        ${editWrap('mainEvent', `<div class="al-event"><div class="al-event-title">${eventTitle}</div><div class="al-date">${date}</div><div class="al-time">${time}</div><div class="al-venue">${venue}</div><div class="al-address">${address}</div>${set.showMap !== false ? (map && !isEditMode ? `<a class="al-map" href="${map}" target="_blank" rel="noopener"><i class="fa-solid fa-location-arrow"></i> Directions</a>` : `<span class="al-map"><i class="fa-solid fa-location-arrow"></i> Directions</span>`) : ''}</div>`, 'showEvent')}

        <div class="al-footer">With love, with prayers, with family</div>
    </div>
</div>`;
    }
});