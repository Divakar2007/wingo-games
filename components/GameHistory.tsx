import React, { useState } from 'react';
import { GameResult, Color, BetOption } from '../types';
import { ChatIcon } from './Icons';

interface GameHistoryProps {
  history: GameResult[];
  onBetOptionSelect: (option: BetOption) => void;
}

interface HistoryTabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const HistoryTabs: React.FC<HistoryTabsProps> = ({ activeTab, setActiveTab }) => {
    const tabs = ['Game history', 'Chart', 'Follow Strategy'];

    return (
        <div className="flex items-center space-x-2">
            {tabs.map(tab => (
                 <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                        activeTab === tab 
                        ? 'bg-red-500 text-white shadow-md' 
                        : 'bg-white text-gray-600'
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}

const ColorDot: React.FC<{ color: Color }> = ({ color }) => {
    const colorClass = {
        [Color.GREEN]: 'bg-green-500',
        [Color.VIOLET]: 'bg-purple-500',
        [Color.RED]: 'bg-red-500',
    }[color];
    return <div className={`w-3 h-3 rounded-full ${colorClass}`}></div>
}

const HistoryChart: React.FC<{ history: GameResult[] }> = ({ history }) => {
    const numberFrequency = history.reduce((acc, item) => {
        acc[item.number] = (acc[item.number] || 0) + 1;
        return acc;
    }, {} as Record<number, number>);

    const maxFrequency = Math.max(1, ...Object.values(numberFrequency));

    return (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-bold text-gray-700 mb-3 text-center">Number Frequency (Last {history.length} games)</h3>
            <div className="w-full h-48 flex justify-around items-end gap-2">
                {[...Array(10).keys()].map(num => {
                    const frequency = numberFrequency[num] || 0;
                    const heightPercentage = maxFrequency > 0 ? (frequency / maxFrequency) * 100 : 0;
                    return (
                        <div key={num} className="flex-1 flex flex-col items-center justify-end h-full group">
                            <div className="text-xs text-gray-500 font-semibold mb-1 opacity-0 group-hover:opacity-100 transition-opacity">{frequency}</div>
                            <div
                                className="w-full rounded-t-md bg-gradient-to-t from-red-400 to-red-500 transition-all duration-300 ease-out"
                                style={{ height: `${heightPercentage}%` }}
                                title={`Number ${num}: ${frequency} times`}
                            />
                            <div className="w-full text-center text-xs font-bold mt-1 text-gray-600">{num}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


export const GameHistory: React.FC<GameHistoryProps> = ({ history, onBetOptionSelect }) => {
    const [page, setPage] = useState(1);
    const [multiplier, setMultiplier] = useState('X1');
    const [activeTab, setActiveTab] = useState('Game history');

    const multipliers = ['Random', 'X1', 'X5', 'X10', 'X20', 'X50', 'X100'];
    const itemsPerPage = 10;
    const totalPages = Math.ceil(history.length / itemsPerPage);
    const paginatedHistory = history.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="bg-white rounded-xl shadow-lg p-3 relative">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
             <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-full text-xs overflow-x-auto">
                {multipliers.map(m => (
                    <button
                        key={m}
                        onClick={() => setMultiplier(m)}
                        className={`rounded-full px-3 py-1 font-semibold transition whitespace-nowrap ${
                            multiplier === m
                            ? 'bg-green-500 text-white shadow'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                    >
                        {m}
                    </button>
                ))}
             </div>
             <div className="flex items-center">
                 <button onClick={() => onBetOptionSelect({ type: 'size', value: 'Big' })} className="bg-orange-400 text-white font-bold py-2 px-5 rounded-l-full text-sm">Big</button>
                 <button onClick={() => onBetOptionSelect({ type: 'size', value: 'Small' })} className="bg-blue-400 text-white font-bold py-2 px-5 rounded-r-full text-sm">Small</button>
             </div>
        </div>
        
        <HistoryTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'Game history' && (
            <>
                <div className="mt-3">
                    <table className="w-full text-center text-sm">
                        <thead>
                            <tr className="bg-gray-100 text-gray-500">
                                <th className="py-2 font-normal rounded-l-lg">Period</th>
                                <th className="py-2 font-normal">Number</th>
                                <th className="py-2 font-normal">Big/Small</th>
                                <th className="py-2 font-normal rounded-r-lg">Color</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedHistory.map(item => (
                                <tr key={item.period} className="border-b border-gray-100">
                                    <td className="py-3 text-gray-500">{item.period.slice(-6)}</td>
                                    <td className={`py-3 font-bold ${item.colors.includes(Color.RED) ? 'text-red-500' : 'text-green-500'}`}>
                                        {item.number}
                                    </td>
                                    <td className={`py-3 font-semibold ${item.bigSmall === 'Big' ? 'text-orange-500' : 'text-blue-500'}`}>
                                        {item.bigSmall}
                                    </td>
                                    <td className="py-3">
                                        <div className="flex justify-center items-center space-x-1">
                                            {item.colors.map(c => <ColorDot key={c} color={c} />)}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-center mt-4">
                    <button 
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-3 py-2 bg-gray-200 rounded-l-md disabled:opacity-50"
                    >
                        &lt;
                    </button>
                    <span className="px-4 py-2 bg-gray-100 text-sm">{page}/{totalPages}</span>
                    <button 
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="px-3 py-2 bg-red-500 text-white rounded-r-md disabled:opacity-50"
                    >
                        &gt;
                    </button>
                </div>
            </>
        )}
        
        {activeTab === 'Chart' && <HistoryChart history={history} />}

        {activeTab === 'Follow Strategy' && (
            <div className="mt-4 p-8 text-center text-gray-500 bg-gray-50 rounded-lg">
                <p className="font-semibold">Coming Soon!</p>
                <p className="text-sm mt-1">Expert strategies and tips will be available here.</p>
            </div>
        )}

        <div className="absolute -bottom-4 right-3 transform translate-x-1/4">
            <button onClick={() => alert('Chat support clicked!')} className="bg-white rounded-full p-2 shadow-lg">
                <ChatIcon className="w-8 h-8 text-red-500" />
            </button>
        </div>

    </div>
  );
};