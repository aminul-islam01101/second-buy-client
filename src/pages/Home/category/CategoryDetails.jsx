/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import AuthContext from '../../../Contexts/AuthContext';

import BookingModal from './BookingModal';
import BooksCard from './BooksCard';

const CategoryDetails = () => {
    const { id } = useParams();
    const { data: category } = useQuery(['categories'], () =>
        axios.get(`${import.meta.env.VITE_API_URL}/category/${id}`).then((res) => res.data)
    );

    const { user } = useContext(AuthContext);
    const [buyer, setBuyer] = useState('');
    const [modalControl, setModalControl] = useState('booking-modal');

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/buyer/${user?.email}`, {
            headers: {
                'content-type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === 'success') {
                    setBuyer(data.user);
                } else {
                    setBuyer(data.message);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }, [user?.email]);

    const handleClick = () => {
        setModalControl('booking-modal');

        // axios.get(`${import.meta.env.VITE_API_URL}/user/${user?.email}`).then((res) => {
        //     if (res.data.message === 'success') {
        //         setBuyer(res.data.user);
        //     } else {
        //         setBuyer(res.data.message);
        //     }
        // });
    };

    return (
        <div>
            {category?.products?.map((product) => (
                <div key={product._id}>
                    <BooksCard
                        handleClick={handleClick}
                        modalControl={modalControl}
                        product={product}
                        buyer={buyer}
                    />
                    <div>
                        {modalControl && (
                            <BookingModal
                                product={product}
                                buyer={buyer}
                                setBuyer={setBuyer}
                                setModalControl={setModalControl}
                            />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CategoryDetails;
