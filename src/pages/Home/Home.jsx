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
            <div className="hero min-h-screen bg-[url(https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)]">
                <div className="hero-overlay bg-neutral bg-opacity-70" />
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Have a book unused?</h1>
                        <h2 className="mb-5 font-bold text-2xl">Sale or buy</h2>
                        <a href="#category" type="button" className="btn btn-secondary">
                            Get Started
                        </a>
                    </div>
                </div>
            </div>

            <div className="bg-primary">
                <div id="category" className="container pt-48  ">
                    <h2 className="text-center text-accent text-4xl mb-20 ">
                        Search Based on category
                    </h2>
                    <Categories />
                </div>
                {allAdvertised && (
                    <div className="grid md:grid-cols-2 mt-40 container ">
                        <Slider allAdvertised={allAdvertised} />
                    </div>
                )}
                <Statistic />
            </div>
        </div>
    );
}
