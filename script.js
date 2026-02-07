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