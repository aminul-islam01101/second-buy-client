/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import './Slider.css';

// import required modules
import { Autoplay, FreeMode, Navigation, Pagination, Thumbs } from 'swiper';
import formatCurrency from '../../Utilities/FormateCurrency';

export default function Slider({ allAdvertised }) {
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
                // thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[Autoplay, Pagination, FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
            >
                {allAdvertised?.map((advertised) => (
                    <SwiperSlide key={advertised._id} className="h-[50vh]">
                        <img className="h-full w-full" src={advertised?.image} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop
                spaceBetween={10}
                slidesPerView={1}
                freeMode
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                watchSlidesProgress
                modules={[Autoplay, Pagination, FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {allAdvertised?.map((advertised) => (
                    <SwiperSlide key={advertised._id} className="h-[50vh]">
                        <div className="flex flex-col md:border border-secondary p-5">
                            <p className="text-accent">
                                <span className="font-bold">BookName: </span>
                                {advertised?.bookName}
                            </p>
                            <p className="text-accent">
                                <span className="font-bold">Author Name: </span>{' '}
                                {advertised?.authorName}
                            </p>
                            <p className="text-accent">
                                <span className="font-bold">Edition: </span> {advertised?.edition}th
                            </p>
                            <p className="text-accent">
                                <span className="font-bold">Buying Year: </span> {advertised?.buyingYear}
                            </p>
                            <p className="text-accent">
                                <span className="font-bold">Resale Price: </span>
                                {formatCurrency(advertised?.resalePrice)}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}
