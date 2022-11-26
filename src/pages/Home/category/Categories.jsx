/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    // const { data: categories = [] } = useQuery(['categories'], () =>
    //     axios.get(`${import.meta.env.VITE_API_URL}/categories`).then((res) => res.data)
    // );
    // console.log(categories);
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
        <div>
            {categories?.map((category) => (
                <CategoryCard key={category._id} category={category} />
            ))}
        </div>
    );
};

export default Categories;
