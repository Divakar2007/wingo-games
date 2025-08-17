import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { BalanceCard } from './components/BalanceCard';
import { GameTabs } from './components/GameTabs';
import { GameArea } from './components/GameArea';
import { BettingControls } from './components/BettingControls';
import { GameHistory } from './components/GameHistory';
import { Announcement } from './components/Announcement';
import { BetSuccessfulPopup } from './components/BetSuccessfulPopup';
import { DepositPage } from './components/DepositPage';
import { BettingModal } from './components/BettingModal';
import { WinPopup } from './components/WinPopup';
import { AllGameStates, GameResult, BetOption, Bet, Color } from './types';
import { GAME_MODES, NUMBER_PROPERTIES, PAYOUTS } from './constants';

const generatePeriod = (durationInSeconds: number) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  // This calculation ensures a unique sequence number for the given duration within a day
  const totalSecondsInDay = 24 * 60 * 60;
  const secondsSinceMidnight = (now.getHours() * 3600) + (now.getMinutes() * 60) + now.getSeconds();
  const sequence = Math.floor(secondsSinceMidnight / durationInSeconds) + 1;
  return `${year}${month}${day}${String(sequence).padStart(5, '0')}`;
};


const initializeGameStates = (): AllGameStates => {
  const states: AllGameStates = {};
  Object.keys(GAME_MODES).forEach(mode => {
    const { duration, initialHistory } = GAME_MODES[mode];
    states[mode] = {
      timeLeft: duration,
      period: generatePeriod(duration),
      history: initialHistory,
    };
  });
  return states;
};

const App: React.FC = () => {
  const [view, setView] = useState<'game' | 'deposit'>('game');
  const [balance, setBalance] = useState(80.28);
  const [activeGame, setActiveGame] = useState('WinGo 30sec');
  const [gameStates, setGameStates] = useState<AllGameStates>(initializeGameStates());
  const [showBetPopup, setShowBetPopup] = useState(false);
  
  const [isBettingModalOpen, setBettingModalOpen] = useState(false);
  const [currentBetOption, setCurrentBetOption] = useState<BetOption | null>(null);
  const [activeBets, setActiveBets] = useState<Bet[]>([]);
  const [resolvedBetsQueue, setResolvedBetsQueue] = useState<{ bet: Bet; result: GameResult }[]>([]);
  const [lastResolvedRound, setLastResolvedRound] = useState<{mode: string, period: string, result: GameResult} | null>(null);
  const [winPopup, setWinPopup] = useState<{ show: boolean; amount: number }>({ show: false, amount: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setGameStates(prevStates => {
        const newStates = { ...prevStates };
        for (const mode in newStates) {
          if (newStates[mode].timeLeft <= 1) {
            const finishedPeriod = newStates[mode].period;
            
            const newNumber = Math.floor(Math.random() * 10);
            const properties = NUMBER_PROPERTIES[newNumber];
            const winningResult: GameResult = {
              period: finishedPeriod,
              number: newNumber,
              bigSmall: newNumber >= 5 ? 'Big' : 'Small',
              colors: properties.colors,
            };

            setLastResolvedRound({ mode, period: finishedPeriod, result: winningResult });

            newStates[mode] = {
              history: [winningResult, ...newStates[mode].history.slice(0, 49)],
              period: generatePeriod(GAME_MODES[mode].duration),
              timeLeft: GAME_MODES[mode].duration,
            };
          } else {
            newStates[mode].timeLeft -= 1;
          }
        }
        return newStates;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!lastResolvedRound) return;

    const { mode, period, result } = lastResolvedRound;

    setActiveBets(currentActiveBets => {
      const betsForThisRound = currentActiveBets.filter(
        bet => bet.gameMode === mode && bet.period === period
      );
      if (betsForThisRound.length > 0) {
        const toResolve = betsForThisRound.map(bet => ({ bet, result }));
        setResolvedBetsQueue(prev => [...prev, ...toResolve]);
      }
      return currentActiveBets.filter(
        bet => !(bet.gameMode === mode && bet.period === period)
      );
    });
  }, [lastResolvedRound]);

  useEffect(() => {
    if (resolvedBetsQueue.length === 0) return;

    const { bet, result } = resolvedBetsQueue[0];
    let winnings = 0;
    let isWin = false;

    const { type, value } = bet.option;
    
    switch (type) {
      case 'number':
        if (result.number === value) {
          isWin = true;
          winnings = bet.amount * PAYOUTS.NUMBER;
        }
        break;
      case 'size':
        if (result.bigSmall === value) {
          isWin = true;
          winnings = bet.amount * PAYOUTS.SIZE;
        }
        break;
      case 'color':
        if (result.colors.includes(value as Color)) {
          isWin = true;
          const payoutMultiplier = PAYOUTS.COLOR[value as Color];
          winnings = bet.amount * payoutMultiplier;
        }
        break;
    }

    if (isWin) {
      setBalance(prev => prev + winnings);
      setWinPopup({ show: true, amount: winnings });
      setTimeout(() => {
        setWinPopup({ show: false, amount: 0 });
      }, 5000);
    }

    setResolvedBetsQueue(prev => prev.slice(1));

  }, [resolvedBetsQueue]);

  const handleBetOptionSelect = (option: BetOption) => {
    if (gameStates[activeGame].timeLeft <= 5) {
      alert("Betting is closed for the last 5 seconds of the round.");
      return;
    }
    setCurrentBetOption(option);
    setBettingModalOpen(true);
  };

  const handlePlaceBet = (betAmount: number) => {
    if (balance < betAmount) {
      alert("Insufficient balance.");
      return;
    }
    if (!currentBetOption) return;

    const newBet: Bet = {
      id: `${Date.now()}-${Math.random()}`,
      gameMode: activeGame,
      period: gameStates[activeGame].period,
      option: currentBetOption,
      amount: betAmount,
    };
    
    setBalance(prev => prev - betAmount);
    setActiveBets(prev => [...prev, newBet]);
    setBettingModalOpen(false);
    setCurrentBetOption(null);
    setShowBetPopup(true);
    setTimeout(() => setShowBetPopup(false), 1500);
  };

  const handleDeposit = (amount: number) => {
    setBalance(prevBalance => prevBalance + amount);
    setView('game');
    alert(`Successfully deposited ₹${amount.toFixed(2)}!`);
  };

  const navigateToDeposit = () => setView('deposit');
  const navigateToGame = () => setView('game');
  
  const currentGame = gameStates[activeGame];

  if (view === 'deposit') {
    return <DepositPage currentBalance={balance} onDeposit={handleDeposit} onBack={navigateToGame} />;
  }

  return (
    <div className="max-w-md mx-auto bg-gray-100 font-sans relative">
      <div className="bg-red-500 pb-24 rounded-b-3xl">
        <Header />
        <BalanceCard balance={balance} onDepositClick={navigateToDeposit} />
      </div>
      <div className="px-4 -mt-20">
        <Announcement />
        <div className="relative bg-white shadow-lg rounded-xl p-3 z-10">
          <GameTabs activeGame={activeGame} setActiveGame={setActiveGame} />
          <GameArea 
            activeGame={activeGame}
            period={currentGame.period} 
            timeLeft={currentGame.timeLeft} 
            history={currentGame.history.slice(0, 5)} 
          />
          <BettingControls onBetOptionSelect={handleBetOptionSelect} />
        </div>
      </div>
      
      <div className="px-4 mt-4 pb-4">
        <GameHistory history={currentGame.history} onBetOptionSelect={handleBetOptionSelect} />
      </div>

      {showBetPopup && <BetSuccessfulPopup />}
      
      {isBettingModalOpen && (
        <BettingModal
          isOpen={isBettingModalOpen}
          onClose={() => setBettingModalOpen(false)}
          onPlaceBet={handlePlaceBet}
          betOption={currentBetOption}
          balance={balance}
        />
      )}
      {winPopup.show && <WinPopup amount={winPopup.amount} />}
    </div>
  );
};

export default App;