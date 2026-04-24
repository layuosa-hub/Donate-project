/* ============================================ */
// Add this to your existing script.js file
/* ============================================ */

/* ============================================ */
/* COUNTER ANIMATION
/* ============================================ */
const foodCounters = document.querySelectorAll('.counter-fact');

function animateFoodCounters() {
    foodCounters.forEach(function(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const count = parseInt(counter.innerText);
        const increment = target / 200;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateFoodCounters, 1);
        } else {
            counter.innerText = target;
        }
    });
}

// Start counter when in viewport
const foodCounterSection = document.querySelector('.food-crisis-stats');
if (foodCounterSection) {
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                animateFoodCounters();
                observer.unobserve(entry.target);
            }
        });
    });
    observer.observe(foodCounterSection);
}

/* ============================================ */
/* FOOD DONATION BUTTONS
/* ============================================ */
const donateFoodBtns = document.querySelectorAll('.btn-donate-food');
const donationFormSection = document.getElementById('donationForm');
const selectedFoodTypeInput = document.getElementById('selectedFoodType');
const foodTypeDisplay = document.getElementById('foodTypeDisplay');

let selectedFood = '';

if (donateFoodBtns.length > 0) {
    donateFoodBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const food = this.getAttribute('data-food');
            selectedFood = food;
            
            // Set food type display
            if (selectedFoodTypeInput) {
                selectedFoodTypeInput.value = food;
            }
            
            // Set display name
            let foodName = '';
            switch(food) {
                case 'rice':
                    foodName = 'អង្ករ';
                    break;
                case 'noodles':
                    foodName = 'មី និងគុយទាវ';
                    break;
                case 'canned':
                    foodName = 'ត្រីខ និងសាច់កំប៉ុង';
                    break;
                case 'oil':
                    foodName = 'ប្រេងឆា';
                    break;
                case 'water':
                    foodName = 'ទឹកបរិសុទ្ធ';
                    break;
                case 'milk':
                    foodName = 'ទឹកដោះគោទារក';
                    break;
                case 'vitamin':
                    foodName = 'អាហារសម្បូរវីតាមីន';
                    break;
                case 'snacks':
                    foodName = 'នំប៉័ង និងប៊ីស្គីត';
                    break;
                default:
                    foodName = 'អាហារ';
            }
            
            if (foodTypeDisplay) {
                foodTypeDisplay.value = foodName;
            }
            
            const selectedFoodInfo = document.getElementById('selectedFoodInfo');
            if (selectedFoodInfo) {
                selectedFoodInfo.innerHTML = `<strong>អ្នកកំពុងបរិច្ចាគ៖ ${foodName}</strong>`;
            }
            
            // Show donation form
            if (donationFormSection) {
                donationFormSection.style.display = 'block';
                setTimeout(function() {
                    donationFormSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 100);
            }
        });
    });
}

/* ============================================ */
/* FOOD DONATION FORM SUBMISSION
/* ============================================ */
const foodForm = document.getElementById('foodDonationForm');

if (foodForm) {
    // Show/hide pickup address
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
    
    foodForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const lastName = document.getElementById('lastName').value;
        const firstName = document.getElementById('firstName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const quantity = document.getElementById('quantity').value;
        const location = document.getElementById('location').value;
        const deliveryMethodValue = document.getElementById('deliveryMethod').value;
        const termsCheck = document.getElementById('termsCheck').checked;
        
        if (!lastName || !firstName || !email || !phone || !quantity || !location || !deliveryMethodValue) {
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
        
        showNotification('អរគុណសម្រាប់ការបរិច្ចាគអាហារ! ក្រុមការងារនឹងទាក់ទងអ្នកវិញឆាប់ៗ', 'success');
        
        foodForm.reset();
        if (pickupAddressDiv) pickupAddressDiv.style.display = 'none';
        if (donationFormSection) donationFormSection.style.display = 'none';
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
            to { transform: translateX(0%); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0%); opacity: 1; }
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
console.log('ស្នាមញញឹមខ្មែរ - Food Donation Page loaded successfully!');