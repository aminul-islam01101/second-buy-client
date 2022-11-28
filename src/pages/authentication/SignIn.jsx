/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../../Contexts/AuthContext';
import setAuthToken from './components/SetAuthToken';

const Login = () => {
    const [error, setError] = useState('');

    const {
        register,
        formState: { errors },
        handleSubmit,
        getValues,
    } = useForm({ mode: 'onChange' });
    const { signIn, sendPassResetEmail, setLoading, googleSignIn } = useContext(AuthContext);
    const { email } = getValues();

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const onSubmit = (data) => {
        setError('');
        fetch(`${import.meta.env.VITE_API_URL}/user?email=${data?.email}`, {
            headers: {
                'content-type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((response) => {
                if (response?.user?.email) {
                    signIn(data?.email, data?.password)
                        .then((result) => {
                            const { user } = result;
                            console.log(user);
                            setAuthToken(user);

                            navigate(from, { replace: true });
                        })

                        .catch((error) => {
                            console.log(error.message);
                            setError(error.message);
                        });
                } else {
                    toast.error('Invalid user.Please sign up first');
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };
    const handleForgetPass = () => {
        if (!email) {
            alert('please enter a valid email');
            return;
        }
        sendPassResetEmail(email)
            .then(() => {
                toast.success('reset email sent.Please check your email');
            })
            .catch((er) => {
                console.error(er);
            });
    };
    // handle google sign in
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((result) => {
                const { user } = result;
                console.log(user);
                setAuthToken({ ...user, role: 'buyer' });
                user?.uid && navigate(from, { replace: true });
                //  saveUser(user.email, user.displayName);
                // setUserEmail(user?.email);
            })

            .catch((errors) => {
                console.error(errors);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="">
            <div className="grid min-h-90v place-items-center  text-accent  ">
                <h2 className="text-xl text-rose-600 font-bold my-10">{error}</h2>
                <div className="w-full max-w-md space-y-3 rounded-xl p-8 bg-primary">
                    <h1 className="text-center text-2xl font-bold">Login</h1>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="ng-untouched ng-pristine ng-valid space-y-6"
                    >
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Your email"
                                {...register('email', {
                                    required: '*Email Address is required',
                                })}
                                className="w-full  input py-2 input-bordered bg-error text-accent"
                            />
                            {errors.email && (
                                <p className="text-red-600">{errors.email?.message}</p>
                            )}
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                placeholder="Type Your PassWord"
                                type="password"
                                {...register('password', {
                                    required: '*Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be 6 characters or longer',
                                    },
                                })}
                                className="w-full  input py-2 input-bordered bg-error text-accent "
                            />
                            {errors.password && (
                                <p className="text-red-600">{errors.password?.message}</p>
                            )}
                        </div>
                        <div className="flex justify-end text-xs dark:text-gray-400">
                            Forgot Password?
                            <button type="button" className="underline" onClick={handleForgetPass}>
                                Reset
                            </button>
                        </div>
                        <button type="submit" className="button">
                            Login
                        </button>
                    </form>
                    <div className="flex items-center space-x-1">
                        <div className="h-px flex-1 dark:bg-gray-700 sm:w-16" />

                        <div className="px-3 text-sm dark:text-gray-400">
                          
                            <p className="text-center">or</p> Login with social accounts
                        </div>
                        <div className="h-px flex-1 dark:bg-gray-700 sm:w-16" />
                    </div>
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={handleGoogleSignIn}
                            type="button"
                            aria-label="Log in with Google"
                            className="button"
                        >
                            <FcGoogle />
                        </button>
                    </div>
                    <p className="text-center text-xs  sm:px-6">
                        Dont&#39;s have an account?
                        <Link to="/signup" rel="noopener noreferrer" className="underline ">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
