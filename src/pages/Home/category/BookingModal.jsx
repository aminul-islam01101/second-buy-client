/* eslint-disable consistent-return */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
// /* eslint-disable react/jsx-props-no-spreading */
// /* eslint-disable jsx-a11y/label-has-associated-control */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';

import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import AuthContext from '../../../Contexts/AuthContext';

const BookingModal = ({ role, id }) => {
    const { user } = useContext(AuthContext);
    const { handleSubmit, register } = useForm();
    const tempId = '637f494d199c8502b7639ca9';

    const { data: storedBook } = useQuery(['storedBook'], () =>
        axios.get(`${import.meta.env.VITE_API_URL}/book/${tempId}`).then((res) => res.data)
    );
    console.log(role);

    console.log(storedBook);

    const onSubmit = (values) => {
        console.log(values);
        if (storedBook?.sellerEmail === role?.email) {
            toast.error('invalid booking you are the owner of this book');
            return;
        }

        const bookingInfo = {
  
            buyerEmail: role?.email,
            sellerEmail: storedBook?.sellerEmail,
            bookedProductId: tempId,
            sellerName: storedBook?.seller,
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
                if (data.upsertedCount) {
                    toast.success('Booking successful');
                }
                if (data.matchedCount) {
                    toast.success(`you already booked ${storedBook.bookName}`);
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
                <div className="modal-box relative">
                    <label
                        htmlFor="booking-modal"
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </label>
                    <h3 className="text-lg font-bold">Congratulations random Internet user!</h3>
                    {role?.email ? (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                            <input
                                type="text"
                                placeholder="userName"
                                defaultValue={user?.displayName}
                                {...register('name')}
                                className="w-full "
                            />
                            <input
                                type="email"
                                placeholder="email"
                                defaultValue={user?.email}
                                {...register('email')}
                                className="w-full "
                            />
                            <input
                                type="number"
                                placeholder="phone number"
                                {...register('phoneNumber')}
                                className="w-full "
                            />

                            <button type="submit" className="button w-full mt-5">
                                Submit
                            </button>
                        </form>
                    ) : (
                        <div className="text-white">
                            Invalid booking. This is a seller id. try to login as a buyer
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
