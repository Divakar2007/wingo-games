import React from 'react';
import { GameResult } from '../types';
import { NUMBER_PROPERTIES } from '../constants';
import { Color } from '../types';

interface GameAreaProps {
  activeGame: string;
  period: string;
  timeLeft: number;
  history: GameResult[];
}

const getNumberColorClass = (number: number) => {
  const props = NUMBER_PROPERTIES[number];
  if (props.colors.includes(Color.VIOLET)) {
    if (props.colors.includes(Color.RED)) {
        return 'bg-gradient-to-br from-red-400 to-purple-400';
    } else {
        return 'bg-gradient-to-br from-green-400 to-purple-400';
    }
  }
  if (props.colors.includes(Color.RED)) {
    return 'bg-red-500';
  }
  return 'bg-green-500';
}

export const GameArea: React.FC<GameAreaProps> = ({ activeGame, period, timeLeft, history }) => {
  const totalSeconds = timeLeft % 60;
  const totalMinutes = Math.floor(timeLeft / 60);
  const hours = Math.floor(totalMinutes / 60).toString().padStart(2, '0');
  const minutes = (totalMinutes % 60).toString().padStart(2, '0');
  const seconds = totalSeconds.toString().padStart(2, '0');


  return (
    <div className="mt-4 px-2">
      <div className="flex justify-between items-center">
        <button onClick={() => alert('This is how you play Wingo!')} className="text-xs text-gray-500 border border-gray-300 rounded-full px-3 py-1">
          How to play
        </button>
        <div className="text-right">
          <p className="text-sm text-gray-500">Time remaining</p>
          <p className="text-2xl font-bold text-gray-800 tracking-widest">{`${hours}:${minutes}:${seconds}`}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div>
          <p className="text-sm font-semibold text-red-500">{activeGame}</p>
          <div className="flex items-center space-x-1 mt-1">
            {history.map((item, index) => (
               <div key={index} className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold ${getNumberColorClass(item.number)}`}>
                 {item.number}
               </div>
            ))}
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-gray-800">{period}</p>
        </div>
      </div>
    </div>
  );
};