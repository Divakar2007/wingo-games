
import React from 'react';

interface GameTabsProps {
  activeGame: string;
  setActiveGame: (game: string) => void;
}

const gameModes = ['WinGo 30sec', 'WinGo 1 Min', 'WinGo 3 Min', 'WinGo 5 Min'];

const Tab: React.FC<{ title: string; isActive: boolean; onClick: () => void; }> = ({ title, isActive, onClick }) => {
    const [main, sub] = title.split(' ');
    return (
        <button onClick={onClick} className={`flex-1 text-center py-2 transition-all duration-300 ${isActive ? 'text-gray-800' : 'text-gray-400'}`}>
            <span className={`font-bold text-sm ${isActive ? 'text-red-500' : ''}`}>{main}</span>
            <p className="text-xs">{sub}</p>
        </button>
    )
}

export const GameTabs: React.FC<GameTabsProps> = ({ activeGame, setActiveGame }) => {
  return (
    <div className="flex items-center justify-around bg-gray-100 rounded-full relative">
        <div 
            className="absolute top-0 h-full bg-white rounded-full shadow transition-all duration-300"
            style={{ 
                width: '25%', 
                left: `${gameModes.indexOf(activeGame) * 25}%`
            }}
        />
      {gameModes.map(game => (
        <Tab key={game} title={game} isActive={game === activeGame} onClick={() => setActiveGame(game)} />
      ))}
    </div>
  );
};
