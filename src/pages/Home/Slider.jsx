/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import './Slider.css';

// import required modules
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Autoplay, FreeMode, Navigation, Pagination, Thumbs } from 'swiper';

export default function Slider({allAdvertised }) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    

    return (
        <>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                loop
                spaceBetween={10}
                navigation
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[Autoplay, Pagination, FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
            >
                {allAdvertised?.map((advertised) => (
                    <SwiperSlide key={Math.random()} className="h-[50vh]">
                        <img src={advertised?.image} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop
                spaceBetween={10}
                slidesPerView={1}
                freeMode
                watchSlidesProgress
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {allAdvertised?.map((advertised) => (
                    <SwiperSlide key={Math.random()} className="h-[50vh]">
                        {advertised?.bookName}
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}
