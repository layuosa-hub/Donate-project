document.addEventListener('DOMContentLoaded', function() {
    const foodForm = document.getElementById('foodDonationForm');
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));

    if (foodForm) {
        foodForm.addEventListener('submit', function(e) {
            e.preventDefault(); // បញ្ឈប់ការ Refresh ទំព័រ

            // ១. ចាប់យកទិន្នន័យពី Input (សម្រាប់យកទៅប្រើជាមួយ PHP/API ទៅថ្ងៃក្រោយ)
            const formData = new FormData(foodForm);
            console.log("ទិន្នន័យដែលបានផ្ញើ៖", Object.fromEntries(formData));

            // ២. បង្ហាញ Loading សិន (Optional - បើចង់ឱ្យមើលទៅកាន់តែដូច Process មែនទែន)
            const submitBtn = foodForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>កំពុងបញ្ជូន...';

            // ៣. បង្កើតការរង់ចាំបែបរវើរវាយ (Simulate Processing) រយៈពេល ១.៥ វិនាទី
            setTimeout(() => {
                // បង្ហាញ Modal ជោគជ័យ
                successModal.show();

                // កំណត់ Form ឱ្យទៅដើមវិញ
                foodForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                
                // លាក់ផ្នែក Form បើចង់ (Optional)
                // document.getElementById('donationFormSection').style.display = 'none';
            }, 1500);
        });
    }
});

// ========section======
(function () {
        AOS.init({ duration: 700, once: true });
        window.addEventListener("load", () => {
          const preloader = document.getElementById("preloader");
          preloader.style.opacity = "0";
          setTimeout(() => (preloader.style.display = "none"), 400);
        });

        // counter animation
        const counters = document.querySelectorAll(".counter-fact");
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute("data-target");
                let count = 0;
                const increment = target / 45;
                const update = () => {
                  count += increment;
                  if (count < target) {
                    counter.innerText = Math.ceil(count);
                    requestAnimationFrame(update);
                  } else counter.innerText = target.toLocaleString();
                };
                update();
                observer.unobserve(counter);
              }
            });
          },
          { threshold: 0.4 },
        );
        counters.forEach((c) => observer.observe(c));

        // show donation form on food button click
        const donateBtns = document.querySelectorAll(".btn-donate-food");
        const formSection = document.getElementById("donationFormSection");
        const selectedFoodInput = document.getElementById("selectedFoodType");
        const foodTypeDisplay = document.getElementById("foodTypeDisplay");
        const selectedInfo = document.getElementById("selectedFoodInfo");

        donateBtns.forEach((btn) => {
          btn.addEventListener("click", () => {
            const foodName = btn.getAttribute("data-food");
            selectedFoodInput.value = foodName;
            foodTypeDisplay.value = foodName;
            selectedInfo.innerText = `អ្នកកំពុងបរិច្ចាគ៖ ${foodName}`;
            formSection.style.display = "block";
            window.scrollTo({
              top: formSection.offsetTop - 80,
              behavior: "smooth",
            });
          });
        });

        // toggle pickup address
        const deliverySelect = document.getElementById("deliveryMethod");
        const pickupDiv = document.querySelector(".pickup-address");
        if (deliverySelect) {
          deliverySelect.addEventListener("change", () => {
            pickupDiv.style.display =
              deliverySelect.value === "pickup" ? "block" : "none";
          });
        }

        // FAQ toggle
        document.querySelectorAll(".faq-question").forEach((q) => {
          q.addEventListener("click", () => {
            const ans = q.nextElementSibling;
            ans.style.display =
              ans.style.display === "block" ? "none" : "block";
          });
        });
        // Back to top
        const backBtn = document.getElementById("backToTop");
        window.addEventListener(
          "scroll",
          () =>
            (backBtn.style.display = window.scrollY > 300 ? "flex" : "none"),
        );
        backBtn.addEventListener("click", () =>
          window.scrollTo({ top: 0, behavior: "smooth" }),
        );
      })();