import { Command } from "../commands_handler"
import {
  DiscordClient,
  deferMessage,
  formatTeamEmoji,
  NoConnectedLeagueError
} from "../discord_utils"
import {
  ApplicationCommandType,
  ComponentType,
  RESTPostAPIApplicationCommandsJSONBody
} from "discord-api-types/v10"
import LeagueSettingsDB from "../settings_db"
import MaddenDB from "../../db/madden_db"
import { leagueLogosView } from "../../db/view"
import {
  GameResult,
  MADDEN_SEASON,
  getMessageForWeek
} from "../../export/madden_league_types"
import { GameStatsOptions } from "./game_stats"


// * get the games for the week then store that info

async function getWeeklyGames() {
  const games = await MaddenDB.getLatestWeekSchedule()
  
}