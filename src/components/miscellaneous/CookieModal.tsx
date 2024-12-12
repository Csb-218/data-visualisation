'use client'
import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import {setCookie,hasCookie} from 'cookies-next'


const ModalActionButtons = () => {

    const [isShowing, setIsShowing] = useState<boolean>(false);
    const wrapperRef = useRef<HTMLDivElement | null>(null);


    async function handlePreference(preference: boolean) {

        if (preference) {

        
            setCookie('age','',{
                maxAge:43200,
                path:'/'
            })

            setCookie('gender','',{
                maxAge:43200,
                path:'/'
            })

            setCookie('feature','',{
                maxAge:43200,
                path:'/'
            })

            console.log('cookies stored')

        }

        setIsShowing(false)
    }

    // useEffect(() => {
    //     const handleClickOutside = (event: MouseEvent) => {
    //         if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
    //             setIsShowing(false);
    //         }
    //     };
    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // }, [wrapperRef]);

    useEffect(() => {
        const html = document.querySelector("html");

        if (html) {
            if (isShowing) {
                html.style.overflowY = "hidden";

                const focusableElements =
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
                const modal = document.querySelector("#modal") as HTMLElement; // select the modal by its id

                const firstFocusableElement =
                    modal.querySelectorAll<HTMLElement>(focusableElements)[0]; // get first element to be focused inside modal

                const focusableContent = modal.querySelectorAll<HTMLElement>(focusableElements);

                const lastFocusableElement =
                    focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

                const handleKeyDown = (e: KeyboardEvent) => {
                    if (e.key === "Escape") {
                        setIsShowing(false);
                    }

                    const isTabPressed = e.key === "Tab" || e.keyCode === 9;

                    if (!isTabPressed) {
                        return;
                    }

                    if (e.shiftKey) {
                        // if shift key pressed for shift + tab combination
                        if (document.activeElement === firstFocusableElement) {
                            lastFocusableElement.focus(); // add focus for the last focusable element
                            e.preventDefault();
                        }
                    } else {
                        // if tab key is pressed
                        if (document.activeElement === lastFocusableElement) {
                            // if focused has reached to last focusable element then focus first focusable element after pressing tab
                            firstFocusableElement.focus(); // add focus for the first focusable element
                            e.preventDefault();
                        }
                    }
                };

                document.addEventListener("keydown", handleKeyDown);

                firstFocusableElement.focus();

                return () => {
                    document.removeEventListener("keydown", handleKeyDown);
                };
            } else {
                html.style.overflowY = "visible";
            }
        }
    }, [isShowing]);

    useEffect(() => {

        // check cookies
        async function checkCookies() {


            const feature = hasCookie('feature');
            const gender = hasCookie('gender');
            const age = hasCookie('age');

            if(!age || !gender || !feature){ 
                // cookies not present 
                // show cookie consent form
                setIsShowing(true)
            }
        }

        checkCookies()

    }, [])


    return (
        <>
            {/* <button
        onClick={() => setIsShowing(true)}
        className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
      >
        <span>Open Modal</span>
      </button> */}

            {isShowing && typeof document !== "undefined"
                ? ReactDOM.createPortal(
                    <div
                        className="fixed top-0 left-0 z-20 flex items-center justify-center w-screen h-screen bg-slate-300/20 backdrop-blur-sm"
                        aria-labelledby="header-1a content-1a"
                        aria-modal="true"
                        tabIndex={-1}
                        role="dialog"
                    >
                        {/*    <!-- Modal --> */}
                        <div
                            className="flex max-h-[90vh] w-11/12 max-w-2xl flex-col gap-6 overflow-hidden rounded bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10"
                            ref={wrapperRef}
                            id="modal"
                            role="document"
                        >
                            {/*        <!-- Modal header --> */}
                            <header id="header-1a" className="flex items-center gap-4">
                                <h3 className="flex-1 text-xl font-medium text-slate-700">
                                    Cookie Consent 🍪
                                </h3>
                                <button
                                    onClick={() => setIsShowing(false)}
                                    className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide transition duration-300 rounded-full justify-self-center whitespace-nowrap text-emerald-500 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent"
                                    aria-label="close dialog"
                                >
                                    <span className="relative only:-mx-5">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            role="graphics-symbol"
                                            aria-labelledby="title-79 desc-79"
                                        >
                                            <title id="title-79">Close</title>
                                            <desc id="desc-79">

                                            </desc>
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </span>
                                </button>
                            </header>
                            {/*        <!-- Modal body --> */}
                            <div id="content-1a" className="flex-1 overflow-auto">
                                <p>
                                    This website uses cookies to help you have a superior and more admirable browsing experience on the website .
                                </p>
                            </div>
                            {/*        <!-- Modal actions --> */}
                            <div className="flex justify-start gap-2">
                                <button
                                    className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
                                    onClick={() => handlePreference(true)}
                                >
                                    <span>I Accept</span>
                                </button>
                                <button
                                    className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide transition duration-300 rounded justify-self-center whitespace-nowrap text-emerald-500 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent"
                                    onClick={() => handlePreference(false)}
                                >
                                    <span>I Decline</span>
                                </button>
                            </div>
                        </div>
                    </div>,
                    document.body
                )
                : null}
        </>
    );
};

export default ModalActionButtons;