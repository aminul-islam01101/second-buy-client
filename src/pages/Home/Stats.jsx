import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import CountUp from 'react-countup';
import { SiBookstack } from 'react-icons/si';


export const Statistic = () => {
//     const { data: sellers, refetch } = useQuery(['sellers'], () =>
//     axios
//         .get(`${import.meta.env.VITE_API_URL}/users/sellers`, {
//             headers: {
//                 authorization: `bearer ${localStorage.getItem('token')}`,
//             },
//         })
//         .then((res) => res.data)
// );
console.log('something');


    return(
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
                <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-indigo-50 sm:w-12 sm:h-12">
                    <svg
                        className="w-8 h-8 text-deep-purple-accent-400 sm:w-10 sm:h-10"
                        stroke="currentColor"
                        viewBox="0 0 52 52"
                    >
                        <polygon
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                            points="29 13 14 29 25 29 23 39 38 23 27 23"
                        />
                    </svg>
                </div>
                <h6 className="text-4xl font-bold text-deep-purple-accent-400">819</h6>
                <p className="mb-2 font-bold text-md">Books</p>
             
            </div>
            <div className="text-center">
                <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-indigo-50 sm:w-12 sm:h-12">
                <SiBookstack className='h-8 w-10'/>
                </div>
                <h6 className="text-4xl font-bold text-deep-purple-accent-400"><CountUp duration={2} end={100} /></h6>
                <p className="mb-2 font-bold text-md">Books</p>
            
            </div>
            <div className="text-center">
                <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-indigo-50 sm:w-12 sm:h-12">
                    <svg
                        className="w-8 h-8 text-deep-purple-accent-400 sm:w-10 sm:h-10"
                        stroke="currentColor"
                        viewBox="0 0 52 52"
                    >
                        <polygon
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                            points="29 13 14 29 25 29 23 39 38 23 27 23"
                        />
                    </svg>
                </div>
                <h6 className="text-4xl font-bold text-deep-purple-accent-400">91</h6>
                <p className="mb-2 font-bold text-md">Subscribers</p>
              
            </div>
            <div className="text-center">
                <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-indigo-50 sm:w-12 sm:h-12">
                    <svg
                        className="w-8 h-8 text-deep-purple-accent-400 sm:w-10 sm:h-10"
                        stroke="currentColor"
                        viewBox="0 0 52 52"
                    >
                        <polygon
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                            points="29 13 14 29 25 29 23 39 38 23 27 23"
                        />
                    </svg>
                </div>
                <h6 className="text-4xl font-bold text-deep-purple-accent-400">52</h6>
                <p className="mb-2 font-bold text-md">Products</p>
             
            </div>
        </div>
    </div>
)};
