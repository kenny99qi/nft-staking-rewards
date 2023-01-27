import React from 'react';

const Loader = () => {
    return (
            <div className={`
                    text-center text-lg text-gray-900 w-full
                    flex flex-col items-center justify-center
                    bg-white flex flex-col items-center justify-center min-h-screen
                    `}>
                <div className={`
                        animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900
                        `} />
                <p className={`
                        text-center text-lg text-gray-900 w-full
                        my-4
                        `}>
                    Loading...
                </p>
            </div>
    );
};

export default Loader;
