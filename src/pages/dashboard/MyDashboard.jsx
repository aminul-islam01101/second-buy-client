import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';

import AuthContext from '../../Contexts/AuthContext';

const MyDashboard = () => {
    // const [currentUser, setCurrentUser] = useState('second');
    const { user } = useContext(AuthContext);
    console.log(user);
    const { data: currentUser } = useQuery(['currentUser'], () =>
        axios.get(`${import.meta.env.VITE_API_URL}/user?email=${user?.email}`).then((res) => res.data)
    );

    console.log(currentUser);

    return (
        <div>
            <div>welcome to {currentUser?.user?.role} dashboard</div>
        </div>
    );
};

export default MyDashboard;
