'use strict';

/* ── Header scroll ── */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

/* ── Burger menu ── */
const burger = document.getElementById('burger');
const nav    = document.getElementById('nav');

burger.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    nav.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
});

nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('open');
        nav.classList.remove('open');
        document.body.style.overflow = '';
    });
});

/* ── Scroll to top ── */
const scrollTopBtn = document.getElementById('scrollTop');
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── Reveal on scroll ── */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('revealed');
            revealObserver.unobserve(e.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.service-card, .why__feature, .testimonial, .process__step, .project-card, .coverage__cities span, .stats__item')
    .forEach((el, i) => {
        el.dataset.reveal = '';
        if (i % 3 === 1) el.dataset.revealDelay = '1';
        if (i % 3 === 2) el.dataset.revealDelay = '2';
        revealObserver.observe(el);
    });

/* ── Stats counter ── */
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el     = e.target;
        const target = parseInt(el.dataset.target, 10);
        const dur    = 1800;
        const step   = 16;
        const inc    = target / (dur / step);
        let cur      = 0;

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

document.querySelectorAll('.stats__num').forEach(el => statsObserver.observe(el));

/* ── Phone mask ── */
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
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

/* ── Form submit ── */
const form    = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name  = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        if (!name || phone.length < 16) {
            shakeInvalid(name  ? null : document.getElementById('name'));
            shakeInvalid(phone.length < 16 ? phoneInput : null);
            return;
        }
        /* Replace with actual fetch/XHR to backend */
        success.classList.add('visible');
        setTimeout(() => success.classList.remove('visible'), 6000);
        form.reset();
    });
}

function shakeInvalid(el) {
    if (!el) return;
    el.style.borderColor = '#ef4444';
    el.animate([
        { transform: 'translateX(0)' },
        { transform: 'translateX(-6px)' },
        { transform: 'translateX(6px)' },
        { transform: 'translateX(-4px)' },
        { transform: 'translateX(0)' }
    ], { duration: 320, easing: 'ease-out' });
    el.addEventListener('input', () => { el.style.borderColor = ''; }, { once: true });
}

/* ── Smooth active nav highlight ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            navLinks.forEach(l => l.style.color = '');
            const active = document.querySelector(`.nav__link[href="#${e.target.id}"]`);
            if (active) active.style.color = '#f97316';
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));
