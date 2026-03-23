import { Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay],
    slidesPerView: 3,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    loop: true,
    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    },

}
export default function TestimonialSlider2() {
    return (
        <>
            <Swiper {...swiperOptions} className="swiper testimonials-swiper s2">
                <SwiperSlide>
                    <div className="box-testimonial center">
                        <div className="image">
                            <img src="/assets/images/layouts/avt-08.png" alt="" />
                        </div>
                        <div className="info">
                            <h5 className="name">Annette Black</h5>
                            <p>Founder &amp; CEO</p>
                            <img src="/assets/images/icon/quote-2.png" alt="" />
                        </div>
                        <p className="text">“ Praesent felis justo, porta id tortor vel, auctor aliquet ligula. Nam blandit mi vel pulvinar convallis. Nam at ligula a erat laoreet tincidunt ac ut lorem. “</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="box-testimonial center">
                        <div className="image">
                            <img src="/assets/images/layouts/avt-09.png" alt="" />
                        </div>
                        <div className="info">
                            <h5 className="name">Leslie Alexander</h5>
                            <p>CEO &amp; Founder at ThemeMu</p>
                            <img src="/assets/images/icon/quote-2.png" alt="" />
                        </div>
                        <p className="text">“ Curabitur eu est feugiat quam feugiat tristique non vel erat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc nec suscipit fringilla, augue ligula eleifend velit. “</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="box-testimonial center">
                        <div className="image">
                            <img src="/assets/images/layouts/avt-10.png" alt="" />
                        </div>
                        <div className="info">
                            <h5 className="name">Esther Howard</h5>
                            <p>Chief Product Officer</p>
                            <img src="/assets/images/icon/quote-2.png" alt="" />
                        </div>
                        <p className="text">“ Etiam dignissim ex vitae tortor viverra, varius tincidunt sem vestibulum. Donec ex ante, sollicitudin sit amet posuere venenatis, consectetur facilisis nisi malesuada nisi nec ex. “</p>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    )
}
