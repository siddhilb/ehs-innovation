/**
 * ECHO: Every Citizen Has Options
 * Core Application Logic
 */

// 1. LEGAL DATABASE 
// Add as many objects here as you like
const lawDatabase = [
    { title: "First Amendment", desc: "Protecting freedom of speech, press, assembly, and petition.", tag: "CONSTITUTION" },
    { title: "Fourth Amendment", desc: "Protection against unreasonable searches and seizures.", tag: "CONSTITUTION" },
    { title: "Fifth Amendment", desc: "Right to remain silent and protection against self-incrimination.", tag: "CONSTITUTION" },
    { title: "Sixth Amendment", desc: "Right to a public trial without unnecessary delay and right to a lawyer.", tag: "CONSTITUTION" },
    { title: "Voting Rights Act", desc: "Federal legislation that prohibits racial discrimination in voting.", tag: "FEDERAL" },
    { title: "Civil Rights Act", desc: "Outlaws discrimination based on race, color, religion, or sex.", tag: "FEDERAL" }
];

// 2. SELECTORS
const drawer = document.getElementById('envDrawer');
const drawerTitle = document.getElementById('drawerTitle');
const drawerDescription = document.getElementById('drawerDescription');
const bottomNav = document.getElementById('bottomNav');
const giantTitle = document.querySelector('.giant-title');

const sections = {
    voting: document.getElementById('votingResources'),
    police: document.getElementById('policeResources'),
    protest: document.getElementById('protestResources'),
    privacy: document.getElementById('privacyResources'),
    library: document.getElementById('libraryResources')
};

// 3. DRAWER MANAGEMENT
function openDrawer(title, description, type) {
    // Set text content
    drawerTitle.innerText = title;
    drawerDescription.innerText = description;
    
    // Hide all resource sections
    Object.values(sections).forEach(sec => {
        if (sec) sec.style.display = 'none';
    });

    // Show the specific section requested
    if (sections[type]) {
        sections[type].style.display = 'block';
    }

    // Special initialization for Library
    if (type === 'library') {
        renderLaws(lawDatabase);
        document.getElementById('lawSearch').value = ''; // Clear search on open
        document.getElementById('askOnlineBtn').style.display = 'none';
    }

    // Open Drawer UI
    drawer.classList.add('active');
    
    // Hide the bottom nav so it doesn't overlap drawer content
    bottomNav.style.transform = 'translateY(150px)';
    
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
}

function closeDrawer() {
    drawer.classList.remove('active');
    
    // Bring back the bottom nav
    bottomNav.style.transform = 'translateY(0)';
    
    // Re-enable scrolling
    document.body.style.overflow = 'auto';
}

// 4. LIBRARY & SEARCH LOGIC
function renderLaws(data) {
    const container = document.getElementById('lawList');
    
    // If no results are found
    if (data.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding: 60px 20px; opacity: 0.5;">
                <p style="font-weight: 900; text-transform: uppercase; letter-spacing: 1px;">No local results found.</p>
                <p style="font-size: 0.85em;">Try a different keyword or use the online portal.</p>
            </div>
        `;
        return;
    }

    // Map through database and create HTML
    container.innerHTML = data.map(law => `
        <div class="law-item" style="padding:20px; background:#f9f9f9; border-left:5px solid #1a1a1a; margin-bottom:15px; animation: slideUp 0.3s ease-out forwards;">
            <h4 style="margin:0; text-transform:uppercase; letter-spacing: 1px;">${law.title}</h4>
            <p style="margin:10px 0 0 0; font-size:0.95em; opacity:0.8; line-height:1.4;">${law.desc}</p>
            <span style="display:inline-block; background:#1a1a1a; color:white; padding:3px 10px; font-size:0.7em; margin-top:12px; font-weight:bold;">${law.tag}</span>
        </div>
    `).join('');
}

function filterLaws() {
    const query = document.getElementById('lawSearch').value.toLowerCase();
    const googleBtn = document.getElementById('askOnlineBtn');
    
    const filtered = lawDatabase.filter(law => 
        law.title.toLowerCase().includes(query) || 
        law.desc.toLowerCase().includes(query) ||
        law.tag.toLowerCase().includes(query)
    );

    // Show "Ask Online" button only if no results AND user has typed something
    if (filtered.length === 0 && query.length > 0) {
        googleBtn.style.display = 'block';
    } else {
        googleBtn.style.display = 'none';
    }

    renderLaws(filtered);
}

function searchGoogle() {
    const query = document.getElementById('lawSearch').value;
    if (query) {
        // Formulate a helpful legal search query
        const url = `https://www.google.com/search?q=${encodeURIComponent(query)}+legal+rights+united+states`;
        window.open(url, '_blank');
    }
}

// 5. PARALLAX TITLE EFFECT (Visual Polish)
let current = 0;
let target = 0;

function animateTitle() {
    target = window.scrollY;
    current = current + (target - current) * 0.08; // Smooth interpolation
    
    if (giantTitle) {
        // Title drifts upward slightly slower than scroll and fades out
        giantTitle.style.transform = `translateY(${current * 0.4}px)`;
        giantTitle.style.opacity = 1 - (current / 700);
    }
    
    requestAnimationFrame(animateTitle);
}

// Start animation loop
animateTitle();

// 6. KEYBOARD ACCESSIBILITY
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        closeDrawer();
    }
});
// --- LANGUAGE LOGIC ---
function toggleLangMenu() {
    document.getElementById('langMenu').classList.toggle('show');
}

// Close menu if user clicks elsewhere
window.onclick = function(event) {
    if (!event.target.matches('.lang-btn')) {
        var menus = document.getElementsByClassName("lang-menu");
        for (var i = 0; i < menus.length; i++) {
            menus[i].classList.remove('show');
        }
    }
}

