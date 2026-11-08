// =====================================
// GLOW BEAUTY STUDIO
// JAVASCRIPT ES6
// =====================================


// 1. MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {

  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));

  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close menu" : "Open menu"
  );

  menuToggle.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';

});


// Close menu after clicking navigation links

navItems.forEach((link) => {

  link.addEventListener("click", () => {

    navLinks.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");

    menuToggle.innerHTML =
      '<i class="fa-solid fa-bars"></i>';

  });

});


// 2. HEADER SHADOW ON SCROLL

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

  if (window.scrollY > 30) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

}, { passive: true });


// 3. REVEAL ANIMATION

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(

  (entries, observer) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);

      }

    });

  },

  {
    threshold: 0.12
  }

);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});


// 4. ACTIVE NAVIGATION ON SCROLL

const pageSections = document.querySelectorAll("main section[id]");

function updateNavigation() {

  let currentSection = "home";

  pageSections.forEach((section) => {

    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop <= 160) {
      currentSection = section.id;
    }

  });

  navItems.forEach((link) => {

    const isActive =
      link.getAttribute("href") === `#${currentSection}`;

    link.classList.toggle("active", isActive);

  });

}

window.addEventListener("scroll", updateNavigation, {
  passive: true
});


// 5. SERVICE CATEGORY FILTER

const serviceFilters = document.querySelectorAll(".filter-btn");
const serviceCards = document.querySelectorAll(".service-card");

serviceFilters.forEach((button) => {

  button.addEventListener("click", () => {

    const selectedCategory = button.dataset.filter;

    // Update active filter button

    serviceFilters.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    // Show matching services

    serviceCards.forEach((card) => {

      const category = card.dataset.category;

      const shouldShow =
        selectedCategory === "all" ||
        selectedCategory === category;

      card.classList.toggle("hidden", !shouldShow);

    });

  });

});


// 6. GALLERY FILTER

const galleryFilters = document.querySelectorAll(".gallery-filter");
const galleryItems = document.querySelectorAll(".gallery-item");

galleryFilters.forEach((button) => {

  button.addEventListener("click", () => {

    const selectedCategory = button.dataset.filter;

    galleryFilters.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    galleryItems.forEach((item) => {

      const category = item.dataset.category;

      const shouldShow =
        selectedCategory === "all" ||
        selectedCategory === category;

      item.classList.toggle("hidden", !shouldShow);

    });

  });

});


// 7. SELECT SERVICE FROM SERVICE CARD

const serviceBookingButtons =
  document.querySelectorAll(".service-book");

const serviceSelect =
  document.getElementById("serviceSelect");

serviceBookingButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const selectedService = button.dataset.service;

    serviceSelect.value = selectedService;

  });

});


// 8. TESTIMONIAL SLIDER

const testimonials =
  document.querySelectorAll(".testimonial");

const previousButton =
  document.getElementById("prevReview");

const nextButton =
  document.getElementById("nextReview");

const reviewCount =
  document.getElementById("reviewCount");

let currentReview = 0;

function showReview(index) {

  testimonials.forEach((review) => {
    review.classList.remove("active");
  });

  testimonials[index].classList.add("active");

  reviewCount.textContent =
    `0${index + 1} / 0${testimonials.length}`;

}

nextButton.addEventListener("click", () => {

  currentReview++;

  if (currentReview >= testimonials.length) {
    currentReview = 0;
  }

  showReview(currentReview);

});

previousButton.addEventListener("click", () => {

  currentReview--;

  if (currentReview < 0) {
    currentReview = testimonials.length - 1;
  }

  showReview(currentReview);

});


// 9. FAQ ACCORDION

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {

  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  question.addEventListener("click", () => {

    const isOpen = item.classList.contains("open");

    // Close all FAQ answers first

    faqItems.forEach((faq) => {

      faq.classList.remove("open");

      faq.querySelector(".faq-answer").style.maxHeight = null;

      faq.querySelector(".faq-question")
        .setAttribute("aria-expanded", "false");

    });

    // Open selected answer

    if (!isOpen) {

      item.classList.add("open");

      answer.style.maxHeight =
        answer.scrollHeight + "px";

      question.setAttribute("aria-expanded", "true");

    }

  });

  question.setAttribute("aria-expanded", "false");

});


// 10. BOOKING DATE VALIDATION

const appointmentDate =
  document.getElementById("appointmentDate");

const today = new Date();

const localToday = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, "0"),
  String(today.getDate()).padStart(2, "0")
].join("-");

appointmentDate.min = localToday;


// 11. BOOKING FORM VALIDATION AND DEMO CONFIRMATION

const bookingForm =
  document.getElementById("bookingForm");

const formMessage =
  document.getElementById("formMessage");

bookingForm.addEventListener("submit", (event) => {

  event.preventDefault();

  // Check browser form validation

  if (!bookingForm.checkValidity()) {

    bookingForm.reportValidity();

    return;

  }

  const customerName =
    document.getElementById("customerName").value.trim();

  const customerPhone =
    document.getElementById("customerPhone").value.trim();

  const customerEmail =
    document.getElementById("customerEmail").value.trim();

  const selectedService =
    serviceSelect.value;

  const selectedDate =
    appointmentDate.value;

  const selectedTime =
    document.getElementById("appointmentTime").value;


  // Additional phone validation

  const phonePattern = /^[6-9][0-9]{9}$/;

  if (!phonePattern.test(customerPhone)) {

    formMessage.textContent =
      "Please enter a valid 10-digit Indian mobile number.";

    formMessage.classList.add("show");

    return;

  }


  // Prepare demo confirmation

  formMessage.textContent =
    `Thank you, ${customerName}! Your demo request for ${selectedService} on ${selectedDate} at ${selectedTime} has been validated. This is not a real booking. No details have been sent or stored.`;

  formMessage.classList.add("show");

  formMessage.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });

  console.log("Demo booking details:", {
    name: customerName,
    phone: customerPhone,
    email: customerEmail,
    service: selectedService,
    date: selectedDate,
    time: selectedTime
  });

  bookingForm.reset();

  appointmentDate.min = localToday;

});


// 12. AUTOMATIC FOOTER YEAR

document.getElementById("currentYear").textContent =
  new Date().getFullYear();


// 13. INITIAL NAVIGATION STATE

updateNavigation();

console.log("Glow Beauty Studio website loaded successfully!");