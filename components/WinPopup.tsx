import React from 'react';

interface WinPopupProps {
  amount: number;
}

export const WinPopup: React.FC<WinPopupProps> = ({ amount }) => {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 animate-fade-in" role="alert">
      <div className="bg-gradient-to-br from-green-400 to-blue-500 text-white rounded-2xl shadow-xl w-full max-w-xs p-6 text-center animate-fade-in-up">
        <div className="text-2xl mb-2">🎉</div>
        <h2 className="text-xl font-bold mb-2">Congratulations!</h2>
        <p className="text-lg mb-4">You Won</p>
        <p className="text-4xl font-bold tracking-tight">
          ₹{amount.toFixed(2)}
        </p>
      </div>
      <style>{`
          @keyframes fade-in {
              0% { opacity: 0; }
              100% { opacity: 1; }
          }
          .animate-fade-in {
              animation: fade-in 0.3s ease-out forwards;
          }
          @keyframes fade-in-up {
              0% { opacity: 0; transform: translateY(20px) scale(0.95); }
              100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          .animate-fade-in-up {
              animation: fade-in-up 0.4s ease-out forwards;
          }
      `}</style>
    </div>
  );
};
