import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ product }) => (
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
                <Link to={`/category/${product.id}`}>
                    <button type="button" className="button w-full">
                        Details
                    </button>
                </Link>
            </div>
        </div>
    </div>
);

export default CategoryCard;
