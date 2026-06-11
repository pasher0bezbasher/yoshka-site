const form = document.getElementById("contactForm");
const message = document.getElementById("formMessage");
const dateInput = document.getElementById("date");
const phoneInput = document.getElementById("phone");
let messageTimer;

const today = new Date().toISOString().split("T")[0];
dateInput.min = today;

phoneInput.addEventListener("input", function () {
  let value = phoneInput.value.replace(/\D/g, "");

  if (value.startsWith("8")) {
    value = "7" + value.slice(1);
  }

  if (!value.startsWith("7")) {
    value = "7" + value;
  }

  value = value.substring(0, 11);

  let formatted = "+7";

  if (value.length > 1) {
    formatted += " (" + value.substring(1, 4);
  }

  if (value.length >= 4) {
    formatted += ")";
  }

  if (value.length > 4) {
    formatted += " " + value.substring(4, 7);
  }

  if (value.length > 7) {
    formatted += "-" + value.substring(7, 9);
  }

  if (value.length > 9) {
    formatted += "-" + value.substring(9, 11);
  }

  phoneInput.value = formatted;
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  clearTimeout(messageTimer);

  const name = document.getElementById("name").value.trim();
  const tour = document.getElementById("tour");
  const selectedTour = tour.options[tour.selectedIndex].text;
  const date = document.getElementById("date").value;
  const people = document.getElementById("people").value;
  const phone = phoneInput.value.trim();

  const phonePattern = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

  if (!phonePattern.test(phone)) {
    message.textContent = "Пожалуйста, введите телефон в формате +7 (900) 123-45-67.";
    message.style.display = "block";

    messageTimer = setTimeout(function () {
      message.style.display = "none";
      message.textContent = "";
    }, 5000);

    return;
  }

  if (date < today) {
    message.textContent = "Нельзя выбрать дату раньше сегодняшнего дня.";
    message.style.display = "block";

    messageTimer = setTimeout(function () {
      message.style.display = "none";
      message.textContent = "";
    }, 5000);

    return;
  }

  message.textContent = `Спасибо, ${name}! Ваша заявка на экскурсию "${selectedTour}" на ${date} для ${people} чел. принята. Мы свяжемся с вами по номеру ${phone} в ближайшее время.`;
  message.style.display = "block";

  form.reset();
  dateInput.min = today;

  messageTimer = setTimeout(function () {
    message.style.display = "none";
    message.textContent = "";
  }, 5000);
});

/* Мобильное меню */
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("is-open");
  });

  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("is-open");
    });
  });
}