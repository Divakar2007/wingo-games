
import React, { useState } from 'react';
import { BackArrowIcon, WalletIcon } from './Icons';

interface DepositPageProps {
  currentBalance: number;
  onDeposit: (amount: number) => void;
  onBack: () => void;
}

export const DepositPage: React.FC<DepositPageProps> = ({ currentBalance, onDeposit, onBack }) => {
  const [amount, setAmount] = useState('');
  const presetAmounts = [100, 500, 1000, 2000, 5000, 10000];

  const handleDepositClick = () => {
    const depositAmount = parseFloat(amount);
    if (isNaN(depositAmount) || depositAmount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }
    onDeposit(depositAmount);
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 font-sans min-h-screen flex flex-col">
      <header className="flex items-center p-4 bg-red-500 text-white shadow-md sticky top-0 z-10">
        <button onClick={onBack} aria-label="Go back">
          <BackArrowIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold mx-auto">Deposit</h1>
        <div className="w-6"></div> {/* Spacer */}
      </header>

      <main className="flex-grow p-4">
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex items-center justify-between text-gray-700">
            <div className="flex items-center space-x-3">
              <WalletIcon className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-sm">Wallet balance</p>
                <p className="text-2xl font-bold">₹{currentBalance.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4">
          <label htmlFor="amount" className="text-sm font-semibold text-gray-600">Amount</label>
          <div className="relative mt-2">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-700">₹</span>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full pl-10 pr-4 py-3 text-2xl font-bold border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-3 mt-4">
            {presetAmounts.map(preset => (
              <button
                key={preset}
                onClick={() => setAmount(String(preset))}
                className="bg-gray-100 text-gray-700 font-bold py-3 rounded-lg border border-gray-200 hover:bg-red-100 hover:border-red-400 transition"
              >
                ₹{preset}
              </button>
            ))}
          </div>
        </div>
      </main>

      <footer className="p-4 bg-gray-100 sticky bottom-0">
        <button
          onClick={handleDepositClick}
          className="w-full bg-green-500 text-white font-bold py-4 text-lg rounded-lg shadow-md hover:bg-green-600 transition disabled:opacity-50"
          disabled={!amount || parseFloat(amount) <= 0}
        >
          Deposit
        </button>
      </footer>
    </div>
  );
};
