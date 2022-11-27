import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Error from '../pages/Error';
import Home from '../pages/Home/Home';

import SignIn from '../pages/authentication/SignIn';
import SignUp from '../pages/authentication/SignUp';

import Blogs from '../pages/Blogs';
import ReportedProducts from '../pages/dashboard/admin/ReportedProducts';
import MyOrders from '../pages/dashboard/buyer/MyOrders';
import AddProducts from '../pages/dashboard/seller/AddProducts';
import MyProducts from '../pages/dashboard/seller/MyProducts';
import CategoryDetails from '../pages/Home/category/CategoryDetails';
import AdminRoute from './AdminRoute';
import BuyerRoute from './BuyerRoute';
import DashboardRoot from './DashboardRoot';

import AllBuyer from '../pages/dashboard/admin/AllBuyer';
import AllSeller from '../pages/dashboard/admin/AllSeller';
import Payment from '../pages/dashboard/buyer/Payment';
import MyDashboard from '../pages/dashboard/MyDashboard';
import Wishlist from '../pages/dashboard/buyer/Wishlist';
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
                errorElement={<Error />}
            >
                <Route path="/dashboard" element={<MyDashboard />} />
                <Route
                    path="/dashboard/myorders"
                    element={
                        <BuyerRoute>
                            <MyOrders />
                        </BuyerRoute>
                    }
                />
                <Route
                    path="/dashboard/payment/:id"
                    element={
                        <BuyerRoute>
                            <Payment />
                        </BuyerRoute>
                    }
                />
                <Route
                    path="/dashboard/wishlist"
                    element={
                        <BuyerRoute>
                            <Wishlist />
                        </BuyerRoute>
                    }
                />
                <Route
                    path="/dashboard/buyers"
                    element={
                        <AdminRoute>
                            <AllBuyer />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/dashboard/sellers"
                    element={
                        <AdminRoute>
                            <AllSeller />
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
                    path="/dashboard/myproducts"
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
