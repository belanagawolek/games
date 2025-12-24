'use client';

import React, {useEffect, useMemo, useState} from 'react';
import {GameState, GameStatus, Round, Team, TeamID} from '@/types';
import {SetupView} from '@/components/setup-view';
import {GameView} from '@/components/game-view';
import {ResultsView} from '@/components/results-view';

const INITIAL_TEAMS: Record<TeamID, Team> = {
    team1: {id: 'team1', name: 'Team Alpha', color: 'cyan'},
    team2: {id: 'team2', name: 'Team Beta', color: 'rose'},
};

const App: React.FC = () => {
    const [gameState, setGameState] = useState<GameState>({
        status: GameStatus.SETUP,
        teams: INITIAL_TEAMS,
        rounds: [],
    });

    const totalPossiblePoints = useMemo(() =>
            gameState.rounds.reduce((acc, r) => acc + r.pointsValue, 0),
        [gameState.rounds]
    );

    const teamScores = useMemo(() => {
        const scores = {team1: 0, team2: 0};
        gameState.rounds.forEach(r => {
            if (r.winnerId) {
                scores[r.winnerId] += r.pointsValue;
            }
        });
        return scores;
    }, [gameState.rounds]);

    const winner = useMemo(() => {
        const winThreshold = totalPossiblePoints;
        if (teamScores.team1 >= winThreshold) return gameState.teams.team1;
        if (teamScores.team2 >= winThreshold) return gameState.teams.team2;

        // Check if any rounds are left to decide
        const remainingPoints = gameState.rounds
            .filter(r => !r.winnerId)
            .reduce((acc, r) => acc + r.pointsValue, 0);

        // If someone leads by more than what's left
        if (teamScores.team1 > teamScores.team2 + remainingPoints) return gameState.teams.team1;
        if (teamScores.team2 > teamScores.team1 + remainingPoints) return gameState.teams.team2;

        return null;
    }, [teamScores, totalPossiblePoints, gameState.rounds, gameState.teams]);

    // Transition to Finished if winner is found
    useEffect(() => {
        if (winner && gameState.status === GameStatus.PLAYING) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            // setGameState(prev => ({...prev, status: GameStatus.FINISHED}));
        }
    }, [winner, gameState.status]);

    const startNewGame = (rounds: Round[], teams: { team1: Team; team2: Team }) => {
        setGameState({
            status: GameStatus.PLAYING,
            teams,
            rounds,
        });
    };

    const updateRoundWinner = (roundId: string, winnerId: TeamID | null) => {
        setGameState(prev => ({
            ...prev,
            rounds: prev.rounds.map(r => r.id === roundId ? {...r, winnerId} : r)
        }));
    };

    const resetGame = () => {
        setGameState({
            status: GameStatus.SETUP,
            teams: INITIAL_TEAMS,
            rounds: [],
        });
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
            <header
                className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
                <h1 className="text-xl font-display font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-rose-400">
                    Weihnachtskampf
                </h1>
                {gameState.status !== GameStatus.SETUP && (
                    <button
                        onClick={resetGame}
                        className="text-xs uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
                    >
                        Neu starten
                    </button>
                )}
            </header>

            <main className="flex-1 container mx-auto p-4 md:p-8">
                {gameState.status === GameStatus.SETUP && (
                    <SetupView onStart={startNewGame}/>
                )}

                {gameState.status === GameStatus.PLAYING && (
                    <GameView
                        gameState={gameState}
                        scores={teamScores}
                        onUpdateRound={updateRoundWinner}
                    />
                )}

                {gameState.status === GameStatus.FINISHED && winner && (
                    <ResultsView
                        winner={winner}
                        scores={teamScores}
                        rounds={gameState.rounds}
                        onReset={resetGame}
                    />
                )}
            </main>

            <footer className="p-4 text-center text-slate-600 text-xs border-t border-slate-900">
                &copy; {new Date().getFullYear()} Belana & Tobias.
            </footer>
        </div>
    );
};

export default App;
