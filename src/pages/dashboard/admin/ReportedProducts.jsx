/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import ConfirmationModal from '../../../components/ConfirmationModal';
import formateCurrency from '../../../Utilities/FormateCurrency';

const AllBuyer = () => {
    const [deleteProduct, setDeleteProduct] = useState(null);

    const { data: reportedProducts, refetch } = useQuery(['reportedProducts'], () =>
        axios.get(`${import.meta.env.VITE_API_URL}/products/reported`).then((res) => res.data)
    );
    const handleDelete = (product) => {
        axios
            .delete(`${import.meta.env.VITE_API_URL}/products/reported?id=${product?._id}`, {
                // headers: {
                //     authorization: `bearer ${localStorage.getItem('accessToken')}`,
                // },
            })
            .then((res) => {
                if (res.data.deletedCount) {
                    refetch();
                    toast.success(` ${product.bookName} deleted successfully`);
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
                            <th> Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportedProducts.map((product, i) => (
                            <tr
                                key={product._id}
                                className="bg-white odd:bg-gray-300 py-2 px-6 text-center"
                            >
                                <th>{i + 1}</th>
                                <td className="py-2 px-4">{product?.bookName}</td>
                                <td>{formateCurrency(product?.resalePrice)}</td>

                                <td>
                                    <button
                                        type="button"
                                        onClick={() => setDeleteProduct(product)}
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

export default AllBuyer;
