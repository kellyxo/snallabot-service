import MaddenDB from "../../db/madden_db";
import { formatRecord } from "../../export/madden_league_types";

/**
 * Returns message-ready matchups for the requested week of the latest season.
 * Records reflect the latest exported standings, not historical standings.
 */
export async function getWeeklyGames(leagueId: string, week: number) {
  const [schedule, teams, standings] = await Promise.all([
    MaddenDB.getLatestWeekSchedule(leagueId, week),
    MaddenDB.getLatestTeams(leagueId),
    MaddenDB.getLatestStandings(leagueId)
  ]);

  const standingsMap = new Map(
    standings.map(standing => [standing.teamId, standing])
  );

  return schedule.map(game => {
    const awayTeam = teams.getTeamForId(game.awayTeamId);
    const homeTeam = teams.getTeamForId(game.homeTeamId);

    const awayStanding = standingsMap.get(awayTeam.teamId);
    const homeStanding = standingsMap.get(homeTeam.teamId);

    return {
      scheduleId: game.scheduleId,
      week: game.weekIndex + 1,
      seasonIndex: game.seasonIndex,
      away: {
        id: awayTeam.teamId,
        name: awayTeam.displayName,
        abbreviation: awayTeam.abbrName,
        record: awayStanding ? formatRecord(awayStanding) : "N/A"
      },
      home: {
        id: homeTeam.teamId,
        name: homeTeam.displayName,
        abbreviation: homeTeam.abbrName,
        record: homeStanding ? formatRecord(homeStanding) : "N/A"
      }
    };
  });
}
