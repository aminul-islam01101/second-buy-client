/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Lottie from 'lottie-react';
import React, { useContext } from 'react';

import Welcome from '../../assets/welcome.json';
import AuthContext from '../../Contexts/AuthContext';

const MyDashboard = () => {
    // const [currentUser, setCurrentUser] = useState('second');
    const { user } = useContext(AuthContext);
    console.log(user);
    const { data: currentUser } = useQuery(['currentUser'], () =>
        axios
            .get(`${import.meta.env.VITE_API_URL}/user?email=${user?.email}`)
            .then((res) => res.data)
    );

    console.log(currentUser);

    return (
        <div className=" min-h-screen grid place-items-center bg-primary">
            <div className="flex items-center gap-5 flex-wrap justify-center">
                <div>
                    <Lottie animationData={Welcome} loop />
                </div>
                <div>
                    {' '}
                    <div className="text-xl text-accent text-center">
                        {currentUser.user.role.toUpperCase()}s dashboard
                    </div>
                    <div>
                        <label
                            htmlFor="dashboardOpener"
                            tabIndex={0}
                            className="button text-accent lg:hidden"
                        >
                            Click to Open Your dashBoard
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyDashboard;
