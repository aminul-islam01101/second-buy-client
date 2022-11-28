/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Avatar from '../assets/images/avatar.png';
import Navbar from '../components/Navbar';
import AuthContext from '../Contexts/AuthContext';
import useAdmin from '../hooks/useAdmin';
import useBuyer from '../hooks/useBuyer';
import useSeller from '../hooks/useSeller';

const DashboardRoot = () => {
    const { user } = useContext(AuthContext);

    const [isAdmin] = useAdmin(user?.email);
    const [isSeller] = useSeller(user?.email);
    const [isBuyer] = useBuyer(user?.email);

    return (
        <div>
            <Navbar />
            <div className="drawer drawer-mobile ">
                <input id="dashboardOpener" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content ">
                    <Outlet />
                </div>
                <div className="drawer-side  ">
                    <label htmlFor="dashboardOpener" className="drawer-overlay" />
                    <ul className="menu p-4 w-64 bg-info  text-base-100">
                        <li className="mb-10">
                            {isAdmin && (
                                <div className="flex">
                                    <div>{user?.displayName}s Dashboard</div>
                                    <div>
                                        <img
                                            className="w-12 h-12 rounded-full"
                                            src={user?.photoURL || Avatar}
                                            alt=""
                                        />
                                    </div>
                                </div>
                            )}
                            {isSeller && (
                                <div className="flex">
                                    <div>{user?.displayName}s Dashboard</div>
                                    <div>
                                        <img
                                            className="w-12 h-12 rounded-full"
                                            src={user?.photoURL || Avatar}
                                            alt=""
                                        />
                                    </div>
                                </div>
                            )}
                            {isBuyer && (
                                <NavLink to="/dashboard">
                                    <div className="flex">
                                        <div>{user?.displayName}s Dashboard</div>
                                        <div>
                                            <img
                                                className="w-12 h-12 rounded-full"
                                                src={user?.photoURL || Avatar}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </NavLink>
                            )}
                        </li>

                        {isBuyer && (
                            <div className="border border-accent p-2">
                                <li>
                                    <NavLink to="/dashboard/myorders">My Orders</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/wishlist">My Wishlist</NavLink>
                                </li>
                            </div>
                        )}
                        {isAdmin && (
                            <>
                                <li>
                                    <NavLink to="/dashboard/buyers">All buyers</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/sellers">All sellers</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/reported">Reported</NavLink>
                                </li>
                            </>
                        )}
                        {isSeller && (
                            <>
                                <li>
                                    <NavLink to="/dashboard/myproducts">My Products</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/addproducts">Add Products</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/mybuyers">My Buyers</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardRoot;
