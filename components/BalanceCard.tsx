
import React from 'react';
import { RefreshIcon, WalletIcon } from './Icons';

interface BalanceCardProps {
  balance: number;
  onDepositClick: () => void;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ balance, onDepositClick }) => {
  return (
    <div className="mx-4 bg-white/20 backdrop-blur-sm rounded-xl p-4 text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80">Wallet balance</p>
          <div className="flex items-center space-x-2">
            <h2 className="text-3xl font-bold">₹{balance.toFixed(2)}</h2>
            <button onClick={() => alert('Refreshing balance...')} aria-label="Refresh balance">
                <RefreshIcon className="w-5 h-5 opacity-80" />
            </button>
          </div>
        </div>
        <WalletIcon className="w-10 h-10 text-white/50" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <button onClick={() => alert('Withdraw clicked!')} className="bg-white/90 text-red-500 font-bold py-3 rounded-lg shadow-md hover:bg-white transition">
          Withdraw
        </button>
        <button onClick={onDepositClick} className="bg-green-500 text-white font-bold py-3 rounded-lg shadow-md hover:bg-green-600 transition">
          Deposit
        </button>
      </div>
    </div>
  );
};
