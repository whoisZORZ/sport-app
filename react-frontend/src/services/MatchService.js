import axios from 'axios';

const MATCH_API_BASE_URL = "http://localhost:8080/api/auth/comp/matches";
const AMFOOTBALLSTATS_API_BASE_URL = "http://localhost:8080/api/auth/comp/matches/amfootball";
const BASKETBALLSTATS_API_BASE_URL = "http://localhost:8080/api/auth/comp/matches/basketball";
const FOOTBALLSTATS_API_BASE_URL = "http://localhost:8080/api/auth/comp/matches/football";
const HANDBALLSTATS_API_BASE_URL = "http://localhost:8080/api/auth/comp/matches/handball";
const HOCKEYSTATS_API_BASE_URL = "http://localhost:8080/api/auth/comp/matches/hockey";
const TEAM_API_BASE_URL = "http://localhost:8080/api/auth/comp/teams";
const COMPETITION_API_BASE_URL = "http://localhost:8080/api/auth/comp/competitions";
const SEASON_API_BASE_URL = "http://localhost:8080/api/auth/comp/seasons";
const ATHLETE_API_BASE_URL = "http://localhost:8080/api/auth/comp/athletes";
const EVENT_API_BASE_URL = "http://localhost:8080/api/auth/comp/events";
const EVENTTYPES_API_BASE_URL = "http://localhost:8080/api/auth/comp/events/types";

class MatchService {

    getMatches() {
        return axios.get(MATCH_API_BASE_URL);
    }

    getTeams() {
        return axios.get(TEAM_API_BASE_URL);
    }

    getCompetitions() {
        return axios.get(COMPETITION_API_BASE_URL);
    }

    getSeasons() {
        return axios.get(SEASON_API_BASE_URL);
    }

    getAthletes() {
        return axios.get(ATHLETE_API_BASE_URL);
    }

    createMatch(match) {
        return axios.post(MATCH_API_BASE_URL, match);
    }

    createTeam(team) {
        return axios.post(TEAM_API_BASE_URL, team);
    }

    createCompetition(competition) {
        return axios.post(COMPETITION_API_BASE_URL, competition);
    }

    createSeason(season) {
        return axios.post(SEASON_API_BASE_URL, season);
    }

    createAthlete(athlete) {
        return axios.post(ATHLETE_API_BASE_URL, athlete);
    }

    getMatchById(matchId) {
        return axios.get(MATCH_API_BASE_URL + '/' + matchId);
    }

    getAmFootballStatsById(amFootballStatsId) {
        return axios.get(AMFOOTBALLSTATS_API_BASE_URL + '/' + amFootballStatsId);
    }

    getBasketballStatsById(basketballStatsId) {
        return axios.get(BASKETBALLSTATS_API_BASE_URL + '/' + basketballStatsId);
    }

    getFootballStatsById(footballStatsId) {
        return axios.get(FOOTBALLSTATS_API_BASE_URL + '/' + footballStatsId);
    }

    getHandballStatsById(handballStatsId) {
        return axios.get(HANDBALLSTATS_API_BASE_URL + '/' + handballStatsId);
    }

    getHockeyStatsById(hockeyStatsId) {
        return axios.get(HOCKEYSTATS_API_BASE_URL + '/' + hockeyStatsId);
    }

    getTeamById(teamId) {
        return axios.get(TEAM_API_BASE_URL + '/' + teamId);
    }

    getCompetitionById(competitionId) {
        return axios.get(COMPETITION_API_BASE_URL + '/' + competitionId);
    }

    getSeasonById(seasonId) {
        return axios.get(SEASON_API_BASE_URL + '/' + seasonId);
    }

    getAthleteById(athleteId) {
        return axios.get(ATHLETE_API_BASE_URL + '/' + athleteId);
    }

    getEventsByMatchId(matchId) {
        return axios.get(EVENT_API_BASE_URL + '/' + matchId);
    }

    getEventTypesById(eventTypesId) {
        return axios.get(EVENTTYPES_API_BASE_URL + '/' + eventTypesId)
    }

    updateMatch(match, matchId) {
        return axios.put(MATCH_API_BASE_URL + '/' + matchId, match);
    }

    updateTeam(team, teamId) {
        return axios.put(TEAM_API_BASE_URL + '/' + teamId, team);
    }

    updateCompetition(competition, competitionId) {
        return axios.put(COMPETITION_API_BASE_URL + '/' + competitionId, competition);
    }

    updateSeason(season, seasonId) {
        return axios.put(SEASON_API_BASE_URL + '/' + seasonId, season);
    }

    updateAthlete(athlete, athleteId) {
        return axios.put(ATHLETE_API_BASE_URL + '/' + athleteId, athlete);
    }

    deleteMatch(matchId) {
        return axios.delete(MATCH_API_BASE_URL + '/' + matchId);
    }

    deleteTeam(teamId) {
        return axios.delete(TEAM_API_BASE_URL + '/' + teamId);
    }

    deleteCompetition(competitionId) {
        return axios.delete(COMPETITION_API_BASE_URL + '/' + competitionId);
    }

    deleteSeason(seasonId) {
        return axios.delete(SEASON_API_BASE_URL + '/' + seasonId);
    }

    deleteAthlete(athleteId) {
        return axios.delete(ATHLETE_API_BASE_URL + '/' + athleteId);
    }

}

export default new MatchService()