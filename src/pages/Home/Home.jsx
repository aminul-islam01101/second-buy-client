import React, { useEffect, useState } from 'react';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import Categories from './category/Categories';

import Slider from './Slider';
import { Statistic } from './Stats';

export default function Home() {
    const [allAdvertised, setAllAdvertised] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/advertised`, {
            headers: {
                'content-type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);

                setAllAdvertised(data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

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
                    <div className="grid md:grid-cols-2 my-20 gap-10 md:gap-0 container shadow-lg p-5 ">
                        <Slider allAdvertised={allAdvertised} />
                    </div>
                )}
                <div data-aos="zoom-in">
                    <Statistic />
                </div>
            </div>
        </div>
    );
}
