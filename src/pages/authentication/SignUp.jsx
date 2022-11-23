/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

import AuthContext from '../../Contexts/AuthContext';

// import SaveUser from './components/SaveUser';
import setAuthToken from './components/SetAuthToken';

const SignUp = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors },
    } = useForm({ mode: 'onChange' });
    const { password, email } = getValues();

    // jwt verify

    const onSubmit = (data) => {
        const { firstName, lastName } = data;
        setError('');
        createUser(email, password)
            .then((result) => {
                const { user } = result;
                console.log(user);
                reset();
                setAuthToken(user);
                const handleUpdateProfile = () => {
                    const profile = {
                        displayName: `${firstName} ${lastName}`,
                    };
                    updateUserProfile(profile)
                        .then(() => {
                            // mutate({ email, userName: profile.displayName });
                       
                        })

                        .catch((err) => console.error(err));
                };

                toast.success('Signup successful');

                handleUpdateProfile();

                //  user?.uid && navigate(from, { replace: true });
            })
            .catch((err) => {
                console.error(err);
                setError(err.message);
            });
    };

    return (
        <div className="container w-full max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-900 dark:text-gray-100">
            <h1 className="text-2xl font-bold text-center">Sign Up</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 ng-untouched ng-pristine ng-valid"
            >
                {/* username */}
                <div className="space-y-1 text-sm">
                    <div>
                        <label htmlFor="firstName" className="block dark:text-gray-400">
                            User Name
                            <div className="flex gap-2">
                                <div>
                                    <input
                                        {...register('firstName', {
                                            required: true,
                                            maxLength: 20,
                                            pattern: /^[A-Za-z]+$/i,
                                        })}
                                        id="firstName"
                                        placeholder="First Name"
                                        className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
                                    />

                                    {errors?.lastName?.type === 'pattern' && (
                                        <p className="text-red-500">
                                            *Alphabetical characters only
                                        </p>
                                    )}
                                    {errors?.lastName?.type === 'maxLength' && (
                                        <p className="text-red-500">
                                            *First name cannot exceed 20 characters
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <input
                                        {...register('lastName', {
                                            required: true,
                                            maxLength: 20,
                                            pattern: /^[A-Za-z]+$/i,
                                        })}
                                        id="lastName"
                                        placeholder="Last Name"
                                        className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
                                    />

                                    {errors?.lastName?.type === 'pattern' && (
                                        <p className="text-red-500">
                                            *Alphabetical characters only
                                        </p>
                                    )}
                                    {errors?.lastName?.type === 'maxLength' && (
                                        <p className="text-red-500">
                                            *Last name cannot exceed 20 characters
                                        </p>
                                    )}
                                </div>
                            </div>
                        </label>
                    </div>

                    {/* email */}
                    <div className="space-y-1 text-sm">
                        <label htmlFor="email" className="block dark:text-gray-400">
                            Email
                            <input
                                {...register('email', { required: true })}
                                type="email"
                                id="email"
                                placeholder="Enter email"
                                className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
                            />
                        </label>
                    </div>
                    {/* password */}
                    <div className="space-y-1 text-sm">
                        <label htmlFor="password" className="block dark:text-gray-400">
                            Password
                            <input
                                {...register('password', {
                                    required: true,

                                    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                                })}
                                type="password"
                                id="password"
                                placeholder="Password"
                                className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
                            />
                            {errors?.password?.type === 'pattern' && (
                                <p className="text-red-500">
                                    *Minimum 6 Character, include one letter and one number
                                </p>
                            )}
                        </label>
                    </div>
                    {/* confirm password */}
                    <div className="space-y-1 text-sm">
                        <label htmlFor="confirmPassword" className="block dark:text-gray-400">
                            Confirm password
                            <input
                                type="password"
                                {...register('confirmPassword', {
                                    validate: (val) =>
                                        password === val || 'Passwords should match!',
                                })}
                                id="confirmPassword"
                                placeholder="Confirm password"
                                className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
                            />
                            {errors?.confirmPassword && (
                                <p className="text-red-500">{errors?.confirmPassword?.message}</p>
                            )}
                        </label>

                        {error && (
                            <h2 className="text-xl text-rose-600 font-bold my-10">
                                *{error.split('/')[1].split(')')[0]}
                            </h2>
                        )}

                        {/* checkbox */}
                        <div className="flex items-center">
                            <label htmlFor="terms" className="text-sm dark:text-gray-400">
                                <input
                                    type="checkbox"
                                    name="terms"
                                    id="terms"
                                    aria-label="terms"
                                    required
                                    className="mr-1 rounded-sm focus:ring-violet-400 focus:dark:border-violet-400 focus:ring-2 accent-violet-400"
                                />
                                I agree to terms and condition
                            </label>
                        </div>
                        <div className="space-y-2">
                            <div>
                                <button
                                    type="submit"
                                    className="w-full mt-8 px-8 py-3 font-semibold rounded-md dark:bg-violet-400 bg-sky-500 dark:text-gray-900"
                                >
                                    Sign Up
                                </button>
                            </div>
                            <p className="px-6 text-sm text-center dark:text-gray-400">
                                Already member?
                                <Link
                                    to="/Signin"
                                    rel="noopener noreferrer"
                                    className="hover:underline  dark:text-violet-400"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
