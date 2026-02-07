// --- LERP SCROLLING ---
let current = 0;
let target = 0;
const ease = 0.075;
const title = document.querySelector('.giant-title');

function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}

function animate() {
    target = window.scrollY;
    current = lerp(current, target, ease);
    const move = current * 0.35;
    const scale = 1 - (current * 0.0004);
    const opacity = 1 - (current / 800);

    if (title) {
        title.style.transform = `translateY(${move}px) scale(${scale})`;
        title.style.opacity = opacity;
    }
    requestAnimationFrame(animate);
}
animate();
// ... LERP SCROLLING CODE REMAINS THE SAME ...

// --- UPDATED DRAWER LOGIC ---
const drawer = document.getElementById('envDrawer');
const drawerTitle = document.getElementById('drawerTitle');
const drawerDescription = document.getElementById('drawerDescription');

// New Section IDs
const sections = {
    voting: document.getElementById('votingResources'),
    police: document.getElementById('policeResources'),
    protest: document.getElementById('protestResources'),
    privacy: document.getElementById('privacyResources')
};

function openDrawer(title, description, type) {
    drawerTitle.innerText = title;
    drawerDescription.innerText = description;
    
    drawer.scrollTo(0, 0);

    // Hide everything
    Object.values(sections).forEach(s => { if(s) s.style.display = 'none'; });

    // Show specific section
    if (sections[type]) {
        sections[type].style.display = 'block';
    }
    
    drawer.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDrawer() {
    drawer.classList.remove('active');
    document.body.style.overflow = 'auto';
}
// 1. Define the Library Database
const lawDatabase = [
    { title: "First Amendment", desc: "Protecting freedom of speech, press, assembly, and petition.", tag: "CONSTITUTION" },
    { title: "Fourth Amendment", desc: "Protection against unreasonable searches and seizures.", tag: "CONSTITUTION" },
    { title: "Voting Rights Act", desc: "Prohibits racial discrimination in voting practices.", tag: "FEDERAL" },
    { title: "Fifth Amendment", desc: "Right to remain silent and protection against self-incrimination.", tag: "CONSTITUTION" },
    { title: "Civil Rights Act", desc: "Outlaws discrimination based on race, color, religion, or sex.", tag: "FEDERAL" }
];

// 2. Add 'library' to your sections object
// (Assuming you have a sections object from previous steps)
sections.library = document.getElementById('libraryResources');

const libBtn = document.querySelector('.bottom-nav');

// Update your openDrawer function
const originalOpenDrawer = openDrawer;
openDrawer = function(title, description, type) {
    originalOpenDrawer(title, description, type);
    
    // Hide the wide library button when any drawer is open
    libBtn.style.transform = 'translateY(200px)'; 
    libBtn.style.transition = '0.5s ease-in';

    if (type === 'library') {
        renderLaws(lawDatabase);
        document.getElementById('lawSearch').value = '';
    }
};

// Update your closeDrawer function
const originalCloseDrawer = closeDrawer;
closeDrawer = function() {
    originalCloseDrawer();
    
    // Bring the button back
    libBtn.style.transform = 'translateY(0)';
};
function renderLaws(data) {
    const container = document.getElementById('lawList');
    
    // Check if the search returned anything
    if (data.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding: 40px 20px; opacity: 0.6;">
                <p style="font-weight: 900; text-transform: uppercase;">No results found in local library.</p>
                <p style="font-size: 0.8em;">Try the "Ask Online" button above for a broader search.</p>
            </div>
        `;
        return;
    }

    // Otherwise, render the laws as usual
    container.innerHTML = data.map(law => `
        <div class="law-item" style="padding:20px; background:#f9f9f9; border-left:5px solid #1a1a1a; margin-bottom:15px;">
            <h4 style="margin:0; text-transform:uppercase;">${law.title}</h4>
            <p style="margin:10px 0 0 0; font-size:0.9em; opacity:0.8;">${law.desc}</p>
            <span style="display:inline-block; background:#1a1a1a; color:white; padding:2px 8px; font-size:0.7em; margin-top:10px;">${law.tag}</span>
        </div>
    `).join('');
}

function filterLaws() {
    const query = document.getElementById('lawSearch').value.toLowerCase();
    const googleBtn = document.getElementById('askOnlineBtn');
    
    const filtered = lawDatabase.filter(law => 
        law.title.toLowerCase().includes(query) || 
        law.desc.toLowerCase().includes(query)
    );

    // Show Google button only if there is text AND no local results
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
        const url = `https://www.google.com/search?q=${encodeURIComponent(query)}+legal+rights+usa`;
        window.open(url, '_blank');
    }
}

// 4. Update openDrawer to initialize the library
openDrawer = function(title, description, type) {
    originalOpenDrawer(title, description, type);
    if (type === 'library') {
        renderLaws(lawDatabase);
        document.getElementById('lawSearch').value = ''; // Reset search
    }
};
// --- REVEAL ON SCROLL LOGIC ---
const curtain = document.querySelector('.reveal-curtain');
const nav = document.getElementById('bottomNav');

window.addEventListener('scroll', () => {
    // Adjust '200' to change how soon the elements appear
    if (window.scrollY > 200) {
        curtain.classList.add('reveal-active');
        nav.classList.add('reveal-active');
    } else {
        // Optional: Remove them if the user scrolls back to the very top
        curtain.classList.remove('reveal-active');
        nav.classList.remove('reveal-active');
    }
});

// --- UPDATE OPEN/CLOSE DRAWER ---
// We need to make sure the scroll logic doesn't clash with the drawer logic
function openDrawer(title, description, type) {
    drawerTitle.innerText = title;
    drawerDescription.innerText = description;
    
    Object.values(sections).forEach(sec => { if(sec) sec.style.display = 'none'; });
    if (sections[type]) { sections[type].style.display = 'block'; }
    if (type === 'library') { renderLaws(lawDatabase); }

    drawer.classList.add('active');
    
    // Hide nav when drawer is open (override the scroll reveal)
    nav.style.opacity = "0";
    nav.style.transform = "translateY(100px)";
    
    document.body.style.overflow = 'hidden';
}

function closeDrawer() {
    drawer.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Re-trigger the scroll check to show nav if still scrolled down
    if (window.scrollY > 200) {
        nav.style.opacity = "1";
        nav.style.transform = "translateY(0)";
    }
}