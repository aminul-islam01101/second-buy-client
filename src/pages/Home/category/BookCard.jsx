/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

const BookCard = ({ _id }) => (
    <div>
        <div className="w-full h-full rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100">
            <img
                src="https://images.pexels.com/photos/1848924/pexels-photo-1848924.jpeg?auto=compress&cs=tinysrgb&w=300"
                alt=""
                className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500"
            />
            <div className="flex flex-col justify-between p-6 space-y-8">
                <div className="space-y-2">
                    <h2 className="text-3xl font-semibold tracking-wide">card</h2>
                    <p className="dark:text-gray-100">category name</p>
                </div>

                <button
                    type="button"
                    // disabled={slots.length === 0}
                    // onClick={() => setMeetings(option)}
                    className="button disabled:bg-slate-300"
                >
                    <label className=" cursor-pointer " htmlFor="booking-modal">
                        Book Now
                    </label>
                </button>
            </div>
        </div>
    </div>
);

export default BookCard;
