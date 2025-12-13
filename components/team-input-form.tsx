'use client';

import { useState } from 'react';

type TeamInputFormProps = {
  onSubmit: (names: string[], numberOfTeams: number) => void;
  predefined?: boolean;
};

export function TeamInputForm({ onSubmit, predefined }: TeamInputFormProps) {
    const names = predefined ? 'Manuel\nMelissa\nOma Nati\nArne\nOle\nRene\nMandy\nErika\nTobi\nOpa Dieter\nBelana\n' :'';
  const [namesInput, setNamesInput] = useState(names);
  const [numberOfTeams, setNumberOfTeams] = useState(2);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const names = namesInput
      .split('\n')
      .map((name) => name.trim())
      .filter((name) => name.length > 0);

    if (names.length === 0) {
      setError('Please enter at least one name');
      return;
    }

    if (numberOfTeams <= 0) {
      setError('Number of teams must be at least 1');
      return;
    }

    if (numberOfTeams > names.length) {
      setError('Number of teams cannot exceed number of names');
      return;
    }

    onSubmit(names, numberOfTeams);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-6">
      <div>
        <label
          htmlFor="names"
          className="block text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2"
        >
          Enter names (one per line)
        </label>
        <textarea
          id="names"
          value={namesInput}
          onChange={(e) => setNamesInput(e.target.value)}
          className="w-full h-48 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          required
        />
      </div>

      <div>
        <label
          htmlFor="teams"
          className="block text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2"
        >
          Number of teams
        </label>
        <input
          id="teams"
          type="number"
          min="1"
          value={numberOfTeams}
          onChange={(e) => setNumberOfTeams(parseInt(e.target.value) || 0)}
          className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          required
        />
      </div>

      {error && (
        <div
          role="alert"
          className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 text-sm"
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Generate Teams
      </button>
    </form>
  );
}
