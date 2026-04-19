const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");
const appointmentForm = document.getElementById("appointmentForm");
const formStatus = document.getElementById("formStatus");
const yearEl = document.getElementById("year");
const testimonialsGrid = document.getElementById("testimonialsGrid");
const reviewPrev = document.getElementById("reviewPrev");
const reviewNext = document.getElementById("reviewNext");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (appointmentForm) {
  appointmentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("patientName")?.value.trim() || "";
    const age = document.getElementById("patientAge")?.value.trim() || "";
    const phone = document.getElementById("patientPhone")?.value.trim() || "";
    const service = document.getElementById("serviceRequired")?.value.trim() || "";
    const preferredDate = document.getElementById("preferredDate")?.value.trim() || "";
    const preferredTime = document.getElementById("preferredTime")?.value.trim() || "";

    if (!name || !age || !phone || !service || !preferredDate || !preferredTime) {
      if (formStatus) {
        formStatus.textContent = "Please fill in all required fields.";
        formStatus.style.color = "#b42318";
      }
      return;
    }

    const message = [
      "Hello Dr. Ayaz Saeed, I would like to book an appointment.",
      `Name: ${name}`,
      `Age: ${age}`,
      `Phone: ${phone}`,
      `Service: ${service}`,
      `Appointment Date: ${preferredDate}`,
      `Appointment Time: ${preferredTime}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/923005104107?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener");

    if (formStatus) {
      formStatus.textContent = "Opening WhatsApp to confirm your appointment.";
      formStatus.style.color = "#1e7a47";
    }
  });
}

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
    threshold: 0.15,
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

if (testimonialsGrid && reviewPrev && reviewNext) {
  const updateReviewArrows = () => {
    const maxScroll = testimonialsGrid.scrollWidth - testimonialsGrid.clientWidth;
    reviewPrev.disabled = testimonialsGrid.scrollLeft <= 2;
    reviewNext.disabled = testimonialsGrid.scrollLeft >= maxScroll - 2;
  };

  const getStep = () => {
    const firstCard = testimonialsGrid.querySelector(".testimonial-google");
    if (!firstCard) {
      return 300;
    }
    const gridStyles = window.getComputedStyle(testimonialsGrid);
    const gap = Number.parseFloat(gridStyles.columnGap || gridStyles.gap || "0");
    return firstCard.getBoundingClientRect().width + gap;
  };

  reviewPrev.addEventListener("click", () => {
    testimonialsGrid.scrollBy({ left: -getStep(), behavior: "smooth" });
  });

  reviewNext.addEventListener("click", () => {
    testimonialsGrid.scrollBy({ left: getStep(), behavior: "smooth" });
  });

  testimonialsGrid.addEventListener("scroll", updateReviewArrows, { passive: true });
  window.addEventListener("resize", updateReviewArrows);
  updateReviewArrows();
}
