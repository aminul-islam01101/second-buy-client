import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
const Payment = () => {
    const { id } = useParams();
    // const navigation = useNavigation();
    const { data: singleBooking } = useQuery(['singleBooking'], () =>
        axios.get(`${import.meta.env.VITE_API_URL}/payment/${id}`).then((res) => res.data)
    );
  

    return (
        <div className="bg-slate-100">
            <div className="text-black">Booking For {singleBooking.bookName}</div>
            <div className="w-96 my-12">
                <Elements stripe={stripePromise}>
                    <CheckoutForm booking={singleBooking} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
