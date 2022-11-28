/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { toast } from 'react-hot-toast';
import { BsFillBookmarkPlusFill } from 'react-icons/bs';
import { MdPostAdd } from 'react-icons/md';
import { TiTickOutline } from 'react-icons/ti';
import formatCurrency from '../../../Utilities/FormateCurrency';

const BooksCard = ({ handleClick, modalControl, product, buyer }) => {
    const { data: seller } = useQuery(['seller'], () =>
        axios
            .get(`${import.meta.env.VITE_API_URL}/sellers/verified/${product?.sellerEmail}`)
            .then((res) => res.data)
    );
    const handleWishlist = (book) => {
        console.log(book);
        const addBook = {
            price: book?.resalePrice,
            image: book?.image,
            status: book?.status,
            bookName: book?.bookName,
            authorName: book?.authorName,
            buyerEmail: buyer?.email,
            sellerEmail: book?.sellerEmail,
            wishlistedProductId: book?._id,
            addedToOrder: false,
        };

        fetch(`${import.meta.env.VITE_API_URL}/addtowishlist/${book?._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(addBook),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.upsertedCount) {
                    toast.success('successfully added to your wishlist');
                }
                if (data.matchedCount) {
                    toast.error('You already added this product to your wishlist');
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

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
        // <div>
        //     <div className="w-full h-full rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100">
        //         <img
        //             src="https://images.pexels.com/photos/1848924/pexels-photo-1848924.jpeg?auto=compress&cs=tinysrgb&w=300"
        //             alt=""
        //             className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500"
        //         />
        //         <div className="flex flex-col justify-between p-6 space-y-8">
        //             <div className="space-y-2">
        //                 <h2 className="text-3xl font-semibold tracking-wide">
        //                     {product?.bookName}
        //                 </h2>
        //                 <div className="dark:text-gray-100 flex gap-5 items-center">
        //                     <span> {product?.authorName}</span>
        //                     <div>
        //                         {seller.verified && (
        //                             <span className="rounded-full bg-blue-500  h-4 w-4  p-3 px-4 py-2 dark:bg-transparent ">
        //                                 <TiTickOutline className="rounded-full bg-blue-500  h-8 w-8 p-1.5 " />
        //                             </span>
        //                         )}
        //                     </div>
        //                 </div>
        //             </div>
        //             <button
        //                 type="button"
        //                 onClick={() => handleReport(product._id)}
        //                 className="button"
        //             >
        //                 Report to Admin
        //             </button>
        //             <button
        //                 type="button"
        //                 onClick={() => handleWishlist(product)}
        //                 className="button"
        //             >
        //                 Add to wishlist
        //             </button>

        //             <label
        //                 onClick={handleClick}
        //                 className="button text-center disabled:bg-slate-300"
        //                 htmlhtmlFor={modalControl}
        //             >
        //                 Book Now
        //             </label>
        //         </div>
        //     </div>
        // </div>

        <section className="bg-primary ">
            <div className="relative mx-auto max-w-screen-xl px-4 py-8 border border-accent">
                <div className="grid gap-8 lg:grid-cols-4 lg:items-start ">
                    <div className="lg:col-span-2">
                        <div className="relative mt-4">
                            <img
                                alt="Tee"
                                src={product?.image}
                                className="h-72 w-full rounded-xl object-cover lg:h-[540px]"
                            />
                        </div>
                    </div>

                    <div className="lg:sticky lg:top-0 lg:col-span-2 p-10 text-accent">
                        <div>
                            <div className="flex justify-between ">
                                <h1 className="text-2xl font-bold lg:text-3xl">
                                    {product?.bookName}
                                </h1>
                                <button
                                    type="button"
                                    onClick={() => handleWishlist(product)}
                                    className="flex items-center gap-2  py-1 px-4 rounded-md border-solid border-2 border-secondary hover:bg-secondary bg-[#ff781f]/20"
                                >
                                    <BsFillBookmarkPlusFill className="text-2xl" /> Add to wishlist
                                </button>
                            </div>
                            <p>
                                <small>By {product?.authorName} </small>
                            </p>

                            <div className="flex gap-2 items-center">
                                <p className="font-bold text-xl">Seller: </p>
                                <p className="text-xl">{product?.sellerName}</p>
                                <div>
                                    {seller.verified && (
                                        <div className="rounded-full">
                                            <TiTickOutline className="rounded-full bg-blue-500 text-white  h-7 w-7 p-1 " />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-10 flex justify-between items-center flex-row lg:flex-col  space-y-2 border border-accent py-5  px-10 rounded-md m-10">
                                <div>
                                    <p>
                                        <span className="font-bold mr-3">Edition: </span>
                                        {product?.edition}
                                    </p>
                                    <p>
                                        <span className="font-bold mr-3">Location: </span>
                                        {product?.condition}
                                    </p>
                                    <p>
                                        <span className="font-bold mr-3"> Condition: </span>
                                        {product?.location}
                                    </p>
                                    <p>
                                        <span className="font-bold mr-3">Original Price: </span>
                                        {formatCurrency(product?.originalPrice)}
                                    </p>
                                    <p>
                                        <span className="font-bold mr-3">Buying Year: </span>
                                        {product?.buyingYear}
                                    </p>
                                </div>

                                <div className="border border-accent p-2  ">
                                    <p>
                                        <span className="font-bold mr-3">Resale Price: </span>
                                        {formatCurrency(product?.resalePrice)}
                                    </p>
                                </div>
                            </div>
                            <p className="mb-4">{product.description.slice(0, 150)}</p>
                            <label
                                type="button"
                                onClick={handleClick}
                                htmlFor={modalControl}
                                className="flex items-center w-full gap-2  py-3 justify-center px-4 rounded-md cursor-pointer border-solid border-2 border-secondary hover:bg-secondary bg-[#ff781f]/50"
                            >
                                <MdPostAdd className="text-2xl" /> Book Now
                            </label>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => handleReport(product._id)}
                                    className="btn btn-ghost underline"
                                >
                                    Report to Admin
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BooksCard;
