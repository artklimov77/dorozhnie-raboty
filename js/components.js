'use strict';

const LOGO_SVG = `<svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="38" height="38" rx="8" fill="#f97316"/>
  <rect x="16" y="7" width="6" height="24" fill="white"/>
  <rect x="7" y="7" width="24" height="5" rx="1" fill="white"/>
  <rect x="7" y="26" width="24" height="5" rx="1" fill="white"/>
</svg>`;

const ROOT = (() => {
    const p = window.location.pathname;
    return p.includes('/services/') ? '../' : '';
})();

const SERVICES_NAV = [
    { href: `${ROOT}services/roads.html`,            text: 'Дорожные работы' },
    { href: `${ROOT}services/construction.html`,     text: 'Строительство зданий' },
    { href: `${ROOT}services/demolition.html`,       text: 'Демонтаж и снос' },
    { href: `${ROOT}services/earthworks.html`,       text: 'Земляные работы' },
    { href: `${ROOT}services/engineering.html`,      text: 'Инженерные сети' },
    { href: `${ROOT}services/energy.html`,           text: 'Энергетика и ЛЭП' },
    { href: `${ROOT}services/landscaping.html`,      text: 'Благоустройство' },
    { href: `${ROOT}services/finishing.html`,        text: 'Отделка и ремонт' },
    { href: `${ROOT}services/documents.html`,        text: 'Оформление документов' },
    { href: `${ROOT}services/equipment-rental.html`, text: 'Аренда техники' },
];

function buildHeader() {
    const dropdownItems = SERVICES_NAV.map(s =>
        `<a href="${s.href}">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="6 3 11 8 6 13"/></svg>
            ${s.text}
        </a>`
    ).join('');

    return `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<header class="header" id="header">
    <div class="container header__inner">
        <a href="${ROOT}index.html" class="logo">
            ${LOGO_SVG}
            <span class="logo__text">О<span>пора</span></span>
        </a>
        <nav class="nav" id="nav">
            <div class="nav__item"><a href="${ROOT}index.html" class="nav__link">Главная</a></div>
            <div class="nav__item"><a href="${ROOT}about.html" class="nav__link">О компании</a></div>
            <div class="nav__item">
                <a href="${ROOT}services.html" class="nav__link">
                    Услуги
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="2 4 6 8 10 4"/></svg>
                </a>
                <div class="nav__dropdown">${dropdownItems}</div>
            </div>
            <div class="nav__item"><a href="${ROOT}projects.html" class="nav__link">Объекты</a></div>
            <div class="nav__item"><a href="${ROOT}equipment.html" class="nav__link">Техника</a></div>
            <div class="nav__item"><a href="${ROOT}contacts.html" class="nav__link">Контакты</a></div>
        </nav>
        <a href="tel:+74950000000" class="header__phone">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            +7 (495) 000-00-00
        </a>
        <button class="burger" id="burger" aria-label="Меню"><span></span><span></span><span></span></button>
    </div>
</header>`;
}

function buildFooter() {
    const serviceLinks = SERVICES_NAV.slice(0, 6).map(s =>
        `<a href="${s.href}">${s.text}</a>`
    ).join('');

    return `
<footer class="footer">
    <div class="container footer__inner">
        <div class="footer__brand">
            <a href="${ROOT}index.html" class="logo">
                ${LOGO_SVG}
                <span class="logo__text">О<span>пора</span></span>
            </a>
            <p>Генеральный подрядчик в Москве и Московской области. Строительство, дороги, демонтаж, энергетика — под ключ с 2013 года.</p>
            <div class="footer__brand__soc">
                <a href="#" aria-label="VK">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C5.029 11.27 4.27 9.274 4.27 8.817c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V10.27c-.068-1.186-.695-1.287-.695-1.71 0-.204.169-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.169.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.491-.085.745-.576.745z"/></svg>
                </a>
                <a href="#" aria-label="Telegram">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.21 13.992l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.938.567z"/></svg>
                </a>
                <a href="#" aria-label="WhatsApp">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
            </div>
        </div>
        <div class="footer__nav">
            <h5>Услуги</h5>
            ${serviceLinks}
            <a href="${ROOT}services.html">Все услуги →</a>
        </div>
        <div class="footer__nav">
            <h5>Компания</h5>
            <a href="${ROOT}about.html">О компании</a>
            <a href="${ROOT}projects.html">Объекты</a>
            <a href="${ROOT}equipment.html">Техника</a>
            <a href="${ROOT}contacts.html">Контакты</a>
            <a href="#">Политика конфиденциальности</a>
        </div>
        <div class="footer__contacts">
            <h5>Контакты</h5>
            <a href="tel:+74950000000">+7 (495) 000-00-00</a>
            <a href="mailto:info@opora-stroy.ru">info@opora-stroy.ru</a>
            <p>г. Москва, ул. Промышленная, д. 1</p>
            <p>Пн–Пт 8:00–20:00</p>
            <p>Сб 9:00–17:00</p>
        </div>
    </div>
    <div class="footer__bottom">
        <div class="container">
            <span>© 2024 Опора. Строительная компания.</span>
            <span>Москва и Московская область</span>
        </div>
    </div>
</footer>
<button class="scroll-top" id="scrollTop" aria-label="Наверх">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
</button>`;
}

function buildSidebarServices(currentHref) {
    const items = SERVICES_NAV.map(s => {
        const isActive = window.location.pathname.endsWith(s.href.replace(/^(\.\.\/)?/, ''));
        return `<a href="${s.href}" class="${isActive ? 'active' : ''}">${s.text}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
        </a>`;
    }).join('');
    return `<div class="sidebar-services">
        <div class="sidebar-services__title">Все услуги</div>
        ${items}
    </div>`;
}

function buildSidebarForm() {
    return `<div class="sidebar-form">
        <div class="sidebar-form__title">Получить расчёт</div>
        <div class="sidebar-form__sub">Перезвоним в течение 15 минут</div>
        <form id="sidebarForm">
            <div class="form__group"><input type="text" placeholder="Ваше имя" required></div>
            <div class="form__group"><input type="tel" id="sidebarPhone" placeholder="+7 (___) ___-__-__" required></div>
            <button type="submit" class="btn btn--primary btn--full btn--sm">Отправить заявку</button>
        </form>
        <div class="sidebar-contact">
            <a href="tel:+74950000000">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                +7 (495) 000-00-00
            </a>
        </div>
    </div>`;
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
    /* Inject header */
    const hEl = document.getElementById('site-header');
    if (hEl) { hEl.outerHTML = buildHeader(); }

    /* Inject footer */
    const fEl = document.getElementById('site-footer');
    if (fEl) { fEl.outerHTML = buildFooter(); }

    /* Inject sidebar */
    const sbSvc = document.getElementById('sidebar-services');
    if (sbSvc) sbSvc.innerHTML = buildSidebarServices();
    const sbForm = document.getElementById('sidebar-form');
    if (sbForm) sbForm.innerHTML = buildSidebarForm();

    /* Active nav highlight */
    const path = window.location.pathname;
    document.querySelectorAll('.nav__link').forEach(link => {
        const href = link.getAttribute('href') || '';
        if (href && path.endsWith(href.split('/').pop())) {
            link.classList.add('active');
        }
    });

    /* Header scroll */
    const header = document.querySelector('.header');
    const scrollTopBtn = document.querySelector('.scroll-top');
    window.addEventListener('scroll', () => {
        if (header) header.classList.toggle('scrolled', window.scrollY > 40);
        if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    /* Scroll to top */
    if (scrollTopBtn) scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    /* Burger */
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    if (burger && nav) {
        burger.addEventListener('click', () => {
            const open = burger.classList.toggle('open');
            nav.classList.toggle('open', open);
            document.body.style.overflow = open ? 'hidden' : '';
        });
        nav.querySelectorAll('.nav__link').forEach(l => l.addEventListener('click', () => {
            burger.classList.remove('open');
            nav.classList.remove('open');
            document.body.style.overflow = '';
        }));
    }
});
