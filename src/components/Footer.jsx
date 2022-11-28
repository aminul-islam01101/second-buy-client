/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => (
    <div>
        <footer aria-label="Site Footer" className="bg-gray-900">
            <div className="mx-auto px-4 pt-3 pb-3 sm:px-6 lg:px-8">
                <div className="mt-8 grid justify-center place-content-center place-items-center grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-3 lg:gap-y-16">
                    <div className="col-span-2 border-t border-white/10 pt-6 sm:col-span-1">
                        <p className="font-bold text-white">Services</p>

                        <nav
                            aria-label="Footer Nav"
                            className="mt-6 flex flex-col space-y-4 text-sm text-gray-300"
                        >
                            <Link to="/" className="inline-block" href="">
                                About Us
                            </Link>
                            <Link to="/blogs" className="inline-block" href="">
                                Blogs
                            </Link>
                        </nav>
                    </div>

                    <div className="col-span-2 border-t border-white/10 pt-6 sm:col-span-1">
                        <p className="font-bold text-white">Helpful Links</p>

                        <nav className="mt-6 flex flex-col space-y-4 text-sm text-gray-300">
                            <Link className="inline-block" href="">
                                Contact Us
                            </Link>
                            <Link className="inline-block" href="">
                                Read review
                            </Link>
                        </nav>
                    </div>

                    <div className="col-span-2 border-t border-white/10 pt-6 sm:col-span-1">
                        <p className="font-bold text-white">Legal</p>

                        <nav className="mt-6 flex flex-col  text-sm text-gray-300">
                            <Link className="inline-block" href="">
                                Accessibility
                            </Link>
                            <Link className="inline-block" href="">
                                Returns Policy
                            </Link>
                        </nav>
                    </div>

                    <div className="col-span-2 flex gap-4 text-gray-500 lg:col-span-4">
                        <nav aria-label="Footer Services Nav" className="mt-4">
                            <ul className="text-xl flex justify-center gap-3">
                                <li>
                                    <a className="text-blue-500" href="https://www.facebook.com/">
                                        <FaFacebook />
                                    </a>
                                </li>
                                <li>
                                    <a className="text-sky-500 " href="https://www.twitter.com/">
                                        <FaTwitter />
                                    </a>
                                </li>
                                <li>
                                    <a className="text-rose-500" href="https://www.instagram.com/">
                                        <FaInstagram />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.github.com/">
                                        <FaGithub />
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="mt-6 border-t border-white/10 pt-3">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                        <p className="text-center text-xs text-gray-400 lg:text-left">
                            Copyright &copy; 2022. CodeReality. All rights reserved.
                        </p>

                        <nav className="flex justify-center gap-4 text-xs text-gray-400 lg:justify-end">
                            <Link href=""> Terms & Conditions</Link>
                            <Link href=""> Privacy Policy</Link>
                            <Link href=""> Cookies</Link>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    </div>
);

export default Footer;
