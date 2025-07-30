// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {  // Only scroll if it's not just a '#' link
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Card hover effect
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const arrow = card.querySelector('.arrow');
        if (arrow) arrow.style.transform = 'translateX(10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        const arrow = card.querySelector('.arrow');
        if (arrow) arrow.style.transform = 'translateX(0)';
    });
});

// Add click handlers for buttons
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        const briefings = document.querySelector('#briefings');
        if (briefings) briefings.scrollIntoView({ behavior: 'smooth' });
    });
}

// Form submission handling
const joinForm = document.getElementById('joinForm');
if (joinForm) {
    joinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear the form inputs
        const inputs = joinForm.querySelectorAll('input');
        inputs.forEach(input => input.value = '');
        
        // Remove any existing welcome message
        const existingMessage = document.querySelector('.welcome-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create and show welcome message
        const welcomeMessage = document.createElement('div');
        welcomeMessage.className = 'welcome-message';
        welcomeMessage.innerHTML = `
            <h2>Welcome to The Grey Cell Brief</h2>
            <p>Thank you for joining. You'll receive your first briefing soon.</p>
        `;
        
        // Add the welcome message to the signup container
        document.querySelector('.signup-container').appendChild(welcomeMessage);
        
        // Scroll the welcome message into view
        welcomeMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
}

// Add loading animation for images
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Dropdown Menu Functionality
document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.dropdown');

    // Toggle dropdown on click
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.members-link');
        if (trigger) {
            // Remove the href attribute to prevent navigation
            trigger.setAttribute('href', '#');
            
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Close all other dropdowns
                dropdowns.forEach(other => {
                    if (other !== dropdown) {
                        other.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('active');
            });
        }
    });

    // Handle dropdown links that should not navigate
    const membersOnlyLinks = document.querySelectorAll('.dropdown-content a');
    membersOnlyLinks.forEach(link => {
        const linkText = link.textContent.trim();
        
        // Prevent navigation for specific links in MEMBERS ONLY dropdown and GEAR + TOOLS
        if (linkText === 'OSINT TOOLKIT' || linkText === 'GEAR & TOOLS' || linkText === 'Gear + Tools') {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                return false;
            });
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // Prevent dropdown from closing when clicking inside
    document.querySelectorAll('.dropdown-content').forEach(content => {
        content.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
});

// Load field notes for home page (3 most recent)
function loadFieldNotes() {
    const fieldNotes = JSON.parse(localStorage.getItem('fieldNotes') || '[]');
    const briefingCards = document.getElementById('briefingCards');
    briefingCards.innerHTML = '';
    // Sort by date, newest first
    fieldNotes.sort((a, b) => new Date(b.date) - new Date(a.date));
    const recentNotes = fieldNotes.slice(0, 3);
    recentNotes.forEach((note, index) => {
        const card = document.createElement('a');
        card.href = `field-note-template.html?note=${fieldNotes.indexOf(note) + 1}`;
        card.className = 'card';
        card.innerHTML = `
            <h3>${note.title}</h3>
            <div class="arrow">→</div>
        `;
        briefingCards.appendChild(card);
    });
}

// Load all field notes for briefings page (all, 4 per row)
function loadAllFieldNotes() {
    const fieldNotes = JSON.parse(localStorage.getItem('fieldNotes') || '[]');
    const briefingsGrid = document.getElementById('briefingsGrid');
    briefingsGrid.innerHTML = '';
    // Sort by date, newest first
    fieldNotes.sort((a, b) => new Date(b.date) - new Date(a.date));
    fieldNotes.forEach((note, index) => {
        const card = document.createElement('a');
        card.href = `field-note-template.html?note=${fieldNotes.indexOf(note) + 1}`;
        card.className = 'briefing-card';
        card.innerHTML = `
            <h3>${note.title}</h3>
            <div class="arrow">→</div>
        `;
        briefingsGrid.appendChild(card);
    });
}

function toggleMobileNav() {
    var nav = document.getElementById('mobileNav');
    var btn = document.getElementById('hamburgerBtn');
    nav.classList.toggle('open');
    btn.classList.toggle('open');
}

function toggleMobileDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId + '-dropdown');
    const allDropdowns = document.querySelectorAll('.mobile-dropdown-content');
    
    // Close all other dropdowns
    allDropdowns.forEach(dd => {
        if (dd !== dropdown) {
            dd.classList.remove('open');
        }
    });
    
    // Toggle current dropdown
    dropdown.classList.toggle('open');
}
