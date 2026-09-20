window.addWeddingReminder = async function(button) {
    const decode = (value) => decodeURIComponent(value || '');
    const title = decode(button.dataset.title) || 'Wedding Invitation';
    const location = decode(button.dataset.location);
    const date = button.dataset.date;
    const time = button.dataset.time || '09:00';
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) return;
    const start = `${date.replaceAll('-', '')}T${time.replace(':', '')}00`;
    const [hour, minute] = time.split(':').map(Number);
    const endDate = new Date(`${date}T${time}:00`);
    endDate.setHours(hour + 2, minute);
    const end = `${endDate.getFullYear()}${String(endDate.getMonth() + 1).padStart(2, '0')}${String(endDate.getDate()).padStart(2, '0')}T${String(endDate.getHours()).padStart(2, '0')}${String(endDate.getMinutes()).padStart(2, '0')}00`;
    const escapeIcs = (value) => value.replace(/([,;\\])/g, '\\$1').replace(/\n/g, '\\n');
    const ics = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Wedding Studio//Reminder//EN\r\nBEGIN:VEVENT\r\nUID:${Date.now()}@wedding-studio\r\nDTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}\r\nDTSTART:${start}\r\nDTEND:${end}\r\nSUMMARY:${escapeIcs(title)}\r\nLOCATION:${escapeIcs(location)}\r\nBEGIN:VALARM\r\nTRIGGER:-PT1H\r\nACTION:DISPLAY\r\nDESCRIPTION:Wedding reminder\r\nEND:VALARM\r\nEND:VEVENT\r\nEND:VCALENDAR`;
    const file = new File([ics], 'wedding-reminder.ics', { type: 'text/calendar' });
    try {
        if (navigator.canShare?.({ files: [file] })) {
            await navigator.share({ title: 'Add wedding reminder', files: [file] });
            return;
        }
    } catch (error) {
        if (error.name === 'AbortError') return;
    }
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
};

window.registerTemplate({
    id: 'scrolling-blue-floral',
    name: 'Blue Floral Story',
    thumb: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=700&auto=format&fit=crop',
    freeform: false,
    scrollable: true,
    defaults: { colors: { primary: '#ffffff', bg: '#30497f', text: '#ffffff' }, fonts: { heading: "'Playfair Display', serif" } },
    render: function(d, isEditMode) {
        const colors = { ...this.defaults.colors, ...(d.design?.colors || {}) };
        const content = d.content || {}, couple = d.couple || {}, event = d.mainEvent || {}, set = d.settings || {};
        const escape = (value, fallback = '') => String(value || fallback).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
        const edit = (key, html, visibilityKey) => {
            if (visibilityKey && set[visibilityKey] === false) return isEditMode ? `<div class="bs-hidden" data-edit="${key}">${html}</div>` : '';
            return isEditMode ? `<div class="bs-editable" data-edit="${key}"><span class="bs-pen"><i class="fa-solid fa-pen"></i></span>${html}</div>` : html;
        };
        const groom = escape(couple.groom, 'Groom Name'), bride = escape(couple.bride, 'Bride Name');
        const dateParts = /^\d{4}-\d{2}-\d{2}$/.test(event.date || '') ? event.date.split('-').map(Number) : null;
        const selectedDate = dateParts ? new Date(dateParts[0], dateParts[1] - 1, dateParts[2]) : null;
        const date = selectedDate ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(selectedDate) : 'Your Wedding Date';
        const monthLabel = selectedDate ? new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(selectedDate) : 'Select a date';
        const time = escape(event.time, 'Time');
        const title = escape(event.title, 'Nikah Ceremony'), venue = escape(event.venue, 'Venue Name'), address = escape(event.address, 'City, Area');
        const heading = escape(content.heading, 'Save the Date');
        const message = escape(content.message, 'With immense pleasure, we invite you to witness and celebrate our sacred union.');
        const arabic = escape(content.arabicText, 'بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ');
        const translation = escape(content.translation, 'May Allah bless you, shower His blessings upon you, and bring you together in goodness.');
        const mapUrl = event.mapUrl && /^https?:\/\//i.test(event.mapUrl) ? escape(event.mapUrl) : '';
        const location = mapUrl ? `<a class="bs-pill" href="${mapUrl}" target="_blank" rel="noopener"><i class="fa-solid fa-location-dot"></i> Location</a>` : `<span class="bs-pill"><i class="fa-solid fa-location-dot"></i> Location</span>`;
        const flower = (className) => `<div class="bs-flower ${className}" aria-hidden="true"><span style="--r:0deg"></span><span style="--r:45deg"></span><span style="--r:90deg"></span><span style="--r:135deg"></span><span style="--r:180deg"></span><span style="--r:225deg"></span><span style="--r:270deg"></span><span style="--r:315deg"></span><i></i></div>`;
        const reminder = isEditMode ? '<span class="bs-reminder-action"><i class="fa-regular fa-bell"></i> Reminder</span>' : `<button type="button" class="bs-reminder-action" onclick="addWeddingReminder(this)" data-title="${escape(encodeURIComponent(`${title} — ${groom} & ${bride}`))}" data-location="${escape(encodeURIComponent(`${venue}, ${address}`))}" data-date="${event.date || ''}" data-time="${escape(time)}"><i class="fa-regular fa-bell"></i> Add Reminder</button>`;
        const calendar = (() => {
            if (!selectedDate) return '<div class="bs-calendar-grid bs-calendar-empty">Choose the wedding date in Event Details</div>';
            const year = selectedDate.getFullYear(), month = selectedDate.getMonth(), selectedDay = selectedDate.getDate();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
            const cells = Array.from({ length: firstDay }, () => '<span></span>');
            for (let day = 1; day <= daysInMonth; day++) cells.push(`<span class="${day === selectedDay ? 'bs-selected-day' : ''}">${day}${day === selectedDay ? '<b>♥</b>' : ''}</span>`);
            return `<div class="bs-calendar-week">${['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(day => `<span>${day}</span>`).join('')}</div><div class="bs-calendar-grid">${cells.join('')}</div>`;
        })();

        return `<style>
            .bs-root{--blue:${colors.bg};--ink:${colors.text};--accent:#9fb4ef;min-height:2250px;position:relative;overflow:hidden;padding:55px 31px 70px;color:var(--ink);text-align:center;background-color:var(--blue);background-image:linear-gradient(30deg,rgba(255,255,255,.025) 12%,transparent 12.5%,transparent 87%,rgba(255,255,255,.025) 87.5%),linear-gradient(150deg,rgba(255,255,255,.025) 12%,transparent 12.5%,transparent 87%,rgba(255,255,255,.025) 87.5%);background-size:42px 74px;font-family:Poppins,sans-serif}
            .bs-flower{position:absolute;z-index:2;width:118px;height:118px;filter:drop-shadow(0 5px 7px rgba(0,0,0,.22));animation:bsSway 4.8s ease-in-out infinite;transform-origin:50% 100%}.bs-flower.top{right:-35px;top:32px}.bs-flower.left{left:-45px;top:680px;animation-delay:-1.6s}.bs-flower.right{right:-50px;top:1130px;animation-delay:-3s}.bs-flower span{position:absolute;left:40px;top:4px;width:38px;height:82px;border-radius:70% 70% 60% 60%;background:linear-gradient(90deg,#e8eaf1,#fff 52%,#d9dde7);transform-origin:19px 55px;transform:rotate(var(--r)) translateY(-28px)}.bs-flower i{position:absolute;left:44px;top:44px;width:30px;height:30px;border-radius:50%;background:radial-gradient(circle,#5b4213 0 12%,#d5a91d 14% 52%,#785d1b 54% 62%,transparent 64%)}@keyframes bsSway{0%,100%{transform:rotate(-5deg) translateY(0)}50%{transform:rotate(6deg) translateY(-7px)}}
            .bs-frame{position:absolute;inset:16px;border:3px solid #fff;border-radius:210px 210px 0 0;opacity:.92;pointer-events:none}.bs-frame:after{content:"";position:absolute;inset:7px;border:2px solid rgba(170,190,245,.8);border-radius:200px 200px 0 0}
            .bs-content{position:relative;z-index:1}.bs-arabic{font:700 44px Amiri,serif;line-height:1.25;margin:155px 20px 18px}.bs-sub{font:16px 'Playfair Display',serif;letter-spacing:.03em}.bs-names{font-family:'Playfair Display',serif;font-size:65px;line-height:.9;margin:108px 0 80px;letter-spacing:-.05em}.bs-names small{display:block;font:22px Poppins,sans-serif;letter-spacing:.02em;margin-bottom:6px}.bs-amp{display:block;color:var(--accent);font-size:44px;margin:13px}.bs-date-label{border-top:2px dotted rgba(255,255,255,.6);border-bottom:2px dotted rgba(255,255,255,.6);padding:26px 0;margin:0 28px;font:42px 'Playfair Display',serif}.bs-date{font:700 32px Poppins,sans-serif;margin:11px 0;color:#fff}.bs-date span{color:var(--accent);font-weight:400}.bs-venue{font-size:18px;font-weight:700;margin-top:45px}.bs-address{font-size:13px;opacity:.75;margin-top:5px}.bs-pill{display:inline-flex;align-items:center;gap:10px;margin:35px auto 93px;padding:13px 38px;border-radius:999px;background:#fff;color:#111;text-decoration:none;font-weight:600}.bs-dots{font-size:26px;letter-spacing:9px;color:var(--accent);margin:0 0 70px}.bs-story-title{font:62px 'Playfair Display',serif;margin:0 0 55px}.bs-story-title em{color:var(--accent);font-style:normal}.bs-message-title{font:700 19px 'Playfair Display',serif;margin-bottom:17px}.bs-message{font:16px 'Playfair Display',serif;line-height:1.75;max-width:330px;margin:auto;white-space:pre-line}.bs-reminder{margin:70px auto 60px}.bs-reminder-action{display:inline-block;border:0;background:rgba(255,255,255,.92);color:#111;padding:14px 39px;border-radius:999px;font:18px Poppins,sans-serif;cursor:pointer}.bs-reminder-action:active{transform:scale(.97)}.bs-calendar{margin:50px auto 95px;padding:25px 10px;border-top:1px solid rgba(255,255,255,.3);border-bottom:1px solid rgba(255,255,255,.3)}.bs-calendar h3{font-size:28px;margin:0 0 16px}.bs-calendar p{margin:0;font-size:13px;opacity:.75}.bs-calendar-week{display:grid;grid-template-columns:repeat(7,1fr);font-size:12px;letter-spacing:0;color:rgba(255,255,255,.68);word-spacing:15px;margin:22px 0 12px}.bs-calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:12px 4px;align-items:center;font-size:16px}.bs-calendar-grid span{position:relative;min-height:27px;display:grid;place-items:center}.bs-selected-day{background:rgba(159,180,239,.34);border-radius:999px;font-weight:700}.bs-selected-day b{position:absolute;right:-3px;top:-8px;color:#f596c2;font-size:16px}.bs-calendar-empty{font-size:13px;opacity:.75;padding:25px 5px}.bs-event{display:flex;gap:18px;align-items:center;text-align:left;max-width:340px;margin:46px auto}.bs-icon{flex:0 0 62px;height:62px;border-radius:50%;display:grid;place-items:center;background:#fff;color:var(--blue);font-size:27px}.bs-event h4{font-size:28px;line-height:1;margin:0 0 8px}.bs-event p{margin:0;font-size:14px;line-height:1.55}.bs-quote{margin:105px auto 0;padding-top:48px;border-top:1px solid rgba(255,255,255,.35)}.bs-quote .arabic{font:32px Amiri,serif;line-height:1.5}.bs-quote .translation{font:italic 16px 'Playfair Display',serif;line-height:1.6;margin-top:16px}.bs-editable{position:relative;cursor:pointer;border-radius:10px}.bs-editable:hover{outline:2px solid #60a5fa;outline-offset:4px}.bs-pen{position:absolute;right:2px;top:2px;background:#2563eb;color:#fff;width:27px;height:27px;border-radius:50%;display:grid;place-items:center;font-size:11px;z-index:2}.bs-hidden{opacity:.3;filter:grayscale(1)}
        </style><div class="bs-root">${flower('top')}${flower('left')}${flower('right')}<div class="bs-frame"></div><div class="bs-content">
            ${edit('bismillah', `<div class="bs-arabic">${escape(content.bismillah, 'بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ')}</div><div class="bs-sub">In the Name of Allah, The Most Gracious, The Most Merciful</div>`, 'showBismillah')}
            ${edit('couple', `<div class="bs-names"><small>${groom}</small>${groom}<span class="bs-amp">&amp;</span>${bride}</div>`, 'showCouple')}
            ${edit('heading', `<div class="bs-date-label">${heading}</div>`, 'showHeading')}${edit('mainEvent', `<div class="bs-date"><span>${date}</span><br>${time}</div>`, 'showEvent')}
            ${edit('mainEvent', `<div class="bs-venue">${venue}</div><div class="bs-address">${address}</div>${location}`, 'showEvent')}
            <div class="bs-dots">● ● ●</div><div class="bs-story-title">${groom.charAt(0)} <em>&amp;</em> ${bride.charAt(0)}</div>
            ${edit('message', `<div class="bs-message-title">Dear Beloved Family &amp; Friends!</div><div class="bs-message">${message.replace(/\n/g, '<br>')}</div>`, 'showMessage')}
            <div class="bs-reminder">${reminder}</div><div class="bs-dots">● ● ●</div>
            ${edit('mainEvent', `<div class="bs-calendar"><h3><i class="fa-regular fa-calendar-days"></i> ${monthLabel}</h3><p>Hold the Date</p>${calendar}</div>`, 'showEvent')}
            ${edit('mainEvent', `<div class="bs-event"><div class="bs-icon"><i class="fa-solid fa-rings-wedding"></i></div><div><h4>${title}</h4><p><strong>${date} · ${time}</strong><br>${venue}</p></div></div>`, 'showEvent')}
            ${edit('quran', `<div class="bs-quote"><div class="arabic">${arabic}</div><div class="translation">“${translation}”</div></div>`, 'showQuote')}
        </div></div>`;
    }
});
