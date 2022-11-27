/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/categories`, {
            headers: {
                'content-type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setCategories(data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-5 ">
            {categories?.map((category) => (
                <CategoryCard key={category._id} category={category} />
            ))}
        </div>
    );
};

export default Categories;
