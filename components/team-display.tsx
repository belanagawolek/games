'use client';

import type {Team} from '@/lib/types';
import Link from "next/link";

type TeamDisplayProps = {
    teams: Team[];
    onReset: () => void;
};

const teamColors = [
    'from-blue-500 to-blue-600',
    'from-red-500 to-red-600',
    'from-green-500 to-green-600',
    'from-purple-500 to-purple-600',
    'from-orange-500 to-orange-600',
    'from-pink-500 to-pink-600',
    'from-indigo-500 to-indigo-600',
    'from-teal-500 to-teal-600',
];

export function TeamDisplay({teams}: TeamDisplayProps) {
    return (
        <div className="w-full max-w-6xl space-y-8">
            <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                    Teams Generated!
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400">
                    Here are your randomly generated teams
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teams.map((team, index) => (
                    <div
                        key={team.name}
                        className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 transform transition-transform hover:scale-105"
                    >
                        <div
                            className={`bg-gradient-to-r ${teamColors[index % teamColors.length]} p-4`}
                        >
                            <h3 className="text-xl font-bold text-white text-center">
                                {team.name}
                            </h3>
                        </div>
                        <div className="p-6">
                            <ul className="space-y-3">
                                {team.members.map((member, memberIndex) => (
                                    <li
                                        key={memberIndex}
                                        className="flex items-center space-x-3 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg"
                                    >
                                        <div
                                            className={`w-8 h-8 rounded-full bg-gradient-to-r ${teamColors[index % teamColors.length]} flex items-center justify-center text-white font-bold text-sm`}
                                        >
                                            {memberIndex + 1}
                                        </div>
                                        <span className="text-zinc-900 dark:text-zinc-100 font-medium">
                      {member}
                    </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center">
                <Link
                    className="py-3 px-8 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
                    href="/counter"
                >
                    Start
                </Link>
            </div>
        </div>
    );
}
