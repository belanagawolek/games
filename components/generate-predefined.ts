import type {Team} from "@/lib/types";

export function generatePredefined( numberOfTeams: number): Team[] {

    const teams: Team[] = Array.from({ length: numberOfTeams }, (_, i) => ({
        name: `Team ${i + 1}`,
        members: [],
    }));

    teams[0].members.push("Manuel", "Oma Nati", "Ole", "Rene", "Erika", "Tobi");
    teams[1].members.push("Opa Dieter", "Belana", "Arne", "Melissa", "Mandy");

    return teams;
}
