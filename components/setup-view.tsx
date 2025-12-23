'use client';

import React, {useState} from 'react';
import {Round, Team, TeamID} from '@/types';

interface SetupViewProps {
    onStart: (rounds: Round[], teams: { team1: Team; team2: Team }) => void;
}

const SetupView: React.FC<SetupViewProps> = ({onStart}) => {
    const [team1Name, setTeam1Name] = useState('Team Blau');
    const [team2Name, setTeam2Name] = useState('Team Rot');
    const [roundCount, setRoundCount] = useState(15);
    const [roundNames, setRoundNames] = useState<string[]>(Array(15).fill('').map((_, i) => `Spiel ${i + 1}`));

    const handleRoundNameChange = (index: number, val: string) => {
        const next = [...roundNames];
        next[index] = val;
        setRoundNames(next);
    };

    const handleStart = () => {
        const teams = {
            team1: {id: 'team1' as TeamID, name: team1Name, color: 'cyan'},
            team2: {id: 'team2' as TeamID, name: team2Name, color: 'rose'},
        };

        const rounds: Round[] = roundNames.slice(0, roundCount).map((name, i) => ({
            id: crypto.randomUUID(),
            order: i + 1,
            name: name || `Spiel ${i + 1}`,
            pointsValue: i + 1,
            winnerId: null,
        }));

        onStart(rounds, teams);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 text-start">
            <div className="text-center space-y-2">
                <h2 className="text-4xl font-display font-black">Spieleinstellungen</h2>
                <p className="text-slate-400">
                    Konfigurieren Sie die Teams und die bevorstehenden Spiele.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900/40 p-6 rounded-2xl border border-cyan-500/20 shadow-lg shadow-cyan-500/5">
                    <label className="block text-xs uppercase tracking-widest text-cyan-400 mb-2 font-bold">Team 1
                        Name</label>
                    <input
                        type="text"
                        value={team1Name}
                        onChange={e => setTeam1Name(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                        placeholder="E.g. The Titans"
                    />
                </div>
                <div className="bg-slate-900/40 p-6 rounded-2xl border border-rose-500/20 shadow-lg shadow-rose-500/5">
                    <label className="block text-xs uppercase tracking-widest text-rose-400 mb-2 font-bold">Team 2
                        Name</label>
                    <input
                        type="text"
                        value={team2Name}
                        onChange={e => setTeam2Name(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-lg focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all"
                        placeholder="E.g. The Gladiators"
                    />
                </div>
            </div>

            <div className="bg-slate-900/40 p-8 rounded-2xl border border-slate-800">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <div>
                        <h3 className="text-xl font-bold">Rundeneinstellungen</h3>
                        <p className="text-sm text-slate-500">Die Spiele haben eine steigende Wertigkeit (1, 2,
                            3...)</p>
                    </div>
                    <div className="flex items-center gap-4">

                        <select
                            value={roundCount}
                            onChange={e => setRoundCount(parseInt(e.target.value))}
                            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm"
                        >
                            {new Array(20).fill(0).map((i, n) => <option key={n} value={n + 1}>{n + 1} Runden</option>)}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {Array(roundCount).fill(0).map((_, i) => (
                        <div key={i} className="flex items-center gap-2 group">
              <span
                  className="w-8 h-8 flex items-center justify-center bg-slate-800 rounded-full text-xs font-bold text-slate-500 group-hover:bg-slate-700 group-hover:text-slate-300 transition-colors">
                {i + 1}
              </span>
                            <input
                                type="text"
                                value={roundNames[i] || ''}
                                onChange={e => handleRoundNameChange(i, e.target.value)}
                                placeholder={`Game ${i + 1}`}
                                className="flex-1 bg-slate-950/50 border border-slate-800 rounded-md px-3 py-2 text-sm focus:border-slate-600 outline-none"
                            />
                            <span className="text-[10px] text-slate-600 font-bold whitespace-nowrap">{i + 1} pts</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center pb-12">
                <button
                    onClick={handleStart}
                    className="bg-white text-slate-950 hover:bg-slate-200 px-12 py-4 rounded-full font-display font-black text-xl shadow-2xl shadow-white/10 transition-all hover:scale-105 active:scale-95"
                >
                    Spiel starten
                </button>
            </div>
        </div>
    );
};

export {SetupView} ;
