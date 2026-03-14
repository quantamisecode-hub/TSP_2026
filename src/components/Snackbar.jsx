import React, { useEffect } from 'react';

const Snackbar = ({ show, message, type = 'success', onClose }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!show) return null;

    const styles = {
        success: {
            bg: 'bg-[#1a2b3c]', // Dark navy to match theme
            border: 'border-l-4 border-emerald-500',
            icon: (
                <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
            )
        },
        error: {
            bg: 'bg-[#1a2b3c]',
            border: 'border-l-4 border-rose-500',
            icon: (
                <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        }
    };

    const currentStyle = styles[type] || styles.success;

    return (
        <div className={`fixed top-24 right-8 z-[9999] animate-slide-in-right`}>
            <div className={`${currentStyle.bg} ${currentStyle.border} text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-4 min-w-[320px] backdrop-blur-md bg-opacity-95`}>
                <div className="flex-shrink-0">
                    {currentStyle.icon}
                </div>
                <div className="flex-grow">
                    <p className="text-sm font-medium">{message}</p>
                </div>
                <button 
                    onClick={onClose}
                    className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Snackbar;
