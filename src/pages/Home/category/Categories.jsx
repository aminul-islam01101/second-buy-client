import React from 'react';
import CategoryCard from './CategoryCard';

const Categories = () => {
    console.log('categories');
    const product = {
        id: 1,
        seller: 'mujtoba',
        sellerEmail: 'livin61542@probdd.com',
        bookName: 'rohosser sondhan',
    };

    return (
        <div>
            <CategoryCard product={product} />
        </div>
    );
};

export default Categories;
