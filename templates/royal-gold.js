window.registerTemplate({
    id: 'royal-gold',
    name: 'Royal Islamic Gold',
    thumb: 'https://images.unsplash.com/photo-1576506295286-5cda18df43e0?q=80&w=300&auto=format&fit=crop',
    
    // Default colors and fonts if the user hasn't customized them yet
    defaults: { 
        colors: { 
            primary: '#B38A4A', // Gold
            bg: '#FFFBF0',      // Cream/Ivory
            text: '#3E2723'     // Dark Brown
        }, 
        fonts: { 
            heading: "'Playfair Display', serif" 
        } 
    },

    render: function(d, isEditMode) {
        // Fallback to defaults if data is missing
        const colors = d.design?.colors?.primary ? d.design.colors : this.defaults.colors;
        const fonts = d.design?.fonts || this.defaults.fonts;
        const set = d.settings || {};

        // Helper function to create clickable/editable blocks in Edit Mode
        const wrap = (key, content, hideKey) => {
            const isHidden = (hideKey && set[hideKey] === false);
            // In public view, completely remove hidden sections
            if(!isEditMode) return isHidden ? '' : content;
            
            // In edit mode, wrap with a clickable div and a pen icon
            return `<div class="editable-block ${isHidden ? 'hidden-block' : ''} w-full transition-all" data-edit="${key}">
                        <div class="edit-badge shadow-lg"><i class="fa-solid fa-pen"></i></div>
                        ${content}
                    </div>`;
        };

        let html = `
        <div class="w-full min-h-[900px] h-full relative p-6 md:p-10 flex flex-col items-center text-center font-sans overflow-hidden" 
             style="background-color: ${colors.bg}; color: ${colors.text};">
            
            <!-- Decorative Outer Border -->
            <div class="absolute inset-4 md:inset-6 border-[3px] rounded-2xl pointer-events-none opacity-60 z-0" 
                 style="border-color: ${colors.primary};"></div>
            <div class="absolute inset-5 md:inset-7 border border-dashed rounded-xl pointer-events-none opacity-40 z-0" 
                 style="border-color: ${colors.primary};"></div>
            
            <!-- Main Content Container -->
            <div class="relative z-10 w-full flex flex-col items-center py-10 my-auto max-w-[350px]">
        `;
        
        // 1. Bismillah (Content Modal)
        html += wrap('content', `
            <div class="font-arabic text-3xl md:text-4xl mb-8 font-bold tracking-wide drop-shadow-sm" 
                 style="color: ${colors.primary}; font-family: 'Amiri', serif;">
                 بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
            </div>
        `, 'showBismillah');

        // 2. Top Heading (Content Modal)
        html += wrap('content', `
            <div class="text-[10px] md:text-xs uppercase tracking-[0.35em] mb-10 font-bold opacity-80" 
                 style="color: ${colors.text}">
                 ${d.content?.heading || 'We Cordially Invite You'}
            </div>
        `);
        
        // 3. Couple Section (Couple Modal)
        let photosHtml = '';
        if(d.couple?.groomPhoto || d.couple?.bridePhoto) {
            photosHtml = `<div class="flex justify-center items-center gap-4 mb-6">`;
            if(d.couple.groomPhoto) {
                photosHtml += `<div class="w-20 h-20 md:w-24 md:h-24 rounded-full p-1 border border-opacity-50" style="border-color: ${colors.primary}">
                                 <img src="${d.couple.groomPhoto}" class="w-full h-full rounded-full object-cover shadow-sm">
                               </div>`;
            }
            if(d.couple.bridePhoto) {
                photosHtml += `<div class="w-20 h-20 md:w-24 md:h-24 rounded-full p-1 border border-opacity-50" style="border-color: ${colors.primary}">
                                 <img src="${d.couple.bridePhoto}" class="w-full h-full rounded-full object-cover shadow-sm">
                               </div>`;
            }
            photosHtml += `</div>`;
        }

        html += wrap('couple', `
            <div class="w-full mb-10">
                ${photosHtml}
                <h1 class="text-4xl md:text-5xl font-bold mb-3 drop-shadow-sm leading-tight" 
                    style="font-family: ${fonts.heading}; color: ${colors.primary}">${d.couple?.groom || 'Groom Name'}</h1>
                
                <div class="flex items-center justify-center gap-3 my-4 opacity-70">
                    <div class="h-px w-12" style="background-color: ${colors.primary}"></div>
                    <span class="text-xl md:text-2xl italic font-serif" style="color: ${colors.primary}">&</span>
                    <div class="h-px w-12" style="background-color: ${colors.primary}"></div>
                </div>
                
                <h1 class="text-4xl md:text-5xl font-bold mt-3 drop-shadow-sm leading-tight" 
                    style="font-family: ${fonts.heading}; color: ${colors.primary}">${d.couple?.bride || 'Bride Name'}</h1>
            </div>
        `);

        // 4. Message Text (Content Modal)
        html += wrap('content', `
            <p class="text-sm md:text-base leading-relaxed mb-10 px-4 opacity-80 whitespace-pre-line font-medium">
                ${d.content?.message || 'to join us on our special day\nand bless our new beginning.'}
            </p>
        `);
        
        // 5. Quranic Verse (Quran Modal)
        html += wrap('quran', `
            <div class="my-8 py-6 w-[85%] mx-auto relative">
                <div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-px opacity-50" style="background-color: ${colors.primary}"></div>
                <p class="font-arabic text-2xl md:text-3xl mb-3 leading-loose" style="color: ${colors.primary}; font-family: 'Amiri', serif;">
                    ${d.content?.arabicText || 'وَخَلَقْنَاكُمْ أَزْوَاجًا'}
                </p>
                <p class="text-[10px] md:text-xs uppercase tracking-widest opacity-70 font-semibold">
                    ${d.content?.translation || '"And We created you in pairs"'}
                </p>
                <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-px opacity-50" style="background-color: ${colors.primary}"></div>
            </div>
        `, 'showQuote');

        // 6. Main Event (Main Event Modal)
        const mapBtnHtml = (d.mainEvent?.mapUrl && !isEditMode) 
            ? `<a href="${d.mainEvent.mapUrl}" target="_blank" class="mt-5 inline-block text-[10px] uppercase tracking-wider font-bold border-2 px-8 py-3 rounded-full hover:shadow-md transition-all active:scale-95" style="border-color: ${colors.primary}; color: ${colors.primary}">Get Directions</a>`
            : (isEditMode ? `<div class="mt-5 inline-block text-[10px] uppercase tracking-wider font-bold border-2 px-8 py-3 rounded-full opacity-80" style="border-color: ${colors.primary}; color: ${colors.primary}">Get Directions Button</div>` : '');

        html += wrap('mainEvent', `
            <div class="bg-black/5 backdrop-blur-sm rounded-3xl p-8 w-full shadow-inner border border-black/5 mt-4">
                <h3 class="text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-4" 
                    style="color: ${colors.primary}">${d.mainEvent?.title || 'Nikah Ceremony'}</h3>
                
                <div class="font-semibold text-xl mb-1">${d.mainEvent?.date || '20 Sept 2026'}</div>
                <div class="text-sm opacity-80 mb-6 font-medium">${d.mainEvent?.time || '11:00 AM'}</div>
                
                <div class="font-bold text-lg leading-tight mb-2">${d.mainEvent?.venue || 'Venue Name'}</div>
                <div class="text-xs md:text-sm opacity-70 mb-2 leading-relaxed">${d.mainEvent?.address || 'Address goes here'}</div>
                
                ${set.showMap !== false ? mapBtnHtml : ''}
            </div>
        `);

        html += `
            </div>
        </div>`;
        
        return html;
    }
});