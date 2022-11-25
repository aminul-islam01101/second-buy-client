import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckoutForm = ({ booking }) => {
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState('');

    const stripe = useStripe();
    const elements = useElements();
    const { price, email, bookName, _id, bookedProductId } = booking;
    

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch(`${import.meta.env.VITE_API_URL}/create-payment-intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log(error);
            setCardError(error.message);
        } else {
            setCardError('');
        }
        setSuccess('');
        setProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card,
                    billing_details: {
                        name: bookName,
                        email,
                    },
                },
            }
        );

        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }
        if (paymentIntent.status === 'succeeded') {
            console.log('card info', card);
            // store payment info in the database
            const payment = {
                price,
                transactionId: paymentIntent.id,
                email,
                bookingId: _id,
            };
            fetch(`${import.meta.env.VITE_API_URL}/payments`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`,
                },
                body: JSON.stringify(payment),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.insertedId) {
                        setSuccess('Congrats! your payment completed');
                        setTransactionId(paymentIntent.id);
                    }
                }).then(() => {
                    fetch(`${import.meta.env.VITE_API_URL}/paid/${bookedProductId}`, {
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
                });
        }
        setProcessing(false);
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                style={{
                    border: '2px solid #000',
                    width: '30vw',
                    minWidth: '500px',
                    alignSelf: 'center',

                    borderRadius: '7px',
                    padding: '40px',
                }}
            >
                <CardElement
                    options={{
                        style: {
                            base: {
                                boxShadow:'0px 0px 0px 0.5px',
                                fontSize: '16px',
                                color: '#000',
                                '::placeholder': {
                                    color: '#000',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button
                    className="btn btn-sm mt-4 btn-primary"
                    type="submit"
                    disabled={!stripe || !clientSecret || processing}
                 
                >
                    Pay
                </button>
            </form>
            <p className="text-red-500">{cardError}</p>
            {success && (
                <div>
                    <p className="text-green-500">{success}</p>
                    <p>
                        Your transactionId: <span className="font-bold">{transactionId}</span>
                    </p>
                </div>
            )}
        </>
    );
};

export default CheckoutForm;
