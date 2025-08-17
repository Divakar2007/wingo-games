import React, { useState, useEffect } from 'react';
import { BetOption } from '../types';

interface BettingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlaceBet: (amount: number) => void;
  betOption: BetOption | null;
  balance: number;
}

export const BettingModal: React.FC<BettingModalProps> = ({ isOpen, onClose, onPlaceBet, betOption, balance }) => {
  const [amount, setAmount] = useState(10);
  const [multiplier, setMultiplier] = useState(1);
  const presetAmounts = [10, 100, 1000, 10000];
  const presetMultipliers = [1, 5, 10, 20];

  useEffect(() => {
    if (isOpen) {
      setAmount(10);
      setMultiplier(1);
    }
  }, [isOpen]);

  if (!isOpen || !betOption) return null;

  const totalBet = amount * multiplier;

  const handleConfirmBet = () => {
    if (totalBet <= 0 || isNaN(totalBet)) {
      alert("Please enter a valid bet amount.");
      return;
    }
    if (totalBet > balance) {
      alert("Insufficient balance for this bet.");
      return;
    }
    onPlaceBet(totalBet);
  };
  
  const getBettingOnText = () => {
      if (!betOption) return '';
      const { type, value } = betOption;
      if (type === 'number') return `Number ${value}`;
      if (type === 'size') return value;
      return value.charAt(0) + value.slice(1).toLowerCase();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-5 animate-fade-in-up">
        <h2 className="text-center font-bold text-lg text-gray-800 mb-4">
            Place Bet on <span className="text-red-500">{getBettingOnText()}</span>
        </h2>
        
        {/* Amount Section */}
        <div className="mb-4">
            <label className="text-sm font-semibold text-gray-500 mb-2 block">Amount</label>
            <div className="grid grid-cols-4 gap-2 mb-2">
                {presetAmounts.map(pAmount => (
                    <button key={pAmount} onClick={() => setAmount(pAmount)} className={`py-2 text-sm rounded-lg font-bold transition ${amount === pAmount ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
                        {pAmount}
                    </button>
                ))}
            </div>
            <input 
                type="number"
                value={amount}
                onChange={e => setAmount(Math.max(0, parseInt(e.target.value, 10) || 0))}
                className="w-full p-2 border border-gray-300 rounded-lg text-center font-bold text-lg"
            />
        </div>
        
        {/* Multiplier Section */}
        <div className="mb-5">
            <label className="text-sm font-semibold text-gray-500 mb-2 block">Multiplier</label>
             <div className="grid grid-cols-4 gap-2">
                {presetMultipliers.map(pMult => (
                    <button key={pMult} onClick={() => setMultiplier(pMult)} className={`py-2 text-sm rounded-lg font-bold transition ${multiplier === pMult ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
                        x{pMult}
                    </button>
                ))}
            </div>
        </div>
        
        <div className="text-center mb-5">
            <p className="text-sm text-gray-500">Total Bet Amount</p>
            <p className="text-2xl font-bold text-gray-800">₹{totalBet.toFixed(2)}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
            <button onClick={onClose} className="py-3 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition">
                Cancel
            </button>
            <button 
                onClick={handleConfirmBet} 
                disabled={totalBet > balance || totalBet <= 0}
                className="py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed">
                Confirm
            </button>
        </div>
        <style>{`
            @keyframes fade-in-up {
                0% { opacity: 0; transform: translateY(20px); }
                100% { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in-up {
                animation: fade-in-up 0.3s ease-out forwards;
            }
        `}</style>
      </div>
    </div>
  );
};
