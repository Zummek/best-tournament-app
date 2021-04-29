export default {
  name: 'Tournament name',
  initName: '[Tournament name]',
  organizer: 'Organizer',
  participantsAmount: 'Number of participants',
  stepper: {
    tournamentType: 'Choose tournament type',
    buildTeams: 'Create teams',
  },
  status: {
    label: 'Status',
    finished: 'Finished',
    inProgress: 'In progress',
  },
  type: {
    label: 'Tournament type',
    'round-robin': 'Round-robin',
    'single-elimination': 'Single elimination',
  },
  error: {
    atLeastTwoTeams: 'Add at least two teams!',
    addingTournament: 'Ups... something went wrong. Tournament was not created',
    noTeamsAddedCreator: 'Add new teams using Team creator!',
  },
  list: {
    label: 'Tournaments',
    search: 'Search',
    participants: 'Participants',
    addNewBtn: 'Add new',
    error: {
      noTournaments: 'No tournaments to show',
    },
  },
  team: {
    label: 'Team',
    name: 'Team name',
    list: 'Teams List',
    choosePlayer: 'Choose player',
    add: 'Add team',
    builderTitle: 'Team creator',
    error: {
      alreadyIncludedPlayer: 'That player is already in the team !',
      tooShortName: 'Team name too short! (min. 3 characters)',
      atLeastOneMember: 'Add at least one team member!',
    },
  },
  match: {
    score: 'Score',
    played: 'Matches played',
    addScore: 'Add score',
    resolveConflict: 'Resolve conflict',
    scorePendingApproval: 'Score is waiting for approval',
    ownerMustResolveConflict: 'Organizer needs to resolve conflict',
    scoreInputDialog: {
      completeScoreAfterMatch: 'Enter match result.',
      enterScoreOrAcceptAlreadyGiven: "Enter result or accept opponents' input",
      addedScoreToMatch: 'Added match result!',
      teamXReportedResult: 'Team {teamName} reported:',
      scoreShouldBePositiveInteger: 'Result should be positive integer',
      acceptScore: 'Accept score',
      solveConflictBetweenTeamsMessage:
        'Resolve conflict between teams score input. Accept one or enter new.',
      disputeBetweenTeamsHasBeenResolved: 'Resolved conflict!',
    },
  },
};
