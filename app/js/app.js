document.addEventListener('DOMContentLoaded', () => {

  // Модальные окна
  const menuModal = document.getElementById("menu-modal");
  const openMenuModalBtn = document.querySelector(".button-burger");
  const closeMenuModalBtn = document.querySelector(".menu-modal__close");
  
  const contactModal = document.getElementById("contact-modal");
  const openContactModalBtn = document.querySelector(".header__button");
  const closeContactModalBtn = document.querySelector(".contact-modal__close");

  function closeAllModals() {
    menuModal?.classList.remove("menu-modal--active");
    contactModal?.classList.remove("contact-modal--active");
    document.body.classList.remove("no-scroll");
  }

  openMenuModalBtn?.addEventListener("click", (event) => {
    event.stopPropagation();
    closeAllModals();
    menuModal?.classList.add("menu-modal--active");
    document.body.classList.add("no-scroll");
  });

  closeMenuModalBtn?.addEventListener("click", () => {
    closeAllModals();
  });

  // Подменю в модальном окне
  const submenuLinks = document.querySelectorAll('.menu-modal__link--has-submenu');

  submenuLinks.forEach(link => {
    const sublist = link.nextElementSibling;
    const parentLi = link.closest('li');
    if (sublist && sublist.classList.contains('menu-modal__sublist')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        link.classList.toggle('active');
        sublist.classList.toggle('active');
        parentLi.classList.toggle('active');
      });
    }
  });

  document.addEventListener("click", (event) => {
    if (
      menuModal?.classList.contains("menu-modal--active") &&
      !menuModal.contains(event.target) &&
      !openMenuModalBtn.contains(event.target)
    ) {
      closeAllModals();
    }
  });

  openContactModalBtn?.addEventListener("click", () => {
    closeAllModals();
    contactModal?.classList.add("contact-modal--active");
    document.body.classList.add("no-scroll");
  });

  closeContactModalBtn?.addEventListener("click", () => {
    closeAllModals();
  });

  contactModal?.addEventListener("click", (event) => {
    if (event.target === contactModal) {
      closeAllModals();
    }
  });

  // Hover эффекты для проектов
  const hoverImage = document.querySelector(".projects__hover-image");
  const hoverItems = document.querySelectorAll(".projects__item");
  const container = document.querySelector(".projects__list");

  hoverItems.forEach((item) => {
    item.addEventListener("mouseenter", (e) => {
      const imageUrl = item.getAttribute("data-image");
      hoverImage.style.backgroundImage = `url(${imageUrl})`;
      hoverImage.style.opacity = "1";
      hoverImage.style.transform = "scale(1) translate(-50%, -50%)";

      container.classList.add("dimmed");
      item.classList.add("active");
    });

    item.addEventListener("mousemove", (e) => {
      hoverImage.style.left = `${e.pageX}px`;
      hoverImage.style.top = `${e.pageY}px`;
    });

    item.addEventListener("mouseleave", () => {
      hoverImage.style.opacity = "0";
      hoverImage.style.transform = "scale(0.5) translate(-50%, -50%)";

      container.classList.remove("dimmed");
      item.classList.remove("active");
    });
  });

  // Форматирование телефона
  document.querySelectorAll(".phone-input").forEach((input) => {
    input.addEventListener("input", formatPhone);
    input.addEventListener("blur", clearIfOnlyPrefix);
  });

  function formatPhone(e) {
    let value = e.target.value.replace(/\D/g, ""); // Удаляем все нечисловые символы

    if (value.startsWith("7")) value = value.slice(1);
    if (value.startsWith("8")) value = value.slice(1);
    value = "7" + value;

    let formatted = "+7 ";
    if (value.length > 1) formatted += "(" + value.substring(1, 4);
    if (value.length >= 5) formatted += ") " + value.substring(4, 7);
    if (value.length >= 8) formatted += "-" + value.substring(7, 9);
    if (value.length >= 10) formatted += "-" + value.substring(9, 11);

    e.target.value = formatted.trim();
  }

  function clearIfOnlyPrefix(e) {
    if (e.target.value === "+7") {
      e.target.value = "";
    }
  }

   // Инициализация Tiny Slider
   var slider = tns({
    container: '.hero-slider',
    items: 1,
    autoplay: true,
    autoplayTimeout: 20000, // Интервал 20 секунд
    controls: false, // Отключаем кнопки навигации
    nav: false, // Отключаем точки навигации
    responsive: {
      640: {
        items: 1
      },
      1024: {
        items: 1
      }
    }
  });
});
