/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { TiTickOutline } from 'react-icons/ti';

const BooksCard = ({ handleClick, modalControl, product }) => {
    const { data: seller } = useQuery(['seller'], () =>
        axios
            .get(`${import.meta.env.VITE_API_URL}/sellers/verified/${product?.sellerEmail}`)
            .then((res) => res.data)
    );

    const handleReport = (id) => {
        fetch(`${import.meta.env.VITE_API_URL}/book/reported/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div>
            <div className="w-full h-full rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100">
                <img
                    src="https://images.pexels.com/photos/1848924/pexels-photo-1848924.jpeg?auto=compress&cs=tinysrgb&w=300"
                    alt=""
                    className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500"
                />
                <div className="flex flex-col justify-between p-6 space-y-8">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-semibold tracking-wide">
                            {product?.bookName}
                        </h2>
                        <p className="dark:text-gray-100 flex gap-5 items-center">
                            <span> {product?.authorName}</span>
                            <div>
                                {seller.verified && (
                                    <span className="rounded-full bg-blue-500  h-4 w-4  p-3 px-4 py-2 dark:bg-transparent ">
                                        <TiTickOutline className="rounded-full bg-blue-500  h-8 w-8 p-1.5 " />
                                    </span>
                                )}
                            </div>
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => handleReport(product._id)}
                        className="button"
                    >
                        Report to Admin
                    </button>

                    <label
                        onClick={handleClick}
                        className="button text-center disabled:bg-slate-300"
                        htmlFor={modalControl}
                    >
                        Book Now
                    </label>
                </div>
            </div>
        </div>
    );
};

export default BooksCard;
