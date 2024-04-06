// src/HomePage.js
"use client"
import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'
import React, { useState, useEffect} from 'react';
import { useAuth } from '../context/AuthContext.js';
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';

function Contact() {
    const {
        currentUser,
    } = useAuth();
  
    
    // State for managing the loading condition
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(true); // State to control the loading state

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading2(false); // Set loading to false after 500 milliseconds
      }, 200);
  
      return () => clearTimeout(timer); // Cleanup the timer
    }, []);
    const LoadingComponent = () => (
      <div className="fixed inset-0 z-50 flex items-center justify-center primary-bg">
        <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
    // Redirect with loading state
    useEffect(() => {
        if (currentUser) {
            setIsLoading(true); // Set loading true before redirecting
            // Wait for a bit before redirecting to allow the loading UI to be visible
            setTimeout(() => {
                window.location.href = '/generate';
            }, 200); // Adjust the delay as needed
        }
    }, [currentUser]); // Depend on currentUser
    if (isLoading2) {
        return <LoadingComponent />;
      }
    if (isLoading) {
        // Render a loading spinner or any loading component you prefer
        return <LoadingComponent />;
    }
    if(!currentUser){
        return (
            <div>
                <Navbar />

                <div className="relative isolate bg-white">
                    <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
                        <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
                        <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
                            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
                            <svg
                                className="absolute inset-0 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                                aria-hidden="true"
                            >
                                <defs>
                                <pattern
                                    id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                                    width={200}
                                    height={200}
                                    x="100%"
                                    y={-1}
                                    patternUnits="userSpaceOnUse"
                                >
                                    <path d="M130 200V.5M.5 .5H200" fill="none" />
                                </pattern>
                                </defs>
                                <rect width="100%" height="100%" strokeWidth={0} fill="white" />
                                <svg x="100%" y={-1} className="overflow-visible fill-gray-50">
                                <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                                </svg>
                                <rect width="100%" height="100%" strokeWidth={0} fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" />
                            </svg>
                            </div>
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Get in touch</h2>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                            Please fill out the form to send us a message. We will get back to you as soon as possible.
                            </p>
                            <dl className="mt-10 space-y-4 text-base leading-7 text-gray-600">
                            <div className="flex gap-x-4">
                                <dt className="flex-none">
                                <span className="sr-only">Address</span>
                                <BuildingOffice2Icon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                                </dt>
                                <dd>
                                1730 Highland Ave
                                <br />
                                Troy, NY 12180
                                </dd>
                            </div>
                            <div className="flex gap-x-4">
                                <dt className="flex-none">
                                <span className="sr-only">Telephone</span>
                                <PhoneIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                                </dt>
                                <dd>
                                <a className="hover:text-gray-900" href="tel:+1 (555) 234-5678">
                                    +1 (111) 111-1111
                                </a>
                                </dd>
                            </div>
                            <div className="flex gap-x-4">
                                <dt className="flex-none">
                                <span className="sr-only">Email</span>
                                <EnvelopeIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                                </dt>
                                <dd>
                                <a className="hover:text-gray-900" href="mailto:shopeasy@gmail.com">
                                    shopeasy@gmail.com
                                </a>
                                </dd>
                            </div>
                            </dl>
                        </div>
                        </div>
                        <form action="" method="POST" className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48">
                        <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
                            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            <div>
                                <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                First name
                                </label>
                                <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                Last name
                                </label>
                                <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="last-name"
                                    id="last-name"
                                    autoComplete="family-name"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                                Email
                                </label>
                                <div className="mt-2.5">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
                                Phone number
                                </label>
                                <div className="mt-2.5">
                                <input
                                    type="tel"
                                    name="phone-number"
                                    id="phone-number"
                                    autoComplete="tel"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                                Message
                                </label>
                                <div className="mt-2.5">
                                <textarea
                                    name="message"
                                    id="message"
                                    rows={4}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                />
                                </div>
                            </div>
                            </div>
                            <div className="mt-8 flex justify-end">
                            <button
                                type="submit"
                                className="rounded-md bg-blue-300 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-shopeasy-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Send message
                            </button>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>

                <div className = "max-w-screen">
                    <Footer></Footer>
                </div>
            </div>
        );
    }
}

export default Contact;