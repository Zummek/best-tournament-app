declare module 'tournament-generator' {
  interface GeneratorError {
    customData?: Record<string, unknown>
    message: string
    status: number
  }

  interface GeneratorGame<T> {
    awayTeam: T,
    customData?: Record<string, unknown>
    homeTeam: T,
    id?: string,
    round: number,
    score?: string
  }

  interface GeneratorOptions {
    toBeDefinedValue?: string,
    type: string
  }

  interface GeneratorResponse<T> {
    data: GeneratorGame<T>[],
    errors?: GeneratorError[]
  }

  function tournamentGenerator<T>(teams: T[], options: GeneratorOptions): GeneratorResponse<T>;
  export = tournamentGenerator;
}
