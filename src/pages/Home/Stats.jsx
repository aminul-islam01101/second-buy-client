/* eslint-disable no-unsafe-optional-chaining */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import CountUp from 'react-countup';
import { SiBookstack } from 'react-icons/si';
import { FaUsers } from 'react-icons/fa';
import { FcSalesPerformance } from 'react-icons/fc';

export const Statistic = () => {
    const { data: sellers } = useQuery(['sellers'], () =>
        axios.get(`${import.meta.env.VITE_API_URL}/users/allseller`).then((res) => res.data)
    );
    const { data: buyers } = useQuery(['buyers'], () =>
        axios.get(`${import.meta.env.VITE_API_URL}/users/allbuyer`).then((res) => res.data)
    );
    const { data: books } = useQuery(['books'], () =>
        axios.get(`${import.meta.env.VITE_API_URL}/books`).then((res) => res.data)
    );
    const { data: bookSold } = useQuery(['bookSold'], () =>
        axios.get(`${import.meta.env.VITE_API_URL}/booksold`).then((res) => res.data)
    );

    return (
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 ">
                <div className="text-center text-accent">
                    <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-indigo-50 sm:w-12 sm:h-12">
                    <SiBookstack className="text-black h-5 w-10" />
                    </div>
                    <h6 className="text-4xl font-bold text-deep-purple-accent-400">
                        <CountUp duration={5} end={books?.length} />K
                    </h6>
                    <p className="mb-2 font-bold text-md">Books</p>
                </div>
                <div className="text-center text-accent">
                    <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-indigo-50 sm:w-12 sm:h-12">
                    <FaUsers className="text-black h-5 w-10"/>
                    </div>
                    <h6 className="text-4xl font-bold text-deep-purple-accent-400">
                        <CountUp duration={5} end={sellers?.length} />K
                    </h6>
                    <p className="mb-2 font-bold text-md">Buyers</p>
                </div>
                <div className="text-center text-accent">
                    <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-indigo-50 sm:w-12 sm:h-12">
                    <FaUsers className="text-black h-5 w-10"/>
                    </div>
                    <h6 className="text-4xl font-bold text-deep-purple-accent-400">
                        <CountUp duration={5} end={buyers?.length} />K
                    </h6>
                    <p className="mb-2 font-bold text-md">Sellers</p>
                </div>
                <div className="text-center text-accent">
                    <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-indigo-50 sm:w-12 sm:h-12">
                    <FcSalesPerformance className="text-base h-5 w-10"/>
                    </div>
                    <h6 className="text-4xl font-bold text-deep-purple-accent-400">
                        <CountUp duration={5} end={bookSold?.length} />K
                    </h6>
                    <p className="mb-2 font-bold text-md">Books Sold</p>
                </div>
            </div>
        </div>
    );
};
