import React from 'react';
import ReadMore from './ReadMore';

const Blog = ({ blog }) => (
    <div>
        <div className="card w-full h-full my-5 opacity-90 hover:opacity-100 shadow-xl image-full">
            <figure>
                <img className="w-full" src={blog?.img} alt="img" />
            </figure>
            <div className="card-body">
                <h2 className="text-3xl text-center font-semibold tracking-wide">
                    Question: {blog?.question}
                </h2>
                <p className="text-white text-center">
                    <ReadMore text={blog?.answer} />
                </p>
            </div>
        </div>
    </div>
);

export default Blog;
