import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import Categories from './category/Categories';
import Slider from './Slider';
import { Statistic } from './Stats';

export default function Home() {
    const { data: allAdvertised } = useQuery(['allAdvertised'], () =>
        axios.get(`${import.meta.env.VITE_API_URL}/advertised`).then((res) => res.data)
    );
    return (
        <div>
            <div className="container overflow-hidden bg-cover bg-no-repeat w-full grid md:grid-cols-2 place-items-center h-screen bg-[url(https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)]" />
            <div className="container mt-20 ">
                <Categories />
            </div>
            {allAdvertised && (
                <div className="grid md:grid-cols-2 mt-40 container ">
                    <Slider allAdvertised={allAdvertised} />
                </div>
            )}
            <Statistic />
        </div>
    );
}
