import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Error from '../pages/Error';
import Home from '../pages/Home/Home';

import SignIn from '../pages/authentication/SignIn';
import SignUp from '../pages/authentication/SignUp';

import Blogs from '../pages/Blogs';
import Root from './Root';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />} errorElement={<Error />}>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />

            <Route path="/Signup" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
        </Route>
    )
);

export default router;
