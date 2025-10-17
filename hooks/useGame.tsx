
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { HighScores, Badge, Country } from '../types';
import { COUNTRIES, BADGES } from '../constants';
import { playSound } from '../services/audioService';

interface GameContextType {
    unlockedFlags: Set<string>;
    highScores: HighScores;
    earnedBadges: Set<string>;
    newlyEarnedBadge: Badge | null;
    unlockFlag: (countryCode: string) => void;
    updateHighScore: (mode: keyof HighScores, score: number) => void;
    clearNewlyEarnedBadge: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const initialHighScores: HighScores = {
    flagFinder: 0,
    countryMatch: 0,
    lightningRound: 0,
};

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [unlockedFlags, setUnlockedFlags] = useState<Set<string>>(() => new Set());
    const [highScores, setHighScores] = useState<HighScores>(initialHighScores);
    const [earnedBadges, setEarnedBadges] = useState<Set<string>>(() => new Set());
    const [newlyEarnedBadge, setNewlyEarnedBadge] = useState<Badge | null>(null);

    useEffect(() => {
        try {
            const savedFlags = localStorage.getItem('unlockedFlags');
            if (savedFlags) setUnlockedFlags(new Set(JSON.parse(savedFlags)));
            
            const savedScores = localStorage.getItem('highScores');
            if (savedScores) setHighScores(JSON.parse(savedScores));
            else setHighScores(initialHighScores);
            
            const savedBadges = localStorage.getItem('earnedBadges');
            if (savedBadges) setEarnedBadges(new Set(JSON.parse(savedBadges)));

        } catch (error) {
            console.error("Failed to load game state from localStorage", error);
        }
    }, []);

    const saveState = useCallback((key: string, value: any) => {
        try {
            localStorage.setItem(key, JSON.stringify(Array.from(value instanceof Set ? value : [])));
        } catch (error) {
            console.error(`Failed to save ${key} to localStorage`, error);
        }
    }, []);
    
    useEffect(() => {
        saveState('unlockedFlags', unlockedFlags);
    }, [unlockedFlags, saveState]);

    useEffect(() => {
        try {
            localStorage.setItem('highScores', JSON.stringify(highScores));
        } catch (error) {
            console.error("Failed to save high scores to localStorage", error);
        }
    }, [highScores]);

    useEffect(() => {
        saveState('earnedBadges', earnedBadges);
    }, [earnedBadges, saveState]);
    
    const earnBadge = useCallback((badgeId: string) => {
        if (!earnedBadges.has(badgeId)) {
            setEarnedBadges(prev => new Set(prev).add(badgeId));
            setNewlyEarnedBadge(BADGES[badgeId]);
            playSound('fanfare');
        }
    }, [earnedBadges]);
    
    const checkBadges = useCallback((updatedFlags: Set<string>, updatedScores: HighScores) => {
        // Milestone Badges
        if (updatedFlags.size >= 10) earnBadge('unlock-10');
        if (updatedFlags.size === COUNTRIES.length) earnBadge('unlock-all');
        
        // Continent Badges
        const continents = ['Europe', 'Asia', 'Africa', 'North America', 'South America', 'Oceania'];
        continents.forEach(continent => {
            const continentCountries = COUNTRIES.filter(c => c.continent === continent);
            const allUnlocked = continentCountries.every(c => updatedFlags.has(c.code));
            if (allUnlocked) {
                 earnBadge(`continent-${continent.toLowerCase().replace(' ', '-')}`);
            }
        });

        // Streak Badges (checked in updateHighScore)
        if (updatedScores.lightningRound >= 10) earnBadge('streak-10');
        if (updatedScores.lightningRound >= 25) earnBadge('streak-25');

    }, [earnBadge]);

    const unlockFlag = (countryCode: string) => {
        setUnlockedFlags(prev => {
            const newSet = new Set(prev);
            if (!newSet.has(countryCode)) {
                newSet.add(countryCode);
                checkBadges(newSet, highScores);
            }
            return newSet;
        });
    };

    const updateHighScore = (mode: keyof HighScores, score: number) => {
        setHighScores(prev => {
            if (score > prev[mode]) {
                const newScores = { ...prev, [mode]: score };
                checkBadges(unlockedFlags, newScores);
                return newScores;
            }
            return prev;
        });
    };
    
    const clearNewlyEarnedBadge = () => setNewlyEarnedBadge(null);
    
    return (
        <GameContext.Provider value={{ unlockedFlags, highScores, earnedBadges, newlyEarnedBadge, unlockFlag, updateHighScore, clearNewlyEarnedBadge }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = (): GameContextType => {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};
