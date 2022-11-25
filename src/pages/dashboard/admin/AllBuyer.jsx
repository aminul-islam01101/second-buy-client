/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import ConfirmationModal from '../../../components/ConfirmationModal';


const AllBuyer = () => {
    const [deleteBuyer, setDeleteBuyer] = useState(null);

    const { data: buyers, refetch } = useQuery(['buyers'], () =>
    axios
        .get(`${import.meta.env.VITE_API_URL}/users/buyers`)
        .then((res) => res.data)
);
    const handleDelete = (buyer) => {
  
        
        axios
            .delete(`${import.meta.env.VITE_API_URL}/users/buyers?email=${buyer?.email}`, {
                // headers: {
                //     authorization: `bearer ${localStorage.getItem('accessToken')}`,
                // },
            })
            .then((res) => {
                if (res.data.deletedCount) {
                    refetch();
                    toast.success(`Hero ${buyer.name} deleted successfully`);
                }
            });
    };

    const closeModal = () => {
        setDeleteBuyer(null);
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
                        {buyers.map((buyer, i) => (
                            <tr
                                key={buyer._id}
                                className="bg-white odd:bg-gray-300 py-2 px-6 text-center"
                            >
                                <th>{i + 1}</th>
                                <td className="py-2 px-4">{buyer?.name}</td>
                                <td>{buyer?.email}</td>
                               
                                <td>
                                <button
                                        type="button"
                                        onClick={() => setDeleteBuyer(buyer)}
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
            {deleteBuyer && (
                <ConfirmationModal
                    title="Are you sure you want to delete?"
                    message={`If you delete ${deleteBuyer?.bookName}. It cannot be undone.`}
                    successAction={handleDelete}
                    successButtonName="Delete"
                    modalData={deleteBuyer}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
};

export default AllBuyer;
