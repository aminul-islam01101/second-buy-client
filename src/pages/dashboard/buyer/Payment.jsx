import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import formatCurrency from '../../../Utilities/FormateCurrency';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
const Payment = () => {
    const { id } = useParams();
    // const navigation = useNavigation();
    const { data: singleBooking } = useQuery(['singleBooking'], () =>
        axios.get(`${import.meta.env.VITE_API_URL}/payment/${id}`).then((res) => res.data)
    );

    return (
        <div className="bg-primary ">
            <div className=" container h-screen  grid place-items-center">
                <div>
                    <div className="text-accent text-center ">
                        <p>
                            <span className="font-bold">Payment For:</span>
                            {singleBooking?.bookName}
                        </p>
                        <p>
                            <span className="font-bold">Books Price:</span>
                            {formatCurrency(singleBooking?.price)}
                        </p>
                    </div>
                    <div className=" my-12">
                        <Elements stripe={stripePromise}>
                            <CheckoutForm booking={singleBooking} />
                        </Elements>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
