
import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { Screen, Country } from '../types';
import { COUNTRIES } from '../constants';
import { useGame } from '../hooks/useGame';
import { playSound } from '../services/audioService';
import { SparkleEffect, ScreenWrapper } from './UI';
import { CheckIcon, CrossIcon } from './icons';

interface GameProps {
  setScreen: (screen: Screen) => void;
}

// --- Utility Functions ---
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const getQuestion = (type: 'FlagFinder' | 'CountryMatch') => {
    const shuffled = shuffleArray(COUNTRIES);
    const correctCountry = shuffled[0];
    const options = type === 'FlagFinder' 
        ? shuffleArray([correctCountry, ...shuffled.slice(1, 4)])
        : shuffleArray([correctCountry, ...shuffled.slice(1, 6)]);

    return { correctCountry, options };
};


// --- FlagFinder ---
export const FlagFinder: React.FC<GameProps> = ({ setScreen }) => {
    const { unlockFlag } = useGame();
    const [question, setQuestion] = useState(getQuestion('FlagFinder'));
    const [feedback, setFeedback] = useState<{ status: 'correct' | 'incorrect' | 'idle', selected: string }>({ status: 'idle', selected: '' });
    const isTransitioning = useRef(false);

    const nextQuestion = useCallback(() => {
        isTransitioning.current = false;
        setFeedback({ status: 'idle', selected: '' });
        setQuestion(getQuestion('FlagFinder'));
    }, []);

    const handleAnswer = (country: Country) => {
        if (isTransitioning.current) return;
        isTransitioning.current = true;
        
        if (country.code === question.correctCountry.code) {
            playSound('correct');
            unlockFlag(country.code);
            setFeedback({ status: 'correct', selected: country.code });
            setTimeout(nextQuestion, 1200);
        } else {
            playSound('incorrect');
            setFeedback({ status: 'incorrect', selected: country.code });
            setTimeout(nextQuestion, 1500);
        }
    };
    
    return (
        <ScreenWrapper title="Flag Finder" onBack={() => setScreen('home')}>
            <div className="w-full flex flex-col items-center justify-around flex-1 px-4">
                <div className="w-4/5 aspect-[5/3] bg-white rounded-2xl shadow-lg p-2">
                    <img src={`https://flagcdn.com/${question.correctCountry.code}.svg`} alt="Country Flag" className="w-full h-full object-cover rounded-xl"/>
                </div>
                <div className="w-full grid grid-cols-2 gap-4">
                    {question.options.map((country) => {
                        const isSelected = feedback.selected === country.code;
                        const isCorrect = country.code === question.correctCountry.code;
                        let buttonClass = 'bg-white text-slate-700';

                        if (feedback.status !== 'idle' && isSelected) {
                            buttonClass = feedback.status === 'correct' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white animate-shake';
                        } else if (feedback.status === 'incorrect' && isCorrect) {
                           buttonClass = 'bg-white text-slate-700 animate-pulse-green';
                        } else if (feedback.status === 'incorrect' && !isSelected){
                            buttonClass = 'bg-slate-300 text-slate-500 opacity-50';
                        }
                        
                        return (
                            <button key={country.code} onClick={() => handleAnswer(country)} disabled={feedback.status !== 'idle'}
                                className={`relative text-lg font-bold p-5 rounded-2xl shadow-md transition-all duration-300 transform hover:scale-105 ${buttonClass}`}
                            >
                                {country.name}
                                {feedback.status === 'correct' && isSelected && <SparkleEffect />}
                            </button>
                        );
                    })}
                </div>
            </div>
        </ScreenWrapper>
    );
};

// --- CountryMatch ---
export const CountryMatch: React.FC<GameProps> = ({ setScreen }) => {
    const { unlockFlag } = useGame();
    const [question, setQuestion] = useState(getQuestion('CountryMatch'));
    const [feedback, setFeedback] = useState<{ status: 'correct' | 'incorrect' | 'idle', selected: string }>({ status: 'idle', selected: '' });
    const isTransitioning = useRef(false);

    const nextQuestion = useCallback(() => {
        isTransitioning.current = false;
        setFeedback({ status: 'idle', selected: '' });
        setQuestion(getQuestion('CountryMatch'));
    }, []);

    const handleAnswer = (country: Country) => {
        if (isTransitioning.current) return;
        isTransitioning.current = true;
        
        if (country.code === question.correctCountry.code) {
            playSound('correct');
            unlockFlag(country.code);
            setFeedback({ status: 'correct', selected: country.code });
            setTimeout(nextQuestion, 1200);
        } else {
            playSound('incorrect');
            setFeedback({ status: 'incorrect', selected: country.code });
            setTimeout(nextQuestion, 1500);
        }
    };

    return (
        <ScreenWrapper title="Country Match" onBack={() => setScreen('home')}>
             <div className="w-full flex flex-col items-center justify-around flex-1 px-4">
                <h2 className="text-3xl font-black text-slate-700 text-center">Find: {question.correctCountry.name}</h2>
                <div className="w-full grid grid-cols-2 gap-4">
                     {question.options.map((country) => {
                        const isSelected = feedback.selected === country.code;
                        const isCorrect = country.code === question.correctCountry.code;
                        let imgClass = 'transition-all duration-300';
                        let buttonClass = 'transform hover:scale-105';

                        if(feedback.status === 'correct' && isCorrect) {
                            imgClass += ' scale-110 opacity-100';
                            buttonClass += ' z-10';
                        } else if (feedback.status === 'correct' && !isCorrect) {
                            imgClass += ' opacity-0 scale-90';
                        } else if (feedback.status === 'incorrect' && isSelected) {
                            buttonClass += ' animate-shake';
                        } else if (feedback.status === 'incorrect' && isCorrect) {
                             buttonClass += ' border-4 border-emerald-500';
                        }
                        
                        return (
                            <button key={country.code} onClick={() => handleAnswer(country)} disabled={feedback.status !== 'idle'}
                                className={`aspect-[5/3] bg-white rounded-2xl shadow-lg p-1 ${buttonClass}`}>
                                <img src={`https://flagcdn.com/${country.code}.svg`} alt={country.name} className={`w-full h-full object-cover rounded-xl ${imgClass}`}/>
                            </button>
                        );
                    })}
                </div>
            </div>
        </ScreenWrapper>
    );
};

// --- LightningRound ---
const getLightningQuestion = () => {
    const isMatch = Math.random() > 0.5;
    const shuffled = shuffleArray(COUNTRIES);
    const country1 = shuffled[0];
    const country2 = shuffled[1];

    return {
        flagCountry: country1,
        nameCountry: isMatch ? country1 : country2,
        isMatch: isMatch,
    };
};

export const LightningRound: React.FC<GameProps> = ({ setScreen }) => {
    const { highScores, updateHighScore } = useGame();
    const [gameState, setGameState] = useState<'playing' | 'over'>('playing');
    const [question, setQuestion] = useState(getLightningQuestion());
    const [streak, setStreak] = useState(0);
    const [timerKey, setTimerKey] = useState(0);
    
    const timerDuration = 4000;

    const handleAnswer = (userThinksIsMatch: boolean) => {
        if (gameState !== 'playing') return;

        if (userThinksIsMatch === question.isMatch) {
            playSound('ding');
            setStreak(s => s + 1);
            setQuestion(getLightningQuestion());
            setTimerKey(k => k + 1);
        } else {
            endGame();
        }
    };
    
    const endGame = useCallback(() => {
        playSound('buzz');
        setGameState('over');
        updateHighScore('lightningRound', streak);
    }, [streak, updateHighScore]);

    useEffect(() => {
        if (gameState === 'playing') {
            const timer = setTimeout(endGame, timerDuration);
            return () => clearTimeout(timer);
        }
    }, [question, gameState, endGame, timerKey]);

    const restartGame = () => {
        setStreak(0);
        setQuestion(getLightningQuestion());
        setGameState('playing');
        setTimerKey(k => k + 1);
    };

    if (gameState === 'over') {
        return (
            <ScreenWrapper title="Lightning Round" onBack={() => setScreen('home')}>
                <div className="w-full flex flex-col items-center justify-center flex-1 text-center bg-red-100 rounded-2xl p-6">
                    <h2 className="text-5xl font-black text-red-600">Game Over</h2>
                    <div className="my-8">
                        <p className="text-xl text-slate-600">Final Streak</p>
                        <p className="text-8xl font-black text-slate-800">{streak}</p>
                    </div>
                    <p className="text-lg text-slate-600">Personal Best: <span className="font-bold">{highScores.lightningRound}</span></p>
                    <button onClick={restartGame} className="mt-8 bg-sky-500 text-white font-bold py-4 px-10 rounded-full shadow-lg text-2xl hover:bg-sky-600 transition-colors">
                        Play Again
                    </button>
                </div>
            </ScreenWrapper>
        )
    }

    return (
        <ScreenWrapper title="Lightning Round" onBack={() => setScreen('home')}>
            <div className="w-full flex flex-col items-center justify-between flex-1 px-4">
                <div className="w-full text-right">
                    <p className="text-xl text-slate-600">Streak: <span className="font-bold text-2xl text-slate-800">{streak}</span></p>
                </div>
                <div className="w-full flex flex-col items-center my-4">
                    <div className="w-4/5 aspect-[5/3] bg-white rounded-2xl shadow-lg p-2">
                        <img src={`https://flagcdn.com/${question.flagCountry.code}.svg`} alt="Country Flag" className="w-full h-full object-cover rounded-xl"/>
                    </div>
                    <h3 className="text-4xl font-black text-slate-800 mt-6 text-center">{question.nameCountry.name}</h3>
                </div>

                <div className="w-full mb-4">
                    <div key={timerKey} className="h-2.5 rounded-full bg-sky-300 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-400 to-red-500 origin-left animate-shrink" style={{animationDuration: `${timerDuration}ms`, animationTimingFunction: 'linear', animationFillMode: 'forwards'}}></div>
                    </div>
                     <style>{`
                        @keyframes shrink {
                            from { transform: scaleX(1); }
                            to { transform: scaleX(0); }
                        }
                        .animate-shrink { animation-name: shrink; }
                    `}</style>
                </div>

                <div className="w-full grid grid-cols-2 gap-4">
                    <button onClick={() => handleAnswer(false)} className="bg-red-500 hover:bg-red-600 text-white rounded-2xl py-6 shadow-lg transition-colors transform hover:scale-105">
                        <CrossIcon className="w-12 h-12 mx-auto" />
                    </button>
                    <button onClick={() => handleAnswer(true)} className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl py-6 shadow-lg transition-colors transform hover:scale-105">
                        <CheckIcon className="w-12 h-12 mx-auto" />
                    </button>
                </div>
            </div>
        </ScreenWrapper>
    );
};
