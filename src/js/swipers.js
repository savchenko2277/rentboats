import Swiper from 'swiper';
import { EffectFade, Navigation } from 'swiper/modules';
export const initSwipers = () => {
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