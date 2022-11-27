/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../../Contexts/AuthContext';
import formatCurrency from '../../../Utilities/FormateCurrency';

const MyMeetup = () => {
    const { user } = useContext(AuthContext);

    const { data: myOrders, refetch } = useQuery(['myOrders'], () =>
        axios
            .get(`${import.meta.env.VITE_API_URL}/users/buyer?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('token')}`,
                },
            })
            .then((res) => res.data)
    );

    return (
        <div className="container">
            <div className="overflow-x-auto">
                <table className=" bg-slate-200 w-full">
                    <thead>
                        <tr>
                            <th className="py-2 px-4">Serial</th>
                            <th>Image</th>
                            <th>Book Title</th>
                            <th>Price</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myOrders.map((myOrder, i) => (
                            <tr
                                key={myOrder._id}
                                className="bg-white odd:bg-gray-300 py-2 px-6 text-center"
                            >
                                <th>{i + 1}</th>
                                <td className="py-2 px-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img
                                                    src={myOrder?.image}
                                                    alt="Avatar Tailwind CSS Component"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2 px-4">{myOrder?.bookName}</td>
                                <td>{formatCurrency(myOrder?.price)}</td>
                             
                                <td>
                                    {myOrder.price && !myOrder.paid && (
                                        <Link to={`/dashboard/payment/${myOrder._id}`}>
                                            <button
                                                type="button"
                                                className="btn btn-primary btn-sm"
                                            >
                                                Pay
                                            </button>
                                        </Link>
                                    )}
                                    {myOrder.price && myOrder.paid && (
                                        <span className="text-green-500">Paid</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyMeetup;
