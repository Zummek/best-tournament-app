import Tournament, { Match } from '../../../shared/types/Tournament';

const todaysMatchMessage = (tournament: Tournament, matches: Match[]): string => {
  const matchesLines = matches.map((match) => `* ### _${match.teamA?.name}_ VS _${match.teamB?.name}_\n`);
  // eslint-disable-next-line max-len
  const linkToTournamentDetails = `${process.env.SSL ? 'https' : 'http'}://${process.env.FRONTEND_HOST}:${process.env.FRONTEND_PORT}/tournaments/${tournament.id}`;

  return `
# ${tournament.name}
${matchesLines}
Dzisiaj planowo odbywa się powyższe mecze!

Na tej konferencji możecie ustalić szczegóły dzisiejszego dnia. 
Na przykład kto o której godzinie i na którym stanowisku bedzie grał.

[Tutaj znajdziesz szczegóły tego turnieju.](${linkToTournamentDetails})

Powodzenia!`;
};

export default todaysMatchMessage;
