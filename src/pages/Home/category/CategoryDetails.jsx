import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../../../Contexts/AuthContext';

import BookingModal from './BookingModal';
import BooksCard from './BooksCard';

const CategoryDetails = () => {
    const { id } = useParams();
  

    const { user } = useContext(AuthContext);
    const [buyer, setBuyer] = useState('');
    const [modalControl, setModalControl] = useState('booking-modal');
    const handleClick = () => {
     
        setModalControl('booking-modal');

        axios.get(`${import.meta.env.VITE_API_URL}/user/${user?.email}`).then((res) => {
            if (res.data.message === 'success') {
                setBuyer(res.data.user);
            } else {
                setBuyer(res.data.message);
            }
        });
    };


    return (
        <div>
            <BooksCard handleClick={handleClick} modalControl={modalControl} />

            {modalControl && (
                <BookingModal
                    id={id}
                    buyer={buyer}
                    setBuyer={setBuyer}
                    setModalControl={setModalControl}
                />
            )}
        </div>
    );
};

export default CategoryDetails;
