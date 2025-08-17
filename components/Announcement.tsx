
import React from 'react';
import { SpeakerIcon } from './Icons';

export const Announcement: React.FC = () => {
    return (
        <div className="bg-white shadow-lg rounded-xl flex items-center p-2 mb-4">
            <SpeakerIcon className="w-5 h-5 text-red-500 flex-shrink-0 mx-2" />
            <div className="flex-grow overflow-hidden">
                <p className="text-sm text-gray-700 whitespace-nowrap animate-marquee">
                    If you have not received your withdrawal within 3 days, please contact our self-service...
                </p>
            </div>
            <button onClick={() => alert('Showing details...')} className="bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full ml-2 flex-shrink-0">
                Detail
            </button>
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-150%); }
                }
                .animate-marquee {
                    animation: marquee 15s linear infinite;
                }
            `}</style>
        </div>
    );
};
