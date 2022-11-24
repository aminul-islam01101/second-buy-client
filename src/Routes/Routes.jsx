import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Error from '../pages/Error';
import Home from '../pages/Home/Home';

import SignIn from '../pages/authentication/SignIn';
import SignUp from '../pages/authentication/SignUp';

import Blogs from '../pages/Blogs';
import AllUser from '../pages/dashboard/admin/AllUser';
import ReportedProducts from '../pages/dashboard/admin/ReportedProducts';
import MyOrders from '../pages/dashboard/MyOrders';
import AddProducts from '../pages/dashboard/seller/AddProducts';
import MyProducts from '../pages/dashboard/seller/MyProducts';
import CategoryDetails from '../pages/Home/category/CategoryDetails';
import AdminRoute from './AdminRoute';
import BuyerRoute from './BuyerRoute';
import DashboardRoot from './DashboardRoot';
import ProtectedRoute from './ProtectedRoute';
import Root from './Root';
import SellerRoute from './SellerRoute';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Root />} errorElement={<Error />}>
                <Route path="/" element={<Home />} />
                <Route path="/blogs" element={<Blogs />} />

                <Route
                    path="/category/:id"
                    element={
                        <ProtectedRoute>
                            <CategoryDetails />
                        </ProtectedRoute>
                    }
                />

                <Route path="/Signup" element={<SignUp />} />
                <Route path="/login" element={<SignIn />} />
            </Route>
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardRoot />
                    </ProtectedRoute>
                }
            >
                <Route
                    path="/dashboard"
                    element={
                        <BuyerRoute>
                            <MyOrders />
                        </BuyerRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <AdminRoute>
                            <AllUser />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/dashboard/reported"
                    element={
                        <AdminRoute>
                            <ReportedProducts />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <SellerRoute>
                            <MyProducts />
                        </SellerRoute>
                    }
                />
                <Route
                    path="/dashboard/addproducts"
                    element={
                        <SellerRoute>
                            <AddProducts />
                        </SellerRoute>
                    }
                />
            </Route>
        </>
    )
);

export default router;
