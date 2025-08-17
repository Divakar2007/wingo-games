import React from 'react';
import { Color, BetOption } from '../types';
import { NUMBER_PROPERTIES } from '../constants';
import { ChatIcon } from './Icons';

interface BettingControlsProps {
    onBetOptionSelect: (option: BetOption) => void;
}

const NumberButton: React.FC<{ number: number; onClick: () => void }> = ({ number, onClick }) => {
    const props = NUMBER_PROPERTIES[number];
    let bgColor = '';
    let textColor = 'text-white';
    
    if (props.colors.includes(Color.VIOLET)) {
        if (props.colors.includes(Color.RED)) {
            bgColor = 'bg-gradient-to-br from-red-400 via-red-500 to-purple-500';
        } else {
            bgColor = 'bg-gradient-to-br from-green-400 via-green-500 to-purple-500';
        }
    } else if (props.colors.includes(Color.RED)) {
        bgColor = 'bg-red-500';
    } else {
        bgColor = 'bg-green-500';
    }

    return (
        <button onClick={onClick} className={`relative w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-md transition-transform transform hover:scale-105 ${bgColor} ${textColor}`}>
            {number}
        </button>
    )
}

export const BettingControls: React.FC<BettingControlsProps> = ({ onBetOptionSelect }) => {
  return (
    <div className="mt-6 relative">
      <div className="grid grid-cols-3 gap-3">
        <button onClick={() => onBetOptionSelect({type: 'color', value: Color.GREEN})} className="py-3 text-lg font-bold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 transition">Green</button>
        <button onClick={() => onBetOptionSelect({type: 'color', value: Color.VIOLET})} className="py-3 text-lg font-bold text-white bg-purple-500 rounded-lg shadow-md hover:bg-purple-600 transition">Violet</button>
        <button onClick={() => onBetOptionSelect({type: 'color', value: Color.RED})} className="py-3 text-lg font-bold text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition">Red</button>
      </div>

      <div className="grid grid-cols-5 gap-3 mt-4">
        {[...Array(10).keys()].map(num => (
          <NumberButton key={num} number={num} onClick={() => onBetOptionSelect({type: 'number', value: num})} />
        ))}
      </div>
      <div className="absolute -bottom-4 right-0 transform translate-x-1/4">
        <button onClick={() => alert('Chat support clicked!')} className="bg-white rounded-full p-2 shadow-lg">
            <ChatIcon className="w-6 h-6 text-red-500" />
        </button>
      </div>
    </div>
  );
};
