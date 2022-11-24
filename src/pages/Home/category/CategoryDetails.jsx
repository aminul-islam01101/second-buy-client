import axios from 'axios';
import React, { useContext, useState } from 'react';
import AuthContext from '../../../Contexts/AuthContext';

import BookingModal from './BookingModal';
import BooksCard from './BooksCard';

const CategoryDetails = () => {
    const { user } = useContext(AuthContext);
    const [role, setRole] = useState('');
    const handleClick = () => {
        console.log('hello');

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
            <BooksCard handleClick={handleClick} />

            <BookingModal role={role} />
        </div>
    );
};

export default CategoryDetails;
