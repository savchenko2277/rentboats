import Swiper from 'swiper';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
export const initSwipers = () => {
    const heroSwiper = new Swiper('.hero__bg', {
        modules: [EffectFade, Navigation, Autoplay],
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        effect: 'fade',
        autoplay: {
            delay: 5000
        },
        fadeEffect: {
            crossFade: true
        }
    });
    const cardGallerySwiper = new Swiper('.c-card__image', {
        modules: [EffectFade, Navigation],
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        navigation: {
            nextEl: '.c-card__navigation-btn_next',
            prevEl: '.c-card__navigation-btn_prev',
        }
    });
    const reviewsSwiper = new Swiper('.reviews__swiper', {
        modules: [Navigation],
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        navigation: {
            nextEl: '.reviews .custom-navigation__btn_next',
            prevEl: '.reviews .custom-navigation__btn_prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 1.05,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 10,
            }
        }
    });
}