
import React, { useState, useEffect } from 'react';
import { GameProvider, useGame } from './hooks/useGame';
import type { Screen } from './types';
import { HomeScreen, FlagBookScreen, ScoresScreen } from './components/MainScreens';
import { FlagFinder, CountryMatch, LightningRound } from './components/GameModes';
import { BadgeModal } from './components/UI';

const AppContent: React.FC = () => {
    const [screen, setScreen] = useState<Screen>('home');
    const { newlyEarnedBadge, clearNewlyEarnedBadge } = useGame();

    const renderScreen = () => {
        switch (screen) {
            case 'home':
                return <HomeScreen setScreen={setScreen} />;
            case 'flag-finder':
                return <FlagFinder setScreen={setScreen} />;
            case 'country-match':
                return <CountryMatch setScreen={setScreen} />;
            case 'lightning-round':
                return <LightningRound setScreen={setScreen} />;
            case 'flag-book':
                return <FlagBookScreen setScreen={setScreen} />;
            case 'scores':
                return <ScoresScreen setScreen={setScreen} />;
            default:
                return <HomeScreen setScreen={setScreen} />;
        }
    };

    return (
        <div className="bg-sky-100 min-h-screen w-full flex items-center justify-center">
            <div className="relative w-[390px] h-[844px] bg-gradient-to-b from-sky-300 to-sky-500 overflow-hidden shadow-2xl rounded-3xl border-8 border-gray-800">
                <div className="absolute inset-0 transition-opacity duration-500">
                    {renderScreen()}
                </div>
                {newlyEarnedBadge && (
                    <BadgeModal badge={newlyEarnedBadge} onClose={clearNewlyEarnedBadge} />
                )}
            </div>
        </div>
    );
};


const App: React.FC = () => {
    return (
        <GameProvider>
            <AppContent />
        </GameProvider>
    );
};

export default App;
