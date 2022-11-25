/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import AuthContext from '../../../Contexts/AuthContext';
import formatCurrency from '../../../Utilities/FormateCurrency';
import ConfirmationModal from '../../../components/ConfirmationModal';

const MyMeetup = () => {
    const { user } = useContext(AuthContext);
    const [advertise, setAdvertise] = useState('action ');
    const [deleteProduct, setDeleteProduct] = useState(null);
    const { data: myProducts, refetch } = useQuery(['myProducts'], () =>
        axios
            .get(`${import.meta.env.VITE_API_URL}/users/seller?email=${user?.email}`)
            .then((res) => res.data)
    );
    const handleDelete = (product) => {
        console.log('deleted');
        
        axios
            .delete(`${import.meta.env.VITE_API_URL}/myproduct/${product._id}`, {
                // headers: {
                //     authorization: `bearer ${localStorage.getItem('accessToken')}`,
                // },
            })
            .then((res) => {
                if (res.data.deletedCount) {
                    refetch();
                    toast.success(`Hero ${product.bookName} deleted successfully`);
                }
            });
    };
    const closeModal = () => {
        setDeleteProduct(null);
    };

    const handleAdvertise = (id) => {
        fetch(`${import.meta.env.VITE_API_URL}/myproduct/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data === true) {
                    setAdvertise('remove advertise');
                }
                if (data === false) {
                    setAdvertise('set advertise');
                }
            })
            .catch((err) => {
                console.error(err);
            });

        // setAdvertise('advertised');
    };

    return (
        <div className="container">
            <div className="overflow-x-auto">
                <table className=" bg-slate-200 w-full">
                    <thead>
                        <tr>
                            <th className="py-2 px-4">Serial</th>
                            <th>Books Name</th>
                            <th>Price</th>
                            <th>status</th>
                            <th>advertise</th>
                            <th>delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myProducts.map((myProduct, i) => (
                            <tr
                                key={myProduct._id}
                                className="bg-white odd:bg-gray-300 py-2 px-6 text-center"
                            >
                                <th>{i + 1}</th>
                                <td className="py-2 px-4">{myProduct?.bookName}</td>
                                <td>{formatCurrency(myProduct?.resalePrice)}</td>
                                <td>{myProduct?.status}</td>
                                <td>
                                    {myProduct?.status === 'available' && (
                                        <button
                                            type="button"
                                            onClick={() => handleAdvertise(myProduct._id)}
                                            className="button bg-green-500 disabled:bg-slate-500"
                                        >
                                            {advertise}
                                        </button>
                                    )}
                                </td>

                                <td>
                                    <button
                                        type="button"
                                        onClick={() => setDeleteProduct(myProduct)}
                                        className="button bg-red-500 "
                                    >
                                        <label
                                            className=" cursor-pointer "
                                            htmlFor="confirmation-modal"
                                        >
                                            Delete
                                        </label>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {deleteProduct && (
                <ConfirmationModal
                    title="Are you sure you want to delete?"
                    message={`If you delete ${deleteProduct?.bookName}. It cannot be undone.`}
                    successAction={handleDelete}
                    successButtonName="Delete"
                    modalData={deleteProduct}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
};

export default MyMeetup;
