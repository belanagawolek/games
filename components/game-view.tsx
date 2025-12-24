'use client';

import React from 'react';
import {GameState, Round, TeamID} from '@/types';

interface GameViewProps {
    gameState: GameState;
    scores: { team1: number; team2: number };
    onUpdateRound: (roundId: string, winnerId: TeamID | null) => void;
}

const GameView: React.FC<GameViewProps> = ({gameState, scores, onUpdateRound}) => {
    const {team1, team2} = gameState.teams;

    const totalPoints = gameState.rounds.reduce((a, b) => a + b.pointsValue, 0);
    const winLine = Math.floor(totalPoints / 2) + 1;

    const team1Percent = Math.min((scores.team1 / winLine) * 100, 100);
    const team2Percent = Math.min((scores.team2 / winLine) * 100, 100);

    return (
        <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-500">
            {/* Score Header */}
            <div
                className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl">
                <div className="text-center space-y-2">
                    <h3 className="text-cyan-400 font-display font-bold text-sm tracking-widest">{team1.name}</h3>
                    <div
                        className="text-7xl font-display font-black text-cyan-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                        {scores.team1}
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-2">
                        <div
                            className="h-full bg-cyan-500 transition-all duration-1000 ease-out"
                            style={{width: `${team1Percent}%`}}
                        />
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="text-2xl font-display font-black text-slate-700">VS</div>
                </div>

                <div className="text-center space-y-2">
                    <h3 className="text-rose-400 font-display font-bold text-sm tracking-widest">{team2.name}</h3>
                    <div
                        className="text-7xl font-display font-black text-rose-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.4)]">
                        {scores.team2}
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-2">
                        <div
                            className="h-full bg-rose-500 transition-all duration-1000 ease-out ml-auto"
                            style={{width: `${team2Percent}%`}}
                        />
                    </div>
                </div>
            </div>

            {/* Rounds Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {gameState.rounds.map((round) => (
                    <RoundItem
                        key={round.id}
                        round={round}
                        team1={team1.name}
                        team2={team2.name}
                        onSelectWinner={(wid) => onUpdateRound(round.id, wid)}
                    />
                ))}
            </div>
        </div>
    );
};

interface RoundItemProps {
    round: Round;
    team1: string;
    team2: string;
    onSelectWinner: (id: TeamID | null) => void;
}

const RoundItem: React.FC<RoundItemProps> = ({round, team1, team2, onSelectWinner}) => {
    const isWinner1 = round.winnerId === 'team1';
    const isWinner2 = round.winnerId === 'team2';

    return (
        <div className={`
      relative group flex flex-col p-4 rounded-xl border transition-all duration-300
      ${round.winnerId ? 'bg-slate-900 border-slate-700' : 'bg-slate-900/40 border-slate-800 hover:border-slate-600'}
    `}>
            <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Spiel {round.order}</span>
                <span
                    className="text-xs font-black px-2 py-0.5 bg-slate-800 rounded text-slate-300">{round.pointsValue} PKT</span>
            </div>

            <h4 className={`text-sm font-bold truncate mb-6 ${round.winnerId ? 'text-slate-300' : 'text-slate-400'}`}>
                {round.name}
            </h4>

            <div className="mt-auto grid grid-cols-2 gap-2">
                <button
                    onClick={() => onSelectWinner(isWinner1 ? null : 'team1')}
                    className={`
            py-2 px-1 rounded-lg text-[10px] font-bold uppercase tracking-tight transition-all
            ${isWinner1
                        ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                        : 'bg-slate-800 text-slate-500 hover:bg-slate-700 hover:text-cyan-400'}
          `}
                >
                    {isWinner1 ? 'Gewinner' : team1}
                </button>
                <button
                    onClick={() => onSelectWinner(isWinner2 ? null : 'team2')}
                    className={`
            py-2 px-1 rounded-lg text-[10px] font-bold uppercase tracking-tight transition-all
            ${isWinner2
                        ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                        : 'bg-slate-800 text-slate-500 hover:bg-slate-700 hover:text-rose-400'}
          `}
                >
                    {isWinner2 ? 'Gewinner' : team2}
                </button>
            </div>

            {round.winnerId && (
                <div className={`absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black text-white shadow-lg
          ${isWinner1 ? 'bg-cyan-500' : 'bg-rose-500'}`}>
                    ✓
                </div>
            )}
        </div>
    );
};

export {GameView};
