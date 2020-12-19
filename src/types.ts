export interface AvgWeeklyStats {
  fgPct: number
  ftPct: number
  threePt: number
  points: number
  rebounds: number
  assists: number
  steals: number
  blocks: number
  turnovers: number
}

export interface Player {
  positions: string[]
  fullName: string
  lastYearStats: AvgWeeklyStats[]
  twoYearAgoStats: AvgWeeklyStats[]
}

export interface ScoredPlayer {
  score: number
  player: Player
}

export interface StatWeights {
  statWeight: number
  statRemainingWeight: number
  remainingDistribution: number
}

export interface Weights {
  fgPct: StatWeights
  ftPct: StatWeights
  threePt: StatWeights
  points: StatWeights
  rebounds: StatWeights
  assists: StatWeights
  steals: StatWeights
  blocks: StatWeights
  turnovers: StatWeights
  caringAboutPositions: number // how much do we care about filling out our roster positions
  adpWindowSize: number // how many players to score based on the draft index
}

export interface EvaluatorFactoryParams {
  draftState: DraftState
  weights: Weights
  playersRemaining: Player[]
}

export interface EvalFns {
  getValueOfTopN: (pick: number, weights: Weights) => number
  getEvaluator: (params: EvaluatorFactoryParams) => (player: Player) => number
}

export interface Roster {
  draftOrder: number // 1- 12
  roster: Player[]
}

export interface DraftState {
  pick: number
  rosters: Roster[]
}

export interface DraftPlayerParams {
  playersRemaining: Player[]
  rosters: Roster[]
  draftMove: DraftMove
}

export interface DraftMove {
  playerIdentifiers: Partial<Player>
  findPlayerByIdentifiers: (players: Player[], identifiers: Partial<Player>) => number
  rosterDraftOrder: number
}
