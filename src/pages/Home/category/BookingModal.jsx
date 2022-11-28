/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
// /* eslint-disable react/jsx-props-no-spreading */
// /* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';

import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import AuthContext from '../../../Contexts/AuthContext';
import formatCurrency from '../../../Utilities/FormateCurrency';

const BookingModal = ({ buyer, setModalControl, product }) => {
    const { user } = useContext(AuthContext);
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({ mode: 'onChange' });

    // const { data: product } = useQuery(['product'], () =>
    //     axios.get(`${import.meta.env.VITE_API_URL}/book/${tempId}`).then((res) => res.data)
    // );
    console.log(buyer);

    const onSubmit = (values) => {
        console.log(values);
        if (product?.sellerEmail === buyer?.email) {
            toast.error('invalid booking you are the owner of this book');
            return;
        }

        const bookingInfo = {
            buyerEmail: buyer?.email,
            sellerEmail: product?.sellerEmail,
            bookedProductId: product?._id,
            sellerName: product?.sellerName,
            price: product?.resalePrice,
            image: product?.image,
            bookName: product?.bookName,
            buyerPhoneNumber: values?.phoneNumber,
            buyerLocation: values?.location,
        };
        console.log(bookingInfo);

        fetch(`${import.meta.env.VITE_API_URL}/booking/${user?.email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(bookingInfo),
        })
            .then((res) => res.json())
            .then((data) => {
                setModalControl(null);
                if (data.upsertedCount) {
                    toast.success('Booking successful');
                }
                if (data.matchedCount) {
                    console.log(data);

                    toast.success(`you already booked ${product.bookName}`);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative p-10 bg-primary text-accent">
                    <label
                        htmlFor="booking-modal"
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </label>
                    <h3 className="text-lg font-bold">Hello {buyer?.name || 'User'} </h3>
                    {buyer?.email ? (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                            <div className="mt-3">
                                <label htmlFor="bookName">
                                    Book Name
                                    <input
                                        id="bookName"
                                        type="text"
                                        readOnly
                                        defaultValue={product?.bookName}
                                        {...register('bookName')}
                                        className="w-full  input py-2 input-bordered bg-error "
                                    />
                                </label>
                            </div>

                            <div className="mt-3">
                                <label htmlFor="price">
                                    Price
                                    <input
                                        id="price"
                                        type="text"
                                        readOnly
                                        defaultValue={formatCurrency(product?.resalePrice)}
                                        {...register('price')}
                                        className="w-full  input py-2 input-bordered bg-error "
                                    />
                                </label>
                            </div>
                            <div className="mt-3">
                                <label htmlFor="name">
                                    User Name
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="userName"
                                        readOnly
                                        defaultValue={user?.displayName}
                                        {...register('name')}
                                        className="w-full  input py-2 input-bordered bg-error"
                                    />
                                </label>
                            </div>
                            <div className="mt-3">
                                <label htmlFor="email">
                                    Your Email
                                    <input
                                        id="email"
                                        type="email"
                                        readOnly
                                        placeholder="email"
                                        defaultValue={user?.email}
                                        {...register('email')}
                                        className="w-full  input py-2 input-bordered bg-error"
                                    />
                                </label>
                            </div>

                            <div className="mt-3">
                                <label htmlFor="phoneNumber">
                                    Phone Number
                                    <input
                                        id="phoneNumber"
                                        type="number"
                                        placeholder="phone number"
                                        {...register('phoneNumber', {
                                            required: '*Phone Number is required',
                                        })}
                                        className="w-full  input py-2 input-bordered bg-error"
                                    />
                                    {errors.phoneNumber && (
                                        <p className="text-red-600">
                                            {errors.phoneNumber?.message}
                                        </p>
                                    )}
                                </label>
                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">Location</span>
                                </label>
                                <select
                                    {...register('location', {
                                        required: '*Location is required',
                                    })}
                                    className="select select-accent w-full bg-error"
                                >
                                    <option value="Dhaka">Dhaka</option>
                                    <option value="Chittagong">Chittagong</option>
                                    <option value="Sylhet">Sylhet</option>
                                    <option value="Rajshahi">Rajshahi</option>
                                </select>
                                {errors.location && (
                                    <p className="text-red-600">{errors.location?.message}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="flex items-center w-full gap-2  py-3 justify-center px-4 rounded-md cursor-pointer border-solid border-2 border-secondary hover:bg-secondary bg-[#ff781f]/50"
                            >
                                Submit
                            </button>
                        </form>
                    ) : (
                        <div className="text-neutral">
                            Invalid booking. This is a seller id. try to login as a buyer
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
