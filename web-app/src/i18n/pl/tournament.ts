export default {
  name: 'Nazwa turnieju',
  organizer: 'Organizator',
  participantsAmount: 'Liczba uczestników',
  status: {
    label: 'Status',
    isFinished: {
      true: 'Zakończony',
      inProgress: 'W trakcie',
    },
  },
  error: {
    atLeastTwoTeams: 'Dodaj przynajmniej dwie drużyny!',
    addingTournament:
      'Ups... coś poszło nietak. Turniej nie został poprawnie utworzony',
    noTeamsAddedCreator: 'Dodaj drużynę za pomocą kreatora drużyny!',
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
  team: {
    label: 'Drużyna',
    name: 'Nazwa Drużyny',
    list: 'Lista Drużyn',
    choosePlayer: 'Wybierz zawodnika',
    add: 'Dodaj drużynę',
    builderTitle: 'Kreator drużyny',
    error: {
      alreadyIncludedPlayer: 'Ten gracz jest już w drużynie!',
      tooShortName: 'Nazwa drużyny jest za krótka!',
      tooLongName: 'Nazwa drużyny jest za długa!',
      atLeastOneMember: 'Dodaj przynajmniej jednego zawodnika!',
    },
  },
  match: {
    score: 'Wynik',
    played: 'Rozegrane mecze',
    addScore: 'Dodaj wynik',
    resolveConflict: 'Rozwiąż konflikt',
    scorePendingApproval: 'Wynik oczekuje na akceptację',
    ownerMustResolveConflict: 'Organizator musi rozwiązać konflikt',
    scoreInputDialog: {
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
  },
};
