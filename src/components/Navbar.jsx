/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Avatar from '../assets/images/avatar.png';
import Logo from '../assets/images/logo.png';
import AuthContext from '../Contexts/AuthContext';

const Navbar = () => {
    const [dark, setDark] = useState(false);
    const navigate = useNavigate();
    const { logOut, user, setUser, setLoading } = useContext(AuthContext);

    const pages = [
        { pageName: 'Home', link: '/', id: 1 },
        { pageName: 'Blogs', link: '/blogs', id: 2 },
    ];
    // logout functionality
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

    // dark mode functionalility
    const handleTheme = () => {
        setDark(!dark);
        localStorage.setItem('dark-mode', !dark);
    };

    useEffect(() => {
        if (dark) {
            document.querySelector('html').setAttribute('data-theme', 'dark');
        } else {
            document.querySelector('html').setAttribute('data-theme', 'secondBuy');
        }
    }, [dark]);
    useEffect(() => {
        const localTheme = JSON.parse(localStorage.getItem('dark-mode'));
        setDark(localTheme);
    }, []);

    return (
        <div className="bg-primary shadow-lg w-full sticky top-0 left-0 z-50">
            <div className="navbar  container ">
                <div className=" navbar-start ">
                    <div className="dropdown ">
                        <label tabIndex={0} className="btn btn-ghost md:hidden text-accent">
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
                            <div>
                                <div>
                                    {pages.map((page) => (
                                        <li key={page.id}>
                                            <NavLink to={page.link}>{page.pageName}</NavLink>
                                        </li>
                                    ))}
                                </div>
                                {user?.uid && (
                                    <li>
                                        <NavLink to="/dashboard">Dashboard</NavLink>
                                    </li>
                                )}
                            </div>
                            <div className="md:hidden dark:text-white">
                                {user?.uid ? (
                                    <li>
                                        <button
                                            onClick={handleClick}
                                            type="button"
                                            className="text-black  rounded-md border-solid border-2 border-secondary flex  justify-center "
                                        >
                                            logout
                                        </button>
                                    </li>
                                ) : (
                                    <div className="flex flex-col justify-center items-center gap-2">
                                        <li className="w-full text-center">
                                            <Link
                                                to="/login"
                                                className="mr-2 flex  justify-center  text-black rounded-md border-solid border-2 border-secondary w-full "
                                            >
                                                Login
                                            </Link>
                                        </li>
                                        <li className="w-full ">
                                            <Link
                                                to="/signup"
                                                className="text-black  rounded-md border-solid border-2 border-secondary flex  justify-center  "
                                            >
                                                Sign Up
                                            </Link>
                                        </li>
                                    </div>
                                )}
                            </div>
                        </ul>
                    </div>
                    <NavLink to="/" className="btn btn-ghost normal-case hidden md:flex text-xl">
                        <img className="w-8 mr-2" src={Logo} alt="logo" />
                        <span className="text-secondary dark:text-teal-300">Second-buy</span>
                    </NavLink>
                </div>
                <div className="navbar-center lg:flex text-sm">
                    <ul className=" md:flex md:flex-row items-center p-0 hidden  gap-1 ">
                        {pages.map((page) => (
                            <li
                                className=" rounded px-1 py-2 hover:text-black hover:bg-[#d3ecf3] transition ease-in-out delay-150 hover:shadow-lg text-accent  "
                                key={page.id}
                            >
                                <NavLink
                                    to={page.link}
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-secondary  text-white px-3 py-2 rounded shadow-lg '
                                            : ''
                                    }
                                >
                                    {page.pageName}
                                </NavLink>
                            </li>
                        ))}
                        {user?.uid && (
                            <li className=" rounded px-1 py-2 hover:text-black hover:bg-[#d3ecf3]  text-accent transition ease-in-out delay-150 hover:shadow-lg  ">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-secondary   text-white px-3 py-2 rounded shadow-lg '
                                            : ''
                                    }
                                    to="/dashboard"
                                >
                                    Dashboard
                                </NavLink>
                            </li>
                        )}
                    </ul>
                    {/* Logo middle */}
                    <Link to="/" className="btn btn-ghost normal-case text-xl md:hidden">
                        <img className="w-8 mr-2" src={Logo} alt="logo" />
                        <span className="text-secondary ">Second-buy</span>
                    </Link>
                </div>
                <div className="navbar-end text-sm ">
                    <div className="hidden md:flex ">
                        {user?.uid ? (
                            <button
                                onClick={handleClick}
                                type="button"
                                className="text-accent  py-1 px-3 rounded-md border-solid border-2 border-secondary "
                            >
                                logout
                            </button>
                        ) : (
                            <div className="mx-5">
                                <Link to="/login" className="mr-2 text-accent underline ">
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="text-accent rounded-md border-solid border-2 border-secondary px-3 py-1.5"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center">
                        <div
                            className="tooltip hover:tooltip-open tooltip-bottom tooltip-success"
                            data-tip={user?.displayName || 'Please Login'}
                        >
                            <Link to="/">
                                <label
                                    tabIndex={0}
                                    className="btn btn-ghost btn-circle avatar hover:bg-slate-500/50"
                                >
                                    <div className="w-6 rounded-full">
                                        <img src={user?.photoURL || Avatar} alt="img" />
                                    </div>
                                </label>
                            </Link>
                        </div>
                        {/* ----------------------------- */}
                        {/* dark mood toggler */}
                        <div>
                            {dark ? (
                                <button
                                    type="button"
                                    onClick={handleTheme}
                                    className="text-white pt-1 text-[20px]"
                                >
                                    <MdOutlineLightMode />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleTheme}
                                    className="  text-2xl pt-1"
                                >
                                    <MdDarkMode />
                                </button>
                            )}
                        </div>
                        {/* dashboard opener button */}
                        <div>
                            {user?.uid && (
                                <label
                                    htmlFor="dashboardOpener"
                                    tabIndex={0}
                                    className="btn btn-ghost text-accent lg:hidden"
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
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
