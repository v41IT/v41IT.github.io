// ===== HAMBURGER MENU TOGGLE =====
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileNavMenu = document.getElementById('mobileNavMenu');

if (hamburgerBtn && mobileNavMenu) {
    hamburgerBtn.addEventListener('click', function() {
        hamburgerBtn.classList.toggle('active');
        mobileNavMenu.classList.toggle('open');
        
        if (mobileNavMenu.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    document.addEventListener('click', function(event) {
        if (!event.target.closest('#hamburger-btn') && 
            !event.target.closest('.mobile-nav-menu')) {
            if (mobileNavMenu.classList.contains('open')) {
                hamburgerBtn.classList.remove('active');
                mobileNavMenu.classList.remove('open');
                document.body.style.overflow = '';
            }
        }
    });
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && mobileNavMenu.classList.contains('open')) {
            hamburgerBtn.classList.remove('active');
            mobileNavMenu.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
    
    const mobileLinks = mobileNavMenu.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburgerBtn.classList.remove('active');
            mobileNavMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
    
    const mobileContactBtn = document.getElementById('mobile-contact-btn');
    if (mobileContactBtn) {
        mobileContactBtn.addEventListener('click', () => {
            mobileNavMenu.classList.remove('open');
            hamburgerBtn.classList.remove('active');
            document.body.style.overflow = '';
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    }
}

// Dark Mode Initiate - Respect system preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Check if user has saved preference, otherwise use system setting
if (localStorage.getItem('darkMode') === 'true' || (!localStorage.getItem('darkMode') && prefersDark)) {
    document.documentElement.classList.add('dark');
}

// Dark Mode Toggle
function toggleDarkMode() {
    const html = document.documentElement;
    const isDark = html.classList.toggle('dark');
    localStorage.setItem('darkMode', isDark);
    updateIcons(isDark);
}

function updateIcons(isDark) {
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    if (isDark) {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    } else {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }
}

// Contact Modal
const modal = document.getElementById('contact-modal');
const contactBtn = document.getElementById('contact-btn');
const closeModal = document.getElementById('close-modal');

if (contactBtn) {
    contactBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    });
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
});

// Lightbox
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    document.getElementById('lightbox-img').src = src;
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
    document.body.style.overflow = '';
}

// Initialize Icons
document.addEventListener('DOMContentLoaded', function() {
    const isDark = document.documentElement.classList.contains('dark');
    updateIcons(isDark);
});

// Cleanup body overflow on resize/orientation change
window.addEventListener('resize', () => {
    document.body.style.overflow = '';
});

window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        document.body.style.overflow = '';
    }, 100);
});

// Force cleanup if page loaded with locked overflow
if (document.body.style.overflow === 'hidden') {
    document.body.style.overflow = '';
}