'use client';

import { useState } from 'react';
import type { GeneratorState } from '@/lib/types';
import { generateTeams } from '@/lib/team-generator';
import { TeamInputForm } from './team-input-form';
import { SpinningWheel } from './spinning-wheel';
import { TeamDisplay } from './team-display';
import {generatePredefined} from "@/components/generate-predefined";

type TeamGeneratorProps = {
    predefined: boolean
};

export function TeamGenerator(props: TeamGeneratorProps) {
    const {predefined} = props;
  const [state, setState] = useState<GeneratorState>({ type: 'input' });
  const [pendingTeams, setPendingTeams] = useState<ReturnType<typeof generateTeams> | null>(null);

  const handleSubmit = (names: string[], numberOfTeams: number) => {
    const teams = predefined ? generatePredefined(2) : generateTeams(names, numberOfTeams);
    setPendingTeams(teams);
    setState({ type: 'spinning' });
  };

  const handleSpinComplete = () => {
    if (pendingTeams) {
      setState({ type: 'results', teams: pendingTeams });
      setPendingTeams(null);
    }
  };

  const handleReset = () => {
    setState({ type: 'input' });
    setPendingTeams(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900 py-12 px-4">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)]">
        {state.type === 'input' && (
          <div className="w-full flex flex-col items-center space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100">
                Team Generator
              </h1>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
                Enter participant names and choose how many teams you want to
                create. The wheel will spin and generate random teams for you!
              </p>
            </div>
            <TeamInputForm onSubmit={handleSubmit} predefined={predefined} />
          </div>
        )}

        {state.type === 'spinning' && (
          <SpinningWheel onComplete={handleSpinComplete} />
        )}

        {state.type === 'results' && (
          <TeamDisplay teams={state.teams} onReset={handleReset} />
        )}
      </div>
    </div>
  );
}
