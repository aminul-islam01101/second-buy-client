/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Avatar from '../assets/images/avatar.png';
import Logo from '../assets/images/logo.png';
import AuthContext from '../Contexts/AuthContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { logOut, user, setUser, setLoading } = useContext(AuthContext);
    const [theme, setTheme] = useState(null);
    const pages = [
        { pageName: 'Home', link: '/', id: 1 },
        { pageName: 'Blogs', link: '/blogs', id: 2 },
        { pageName: 'Dashboard', link: '/dashboard', id: 3 },

];

    const handleClick = () => {
        logOut()
            .then(() => {
                toast.success('Sign-out successful.');
                setLoading(false);
                localStorage.removeItem('token');
                setUser(null);
                navigate('/');
            })
            .catch((er) => {
                console.error(er);
            });
    };

    // handling dark mode light mode
    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }, []);
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const handleDarkLight = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <div className="bg-stone-100 dark:bg-gray-600 dark:text-white shadow-lg w-full sticky top-0 left-0 z-50">
            <div className="navbar  container ">
                <div className=" navbar-start ">
                    <div className="dropdown dark:bg-gray-600 ">
                        <label tabIndex={0} className="btn btn-ghost md:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 dark:bg-gray-600  rounded-box w-52"
                        >
                            {pages.map((page) => (
                                <li key={page.id}>
                                    <NavLink to={page.link}>{page.pageName}</NavLink>
                                </li>
                            ))}
                            <div className="md:hidden dark:text-white">
                                {user?.uid ? (
                                    <li>
                                        <button
                                            onClick={handleClick}
                                            type="button"
                                            className="button text-black"
                                        >
                                            logout
                                        </button>
                                    </li>
                                ) : (
                                    <div className="mx-5">
                                        <li>
                                            <Link
                                                to="/login"
                                                className="mr-2 text-black dark:text-white "
                                            >
                                                Login
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/signup"
                                                className="text-black dark:text-white"
                                            >
                                                SignUp
                                            </Link>
                                        </li>
                                    </div>
                                )}
                            </div>
                        </ul>
                    </div>
                    <NavLink to="/" className="btn btn-ghost normal-case hidden md:flex text-xl">
                        <img className="w-8 mr-2" src={Logo} alt="logo" />
                        <span className="text-teal-600 dark:text-teal-300">Second-buy</span>
                    </NavLink>
                </div>
                <div className="navbar-center lg:flex text-sm">
                    <ul className=" md:flex md:flex-row p-0 hidden  gap-1 ">
                        {pages.map((page) => (
                            <li
                                className=" rounded px-1 py-2 hover:dark:text-black hover:bg-[#d3ecf3] transition ease-in-out delay-150 hover:shadow-lg  "
                                key={page.id}
                            >
                                <NavLink
                                    to={page.link}
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-[#0097C3]   text-white px-3 py-2 rounded shadow-lg '
                                            : ''
                                    }
                                >
                                    {page.pageName}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    {/* Logo middle */}
                    <Link to="/home" className="btn btn-ghost normal-case text-xl md:hidden">
                        <img className="w-8 mr-2" src={Logo} alt="logo" />
                        <span className="text-teal-600 dark:text-teal-300">Second-buy</span>
                    </Link>
                </div>
                <div className="navbar-end text-sm ">
                    <div className="hidden md:flex ">
                        {user?.uid ? (
                            <button
                                onClick={handleClick}
                                type="button"
                                className=" text-black dark:text-white hover:underline"
                            >
                                logout
                            </button>
                        ) : (
                            <div className="mx-5">
                                <Link
                                    to="/login"
                                    className="mr-2 text-black dark:text-white hover:underline "
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="text-black dark:text-white hover:underline"
                                >
                                    SignUp
                                </Link>
                            </div>
                        )}
                    </div>
                    <div
                        className="tooltip hover:tooltip-open tooltip-bottom tooltip-success"
                        data-tip={user?.displayName || 'Please Login'}
                    >
                        <Link to="/profile">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-8 rounded-full">
                                    <img src={user?.photoURL || Avatar} alt="img" />
                                </div>
                            </label>
                        </Link>
                    </div>

                    {/* ----------------------------- */}

                    {/* dark mood toggler */}
                    <div
                        className="tooltip hover:tooltip-open tooltip-bottom tooltip-success"
                        data-tip={theme === 'dark' ? 'toggle light' : 'toggle dark'}
                    >
                        <label
                            htmlFor="Toggle1"
                            className="inline-flex items-center space-x-4 cursor-pointer dark:text-gray-100"
                        >
                            <span className="relative">
                                <input
                                    id="Toggle1"
                                    onChange={handleDarkLight}
                                    type="checkbox"
                                    className="hidden  peer"
                                />
                                <div
                                    className="w-8 h-5 rounded-full shadow-inner   dark:bg-gray-200
                           peer-checked:bg-gray-400"
                                ></div>
                                <div className="absolute inset-y-0 left-0 w-3 h-3 m-1 rounded-full shadow peer-checked:right-0 peer-checked:left-auto bg-gray-800 dark:bg-gray-800"></div>
                            </span>
                        </label>

                        {/* dashboard opener button */}
                        <label
                            htmlFor="dashboardOpener"
                            tabIndex={0}
                            className="btn btn-ghost lg:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
