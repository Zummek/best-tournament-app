export default {
  name: 'Nazwa turnieju',
  organizer: 'Organizator',
  status: 'Status',
  isFinishedTrue: 'Zakończony',
  isFinishedInProgress: 'W trakcie',
  participantsAmount: 'Liczba uczestników',
  matchesPlayed: 'Rozegrane mecze',
  addScore: 'Dodaj wynik',
  resolveConflict: 'Rozwiąż konflikt',
  scorePendingApproval: 'wynik oczekuje na akceptację',
  ownerMustResolveConflict: 'właściciel musi rozwiązać konflikt',
  scoreInputDialog: {
    score: 'Wynik',
    resolveConflict: 'Rozwiąż konflikt',
    completeScoreAfterMatch: 'Wprowadź wynik po rozegranym meczu.',
    enterScoreOrAcceptAlreadyGiven:
      'Wprowadź wynik lub zaakceptuj wynik podany przez drużynę przeciwną',
    addedScoreToMatch: 'Dodano wynik do meczu!',
    teamXReportedResult: 'Drużyna {teamName} zgłosiła wynik:',
    scoreShouldBePositiveInteger:
      'Wynik powinien być dodatnią liczbą całkowitą',
    acceptScore: 'Akceptuj wynik',
    solveConflictBetweenTeamsMessage:
      'Rozwiąż konflikt wyniku meczu pomiędzy drużynami. Zaakceptuj jeden z podaynch wyników lub wprowadz inny.',
    disputeBetweenTeamsHasBeenResolved: 'Rozwiązano spór między drużynami!',
  },

  list: {
    label: 'Lista turniejów',
    search: 'Wyszukaj turniej',
    participants: 'Uczestnicy',
    addNewBtn: 'Dodaj nowy',
    error: {
      noTournaments: 'Brak turniejów do wyświetlenia',
    },
  },
  wrongInputLengthError: 'Niepoprawna długość!',
  atLeastTwoTeamsError: 'Dodaj przynajmniej dwie drużyny!',
  tournamentCreatorTitle: 'Kreator turnieju',
  cannotBeBlankError: 'Pole nie może być puste!',
  alreadyIncludedPlayerError: 'Ten graczj jest już w drużynie!',
  tooShortTeamNameError: 'Nazwa drużyny jest za krótka!',
  tooLongTeamNameError: 'Nazwa drużyny jest za długa!',
  addingTournamentError:
    'Ups... coś poszło nietak. Turniej nie został poprawnie utworzony',
  team: {
    label: 'Drużyna',
    name: 'Nazwa Drużyny',
    list: 'Lista Drużyn',
    noTeamsAddedErrorCreator: 'Dodaj drużynę za pomocą kreatora drużyny!',
    choosePlayer: 'Wybierz zawodnika',
    add: 'Dodaj drużynę',
    builderTitle: 'Kreator drużyny',
    atLeastOneMemberError: 'Dodaj przynajmniej jednego zawodnika!',
  },
};
