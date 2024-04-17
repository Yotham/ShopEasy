import React from 'react';
import { Transition, Dialog, Fragment } from '@headlessui/react';
import {
    ChevronDoubleRightIcon,
} from '@heroicons/react/20/solid';

function TransparentModal({ isOpen, onClose, itemName, itemLink, servingSize, numServings, caloriesPS, FatPS, CarbPS, ProteinPS }) {
    if (!isOpen) return null;


    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                <Dialog.Panel className="relative flex items-center transform overflow-hidden rounded-lg transition-all md:mt-0 mt-0 mb-0 sm:w-full">
                    {/* EDIT CONTENT BELOW */}
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto bg-gray-200 mt-16 rounded-lg">
                            <a
                                href={itemLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group text-blue-400 flex items-center justify-center pb-4"
                            >
                                View Item
                                <ChevronDoubleRightIcon className="group-hover:translate-x-1 transition duration-150 ease-in-out w-5 h-5 ml-1" />
                            </a>
                            <h1 className="text-2xl font-bold w-72 mb-4">{itemName}</h1>
                            <div className="w-52 text-left">
                                <h3 className="text-xs">SERVING SIZE</h3>
                                <h1 className="text-xl font-bold">{servingSize}</h1>
                            </div>
                            <div className="mt-2 w-52 text-left">
                                <h3 className="text-xs">NUMBER OF SERVINGS</h3>
                                <h1 className="text-xl font-bold">{Math.round(numServings * 10) / 10}</h1>
                            </div>
                            <div className="mt-2 w-52 text-left">
                                <h3 className="text-xs">CALORIES PER SERVING</h3>
                                <h1 className="text-xl font-bold">{Math.round(caloriesPS * 10) / 10}</h1>
                            </div>
                            <div className="my-4 w-52 grid grid-cols-2">
                                <div className="w-48 mt-2 text-left">
                                    <h3 className="text-sm">PROTEIN PER SERVING</h3>
                                    <div className="h-[1px] bg-black my-1"/>
                                    <h3 className="text-sm">CARBS PER SERVING</h3>
                                    <div className="h-[1px] bg-black my-1"/>
                                    <h3 className="text-sm">FAT PER SERVING</h3>
                                </div>
                                <div className="mt-2 text-right">
                                    <h3 className="font-bold text-sm">{Math.round(ProteinPS * 10) / 10}g</h3>
                                    <div className="h-[1px] bg-black my-1"/>
                                    <h3 className="font-bold text-sm">{Math.round(FatPS * 10) / 10}g</h3>
                                    <div className="h-[1px] bg-black my-1"/>
                                    <h3 className="font-bold text-sm">{Math.round(CarbPS * 10) / 10}g</h3>
                                </div>
                            </div>
                            <button
                                className="bg-blue-400 text-white px-10 py-1 mt-4 rounded-md hover:bg-shopeasy-blue transition duration-150 ease-in-out"
                                onClick={onClose}
                            >
                                Close
                            </button>
                        </div>
                    </Dialog.Panel>
                    </Transition.Child>
                </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

export default TransparentModal;
