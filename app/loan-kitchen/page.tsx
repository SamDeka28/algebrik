'use client';

import { useState } from 'react';
import { GameMenu } from '@/components/loan-kitchen/pages/GameMenu';
import { GameScreen } from '@/components/loan-kitchen/pages/GameScreen';
import { HowToPlay } from '@/components/loan-kitchen/pages/HowToPlay';

type Screen = 'menu' | 'game' | 'howto';

export default function LoanKitchenPage() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('menu');
  
  return (
    <div className="antialiased text-slate-900 min-h-screen">
      {currentScreen === 'menu' && (
        <GameMenu
          onStart={() => setCurrentScreen('game')}
          onHowTo={() => setCurrentScreen('howto')}
        />
      )}

      {currentScreen === 'game' && (
        <GameScreen onMenu={() => setCurrentScreen('menu')} />
      )}

      {currentScreen === 'howto' && (
        <HowToPlay onBack={() => setCurrentScreen('menu')} />
      )}
    </div>
  );
}
