export default {
  name: 'Nazwa turnieju',
  initName: '[Nazwa turnieju]',
  organizer: 'Organizator',
  participantsAmount: 'Liczba uczestników',
  stepper: {
    tournamentType: 'Wybierz typ turnieju',
    buildTeams: 'Stwórz drużyny',
  },
  settings: {
    dateLabel: 'Wybierz datę rozpoczęcia',
    matchDays: 'Wybierz dni rozgrywek',
    matchFrequency: 'Częstotliwość meczy (ilość/dzień)',
  },
  status: {
    label: 'Status',
    finished: 'Zakończony',
    inProgress: 'W trakcie',
  },
  type: {
    label: 'Typ turnieju',
    'round-robin': 'Każdy z każdym',
    'single-elimination': 'System pucharowy',
  },
  error: {
    noTypeChosen: 'Musisz wybrać typ turnieju!',
    noMatchDaysChosen: 'Wybierz przynajmniej jeden dzień rozgrywek!',
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
  details: {
    tabs: {
      matches: 'Mecze',
      scoreboard: 'Wyniki',
    },
  },
  scoreTable: {
    columns: {
      points: 'PUNKTY',
      team: 'DRUŻYNA',
      win: 'WYGRANA',
      draw: 'REMIS',
      lose: 'PORAŻKA',
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
      tooShortName: 'Nazwa drużyny jest za krótka! (min. 3 znaki)',
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
