/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import AuthContext from '../../../Contexts/AuthContext';
import formatCurrency from '../../../Utilities/FormateCurrency';

const MyBuyers = () => {
    const { user } = useContext(AuthContext);

    const { data: myBuyers, refetch } = useQuery(['myBuyers'], () =>
        axios.get(`${import.meta.env.VITE_API_URL}/mybuyers/${user?.email}`).then((res) => res.data)
    );

    return (
        <div className="container">
            <div className="overflow-x-auto">
                <table className=" bg-slate-200 w-full">
                    <thead>
                        <tr>
                            <th className="py-2 px-4">Serial</th>
                            <th>Buyers Name</th>
                            <th>Email</th>
                            <th>Items Purchased</th>
                            <th>Items Rate</th>
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
                                <td>{formatCurrency(myProduct?.resalePrice)}</td>
                                <td>{myProduct?.status}</td>
                                <td>{myProduct?.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBuyers;
