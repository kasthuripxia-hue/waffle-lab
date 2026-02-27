const menuItems = [
  // Waffles
  {
    id: "belgian-classic",
    name: "Classic Belgian Waffle",
    price: 179,
    desc: "Golden waffle with maple syrup.",
    img: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg"
  },
  {
    id: "triple-dark-waffle",
    name: "Triple Dark Chocolate",
    price: 250,
    desc: "Dark chocolate ganache overload.",
    img: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg"
  },
  {
    id: "strawberry-bliss",
    name: "Strawberry Bliss",
    price: 120,
    desc: "Fresh strawberries & whipped cream.",
    img: "https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg"
  },
  {
    id: "nutella-crunch",
    name: "Nutella Crunch",
    price: 179,
    desc: "Nutella with roasted hazelnuts.",
    img: "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg"
  },
  {
    id: "oreo-madness",
    name: "Oreo Madness",
    price: 350,
    desc: "Loaded with Oreo crumble.",
    img: "https://images.pexels.com/photos/45202/waffle-dessert-sweet-breakfast-45202.jpeg"
  },
  {
    id: "honey-glazed",
    name: "Honey Glazed",
    price: 169,
    desc: "Traditional waffle with pure organic honey.",
    img: "https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg"
  },
  // Cakes
  {
    id: "midnight-truffle",
    name: "Midnight Chocolate Cake",
    price: 299,
    desc: "Rich dark chocolate truffle layers.",
    img: "https://images.pexels.com/photos/132694/pexels-photo-132694.jpeg",
    category: "cake",
    flavor: "dark"
  },
  {
    id: "milk-ribbon-cake",
    name: "Milk Chocolate Ribbon",
    price: 279,
    desc: "Silky milk chocolate silk cake.",
    img: "https://images.pexels.com/photos/2144112/pexels-photo-2144112.jpeg",
    category: "cake",
    flavor: "milk"
  },
  {
    id: "vanilla-classic-cake",
    name: "Pure Vanilla Bean",
    price: 249,
    desc: "Classic vanilla sponge with bean frosting.",
    img: "https://images.pexels.com/photos/140831/pexels-photo-140831.jpeg",
    category: "cake",
    flavor: "classic"
  },
  {
    id: "dark-gateau",
    name: "Dark Forest Gateau",
    price: 320,
    desc: "Cherries and dark chocolate shavings.",
    img: "https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg",
    category: "cake",
    flavor: "dark"
  },
  // Brownies
  {
    id: "walnut-dark-brownie",
    name: "Dark Walnut Brownie",
    price: 149,
    desc: "Bittersweet cocoa with crunchy walnuts.",
    img: "https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg",
    category: "brownie",
    flavor: "dark"
  },
  {
    id: "fudgy-classic-brownie",
    name: "Classic Fudgy",
    price: 129,
    desc: "Traditional melt-in-your-mouth brownie.",
    img: "https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg",
    category: "brownie",
    flavor: "classic"
  },
  {
    id: "caramel-milk-brownie",
    name: "Milk Caramel Swirl",
    price: 159,
    desc: "Milk chocolate with salted caramel.",
    img: "https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg",
    category: "brownie",
    flavor: "milk"
  },
  {
    id: "double-dark-brownie",
    name: "Double Dark Lava",
    price: 169,
    desc: "Extra dark chocolate with a gooey center.",
    img: "https://images.pexels.com/photos/3026801/pexels-photo-3026801.jpeg",
    category: "brownie",
    flavor: "dark"
  }
];

let cart = JSON.parse(localStorage.getItem('waffleCart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    console.log('The Waffle Lab initialized');
    renderMenu();
    renderCheckout();
    updateCartUI();
    initCarousel();
});

let currentSlide = 0;
const carouselData = [
    { title: "Gourmet Belgian", desc: "Crafted with love and artisanal dough.", img: menuItems[0].img },
    { title: "Chocolate Overload", desc: "A symphony of three dark chocolate textures.", img: menuItems[1].img },
    { title: "Berry Fresh", desc: "Topped with hand-picked summer strawberries.", img: menuItems[2].img },
    { title: "Velvet Ribbon", desc: "Silky layers of milk chocolate cake.", img: menuItems[7].img },
    { title: "Dark Walnut", desc: "Rich bittersweet cocoa with a crunch.", img: menuItems[10].img }
];

function initCarousel() {
    const track = document.getElementById('carousel-track');
    const dotsContainer = document.getElementById('carousel-dots');
    if (!track) return;

    // Render slides
    track.innerHTML = carouselData.map(slide => `
        <div class="carousel-slide h-full">
            <img src="${slide.img}" class="w-full h-full object-cover" alt="${slide.title}">
        </div>
    `).join('');

    // Render dots
    dotsContainer.innerHTML = carouselData.map((_, i) => `
        <div class="carousel-dot ${i === 0 ? 'active' : ''}"></div>
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
        dot.classList.toggle('active', i === currentSlide);
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
        tab.classList.remove('bg-primary', 'text-white', 'shadow-lg');
        tab.classList.add('bg-primary/10', 'text-primary');
    });
    
    if (element) {
        element.classList.remove('bg-primary/10', 'text-primary');
        element.classList.add('bg-primary', 'text-white', 'shadow-lg');
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
      <div class="p-3 bg-primary/5 dark:bg-white/5 rounded-xl border border-primary/10 mb-4 transition-all hover:border-primary/30 animate-fade-in">
        <div class="flex justify-between gap-4">
          <div class="flex-1">
            <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">${item.name}</h3>
            <p class="text-xs text-primary font-bold mb-1">₹${item.price}</p>
            <p class="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2">${item.desc}</p>
          </div>
          <div class="relative w-24 h-24 shrink-0">
            <div class="w-full h-full rounded-lg bg-cover bg-center border border-primary/10"
              style="background-image: url('${item.img}')">
            </div>
            ${quantity > 0 ? `
              <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-primary text-white flex items-center gap-3 px-2 py-1 rounded-md shadow-md">
                <button onclick="changeQuantity('${item.id}', -1)" class="font-bold px-1 text-xs">-</button>
                <span class="text-[10px] font-bold min-w-[12px] text-center">${quantity}</span>
                <button onclick="changeQuantity('${item.id}', 1)" class="font-bold px-1 text-xs">+</button>
              </div>
            ` : `
              <button onclick="addToCart('${item.id}')"
                class="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-md shadow-md hover:bg-primary/90 transition-colors">
                ADD
              </button>
            `}
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

    if (viewCartBar) {
        if (totalItems > 0) {
            viewCartBar.classList.remove('hidden');
            if (cartTotal) cartTotal.innerText = `₹${totalPrice}`;
            const summaryText = document.getElementById('cart-summary-text');
            if (summaryText) summaryText.innerText = `${totalItems} ITEM${totalItems > 1 ? 'S' : ''} | ₹${totalPrice}`;
        } else {
            viewCartBar.classList.add('hidden');
        }
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

function placeOrder() {
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

    const overlay = document.getElementById('success-overlay');
    if (overlay) {
        overlay.classList.remove('hidden');
        overlay.classList.add('animate-fade-in');
    }

    // Clear cart after order
    cart = [];
    saveCart();
}