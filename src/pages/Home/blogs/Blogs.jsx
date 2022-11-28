/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import Blog from './Blog';

const Blogs = () => {
    const { data: allBlogs } = useQuery(['allBlogs'], () =>
        axios.get(`${import.meta.env.VITE_API_URL}/blogs`).then((res) => res.data)
    );

    console.log();

    return (
        <div className="bg-primary">
            <div className="grid lg:grid-cols-2 gap-10 container p-20  ">
                {allBlogs?.map((blog) => (
                    <Blog id={blog._id} blog={blog} />
                ))}
            </div>
        </div>
    );
};

export default Blogs;
