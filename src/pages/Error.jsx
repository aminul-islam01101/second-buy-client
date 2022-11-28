import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import AuthContext from '../Contexts/AuthContext';

const Error = () => {
    const { logOut } = useContext(AuthContext);

    const error = useRouteError();
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/login');
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="bg-primary ">
            <div className="container grid min-h-screen place-content-center">
                <div>
                    <p className="text-red-500 ">Something went wrong!!!</p>
                    <p className="text-red-400 text-center">
                        Page {error.statusText || error.message} !!
                    </p>
                    <h4 className="text-3xl text-accent text-center ">
                        Please
                        <button type="button" className="button" onClick={handleLogOut}>
                            Sign out
                        </button>
                        and log back in
                    </h4>
                </div>
            </div>
        </div>
    );
};

export default Error;
