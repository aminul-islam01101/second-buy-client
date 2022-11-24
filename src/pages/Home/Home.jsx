import React from 'react';
// Import Swiper React components

// Import Swiper styles
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

// import required modules
import Categories from './category/Categories';
import Slider from './Slider';

export default function Home() {
    return (
        <div>
            <div className="container overflow-hidden bg-cover bg-no-repeat w-full grid md:grid-cols-2 place-items-center h-screen bg-[url(https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)]">
                <Slider />
            </div>
            <div className="container mt-20 grid grid-cols-2">
   
                <Categories />
            </div>
        </div>
    );
}
