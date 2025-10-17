
import React, { useState, useEffect } from 'react';
import type { Badge } from '../types';
import { BackIcon, StarIcon } from './icons';

// --- ScreenWrapper ---
interface ScreenWrapperProps {
  title: string;
  onBack: () => void;
  children: React.ReactNode;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ title, onBack, children }) => (
  <div className="flex flex-col h-full bg-sky-50 text-slate-800 p-4 pt-6">
    <header className="relative flex items-center justify-center mb-6">
      <button onClick={onBack} className="absolute left-0 text-slate-600 hover:text-slate-900 transition-colors p-2 rounded-full bg-white/50 hover:bg-white/80">
        <BackIcon className="w-6 h-6" />
      </button>
      <h1 className="text-3xl font-black text-slate-700">{title}</h1>
    </header>
    <main className="flex-1 flex flex-col items-center justify-center">
      {children}
    </main>
  </div>
);

// --- Sparkle Effect ---
const Sparkle: React.FC = () => {
  const style = {
    top: `${-10 + Math.random() * 20}%`,
    left: `${-10 + Math.random() * 20}%`,
    animationDelay: `${Math.random() * 0.5}s`,
    transform: `scale(${0.5 + Math.random() * 0.8})`,
  };
  return <div className="absolute w-4 h-4 text-yellow-300 animate-sparkle" style={style}> <StarIcon /> </div>;
};

export const SparkleEffect: React.FC = () => (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {[...Array(15)].map((_, i) => <Sparkle key={i} />)}
    </div>
);


// --- Badge Modal ---
interface BadgeModalProps {
  badge: Badge;
  onClose: () => void;
}

export const BadgeModal: React.FC<BadgeModalProps> = ({ badge, onClose }) => {
    return (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50 p-6 animate-fade-in" onClick={onClose}>
            <div className="bg-gradient-to-br from-yellow-300 to-amber-500 rounded-2xl p-8 text-center text-slate-800 shadow-2xl border-4 border-white transform animate-pop-in w-full max-w-sm" onClick={e => e.stopPropagation()}>
                <div className="flex justify-center mb-4">
                    <div className="bg-white/50 p-4 rounded-full">
                        <StarIcon className="w-16 h-16 text-white"/>
                    </div>
                </div>
                <h2 className="text-2xl font-black mb-2">BADGE UNLOCKED!</h2>
                <h3 className="text-xl font-bold mb-2">{badge.name}</h3>
                <p className="text-slate-700 mb-6">{badge.description}</p>
                <button 
                    onClick={onClose}
                    className="bg-white text-amber-600 font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-transform"
                >
                    Awesome!
                </button>
            </div>
        </div>
    );
};
