// ============================================================
//  Waffle Lab — Global Language Manager
//  Include this script on EVERY page (before closing </body>)
// ============================================================

const WL_TRANSLATIONS = {
    english: {
        // --- Common / Nav ---
        "nav-products": "Products",
        "nav-settings": "Settings",
        "admin-login": "Administrative Login",

        // --- Index / Home ---
        "today-special": "Today's Special",
        "order-now": "Order Now",
        "filter-all": "All",
        "filter-dark": "Dark",
        "filter-milk": "Milk",
        "filter-classic": "Classic",
        "sig-formulations": "Signature Formulations",

        // --- Settings sheet ---
        "settings-title": "Settings",
        "appearance": "Appearance",
        "mode-light": "Light",
        "mode-dark": "Dark",
        "theme-color": "Theme Color",
        "language": "Language",
        "done": "Done",

        // --- Checkout ---
        "checkout-title": "Checkout",
        "customer-name-lbl": "Customer Name",
        "contact-lbl": "Contact Number",
        "address-lbl": "Delivery Address",
        "your-order": "Your Order",
        "bill-summary": "Bill Summary",
        "item-total": "Item Total",
        "delivery-fee": "Delivery Fee",
        "taxes": "Taxes (5%)",
        "total-pay": "Total Pay",
        "total-amount": "Total Amount",
        "view-detailed": "View Detailed Bill",
        "place-order": "Place Order",
        "cancel": "Cancel",
        "save": "Save",
        "order-summary": "Order Summary",
        "subtotal": "Subtotal",
        "taxes-charges": "Taxes & Charges (5%)",
        "close": "Close",
        "order-placed": "Order Placed!",
        "order-msg": "Your waffles are being prepared with love and will reach you soon.",
        "back-home": "Back to Home",

        // --- Menu page ---
        "our-menu": "Our Waffle Menu",
        "desserts": "Desserts • 25-30 mins",
        "view-cart": "View Cart",
        "proceed": "Proceed",

        // --- Dashboard ---
        "menu-db": "Menu Database",
        "recent-orders": "Recent Orders (24h)",
        "logout": "Logout",
    },

    tamil: {
        "nav-products": "பொருட்கள்",
        "nav-settings": "அமைப்புகள்",
        "admin-login": "நிர்வாகி உள்நுழைவு",

        "today-special": "இன்றைய சிறப்பு",
        "order-now": "இப்போது ஆர்டர் செய்",
        "filter-all": "அனைத்தும்",
        "filter-dark": "டார்க்",
        "filter-milk": "மில்க்",
        "filter-classic": "கிளாசிக்",
        "sig-formulations": "சிறப்பு உணவுகள்",

        "settings-title": "அமைப்புகள்",
        "appearance": "தோற்றம்",
        "mode-light": "ஒளி",
        "mode-dark": "இருள்",
        "theme-color": "தீம் நிறம்",
        "language": "மொழி",
        "done": "முடிந்தது",

        "checkout-title": "செக்அவுட்",
        "customer-name-lbl": "வாடிக்கையாளர் பெயர்",
        "contact-lbl": "தொடர்பு எண்",
        "address-lbl": "டெலிவரி முகவரி",
        "your-order": "உங்கள் ஆர்டர்",
        "bill-summary": "பில் சுருக்கம்",
        "item-total": "பொருள் மொத்தம்",
        "delivery-fee": "டெலிவரி கட்டணம்",
        "taxes": "வரிகள் (5%)",
        "total-pay": "மொத்த தொகை",
        "total-amount": "மொத்த தொகை",
        "view-detailed": "விரிவான பில் பார்க்க",
        "place-order": "ஆர்டர் செய்",
        "cancel": "ரத்து",
        "save": "சேமி",
        "order-summary": "ஆர்டர் சுருக்கம்",
        "subtotal": "துணை மொத்தம்",
        "taxes-charges": "வரிகள் & கட்டணங்கள் (5%)",
        "close": "மூடு",
        "order-placed": "ஆர்டர் வைக்கப்பட்டது!",
        "order-msg": "உங்கள் வாஃப்பிள் அன்போடு தயாரிக்கப்படுகிறது.",
        "back-home": "முகப்பிற்கு திரும்பு",

        "our-menu": "எங்கள் வாஃப்பிள் மெனு",
        "desserts": "இனிப்புகள் • 25-30 நிமிடங்கள்",
        "view-cart": "கார்ட் பார்க்க",
        "proceed": "தொடர்",

        "menu-db": "மெனு தரவுத்தளம்",
        "recent-orders": "சமீபத்திய ஆர்டர்கள் (24 மணி)",
        "logout": "வெளியேறு",
    },

    hindi: {
        "nav-products": "उत्पाद",
        "nav-settings": "सेटिंग्स",
        "admin-login": "एडमिन लॉगिन",

        "today-special": "आज का विशेष",
        "order-now": "अभी ऑर्डर करें",
        "filter-all": "सभी",
        "filter-dark": "डार्क",
        "filter-milk": "मिल्क",
        "filter-classic": "क्लासिक",
        "sig-formulations": "सिग्नेचर आइटम",

        "settings-title": "सेटिंग्स",
        "appearance": "दिखावट",
        "mode-light": "लाइट",
        "mode-dark": "डार्क",
        "theme-color": "थीम रंग",
        "language": "भाषा",
        "done": "हो गया",

        "checkout-title": "चेकआउट",
        "customer-name-lbl": "ग्राहक का नाम",
        "contact-lbl": "संपर्क नंबर",
        "address-lbl": "डिलीवरी पता",
        "your-order": "आपका ऑर्डर",
        "bill-summary": "बिल सारांश",
        "item-total": "आइटम कुल",
        "delivery-fee": "डिलीवरी शुल्क",
        "taxes": "कर (5%)",
        "total-pay": "कुल भुगतान",
        "total-amount": "कुल राशि",
        "view-detailed": "विस्तृत बिल देखें",
        "place-order": "ऑर्डर दें",
        "cancel": "रद्द",
        "save": "सहेजें",
        "order-summary": "ऑर्डर सारांश",
        "subtotal": "उप-कुल",
        "taxes-charges": "कर और शुल्क (5%)",
        "close": "बंद करें",
        "order-placed": "ऑर्डर हो गया!",
        "order-msg": "आपके वैफल्स प्यार से तैयार किए जा रहे हैं।",
        "back-home": "होम पर जाएं",

        "our-menu": "हमारा वैफल मेनू",
        "desserts": "मिठाई • 25-30 मिनट",
        "view-cart": "कार्ट देखें",
        "proceed": "आगे बढ़ें",

        "menu-db": "मेनू डेटाबेस",
        "recent-orders": "हाल के ऑर्डर (24 घंटे)",
        "logout": "लॉग आउट",
    }
};

// Apply translations to all [data-lang] elements
function WL_applyLang(lang) {
    const dict = WL_TRANSLATIONS[lang] || WL_TRANSLATIONS['english'];
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (dict[key] !== undefined) el.innerText = dict[key];
    });
}

// Run on every page load
document.addEventListener('DOMContentLoaded', () => {
    const lang = localStorage.getItem('waffleLang') || 'english';
    WL_applyLang(lang);
});
