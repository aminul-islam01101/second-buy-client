/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../../components/ConfirmationModal';
import AuthContext from '../../../Contexts/AuthContext';
import formatCurrency from '../../../Utilities/FormateCurrency';

const Wishlist = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    

    const [deleteProduct, setDeleteProduct] = useState(null);
    const { data: myWishlist, refetch } = useQuery(['myWishlist'], () =>
        axios
            .get(`${import.meta.env.VITE_API_URL}/mywishlist/${user?.email}`)
            .then((res) => res.data)
    );
    console.log(myWishlist);

    const handleAddToOrder = (wishlist) => {
        const bookingInfo = {
            buyerEmail: wishlist?.buyerEmail,
            sellerEmail: wishlist?.sellerEmail,
            bookedProductId: wishlist?.wishlistedProductId,
            sellerName: wishlist?.sellerName,
            price: wishlist?.price,
            image: wishlist?.image,
            bookName: wishlist?.bookName,
        };
        console.log(bookingInfo);

        fetch(`${import.meta.env.VITE_API_URL}/booking/${user?.email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(bookingInfo),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.upsertedCount) {
                    toast.success('Booking successful');
                }
                if (data.matchedCount) {
                    console.log(data);

                    toast.error(`you already booked ${wishlist.bookName}`);
                }
                navigate('/dashboard/myorders')
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleDelete = (product) => {
        axios
            .delete(`${import.meta.env.VITE_API_URL}/wishlist/${product._id}`, {
                // headers: {
                //     authorization: `bearer ${localStorage.getItem('accessToken')}`,
                // },
            })
            .then((res) => {
                if (res.data.deletedCount) {
                    refetch();
                    toast.success(` ${product?.bookName} deleted successfully`);
                }
            });
    };
    const closeModal = () => {
        setDeleteProduct(null);
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
                            <th>Add to order</th>
                            <th>delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myWishlist.map((wishlist, i) => (
                            <tr
                                key={wishlist._id}
                                className="bg-white odd:bg-gray-300 py-2 px-6 text-center"
                            >
                                <th>{i + 1}</th>
                                <td className="py-2 px-4">{wishlist?.bookName}</td>
                                <td>{formatCurrency(wishlist?.price)}</td>
                                <td>{wishlist?.status}</td>
                                <td>
                                    {wishlist?.status === 'available' && (
                                        <button
                                            type="button"
                                            onClick={() => handleAddToOrder(wishlist)}
                                            className="button"
                                        >
                                            add to order
                                        </button>
                                    )}
                                </td>

                                <td>
                                    <button
                                        type="button"
                                        onClick={() => setDeleteProduct(wishlist)}
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

export default Wishlist;
