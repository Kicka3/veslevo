document.addEventListener('DOMContentLoaded', () => {

  // Активные пункты меню
  const menuItems = document.querySelectorAll('.header__menu-item');
  
  // Функция для установки активного пункта меню
  function setActiveMenuItem(activeItem) {
    menuItems.forEach(item => {
      item.classList.remove('header__menu-item--active');
    });
    activeItem.classList.add('header__menu-item--active');
  }

  // Устанавливаем первый пункт активным по умолчанию
  if (menuItems.length > 0) {
    menuItems[0].classList.add('header__menu-item--active');
  }

  // Обработчики клика для пунктов меню
  menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
      setActiveMenuItem(item);
    });
  });

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

  // Галерея
  const gallery = {
    currentIndex: 0,
    images: [],
    modal: null,
    modalImage: null,
    thumbnails: [],
    mainImage: null,
    navArrows: null,
    modalNavArrows: null,
    modalCloseBtn: null,

    init() {
      this.modal = document.querySelector('.gallery__modal');
      this.modalImage = document.querySelector('.gallery__modal-image');
      this.thumbnails = document.querySelectorAll('.gallery__thumbnail');
      this.mainImage = document.querySelector('.gallery__main-image');
      this.navArrows = document.querySelectorAll('.gallery__nav-arrow');
      this.modalNavArrows = document.querySelectorAll('.gallery__modal-nav-arrow');
      this.modalCloseBtn = document.querySelector('.gallery__modal-close');

      // Собираем все изображения
      this.images = Array.from(this.thumbnails).map(thumb => 
        thumb.getAttribute('data-image')
      );

      this.bindEvents();
      this.updateMainImage(0);
    },

    bindEvents() {
      // Клик по миниатюрам
      this.thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
          this.updateMainImage(index);
          this.openModal(index);
        });
      });

      // Клик по главному изображению
      this.mainImage?.addEventListener('click', () => {
        this.openModal(this.currentIndex);
      });

      // Навигация в главном изображении
      this.navArrows.forEach((arrow, index) => {
        arrow.addEventListener('click', (e) => {
          e.stopPropagation();
          const direction = index === 0 ? -1 : 1;
          this.navigate(direction);
        });
      });

      // Навигация в модальном окне
      this.modalNavArrows.forEach((arrow, index) => {
        arrow.addEventListener('click', (e) => {
          e.stopPropagation();
          const direction = index === 0 ? -1 : 1;
          this.navigateModal(direction);
        });
      });

      // Закрытие модального окна
      this.modalCloseBtn?.addEventListener('click', () => {
        this.closeModal();
      });

      // Закрытие по клику вне изображения
      this.modal?.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.closeModal();
        }
      });

      // Закрытие по Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.modal.classList.contains('active')) {
          this.closeModal();
        }
      });
    },

    updateMainImage(index) {
      this.currentIndex = index;
      this.mainImage.src = this.images[index];
      
      // Обновляем активную миниатюру
      this.thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
      });
    },

    navigate(direction) {
      let newIndex = this.currentIndex + direction;
      if (newIndex < 0) newIndex = this.images.length - 1;
      if (newIndex >= this.images.length) newIndex = 0;
      this.updateMainImage(newIndex);
    },

    navigateModal(direction) {
      let newIndex = this.currentIndex + direction;
      if (newIndex < 0) newIndex = this.images.length - 1;
      if (newIndex >= this.images.length) newIndex = 0;
      this.currentIndex = newIndex;
      this.modalImage.src = this.images[newIndex];
    },

    openModal(index) {
      this.currentIndex = index;
      this.modalImage.src = this.images[index];
      this.modal.classList.add('active');
      document.body.classList.add('no-scroll');
    },

    closeModal() {
      this.modal.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  };

  // Инициализация галереи
  if (document.querySelector('.gallery')) {
    gallery.init();
  }

  // FAQ Аккордеон в ВОПРОСЫ
  const faqAccordion = {
    init() {
      const items = document.querySelectorAll('.questions__item');
      
      items.forEach(item => {
        const header = item.querySelector('.questions__header');
        const toggle = item.querySelector('.questions__toggle');
        
        header.addEventListener('click', () => {
          this.toggleItem(item);
        });
        
        toggle.addEventListener('click', (e) => {
          e.stopPropagation();
          this.toggleItem(item);
        });
      });
    },

    toggleItem(item) {
      const isActive = item.classList.contains('active');
      
      // Закрываем все остальные элементы
      document.querySelectorAll('.questions__item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      // Переключаем текущий элемент
      if (!isActive) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    }
  };

  // Инициализация FAQ аккордеона
  if (document.querySelector('.questions')) {
    faqAccordion.init();
  }
});

// Bnovo Widget Reinitialization
let isMobile = window.innerWidth <= 980;
let currentWidget = null;
  
// Функция для удаления старого виджета
function removeOldWidget() {
  const widgetContainer = document.getElementById('_bn_widget_adaptive');
  if (widgetContainer) {
    // Удаляем все дочерние элементы виджета
    widgetContainer.innerHTML = '<a href="http://bnovo.ru/" id="_bnovo_link_" target="_blank" style="display: none;">Bnovo</a>';
  }
  
  // Удаляем все элементы календаря и попапов
  const calendarElements = document.querySelectorAll('[id*="calendar"], [id*="datepicker"], [class*="calendar"], [class*="datepicker"]');
  calendarElements.forEach(element => {
    element.remove();
  });
  
  // Удаляем все элементы Bnovo
  const bnovoElements = document.querySelectorAll('[id*="bnovo"], [class*="bnovo"]');
  bnovoElements.forEach(element => {
    if (!element.id.includes('_bn_widget_adaptive') && !element.id.includes('_bnovo_link_')) {
      element.remove();
    }
  });
}

// Функция для инициализации виджета
function initBnovoWidget() {
  // Удаляем старый виджет перед созданием нового
  removeOldWidget();
  
  Bnovo_Widget.init(function() {
    Bnovo_Widget.open('_bn_widget_adaptive', {
      type: "horizontal",
      uid: "b453ef97-5e35-401c-875b-4700087677eb",
      lang: "ru",
      width: "100%",
      background: "#D5D0A1",
      bg_alpha: "100",
      padding: "20",
      padding_mobile: "20",
      border_radius: "0",
      font_type: "inter",
      title_color: "#000000",
      title_size: "30",
      without_title: "on",
      inp_color: "#3E5B81",
      inp_bordhover: "#d6d6d6",
      inp_bordcolor: "#d6d6d6",
      inp_alpha: "100",
      btn_background: "#737C06",
      btn_background_over: "#737C06",
      btn_textcolor: "#ffffff",
      btn_textover: "#ffffff",
      btn_bordcolor: "#737C06",
      btn_bordhover: "#737C06",
      adults_default: "1",
      dates_preset: "on",
      dfrom_tomorrow: "on",
      dto_nextday: "on",
      url: "http://veslevo.club/choose",
      switch_mobiles: "on",
      switch_mobiles_width: "980"
    });
  });
}

// Функция дебонсинга
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Обработчик изменения размера окна
const handleResize = debounce(() => {
  const currentIsMobile = window.innerWidth <= 980;
  if (currentIsMobile !== isMobile) {
    isMobile = currentIsMobile;
    initBnovoWidget();
  }
}, 200);

// Добавляем слушатель события resize
window.addEventListener('resize', handleResize);

// Инициализация виджета при загрузке страницы
initBnovoWidget();

// Houses Our Component - Factory для создания отдельных компонентов
function createHousesOurComponent(blockId) {
  return {
    photoInterval: null,
    currentPhotoIndex: 0,
    currentTextIndex: 0,
    photos: [],
    textItems: [],
    dots: [],
    nextButton: null,
    prevPhotoButton: null,
    nextPhotoButton: null,
    modal: null,
    modalImage: null,
    modalClose: null,
    blockId: blockId,
    wrapper: null,

    init() {
      this.wrapper = document.getElementById(`houses-our-wrapper-${this.blockId}`);
      if (!this.wrapper) {
        console.log(`Wrapper not found for block ${this.blockId}`);
        return;
      }

      this.photos = this.wrapper.querySelectorAll('.houses-our__photo-item');
      this.textItems = this.wrapper.querySelectorAll('.houses-our__text-item');
      this.dots = this.wrapper.querySelectorAll(`[data-block="${this.blockId}"]`);
      this.nextButton = document.getElementById(`houses-our-next-${this.blockId}`);
      this.prevPhotoButton = document.getElementById(`houses-our-photo-prev-${this.blockId}`);
      this.nextPhotoButton = document.getElementById(`houses-our-photo-next-${this.blockId}`);
      this.modal = document.getElementById(`houses-our-modal-${this.blockId}`);
      this.modalImage = document.getElementById(`houses-our-modal-image-${this.blockId}`);
      this.modalClose = document.getElementById(`houses-our-modal-close-${this.blockId}`);

      console.log(`Block ${this.blockId} initialized:`, {
        photos: this.photos.length,
        textItems: this.textItems.length,
        dots: this.dots.length,
        nextButton: !!this.nextButton,
        prevPhotoButton: !!this.prevPhotoButton,
        nextPhotoButton: !!this.nextPhotoButton,
        modal: !!this.modal,
        modalImage: !!this.modalImage,
        modalClose: !!this.modalClose
      });

      if (this.photos.length > 0) {
        this.bindEvents();
        this.startPhotoAutoSlide();
      }
    },

    bindEvents() {
      // Клик по точкам для переключения текста
      this.dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          this.switchText(index);
        });
      });

      // Клик по стрелке для следующего текста
      this.nextButton?.addEventListener('click', () => {
        this.nextText();
      });

      // Клик по стрелке "предыдущее фото"
      this.prevPhotoButton?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.stopPhotoAutoSlide();
        this.prevPhoto();
      });

      // Клик по стрелке "следующее фото"
      this.nextPhotoButton?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.stopPhotoAutoSlide();
        this.nextPhoto();
      });

      // Клик по фото для открытия модального окна
      const photoContainer = this.wrapper.querySelector('.houses-our__photo');
      if (photoContainer) {
        photoContainer.addEventListener('click', (e) => {
          // Не открывать модальное окно при клике на стрелки
          if (!e.target.closest('.houses-our__photo-arrow')) {
            this.openModal();
          }
        });
      }

      // Закрытие модального окна
      this.modalClose?.addEventListener('click', () => {
        this.closeModal();
      });

      // Закрытие модального окна по клику вне изображения
      this.modal?.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.closeModal();
        }
      });

      // Закрытие модального окна по Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.modal?.classList.contains('active')) {
          this.closeModal();
        }
      });
    },

    startPhotoAutoSlide() {
      this.photoInterval = setInterval(() => {
        this.nextPhoto();
      }, 12000); // 12 секунд
    },

    stopPhotoAutoSlide() {
      if (this.photoInterval) {
        clearInterval(this.photoInterval);
        this.photoInterval = null;
      }
    },

    nextPhoto() {
      this.currentPhotoIndex = (this.currentPhotoIndex + 1) % this.photos.length;
      this.updatePhoto();
    },

    prevPhoto() {
      this.currentPhotoIndex = (this.currentPhotoIndex - 1 + this.photos.length) % this.photos.length;
      this.updatePhoto();
    },

    updatePhoto() {
      console.log(`Block ${this.blockId}: Updating photo to index ${this.currentPhotoIndex}`);
      this.photos.forEach((photo, index) => {
        photo.classList.toggle('active', index === this.currentPhotoIndex);
      });
    },

    switchText(index) {
      console.log(`Block ${this.blockId}: Switching text to index ${index}`);
      this.currentTextIndex = index;
      this.updateText();
      this.updateDots();
    },

    nextText() {
      this.currentTextIndex = (this.currentTextIndex + 1) % this.textItems.length;
      console.log(`Block ${this.blockId}: Next text, new index ${this.currentTextIndex}`);
      this.updateText();
      this.updateDots();
    },

    updateText() {
      this.textItems.forEach((item, index) => {
        item.classList.toggle('active', index === this.currentTextIndex);
      });
    },

    updateDots() {
      this.dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === this.currentTextIndex);
      });
    },

    openModal() {
      console.log(`Block ${this.blockId}: Opening modal`);
      if (this.modal && this.modalImage) {
        const activePhoto = this.photos[this.currentPhotoIndex];
        console.log(`Block ${this.blockId}: Active photo src:`, activePhoto.src);
        this.modalImage.src = activePhoto.src;
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Блокируем скролл
      } else {
        console.log(`Block ${this.blockId}: Modal or modalImage not found`);
        console.log(`Modal:`, this.modal);
        console.log(`ModalImage:`, this.modalImage);
      }
    },

    closeModal() {
      if (this.modal) {
        this.modal.classList.remove('active');
        document.body.style.overflow = ''; // Восстанавливаем скролл
      }
    }
  };
}

// Инициализация всех компонентов houses-our
if (document.querySelector('.houses-our')) {
  console.log('Houses-our section found, initializing components...');
  const housesOurComponents = [];
  
  // Создаем отдельные компоненты для каждого блока
  for (let i = 1; i <= 3; i++) {
    console.log(`Creating component for block ${i}...`);
    const component = createHousesOurComponent(i);
    component.init();
    housesOurComponents.push(component);
  }
  
  console.log('All components initialized:', housesOurComponents.length);
} else {
  console.log('Houses-our section not found');
}
