import type { Team } from './types';

/**
 * Shuffles an array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Generates random teams from a list of names
 * @param names - Array of participant names
 * @param numberOfTeams - Desired number of teams
 * @returns Array of teams with distributed members
 */
export function generateTeams(names: string[], numberOfTeams: number): Team[] {
  if (names.length === 0) {
    return [];
  }

  if (numberOfTeams <= 0 || numberOfTeams > names.length) {
    throw new Error('Invalid number of teams');
  }

  const shuffledNames = shuffleArray(names);
  const teams: Team[] = Array.from({ length: numberOfTeams }, (_, i) => ({
    name: `Team ${i + 1}`,
    members: [],
  }));

  // Distribute names evenly across teams
  shuffledNames.forEach((name, index) => {
    const teamIndex = index % numberOfTeams;
    teams[teamIndex].members.push(name);
  });

  return teams;
}
