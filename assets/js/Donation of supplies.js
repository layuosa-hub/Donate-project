/* ============================================ */
// Add this to your existing script.js file
/* ============================================ */

/* ============================================ */
/* MATERIAL DONATION FORM HANDLING
/* ============================================ */
const materialForm = document.getElementById('materialDonationForm');

if (materialForm) {
    // Show/hide pickup address field
    const deliveryMethod = document.getElementById('deliveryMethod');
    const pickupAddressDiv = document.querySelector('.pickup-address');
    
    if (deliveryMethod) {
        deliveryMethod.addEventListener('change', function() {
            if (this.value === 'pickup') {
                pickupAddressDiv.style.display = 'block';
            } else {
                pickupAddressDiv.style.display = 'none';
            }
        });
    }
    
    // Form submission
    materialForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const lastName = document.getElementById('lastName').value;
        const firstName = document.getElementById('firstName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const materialType = document.getElementById('materialType').value;
        const quantity = document.getElementById('quantity').value;
        const location = document.getElementById('location').value;
        const deliveryMethodValue = document.getElementById('deliveryMethod').value;
        const termsCheck = document.getElementById('termsCheck').checked;
        
        // Validation
        if (!lastName || !firstName || !email || !phone || !materialType || !quantity || !location || !deliveryMethodValue) {
            showNotification('សូមបំពេញព័ត៌មានទាំងអស់', 'error');
            return;
        }
        
        if (!termsCheck) {
            showNotification('សូមយល់ព្រមតាមលក្ខខណ្ឌ', 'error');
            return;
        }
        
        if (deliveryMethodValue === 'pickup') {
            const pickupAddress = document.getElementById('pickupAddress').value;
            if (!pickupAddress) {
                showNotification('សូមបំពេញអាសយដ្ឋានសម្រាប់មកទទួល', 'error');
                return;
            }
        }
        
        // Show success message
        showNotification('អរគុណសម្រាប់ការបរិច្ចាគសម្ភារៈ! យើងនឹងទាក់ទងអ្នកវិញឆាប់ៗ', 'success');
        
        // Reset form
        materialForm.reset();
        pickupAddressDiv.style.display = 'none';
    });
}

/* ============================================ */
/* FAQ ACCORDION (Duplicate protection)
/* ============================================ */
const faqItems = document.querySelectorAll('.faq-item');

if (faqItems.length > 0) {
    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const answer = item.querySelector('.faq-answer');
            const icon = this.querySelector('i');
            
            // Close other FAQs
            faqItems.forEach(function(otherItem) {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-answer').classList.remove('show');
                    otherItem.querySelector('.faq-question').classList.remove('active');
                }
            });
            
            // Toggle current FAQ
            answer.classList.toggle('show');
            this.classList.toggle('active');
        });
    });
}

/* ============================================ */
/* NEWSLETTER FORM
/* ============================================ */
const newsletterForms = document.querySelectorAll('.newsletter-form');

newsletterForms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        if (email && isValidEmail(email)) {
            showNotification('អរគុណសម្រាប់ការជាវព័ត៌មាន!', 'success');
            this.reset();
        } else {
            showNotification('សូមបញ្ចូលអ៊ីមែលឱ្យបានត្រឹមត្រូវ', 'error');
        }
    });
});

/* ============================================ */
/* EMAIL VALIDATION
/* ============================================ */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/* ============================================ */
/* NOTIFICATION SYSTEM
/* ============================================ */
function showNotification(message, type) {
    type = type || 'success';
    
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification notification-' + type;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 15px 25px;
        border-radius: 50px;
        display: flex;
        align-items: center;
        gap: 15px;
        z-index: 9999;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        animation: slideInRight 0.5s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(function() {
        if (notification) {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(function() {
                notification.remove();
            }, 500);
        }
    }, 5000);
}

// Add notification animations if not exists
if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

/* ============================================ */
/* BACK TO TOP BUTTON
/* ============================================ */
window.addEventListener('scroll', function() {
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        if (window.scrollY > 500) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    }
});

const backToTop = document.getElementById('backToTop');
if (backToTop) {
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ============================================ */
/* AOS INITIALIZATION
/* ============================================ */
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-in-out'
});

/* ============================================ */
/* PRELOADER
/* ============================================ */
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(function() {
            preloader.style.opacity = '0';
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }, 500);
    }
});

/* ============================================ */
/* NAVBAR SCROLL EFFECT
/* ============================================ */
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNav');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

/* ============================================ */
/* CONSOLE LOG
/* ============================================ */
console.log('ស្នាមញញឹមខ្មែរ - Material Donation Page loaded successfully!');