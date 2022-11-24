/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
// /* eslint-disable react/jsx-props-no-spreading */
// /* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';

import { useForm } from 'react-hook-form';
import AuthContext from '../../../Contexts/AuthContext';


const BookingModal = () => {
    const { handleSubmit, register } = useForm();
    const { user } = useContext(AuthContext);

    const onSubmit = (values) => {
        //   mutate({ ...values, heroName: meetings?.name, price: meetings?.price });
        console.log(values);
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
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
