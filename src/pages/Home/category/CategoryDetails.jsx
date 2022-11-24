import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../../../Contexts/AuthContext';

import BookingModal from './BookingModal';
import BooksCard from './BooksCard';

const CategoryDetails = () => {
    const { id } = useParams();
    console.log(id);

    const { user } = useContext(AuthContext);
    const [role, setRole] = useState('');
    const [modalControl, setModalControl] = useState(null);
    const handleClick = () => {
        console.log('hello');
        setModalControl('booking-modal');

        axios.get(`${import.meta.env.VITE_API_URL}/user/${user?.email}`).then((res) => {
            if (res.data.message === 'success') {
                setRole(res.data.user);
            } else {
                setRole(res.data.message);
            }
        });
    };
    console.log(role);

    return (
        <div>
            <BooksCard handleClick={handleClick} modalControl={modalControl} />

            {modalControl && (
                <BookingModal
                    id={id}
                    role={role}
                    setRole={setRole}
                    setModalControl={setModalControl}
                />
            )}
        </div>
    );
};

export default CategoryDetails;
