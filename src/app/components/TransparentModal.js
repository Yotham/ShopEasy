import React from 'react';
import { Transition, Dialog, Fragment } from '@headlessui/react';
import {
    ChevronDoubleRightIcon,
} from '@heroicons/react/20/solid';

function TransparentModal({ isOpen, onClose, itemLink, servingSize, numServings, caloriesPS, FatPS, CarbPS, ProteinPS ,className }) {
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
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg transition-all md:mt-0 mt-44 sm:w-full">
                        {/* EDIT CONTENT BELOW */}
                        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto bg-gray-200 mt-16 rounded-lg">
                            <a
                                href={itemLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group text-blue-400 flex items-center w-full justify-center pb-4"
                            >
                                View Item
                                <ChevronDoubleRightIcon className="group-hover:translate-x-1 transition duration-150 ease-in-out w-5 h-5 ml-1" />
                            </a>
                            <p><strong>Serving Size</strong>: <span className = "servingText">{servingSize}</span></p>
                            <p><strong>Number of Servings</strong>: <span className = "servingText">{Math.round(numServings * 10) / 10}</span></p>
                            <p><strong>Calories Per Serving</strong>:<span className = "servingText"> {Math.round(caloriesPS * 10) / 10}</span></p>
                            <p><strong>Protein Per Serving</strong>: <span className = "servingText">{Math.round(ProteinPS * 10) / 10}g</span></p>
                            <p><strong>Fat Per Serving</strong>: <span className = "servingText">{Math.round(FatPS * 10) / 10}g</span></p>
                            <p><strong>Carbs Per Serving</strong>: <span className = "servingText">{Math.round(CarbPS * 10) / 10}g</span></p>
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
