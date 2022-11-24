/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
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
            <div className="drawer drawer-mobile">
                <input id="dashboardOpener" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content ">
                    <Outlet />
                </div>
                <div className="drawer-side  ">
                    <label htmlFor="dashboardOpener" className="drawer-overlay" />
                    <ul className="menu p-4 w-56 bg-base-100 text-base-content">
                        {isBuyer && (
                            <li>
                                <Link to="/dashboard">My Orders</Link>
                            </li>
                        )}
                        {isAdmin && (
                            <>
                                <li>
                                    <Link to="/dashboard">All Users</Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/reported">Reported</Link>
                                </li>
                            </>
                        )}
                        {isSeller && (
                            <>
                                <li>
                                    <Link to="/dashboard">My Products</Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/addproducts">Add Products</Link>
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