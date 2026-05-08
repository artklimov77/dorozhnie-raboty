'use strict';

document.addEventListener('DOMContentLoaded', () => {

    /* ── Reveal on scroll ── */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('revealed'); revealObserver.unobserve(e.target); }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.service-card, .service-overview-card, .why-feature, .testimonial, .process-step, .project-card, .stats-item, .cert-card, .equipment-card, .team-card, .timeline-item, .about-value, .service-feature')
        .forEach((el, i) => {
            el.dataset.reveal = '';
            const mod = i % 3;
            if (mod === 1) el.dataset.revealDelay = '1';
            if (mod === 2) el.dataset.revealDelay = '2';
            revealObserver.observe(el);
        });

    /* ── Stats counter ── */
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const el = e.target;
            const target = parseInt(el.dataset.target, 10);
            const dur = 1800;
            const step = 16;
            const inc = target / (dur / step);
            let cur = 0;
            const tick = () => {
                cur += inc;
                if (cur >= target) { el.textContent = target.toLocaleString('ru'); return; }
                el.textContent = Math.floor(cur).toLocaleString('ru');
                requestAnimationFrame(tick);
            };
            tick();
            statsObserver.unobserve(el);
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.stats__num, [data-counter]').forEach(el => statsObserver.observe(el));

    /* ── Phone mask ── */
    function applyPhoneMask(input) {
        if (!input) return;
        input.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, '');
            if (v.startsWith('8')) v = '7' + v.slice(1);
            if (!v.startsWith('7')) v = '7' + v;
            v = v.slice(0, 11);
            let out = '+7';
            if (v.length > 1) out += ' (' + v.slice(1, 4);
            if (v.length >= 4) out += ') ' + v.slice(4, 7);
            if (v.length >= 7) out += '-' + v.slice(7, 9);
            if (v.length >= 9) out += '-' + v.slice(9, 11);
            e.target.value = out;
        });
    }
    document.querySelectorAll('input[type="tel"]').forEach(applyPhoneMask);

    /* ── Form submit ── */
    function handleForm(formId, successId) {
        const form = document.getElementById(formId);
        const success = document.getElementById(successId);
        if (!form) return;
        form.addEventListener('submit', e => {
            e.preventDefault();
            const phoneEl = form.querySelector('input[type="tel"]');
            if (phoneEl && phoneEl.value.length < 16) {
                phoneEl.style.borderColor = '#ef4444';
                phoneEl.animate([{transform:'translateX(0)'},{transform:'translateX(-5px)'},{transform:'translateX(5px)'},{transform:'translateX(0)'}], {duration:300});
                phoneEl.addEventListener('input', () => { phoneEl.style.borderColor = ''; }, { once: true });
                return;
            }
            if (success) { success.classList.add('visible'); setTimeout(() => success.classList.remove('visible'), 6000); }
            form.reset();
        });
    }
    handleForm('contactForm', 'formSuccess');
    handleForm('heroForm', null);
    handleForm('sidebarForm', null);

    /* ── FAQ accordion ── */
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const isOpen = item.classList.contains('open');
            document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
            if (!isOpen) item.classList.add('open');
        });
    });

    /* ── Project filter ── */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card[data-cat]');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cat = btn.dataset.filter;
            projectCards.forEach(card => {
                card.classList.toggle('hidden', cat !== 'all' && card.dataset.cat !== cat);
            });
        });
    });

    /* ── Active nav on scroll ── */
    const sections = document.querySelectorAll('section[id]');
    if (sections.length) {
        const navObserver = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    document.querySelectorAll('.nav__link').forEach(l => l.classList.remove('active'));
                    const a = document.querySelector(`.nav__link[href*="${e.target.id}"]`);
                    if (a) a.classList.add('active');
                }
            });
        }, { threshold: 0.45 });
        sections.forEach(s => navObserver.observe(s));
    }
});
