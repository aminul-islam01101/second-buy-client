/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';

import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../Contexts/AuthContext';

const AddProduct = () => {
    const { user } = useContext(AuthContext);

    const [error, setError] = useState('');
    const navigate = useNavigate();

    // get book Category

    const { data: bookCategories, refetch } = useQuery(['bookCategories'], () =>
        axios.get(`${import.meta.env.VITE_API_URL}/bookcategory`).then((res) => res.data)
    );

    const imgApI = import.meta.env.VITE_IMGBB_API;

    // Posting form data
    const muteFunc = async (data) => axios.post(`${import.meta.env.VITE_API_URL}/addbook`, data);

    const { mutate } = useMutation(muteFunc, {
        onSuccess: (res) => {
            if (res.data.message) {
                toast.error(`${res.data.message}`);
                navigate('/dashboard/myproducts');
                return;
            }

            toast.success('Successfully added a Book');
            navigate('/dashboard/myproducts');
        },
        onError: () => toast.error('There is an error'),
    });

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({ mode: 'onChange' });

    const onSubmit = (data) => {
        console.log(data);

        const image = data.photo[0];
        const formData = new FormData();
        const url = `https://api.imgbb.com/1/upload?key=${imgApI}`;
        formData.append('image', image);
        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then((imgData) => {
                if (imgData.success) {
                    console.log(imgData.data.url);
                    const booksInfo = {
                        ...data,
                        image: imgData.data.url,
                        postingTime: new Date(),
                        sellerName: user?.displayName,
                        sellerEmail: user?.email,
                        status: 'available',
                        advertised: false,
                        isReported: false,
                    };
                    mutate(booksInfo);
                }
            });
        refetch();
        reset();
    };

    return (
        <div className="grid min-h-90v place-items-center  ">
            <h2 className="text-xl text-rose-600 font-bold my-10">{error}</h2>
            <div className="w-full max-w-md space-y-3 rounded-xl p-8 bg-primary text-accent">
                <h1 className="text-center text-2xl font-bold">Add products</h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="ng-untouched ng-pristine ng-valid space-y-6"
                >
                    <div>
                        <label className="label">
                            <span className="label-text">Book Name</span>
                        </label>
                        <input
                            {...register('bookName', {
                                required: true,
                                maxLength: 300,
                            })}
                            type="text"
                            id="bookName"
                            placeholder="Book Name"
                            className="w-full  input py-2 input-bordered bg-error"
                        />

                        {errors?.bookName?.type === 'maxLength' && (
                            <p className="text-red-500">*Book name cannot exceed 300 characters</p>
                        )}
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text">Book Author Name</span>
                        </label>
                        <input
                            {...register('authorName', {
                                required: true,
                                maxLength: 300,
                            })}
                            type="text"
                            id="authorName"
                            placeholder="Write Book Author Name"
                            className="w-full  input py-2 input-bordered bg-error"
                        />

                        {errors?.authorName?.type === 'maxLength' && (
                            <p className="text-red-500">
                                *Book author name cannot exceed 300 characters
                            </p>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Original Price</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Price"
                                {...register('originalPrice', {
                                    required: 'Price is required',
                                })}
                                className="w-full  input py-2 input-bordered bg-error "
                            />
                            {errors.originalPrice && (
                                <p className="text-red-600">{errors.originalPrice?.message}</p>
                            )}
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Resale Price</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Resale price"
                                {...register('resalePrice', {
                                    required: 'Price is required',
                                })}
                                className="w-full  input py-2 input-bordered bg-error "
                            />
                            {errors.resalePrice && (
                                <p className="text-red-600">{errors.resalePrice?.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Years of Buying</span>
                            </label>
                            <input
                                type="number"
                                {...register('buyingYear', {
                                    required: true,
                                    max: 2022,
                                    min: 1900,
                                })}
                                placeholder="yyyy"
                                className="w-full  input py-2 input-bordered bg-error "
                            />
                            {(errors?.buyingYear?.type === 'max' ||
                                errors?.buyingYear?.type === 'min') && (
                                <p className="text-red-500">
                                    *buying Year should between 1900-2022
                                </p>
                            )}
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">edition</span>
                            </label>
                            <input
                                type="number"
                                {...register('edition', {
                                    required: true,
                                    maxLength: 4,
                                })}
                                placeholder="Type books edition"
                                className="w-full  input py-2 input-bordered bg-error "
                            />
                            {errors?.edition?.type === 'maxLength' && (
                                <p className="text-red-500">*edition cannot exceed 4 characters</p>
                            )}
                        </div>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text"> Contact Info</span>
                        </label>
                        <input
                            placeholder="phone Number"
                            type="number"
                            {...register('phoneNumber', {
                                required: 'phoneNumber is required',
                            })}
                            className="w-full  input py-2 input-bordered bg-error "
                        />
                        {errors.phoneNumber && (
                            <p className="text-red-600">{errors.phoneNumber?.message}</p>
                        )}
                    </div>
                    {/* condition */}
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Book Condition</span>
                        </label>
                        <select
                            required
                            {...register('location')}
                            className="select w-full  input py-2 input-bordered bg-error "
                        >
                            <option value="excellent">Excellent</option>
                            <option value="good">Good</option>
                            <option value="fair">Fair</option>
                        </select>
                    </div>
                    {/* condition */}
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Location</span>
                        </label>
                        <select {...register('condition')} className="select w-full  input py-2 input-bordered bg-error ">
                            <option value="Dhaka">Dhaka</option>
                            <option value="Chittagong">Chittagong</option>
                            <option value="Sylhet">Sylhet</option>
                            <option value="Rajshahi">Rajshahi</option>
                        </select>
                    </div>
                    {/* Category */}
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Book Category</span>
                        </label>
                        <select
                            name=""
                            id=""
                            className="select w-full  input py-2 input-bordered bg-error "
                            {...register('categoryId', { required: true })}
                        >
                            {bookCategories.map((category) => (
                                <option key={category._id} value={category.categoryId}>
                                    {category.categoryName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* photo */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">photo</span>
                        </label>
                        <input
                            type="file"
                            {...register('photo', { required: 'Image is required' })}
                            className="input py-2 w-full  input py-2 input-bordered bg-error "
                        />
                        {errors.photo && <p className="text-red-600">{errors.photo?.message}</p>}
                    </div>
                    {/* description */}
                    <div>
                        <label htmlFor="message" className="text-sm">
                            Book Description
                            <textarea
                                required
                                {...register('description', {
                                    minLength: 50,
                                })}
                                id="description"
                                placeholder="Write book Description"
                                className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900"
                            />
                            {errors?.description && (
                                <p className="text-red-500">
                                    *Description should be minimum 50 Character
                                </p>
                            )}
                        </label>
                    </div>

                    <button type="submit" className="button">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
