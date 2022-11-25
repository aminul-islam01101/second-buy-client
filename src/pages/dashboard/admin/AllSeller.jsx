/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import ConfirmationModal from '../../../components/ConfirmationModal';


const AllSeller = () => {
    const [deleteSeller, setDeleteSeller] = useState(null);

    const { data: sellers, refetch } = useQuery(['sellers'], () =>
    axios
        .get(`${import.meta.env.VITE_API_URL}/users/sellers`)
        .then((res) => res.data)
);
    const handleDelete = (seller) => {
  
        
        axios
            .delete(`${import.meta.env.VITE_API_URL}/users/sellers?email=${seller?.email}`, {
                // headers: {
                //     authorization: `bearer ${localStorage.getItem('accessToken')}`,
                // },
            })
            .then((res) => {
                if (res.data.deletedCount) {
                    refetch();
                    toast.success(`Hero ${seller.name} deleted successfully`);
                }
            });
    };

    const closeModal = () => {
        setDeleteSeller(null);
    };



    return (
        <div className="container">
            <div className="overflow-x-auto">
                <table className=" bg-slate-200 w-full">
                    <thead>
                        <tr>
                            <th className="py-2 px-4">Serial</th>
                            <th> Name</th>
                            <th>email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sellers.map((seller, i) => (
                            <tr
                                key={seller._id}
                                className="bg-white odd:bg-gray-300 py-2 px-6 text-center"
                            >
                                <th>{i + 1}</th>
                                <td className="py-2 px-4">{seller?.name}</td>
                                <td>{seller?.email}</td>
                               
                                <td>
                                <button
                                        type="button"
                                        onClick={() => setDeleteSeller(seller)}
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
            {deleteSeller && (
                <ConfirmationModal
                    title="Are you sure you want to delete?"
                    message={`If you delete ${deleteSeller?.bookName}. It cannot be undone.`}
                    successAction={handleDelete}
                    successButtonName="Delete"
                    modalData={deleteSeller}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
};

export default AllSeller;
