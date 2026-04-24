/* ============================================ */
// Add this to your existing script.js file
/* ============================================ */

/* ============================================ */
/* COUNTER ANIMATION
/* ============================================ */
const moneyCounters = document.querySelectorAll('.counter-fact');

function animateMoneyCounters() {
    moneyCounters.forEach(function(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const count = parseInt(counter.innerText);
        const increment = target / 200;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateMoneyCounters, 1);
        } else {
            counter.innerText = target;
        }
    });
}

// Start counter when in viewport
const moneyCounterSection = document.querySelector('.donation-stats');
if (moneyCounterSection) {
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                animateMoneyCounters();
                observer.unobserve(entry.target);
            }
        });
    });
    observer.observe(moneyCounterSection);
}

/* ============================================ */
/* DONATION AMOUNT SELECTION
/* ============================================ */
const amountBtns = document.querySelectorAll('.amount-btn:not(.custom-amount-btn)');
const customAmountBtn = document.querySelector('.custom-amount-btn');
const customAmountInput = document.querySelector('.custom-amount-input');
const showPaymentBtn = document.getElementById('showPaymentBtn');
const paymentMethodsSection = document.getElementById('paymentMethods');
const donationFormSection = document.getElementById('donationForm');
const displayAmount = document.getElementById('displayAmount');
const displayType = document.getElementById('displayType');
const donationType = document.getElementById('donationType');

let selectedAmount = 0;

if (amountBtns.length > 0) {
    amountBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            amountBtns.forEach(function(b) {
                b.classList.remove('active');
            });
            this.classList.add('active');
            customAmountInput.style.display = 'none';
            selectedAmount = parseInt(this.getAttribute('data-amount'));
        });
    });
}

if (customAmountBtn) {
    customAmountBtn.addEventListener('click', function() {
        amountBtns.forEach(function(b) {
            b.classList.remove('active');
        });
        customAmountInput.style.display = 'block';
        selectedAmount = 0;
    });
}

if (showPaymentBtn) {
    showPaymentBtn.addEventListener('click', function() {
        let amount = selectedAmount;
        const customAmount = document.getElementById('customAmount');
        
        if (customAmountInput.style.display === 'block' && customAmount) {
            amount = parseFloat(customAmount.value);
        }
        
        if (!amount || amount <= 0) {
            showNotification('សូមជ្រើសរើស ឬបញ្ចូលចំនួនទឹកប្រាក់', 'error');
            return;
        }
        
        // Store amount and type
        if (displayAmount) {
            displayAmount.value = '$' + amount;
        }
        if (displayType && donationType) {
            const typeText = donationType.value === 'one-time' ? 'បរិច្ចាគតែម្តង' : 'បរិច្ចាគប្រចាំខែ';
            displayType.value = typeText;
        }
        
        // Show payment methods and form
        if (paymentMethodsSection) {
            paymentMethodsSection.style.display = 'block';
            setTimeout(function() {
                paymentMethodsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    });
}

/* ============================================ */
/* COPY BANK ACCOUNT
/* ============================================ */
const copyButtons = document.querySelectorAll('.btn-copy, .btn-copy-sm');

copyButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
        const accountNumber = this.getAttribute('data-account');
        
        navigator.clipboard.writeText(accountNumber).then(function() {
            showNotification('បានចម្លងលេខគណនី: ' + accountNumber, 'success');
        });
    });
});

/* ============================================ */
/* DONATION CONFIRMATION FORM
/* ============================================ */
const confirmForm = document.getElementById('donationConfirmForm');

if (confirmForm) {
    confirmForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const lastName = document.getElementById('lastName').value;
        const firstName = document.getElementById('firstName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const termsCheck = document.getElementById('termsCheck').checked;
        
        if (!lastName || !firstName || !email || !phone) {
            showNotification('សូមបំពេញព័ត៌មានទាំងអស់', 'error');
            return;
        }
        
        if (!termsCheck) {
            showNotification('សូមយល់ព្រមតាមលក្ខខណ្ឌ', 'error');
            return;
        }
        
        // Show success modal
        const successModal = new bootstrap.Modal(document.getElementById('successModal'));
        successModal.show();
        
        // Reset form
        confirmForm.reset();
        
        // Hide payment methods and form sections (optional)
        // setTimeout(function() {
        //     if (paymentMethodsSection) paymentMethodsSection.style.display = 'none';
        //     if (donationFormSection) donationFormSection.style.display = 'none';
        // }, 3000);
    });
}

/* ============================================ */
/* FAQ ACCORDION
/* ============================================ */
const faqItems = document.querySelectorAll('.faq-item');

if (faqItems.length > 0) {
    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const answer = item.querySelector('.faq-answer');
            const icon = this.querySelector('i');
            
            faqItems.forEach(function(otherItem) {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-answer').classList.remove('show');
                    otherItem.querySelector('.faq-question').classList.remove('active');
                }
            });
            
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
    
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        if (window.scrollY > 500) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    }
});

/* ============================================ */
/* BACK TO TOP BUTTON
/* ============================================ */
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
/* CONSOLE LOG
/* ============================================ */
console.log('ស្នាមញញឹមខ្មែរ - Money Donation Page loaded successfully!');