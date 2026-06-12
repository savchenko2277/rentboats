import { throttle } from "./libs/utils";
import "./polyfills.js";
import "./blocks.js";
import noUiSlider from 'nouislider'
import Swiper from 'swiper/bundle';

import { initSwipers } from "./swipers.js";

const setScrollbarWidth = () => {
	document.documentElement.style.setProperty('--sw', `${window.innerWidth - document.documentElement.clientWidth}px`);
}

const setHeader = () => {
	const header = document.querySelector('.header');
	if (!header) return;

	const headerBurger = header.querySelector('.header__burger');

	headerBurger.addEventListener('click', () => {
		if (header.classList.contains('is-open')) {
			header.classList.remove('is-open');
			document.body.classList.remove('scroll-lock');
		} else {
			header.classList.add('is-open');
			document.body.classList.add('scroll-lock');
		}
	});
}

const setRanges = () => {
	const ranges = document.querySelectorAll('.catalog__filter-range')

	ranges.forEach((range) => {
		const slider = range.querySelector('.catalog__filter-range-slider')

		const minValueElement = range.querySelector('[data-range-min]')
		const maxValueElement = range.querySelector('[data-range-max]')

		const min = Number(range.dataset.min)
		const max = Number(range.dataset.max)

		const startMin = Number(range.dataset.startMin || min)
		const startMax = Number(range.dataset.startMax || max)

		const step = Number(range.dataset.step || 1)

		const maxPlus = range.dataset.maxPlus === 'true'

		noUiSlider.create(slider, {
			start: [startMin, startMax],

			connect: true,

			step,

			range: {
				min,
				max,
			},
		})

		const formatNumber = (value) => {
			return Math.round(value).toLocaleString('ru-RU')
		}

		slider.noUiSlider.on('update', (values) => {
			const currentMin = Number(values[0])
			const currentMax = Number(values[1])

			minValueElement.textContent = formatNumber(currentMin)

			if (maxPlus && currentMax >= max) {
				maxValueElement.textContent = `${formatNumber(currentMax)}+`
			} else {
				maxValueElement.textContent = formatNumber(currentMax)
			}
		})
	})
}

const setQuantities = () => {
	const quantities = document.querySelectorAll('.quantity')

	quantities.forEach((quantity) => {
		const input = quantity.querySelector('.quantity__input')

		const minusButton = quantity.querySelector('.quantity__button-minus')
		const plusButton = quantity.querySelector('.quantity__button-plus')

		const min = Number(quantity.dataset.min || 0)
		const max = Number(quantity.dataset.max || Infinity)

		const validateValue = (value) => {
			let newValue = Number(value)

			if (isNaN(newValue)) {
				newValue = min
			}

			if (newValue < min) {
				newValue = min
			}

			if (newValue > max) {
				newValue = max
			}

			input.value = newValue
		}

		minusButton.addEventListener('click', () => {
			validateValue(Number(input.value) - 1)
		})

		plusButton.addEventListener('click', () => {
			validateValue(Number(input.value) + 1)
		})

		input.addEventListener('input', () => {
			input.value = input.value.replace(/[^\d]/g, '')
		})

		input.addEventListener('change', () => {
			validateValue(input.value)
		})

		validateValue(input.value)
	})
}

const setFiltersModal = () => {
	const block = document.querySelector('.catalog__filters');
	if (!block) return;

	const button = document.querySelector('.catalog__filters-open');
	const close = document.querySelector('.catalog__filters-close');

	button.addEventListener('click', () => {
		block.classList.add('active');
		document.body.classList.add('scroll-lock');
	});

	close.addEventListener('click', () => {
		block.classList.remove('active');
		document.body.classList.remove('scroll-lock');
	});
}

const setProduct = () => {
	const block = document.querySelector('.product');
	if (!block) return;

	const galleryMiniSwiper = new Swiper('.product__gallery-mini', {
		slidesPerView: 4,
		spaceBetween: 10,
		direction: 'vertical',
		slideToClickedSlide: true,
		watchSlidesProgress: true,
		breakpoints: {
			0: {
				slidesPerView: 3.2,
				direction: 'horizontal',
				spaceBetween: 8,
			},
			640: {
				direction: 'horizontal',
				spaceBetween: 8,
			}
		}
	});

	const galleryMainSwiper = new Swiper('.product__gallery-main', {
		slidesPerView: 1,
		spaceBetween: 10,
		thumbs: {
			swiper: galleryMiniSwiper,
		},
	});

	const dateSwiper = new Swiper('.product__date', {
		slidesPerView: 3,
		slideToClickedSlide: true,
		spaceBetween: 8,
	});

}

const setMainFilters = () => {
    const block = document.querySelector('.main-filters');
    if (!block) return;

    const items = block.querySelectorAll('.main-filters__item');

    const closeAllFilters = (exceptItem = null) => {
        items.forEach((item) => {
            if (item !== exceptItem) {
                item.classList.remove('active');
                const content = item.querySelector('.main-filters__item-content');
                if (content) content.classList.remove('active');
            }
        });
    };

    items.forEach((item) => {
        const windowBtn = item.querySelector('.main-filters__item-window');
        const content = item.querySelector('.main-filters__item-content');
        const spanDisplay = windowBtn ? windowBtn.querySelector('p span') : null;

        // Открытие/закрытие
        if (windowBtn) {
            windowBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpening = !item.classList.contains('active');
                closeAllFilters(isOpening ? item : null);
                item.classList.toggle('active');
                if (content) content.classList.toggle('active');
            });
        }

        // Выбор Radio
        const radios = item.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            radio.addEventListener('change', () => {
                if (spanDisplay) {
                    // Берем текст из лейбла, который идет сразу за инпутом
                    spanDisplay.textContent = radio.parentElement.textContent.trim();
                }
                item.classList.remove('active');
                if (content) content.classList.remove('active');
            });
        });
    });

    // Интеграция календаря (второй элемент, индекс 1)
    const calendarItem = items[1];
    const calendarContent = calendarItem.querySelector('.main-filters__item-content');
    if (calendarContent) {
        new AirDatepicker(calendarContent, {
            inline: true,
            onSelect({formattedDate}) {
                const span = calendarItem.querySelector('.main-filters__item-window p span');
                if (span) span.textContent = formattedDate;
                calendarItem.classList.remove('active');
                calendarContent.classList.remove('active');
            }
        });
    }

    document.addEventListener('click', () => closeAllFilters());
};

window.addEventListener('load', () => {
	setScrollbarWidth();
	setHeader();
	setRanges();
	setQuantities();
	initSwipers();
	setFiltersModal();
	setProduct();
	setMainFilters();
})