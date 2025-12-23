/* eslint-disable react-hooks/purity */
import React, {useEffect, useState} from 'react';
import {Round, Team} from '@/types';

interface ResultsViewProps {
    winner: Team;
    scores: { team1: number; team2: number };
    rounds: Round[];
    onReset: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({winner, scores, rounds, onReset}) => {
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        setShowConfetti(true);
    }, []);

    return (
        <div className="max-w-4xl mx-auto flex flex-col items-center py-12 space-y-12 animate-in zoom-in duration-500">
            <div className="text-center space-y-4">
                <div className={`
          inline-block px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-4
          ${winner.id === 'team1' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}
        `}>
                    SPIEL ENTSCHIEDEN
                </div>
                <h2 className={`
          text-7xl md:text-9xl font-display font-black italic tracking-tighter uppercase
          ${winner.id === 'team1' ? 'text-cyan-500' : 'text-rose-500'}
        `}>
                    {winner.name}
                </h2>
                <p className="text-2xl font-bold text-slate-400">Hat den Weihnachtskampf gewonnen!</p>
            </div>

            <div className="grid grid-cols-2 gap-8 w-full max-w-xl">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 text-center">
                    <div className="text-4xl font-display font-black text-cyan-500">{scores.team1}</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase mt-1 tracking-widest">Team 1 Punkte
                    </div>
                </div>
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 text-center">
                    <div className="text-4xl font-display font-black text-rose-500">{scores.team2}</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase mt-1 tracking-widest">Team 2 Punkte
                    </div>
                </div>
            </div>

            <div className="w-full bg-slate-900/40 rounded-3xl border border-slate-800 p-8">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6 text-center">Spielzusammenfassung</h3>
                <div className="space-y-2">
                    {rounds.map(r => (
                        <div key={r.id}
                             className="flex justify-between items-center text-sm border-b border-slate-800/50 pb-2">
                            <span className="text-slate-500">Spiel {r.order}: {r.name}</span>
                            <div className="flex items-center gap-4">
                                <span className="text-slate-600 text-xs font-bold">{r.pointsValue} PKT</span>
                                {r.winnerId ? (
                                    <span
                                        className={`font-black uppercase text-[10px] ${r.winnerId === 'team1' ? 'text-cyan-400' : 'text-rose-400'}`}>
                     {r.winnerId === 'team1' ? 'TEAM 1' : 'TEAM 2'}
                   </span>
                                ) : (
                                    <span className="text-slate-700 text-[10px] font-bold">UNGESPIELT</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={onReset}
                className="px-12 py-4 bg-white text-slate-950 font-display font-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5"
            >
                WIEDERHOLUNG
            </button>

            {/* Basic manual confetti style overlay if we had more time/libraries */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                {showConfetti && Array(50).fill(0).map((_, i) => (
                    <div
                        key={i}
                        className={`absolute w-2 h-2 ${i % 2 === 0 ? 'bg-cyan-500' : 'bg-rose-500'} rounded-sm opacity-60 animate-bounce`}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${2 + Math.random() * 3}s`
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export {ResultsView};
