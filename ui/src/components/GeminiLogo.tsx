import React from "react";

export function GeminiLogo({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M12 2C12 2 12.5 7.5 15.5 10.5C18.5 13.5 24 14 24 14C24 14 18.5 14.5 15.5 17.5C12.5 20.5 12 26 12 26C12 26 11.5 20.5 8.5 17.5C5.5 14.5 0 14 0 14C0 14 5.5 13.5 8.5 10.5C11.5 7.5 12 2 12 2Z"
                fill="currentColor"
            />
        </svg>
    );
}
