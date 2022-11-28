/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category: { categoryId, categoryName, categoryImage, products } }) => (
    <div>
      

        <div className="card w-full h-48 my-5 opacity-80 hover:opacity-100 shadow-xl image-full">
            <figure>
                <img className="w-full" src={categoryImage} alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="text-3xl text-center font-semibold tracking-wide">{categoryName}</h2>
                <p className="text-white text-center">
                    <span className="text-secondary text-lg font-extrabold mr-2">
           
                        {products?.length}
                    </span>
                    Books in this category
                </p>
                <div className="card-actions justify-center">
                    <Link to={`/category/${categoryId}`}>
                        <button
                            type="button"
                            className="text-white py-1 px-4 rounded-md border-solid border-2 border-secondary hover:bg-secondary"
                        >
                            Explore
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
);

export default CategoryCard;
