import React from 'react';

const Logo = ({ className = "w-10 h-10" }) => {
    return (
        <svg
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <rect x="10" y="10" width="60" height="60" rx="16" className="text-ink fill-current" />
            <path d="M18 58L62 22" className="stroke-secondary-400" strokeWidth="8" strokeLinecap="round" opacity="0.95" />
            <circle cx="40" cy="40" r="24" className="fill-primary-600" opacity="0.92" />
            <path
                d="M40 21L25 29L40 37L55 29L40 21Z"
                fill="white"
            />
            <path
                d="M31 33V39C31 42 49 42 49 39V33"
                fill="white"
            />
            <path d="M55 29V35" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M27 52H53" stroke="white" strokeWidth="4" strokeLinecap="round" />
            <path d="M32 58H48" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.85" />
        </svg>
    );
};

export default Logo;
