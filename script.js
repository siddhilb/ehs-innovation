// --- SMOOTH SCROLL LOGIC ---
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

// --- DRAWER & CALCULATOR LOGIC ---
const drawer = document.getElementById('envDrawer');
const drawerTitle = document.getElementById('drawerTitle');
const drawerDescription = document.getElementById('drawerDescription');
const fashionAlts = document.getElementById('fashionAlternatives');
const calculatorContainer = document.getElementById('calculatorContainer');

const wasteSlider = document.getElementById('wasteSlider');
const kgValue = document.getElementById('kgValue');
const co2Value = document.getElementById('co2Value');
function openDrawer(title, description, type) {
    drawerTitle.innerText = title;
    drawerDescription.innerText = description;
    
    // Reset scroll position to top every time it opens
    drawer.scrollTo(0, 0);

    // Hide all extra sections first
    fashionAlts.style.display = 'none';
    calculatorContainer.style.display = 'none';

    // Show content based on type
    if (type === 'fashion') {
        fashionAlts.style.display = 'block';
    } else if (type === 'food') {
        calculatorContainer.style.display = 'block';
    }
    
    drawer.classList.add('active');
    
    // Optional: Stop the main body from scrolling while drawer is open
    document.body.style.overflow = 'hidden';
}

function closeDrawer() {
    drawer.classList.remove('active');
    // Re-enable body scrolling
    document.body.style.overflow = 'auto';
}


// Food Waste Calculation: 1kg waste ≈ 2.5kg CO2e. 52 weeks in a year.
wasteSlider.addEventListener('input', (e) => {
    const kg = e.target.value;
    const yearlyCo2 = (kg * 2.5 * 52).toFixed(1);
    
    kgValue.innerText = kg;
    co2Value.innerText = yearlyCo2;
});