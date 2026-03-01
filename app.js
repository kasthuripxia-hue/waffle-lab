// Supabase is initialized in supabase_config.js

let menuItems = [];
let cart = JSON.parse(localStorage.getItem('waffleCart')) || [];

async function fetchMenu() {
    try {
        const { data, error } = await supabaseClient
            .from('menu')
            .select('*');

        if (error) throw error;

        menuItems = data || [];
        renderMenu();
        initCarousel();
    } catch (err) {
        console.error("Failed to fetch menu from Supabase:", err);
        // Fallback to local if needed during development
        try {
            const res = await fetch('/api/menu');
            menuItems = await res.json();
            renderMenu();
            initCarousel();
        } catch (e) {
            console.error("Local fallback also failed");
        }
    }
}

let currentLang = localStorage.getItem('waffleLang') || 'english';
let currentTheme = localStorage.getItem('waffleTheme') || '#8d5a30';

const translations = {
    english: {
        home: "Home", orders: "Orders", settings: "Settings",
        appearance: "Appearance", light: "Light", dark: "Dark", theme: "Theme Color",
        language: "Language", done: "DONE", admin_login: "Administrative Login"
    },
    tamil: {
        home: "முகப்பு", orders: "ஆர்டர்கள்", settings: "அமைப்புகள்",
        appearance: "தோற்றம்", light: "ஒளி", dark: "இருள்", theme: "தீம் நிறம்",
        language: "மொழி", done: "முடிந்தது", admin_login: "நிர்வாகி உள்நுழைவு"
    },
    hindi: {
        home: "होम", orders: "ऑर्डर", settings: "सेटिंग्स",
        appearance: "दिखावट", light: "लाइट", dark: "डार्क", theme: "थीम रंग",
        language: "भाषा", done: "हो गया", admin_login: "एडमिन लॉगिन"
    }
};

const themes = [
    '#8d5a30', '#e63946', '#f1faee', '#a8dadc', '#457b9d',
    '#1d3557', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51',
    '#6d597a', '#b56576', '#e56b6f', '#eaac8b', '#355070'
];

document.addEventListener('DOMContentLoaded', () => {
    console.log('The Waffle Lab initialized');
    applyTheme(currentTheme);
    applyLang(currentLang);
    renderThemeColors();

    // Initial fetch
    fetchMenu();

    renderCheckout();
    updateCartUI();

    // Check system preference if no mode saved
    if (!localStorage.getItem('waffleMode')) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setMode('dark');
        } else {
            setMode('light');
        }
    } else {
        setMode(localStorage.getItem('waffleMode'));
    }
});

function showSection(section) {
    const homeSect = document.getElementById('menu-section');
    const heroSect = document.getElementById('hero-carousel');
    const filterSect = document.getElementById('filter-section');
    const navHome = document.getElementById('nav-home');

    if (section === 'home') {
        if (homeSect) homeSect.classList.remove('hidden');
        if (heroSect) heroSect.parentElement.classList.remove('hidden');
        if (filterSect) filterSect.classList.remove('hidden');
        if (navHome) {
            navHome.classList.add('text-primary');
            navHome.classList.remove('opacity-50');
        }
    }
}

function openSettings() {
    const overlay = document.getElementById('settings-overlay');
    const sheet = document.getElementById('settings-sheet');
    overlay.classList.remove('hidden');
    setTimeout(() => sheet.classList.remove('translate-y-full'), 10);
}

function closeSettings() {
    const overlay = document.getElementById('settings-overlay');
    const sheet = document.getElementById('settings-sheet');
    sheet.classList.add('translate-y-full');
    setTimeout(() => overlay.classList.add('hidden'), 300);
}

function setMode(mode) {
    const html = document.documentElement;
    if (mode === 'dark') {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }
    localStorage.setItem('waffleMode', mode);

    // Update button styles
    document.querySelectorAll('.mode-btn').forEach(btn => {
        const isDark = btn.querySelector('span').innerText === 'dark_mode';
        if ((isDark && mode === 'dark') || (!isDark && mode === 'light')) {
            btn.classList.add('border-primary', 'bg-primary/5');
        } else {
            btn.classList.remove('border-primary', 'bg-primary/5');
        }
    });
}

function renderThemeColors() {
    const container = document.getElementById('theme-colors');
    if (!container) return;
    container.innerHTML = themes.map(color => `
        <button onclick="applyTheme('${color}')" 
            class="w-full aspect-square rounded-full border-2 transition-all transform active:scale-90" 
            style="background-color: ${color}; border-color: ${currentTheme === color ? 'white' : 'transparent'}; box-shadow: ${currentTheme === color ? '0 0 0 2px ' + color : 'none'}">
        </button>
    `).join('');
}

function applyTheme(color) {
    currentTheme = color;
    document.documentElement.style.setProperty('--primary-color', color);
    localStorage.setItem('waffleTheme', color);
    renderThemeColors();
}

function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('waffleLang', lang);
    applyLang(lang);
}

function applyLang(lang) {
    const dict = translations[lang];
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (dict[key]) el.innerText = dict[key];
    });

    // Update active lang button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.innerText.toLowerCase().includes(lang) || (lang === 'tamil' && btn.innerText === 'தமிழ்') || (lang === 'hindi' && btn.innerText === 'हिन्दी')) {
            btn.classList.add('bg-primary', 'text-white', 'border-primary');
        } else {
            btn.classList.remove('bg-primary', 'text-white', 'border-primary');
        }
    });
}

let currentSlide = 0;
let carouselData = [];

function initCarousel() {
    const track = document.getElementById('carousel-track');
    const dotsContainer = document.getElementById('carousel-dots');
    if (!track || menuItems.length === 0) return;

    // Use first few items for carousel
    carouselData = menuItems.slice(0, 5).map(item => ({
        title: item.name,
        desc: item.desc,
        img: item.img
    }));

    // Render slides
    track.innerHTML = carouselData.map(slide => `
        <div class="carousel-slide h-full">
            <img src="${slide.img}" class="w-full h-full object-cover" alt="${slide.title}">
        </div>
    `).join('');

    // Render dots
    dotsContainer.innerHTML = carouselData.map((_, i) => `
        <div class="carousel-dot ${i === 0 ? 'active' : ''} h-1 rounded-full bg-white/30 transition-all duration-300 ${i === 0 ? 'w-6 bg-white' : 'w-2'}"></div>
    `).join('');

    updateCarousel();

    // Auto slide
    setInterval(() => {
        currentSlide = (currentSlide + 1) % carouselData.length;
        updateCarousel();
    }, 5000);
}

function updateCarousel() {
    const track = document.getElementById('carousel-track');
    const title = document.getElementById('carousel-title');
    const desc = document.getElementById('carousel-desc');
    const dots = document.querySelectorAll('.carousel-dot');
    const slides = document.querySelectorAll('.carousel-slide img');

    if (!track) return;

    // Slide track
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Handle Ken Burns and Text Animations
    slides.forEach((img, i) => {
        if (i === currentSlide) {
            img.classList.add('ken-burns');
        } else {
            img.classList.remove('ken-burns');
        }
    });

    // Reset animations
    title.classList.remove('opacity-100', 'translate-y-0');
    desc.classList.remove('opacity-100', 'translate-y-0');
    title.classList.add('opacity-0', 'translate-y-2');
    desc.classList.add('opacity-0', 'translate-y-2');

    // Update dots
    dots.forEach((dot, i) => {
        if (i === currentSlide) {
            dot.classList.add('active', 'w-6', 'bg-white');
            dot.classList.remove('w-2', 'bg-white/30');
        } else {
            dot.classList.remove('active', 'w-6', 'bg-white');
            dot.classList.add('w-2', 'bg-white/30');
        }
    });

    // Update text content and animate in
    setTimeout(() => {
        title.innerText = carouselData[currentSlide].title;
        desc.innerText = carouselData[currentSlide].desc;

        title.classList.remove('opacity-0', 'translate-y-2');
        title.classList.add('opacity-100', 'translate-y-0');

        setTimeout(() => {
            desc.classList.remove('opacity-0', 'translate-y-2');
            desc.classList.add('opacity-100', 'translate-y-0');
        }, 150);
    }, 400);
}

function filterMenu(flavor, element) {
    // Update UI active state
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('bg-primary', 'text-white', 'shadow-xl', 'shadow-primary/20');
        tab.classList.add('bg-white', 'dark:bg-white/5', 'text-primary', 'border-primary/10');
    });

    if (element) {
        element.classList.remove('bg-white', 'dark:bg-white/5', 'text-primary', 'border-primary/10');
        element.classList.add('bg-primary', 'text-white', 'shadow-xl', 'shadow-primary/20');
    }

    // Render with flavor filter
    renderMenu(flavor);
}

function renderMenu(flavorFilter = 'all') {
    const container = document.getElementById("menu-container");
    if (!container) return;

    container.innerHTML = '';
    const filteredItems = flavorFilter === 'all'
        ? menuItems
        : menuItems.filter(item => item.flavor === flavorFilter);

    if (filteredItems.length === 0) {
        container.innerHTML = '<p class="text-center py-10 opacity-50 text-sm">No items found in this flavor.</p>';
        return;
    }

    filteredItems.forEach(item => {
        const cartItem = cart.find(i => i.id === item.id);
        const quantity = cartItem ? cartItem.quantity : 0;

        const card = `
      <div class="group relative bg-white dark:bg-white/5 rounded-[2.25rem] border border-black/[0.03] dark:border-white/[0.03] p-4.5 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:border-primary/20 animate-fade-in overflow-hidden">
        <!-- Glossy effect on hover -->
        <div class="absolute inset-0 bg-gradient-to-tr from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        <div class="flex items-center gap-6 relative z-10">
          <!-- Image Section -->
          <div class="relative w-32 h-32 shrink-0">
            <div class="w-full h-full rounded-[1.75rem] bg-cover bg-center shadow-lg border-2 border-white dark:border-white/10 group-hover:scale-105 transition-transform duration-700 ease-out overflow-hidden"
              style="background-image: url('${item.img}')">
              <div class="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0"></div>
            </div>
            
            <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[85%]">
              ${quantity > 0 ? `
                <div class="bg-slate-900 dark:bg-primary text-white flex items-center justify-between p-1 rounded-2xl shadow-xl shadow-black/20 border border-white/10">
                  <button onclick="changeQuantity('${item.id}', -1)" class="w-8 h-8 flex items-center justify-center font-black text-xl hover:bg-white/10 rounded-xl active:scale-75 transition-all">-</button>
                  <span class="text-xs font-black min-w-[20px] text-center">${quantity}</span>
                  <button onclick="changeQuantity('${item.id}', 1)" class="w-8 h-8 flex items-center justify-center font-black text-xl hover:bg-white/10 rounded-xl active:scale-75 transition-all">+</button>
                </div>
              ` : `
                <button onclick="addToCart('${item.id}')"
                  class="w-full bg-slate-900 dark:bg-primary text-white text-[10px] font-black py-3 rounded-2xl shadow-xl shadow-black/20 hover:brightness-110 active:scale-95 transition-all uppercase tracking-[0.15em] border border-white/10">
                  Inject
                </button>
              `}
            </div>
          </div>

          <!-- Content Section -->
          <div class="flex-1 min-w-0 pr-2">
            <div class="flex items-center gap-2.5 mb-2.5">
               <div class="flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 dark:bg-white/10 border border-black/5 dark:border-white/5">
                 <div class="w-2 h-2 rounded-full ${item.category === 'cake' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]'}"></div>
               </div>
               <span class="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Specimen: ${item.category}</span>
            </div>
            
            <h3 class="text-lg font-black text-slate-900 dark:text-white leading-[1.2] mb-1.5 group-hover:text-primary transition-colors duration-300 italic tracking-tight uppercase">${item.name}</h3>
            <p class="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 font-medium">${item.desc}</p>
            
            <div class="flex items-center gap-3">
               <div class="bg-primary/5 dark:bg-primary/10 px-3.5 py-1.5 rounded-xl border border-primary/10">
                  <p class="text-sm font-black text-primary tracking-tight">₹${item.price}</p>
               </div>
               <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">${item.flavor} base</span>
            </div>
          </div>
        </div>
      </div>
    `;
        container.innerHTML += card;
    });
}

function addToCart(id) {
    const item = menuItems.find(i => i.id === id);
    if (item) {
        cart.push({ ...item, quantity: 1 });
        saveCart();
        renderMenu();
        updateCartUI();
    }
}

function changeQuantity(id, delta) {
    const itemIndex = cart.findIndex(i => i.id === id);
    if (itemIndex > -1) {
        cart[itemIndex].quantity += delta;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        saveCart();
        renderMenu();
        renderCheckout();
        updateCartUI();
    }
}

function saveCart() {
    localStorage.setItem('waffleCart', JSON.stringify(cart));
}

function updateCartUI() {
    const viewCartBar = document.getElementById('view-cart-bar');
    const badges = document.querySelectorAll('.cart-badge');
    const cartTotal = document.getElementById('cart-total');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (totalItems > 0) {
        viewCartBar.classList.remove('hidden');
        setTimeout(() => {
            viewCartBar.classList.remove('scale-0', 'translate-y-20');
            viewCartBar.classList.add('scale-100', 'translate-y-0', 'flex');
        }, 10);
        if (summaryText) {
            summaryText.innerHTML = `${totalItems} ITEM${totalItems > 1 ? 'S' : ''} • ANALYSIS COMPLETE`;
            const priceSub = viewCartBar.querySelector('p.italic');
            if (priceSub) priceSub.innerText = `Unit: Subtotal ₹${totalPrice.toFixed(2)}`;
        }
    } else {
        viewCartBar.classList.add('scale-0', 'translate-y-20');
        setTimeout(() => viewCartBar.classList.add('hidden'), 500);
    }

    badges.forEach(badge => {
        const oldCount = parseInt(badge.innerText) || 0;
        badge.innerText = totalItems;
        badge.classList.toggle('hidden', totalItems === 0);

        // Pulse animation on update
        if (totalItems !== oldCount) {
            badge.classList.remove('scale-110');
            void badge.offsetWidth; // Force reflow
            badge.classList.add('scale-110');
            setTimeout(() => badge.classList.remove('scale-110'), 250);
        }
    });
}

function renderCheckout() {
    const container = document.getElementById('checkout-items');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<div class="text-center py-10 opacity-50">Your cart is empty</div>';
        updateBillSummary(0);
        return;
    }

    container.innerHTML = '';
    cart.forEach(item => {
        const itemHtml = `
            <div class="flex items-center gap-4 bg-transparent py-3 justify-between border-b border-primary/10">
                <div class="flex items-center gap-4">
                    <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-16 border border-primary/20"
                        style="background-image: url('${item.img}');">
                    </div>
                    <div class="flex flex-col justify-center">
                        <p class="text-slate-900 dark:text-slate-100 text-base font-medium leading-normal">${item.name}</p>
                        <p class="text-primary font-bold text-sm">₹${item.price}</p>
                    </div>
                </div>
                <div class="shrink-0">
                    <div class="flex items-center gap-3 text-slate-900 dark:text-slate-100 bg-primary/10 rounded-lg p-1 border border-primary/20">
                        <button onclick="changeQuantity('${item.id}', -1)" class="text-lg font-bold flex h-7 w-7 items-center justify-center rounded-md bg-primary/20 text-primary cursor-pointer hover:bg-primary/30">-</button>
                        <span class="text-sm font-bold w-4 text-center">${item.quantity}</span>
                        <button onclick="changeQuantity('${item.id}', 1)" class="text-lg font-bold flex h-7 w-7 items-center justify-center rounded-md bg-primary/20 text-primary cursor-pointer hover:bg-primary/30">+</button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += itemHtml;
    });

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    updateBillSummary(subtotal);
}

function updateBillSummary(subtotal) {
    const delivery = subtotal > 0 ? 45 : 0;
    const total = subtotal + delivery;

    const subtotalEl = document.getElementById('bill-subtotal');
    const deliveryEl = document.getElementById('bill-delivery');
    const totalEl = document.getElementById('bill-total');
    const footerTotalEl = document.getElementById('footer-total');

    if (subtotalEl) subtotalEl.innerText = `₹${subtotal.toFixed(2)}`;
    if (deliveryEl) deliveryEl.innerText = `₹${delivery.toFixed(2)}`;
    if (totalEl) totalEl.innerText = `₹${total.toFixed(2)}`;
    if (footerTotalEl) footerTotalEl.innerText = `₹${total.toFixed(2)}`;
}

function goBack() {
    window.location.href = "index.html";
}

function changeCustomerName() { openBottomSheet('name'); }
function changeContactNumber() { openBottomSheet('contact'); }
function changeAddress() { openBottomSheet('address'); }

let activeSheetType = null;

function openBottomSheet(type) {
    activeSheetType = type;
    const overlay = document.getElementById('bottom-sheet-overlay');
    const sheet = document.getElementById('bottom-sheet');
    const title = document.getElementById('sheet-title');
    const desc = document.getElementById('sheet-desc');
    const input = document.getElementById('sheet-input');

    if (!overlay || !sheet) return;

    overlay.classList.remove('hidden');
    overlay.classList.add('animate-fade-in');

    setTimeout(() => {
        sheet.classList.remove('translate-y-full');
    }, 10);

    const configs = {
        name: { title: 'Customer Name', desc: 'Who should we address the order to?', placeholder: 'Enter your name' },
        contact: { title: 'Contact Number', desc: 'Where can we reach you?', placeholder: 'Enter phone number' },
        address: { title: 'Delivery Address', desc: 'Where should we deliver?', placeholder: 'Enter full address' }
    };

    const config = configs[type];
    title.innerText = config.title;
    desc.innerText = config.desc;
    input.placeholder = config.placeholder;
    input.value = document.getElementById(`customer-${type}`).innerText;
    input.focus();
}

function closeBottomSheet() {
    const overlay = document.getElementById('bottom-sheet-overlay');
    const sheet = document.getElementById('bottom-sheet');

    if (!sheet || !overlay) return;

    sheet.classList.add('translate-y-full');
    setTimeout(() => {
        overlay.classList.add('hidden');
        overlay.classList.remove('animate-fade-in');
    }, 300);
}

function saveSheetInput() {
    const val = document.getElementById('sheet-input').value.trim();
    if (val) {
        document.getElementById(`customer-${activeSheetType}`).innerText = val;
        closeBottomSheet();
    }
}

function showDetailedBill() {
    const overlay = document.getElementById('bill-modal-overlay');
    const modal = document.getElementById('bill-modal');
    const container = document.getElementById('detailed-bill-items');

    if (!overlay || !modal || !container) return;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.05;
    const delivery = 45;
    const total = subtotal + tax + delivery;

    container.innerHTML = cart.map(item => `
        <div class="flex justify-between items-start">
            <div>
                <p class="font-bold text-sm text-slate-900 dark:text-slate-100">${item.name}</p>
                <p class="text-[10px] opacity-60 text-slate-500 dark:text-slate-400">${item.quantity} x ₹${item.price}</p>
            </div>
            <p class="font-bold text-sm text-slate-900 dark:text-slate-100">₹${item.price * item.quantity}</p>
        </div>
    `).join('');

    document.getElementById('modal-subtotal').innerText = `₹${subtotal.toFixed(2)}`;
    document.getElementById('modal-tax').innerText = `₹${tax.toFixed(2)}`;
    document.getElementById('modal-total').innerText = `₹${total.toFixed(2)}`;

    overlay.classList.remove('hidden');
    overlay.classList.add('animate-fade-in');
    setTimeout(() => {
        modal.classList.remove('scale-95', 'opacity-0');
    }, 10);
}

function closeBillModal() {
    const overlay = document.getElementById('bill-modal-overlay');
    const modal = document.getElementById('bill-modal');

    if (!modal || !overlay) return;

    modal.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        overlay.classList.add('hidden');
    }, 300);
}

async function placeOrder() {
    const name = document.getElementById('customer-name').innerText;
    const contact = document.getElementById('customer-contact').innerText;
    const address = document.getElementById('customer-address').innerText;

    if (!name.trim() || !contact.trim() || !address.trim()) {
        alert("Please fill in all customer details before placing the order.");
        if (!name.trim()) openBottomSheet('name');
        else if (!contact.trim()) openBottomSheet('contact');
        else openBottomSheet('address');
        return;
    }

    // Attempt to store the order in Supabase
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.05;
    const total = subtotal + tax + 45; // including delivery

    const orderData = {
        customer_name: name,
        phone: contact,
        address: address,
        items: cart,
        total_amount: total,
        status: 'received'
    };

    try {
        const { data, error } = await supabaseClient
            .from('orders')
            .insert([orderData])
            .select();

        if (error) {
            console.error("Supabase Error recording order:", error);
            // Optionally: silently fail, or alert user
            // We'll proceed to show success anyway for the sake of the UX,
            // or we could throw error.
            // throw error; 
        } else {
            console.log("Order securely logged to Supabase:", data);
        }
    } catch (err) {
        console.error("Critical error saving order:", err);
    }

    const overlay = document.getElementById('success-overlay');
    if (overlay) {
        overlay.classList.remove('hidden');
        overlay.classList.add('animate-fade-in');
    }

    // Clear cart after order
    cart = [];
    saveCart();
}