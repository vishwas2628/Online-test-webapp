import React from 'react';

const Logo = ({ className = "w-10 h-10" }) => {
    return (
        <svg
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Sphere Background */}
            <circle cx="40" cy="40" r="32" className="text-primary-600 fill-current" />

            {/* Inner Ring */}
            <circle cx="40" cy="40" r="28" stroke="white" strokeWidth="2" fill="none" opacity="0.9" />

            {/* Graduation Cap - Moved Up for better spacing */}
            <path
                d="M40 18L24 26L40 34L56 26L40 18Z"
                fill="white"
            />
            <path
                d="M31 30V36C31 39 49 39 49 36V30"
                fill="white"
            />
            {/* Tassle detail */}
            <path d="M56 26V32" stroke="white" strokeWidth="1.5" strokeLinecap="round" />


            {/* Checkmark - Moved Down and Centered */}
            <path
                d="M28 48L36 56L52 40"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default Logo;
