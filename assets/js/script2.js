document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".counter-value");
  const speed = 150; 

  const startCounting = (counter) => {
    const updateCount = () => {
      const target = parseInt(counter.getAttribute("data-target"));
      const count = parseInt(counter.innerText);

     
      const increment = Math.ceil(target / speed);

      if (count < target) {
        counter.innerText = count + increment > target ? target : count + increment;
        setTimeout(updateCount, 15);
      } else {
        
        if (counter.parentElement.innerText.indexOf('%') === -1 && !counter.innerText.includes('+')) {
          counter.innerText = target + " +";
        } else {
          counter.innerText = target;
        }
      }
    };
    updateCount();
  };

 
  const observerOptions = {
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounting(entry.target);
        observer.unobserve(entry.target); 
      }
    });
  }, observerOptions);

  counters.forEach((counter) => {
    observer.observe(counter);
  });
});