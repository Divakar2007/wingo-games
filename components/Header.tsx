
import React from 'react';
import { BackArrowIcon, GiftIcon, HistoryIcon } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4 text-white">
      <button onClick={() => alert('Back button clicked!')} aria-label="Go back">
        <BackArrowIcon className="w-6 h-6" />
      </button>
      <div className="flex items-center space-x-2">
        <div className="bg-white text-red-500 font-bold text-sm p-1 rounded-full shadow-md leading-none">WIN</div>
        <h1 className="text-xl font-bold tracking-wider">Wingo Games</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button onClick={() => alert('Gift button clicked!')} aria-label="Gifts">
            <GiftIcon className="w-6 h-6" />
        </button>
        <button onClick={() => alert('History button clicked!')} aria-label="Game history">
            <HistoryIcon className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};
