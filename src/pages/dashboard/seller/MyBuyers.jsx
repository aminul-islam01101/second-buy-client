/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import AuthContext from '../../../Contexts/AuthContext';

const MyBuyers = () => {
    const { user } = useContext(AuthContext);

    const { data: myBuyers, refetch } = useQuery(['myBuyers'], () =>
        axios.get(`${import.meta.env.VITE_API_URL}/mybuyers/${user?.email}`).then((res) => res.data)
    );

    return (
        <div className='bg-primary min-h-screen pt-20'>
            <div className="container">
            <h1 className='text-center text-accent text-2xl mb-8'>{user?.displayName}&#39;s Buyers</h1>
                <div className="overflow-x-auto">
                    <table className=" bg-slate-200 w-full">
                        <thead>
                            <tr>
                                <th className="py-2 px-4">Serial</th>
                                <th>Items Purchased</th>
                                <th> Email</th>
                                <th>Location</th>
                                <th>Contacts</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myBuyers.map((myProduct, i) => (
                                <tr
                                    key={myProduct._id}
                                    className="bg-white odd:bg-gray-300 py-2 px-6 text-center"
                                >
                                    <th>{i + 1}</th>
                                    <td className="py-2 px-4">{myProduct?.bookName}</td>
                                    <td>{myProduct?.buyerEmail}</td>
                                    <td>{myProduct?.buyerLocation}</td>
                                    <td>{myProduct?.buyerPhoneNumber}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyBuyers;
