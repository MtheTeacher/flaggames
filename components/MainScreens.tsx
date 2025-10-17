
import React from 'react';
import type { Screen } from '../types';
import { useGame } from '../hooks/useGame';
import { COUNTRIES, BADGES } from '../constants';
import { BookIcon, TrophyIcon, StarIcon } from './icons';
import { ScreenWrapper } from './UI';

interface ScreenProps {
    setScreen: (screen: Screen) => void;
}

const MenuButton: React.FC<{ onClick: () => void; children: React.ReactNode; className?: string }> = ({ onClick, children, className = '' }) => (
    <button
        onClick={onClick}
        className={`w-full text-2xl font-bold text-white bg-white/30 rounded-2xl py-5 shadow-lg border-2 border-white/50 backdrop-blur-sm hover:bg-white/40 hover:scale-105 transition-all duration-300 ${className}`}
    >
        {children}
    </button>
);

export const HomeScreen: React.FC<ScreenProps> = ({ setScreen }) => {
    return (
        <div className="h-full flex flex-col justify-between items-center p-8 text-white">
            <div className="text-center mt-16">
                <h1 className="text-6xl font-black" style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.1)' }}>Flag Quest</h1>
                <p className="text-xl font-semibold mt-2 opacity-90">Your Adventure in Vexillology!</p>
            </div>

            <div className="w-full space-y-4">
                <MenuButton onClick={() => setScreen('flag-finder')}>Flag Finder</MenuButton>
                <MenuButton onClick={() => setScreen('country-match')}>Country Match</MenuButton>
                <MenuButton onClick={() => setScreen('lightning-round')}>Lightning Round</MenuButton>
            </div>

            <div className="w-full grid grid-cols-2 gap-4">
                <button onClick={() => setScreen('flag-book')} className="flex flex-col items-center justify-center p-4 bg-white/20 rounded-2xl hover:bg-white/30 transition-colors">
                    <BookIcon className="w-10 h-10 mb-1"/>
                    <span className="font-bold">Flag Book</span>
                </button>
                 <button onClick={() => setScreen('scores')} className="flex flex-col items-center justify-center p-4 bg-white/20 rounded-2xl hover:bg-white/30 transition-colors">
                    <TrophyIcon className="w-10 h-10 mb-1"/>
                    <span className="font-bold">Badges</span>
                </button>
            </div>
        </div>
    );
};

export const FlagBookScreen: React.FC<ScreenProps> = ({ setScreen }) => {
    const { unlockedFlags } = useGame();
    return (
        <ScreenWrapper title="Flag Book" onBack={() => setScreen('home')}>
            <p className="mb-4 text-slate-600 -mt-4">{unlockedFlags.size} of {COUNTRIES.length} flags collected</p>
            <div className="w-full flex-1 overflow-y-auto pr-2">
                <div className="grid grid-cols-4 gap-4">
                    {COUNTRIES.map(country => (
                        <div key={country.code} className="aspect-video flex items-center justify-center p-1 bg-slate-200 rounded-lg shadow-inner">
                            {unlockedFlags.has(country.code) ? (
                                <img
                                    src={`https://flagcdn.com/${country.code}.svg`}
                                    alt={country.name}
                                    className="w-full h-full object-cover rounded-md shadow-md"
                                />
                            ) : (
                                <div className="w-full h-full bg-slate-300 rounded-md flex items-center justify-center text-slate-500 text-2xl font-bold">?</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </ScreenWrapper>
    );
};

export const ScoresScreen: React.FC<ScreenProps> = ({ setScreen }) => {
    const { highScores, earnedBadges } = useGame();
    return (
        <ScreenWrapper title="Scores & Badges" onBack={() => setScreen('home')}>
             <div className="w-full max-w-md mx-auto">
                <div className="bg-white/70 p-4 rounded-xl shadow-md mb-6">
                    <h2 className="text-xl font-bold text-center text-slate-700 mb-3">Personal Best</h2>
                    <div className="space-y-2 text-lg text-slate-600 font-semibold">
                        <div className="flex justify-between"><span>Flag Finder:</span> <span>{highScores.flagFinder}</span></div>
                        <div className="flex justify-between"><span>Country Match:</span> <span>{highScores.countryMatch}</span></div>
                        <div className="flex justify-between"><span>Lightning Round:</span> <span>{highScores.lightningRound} streak</span></div>
                    </div>
                </div>
                 <div className="flex-1 overflow-y-auto pr-2" style={{maxHeight: '450px'}}>
                    <h2 className="text-xl font-bold text-center text-slate-700 mb-3">Badges</h2>
                    <div className="space-y-3">
                        {Object.values(BADGES).map(badge => (
                             <div key={badge.id} className={`p-4 rounded-lg shadow-sm transition-all ${earnedBadges.has(badge.id) ? 'bg-amber-300' : 'bg-slate-200 opacity-60'}`}>
                                 <div className="flex items-center">
                                     <div className={`mr-4 p-2 rounded-full ${earnedBadges.has(badge.id) ? 'bg-white/50 text-amber-600' : 'bg-slate-300 text-slate-500'}`}>
                                         <StarIcon className="w-6 h-6"/>
                                     </div>
                                     <div>
                                         <h3 className="font-bold text-slate-800">{badge.name}</h3>
                                         <p className="text-sm text-slate-600">{badge.description}</p>
                                     </div>
                                 </div>
                             </div>
                        ))}
                    </div>
                 </div>
            </div>
        </ScreenWrapper>
    );
};
