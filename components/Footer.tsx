
import React from 'react';
import { BackArrowIcon, HomeIcon, PlusCircleIcon } from './Icons';

export const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] grid grid-cols-4 items-center text-center text-gray-500 py-2">
      <button onClick={() => alert('Back button clicked!')} className="flex flex-col items-center justify-center h-full">
        <BackArrowIcon className="w-6 h-6" />
      </button>
      <button onClick={() => alert('Home button clicked!')} className="flex flex-col items-center justify-center h-full">
        <HomeIcon className="w-6 h-6" />
      </button>
       <button onClick={() => alert('Add button clicked!')} className="flex flex-col items-center justify-center h-full">
        <PlusCircleIcon className="w-8 h-8 text-red-500" />
      </button>
       <button onClick={() => alert('Profile button clicked!')} className="flex flex-col items-center justify-center h-full relative">
        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold">1</div>
      </button>
    </footer>
  );
};
