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
  adpWindowSize: number // 
}

export interface EvalFns {
  getValueOfTopN: (pick: number, weights: Weights) => number
  getEvaluator: ({
    draftState,
    weights,
    playersRemaining,
  }: {
    draftState: DraftState
    weights: Weights
    playersRemaining: Player[]
  }) => (player: Player) => number
}

export interface Roster {
  draftOrder: number // 1- 12
  roster: Player[]
}

export interface DraftState {
  pick: number
  rosters: Roster[]
}

export function pick({
  playersRemaining,
  weights,
  evalFns,
  draftState,
}: {
  playersRemaining: Player[]
  weights: Weights
  evalFns: EvalFns
  draftState: DraftState
}): ScoredPlayer[] {
  const { getValueOfTopN, getEvaluator } = evalFns
  const evalFn = getEvaluator({
    draftState,
    weights,
    playersRemaining,
  })
  const { pick } = draftState
  const topNPlayers = playersRemaining.slice(0, getValueOfTopN(pick, weights))
  
  return topNPlayers.reduce((scoredPlayers, player) => {
    return scoredPlayers.concat({
      score: evalFn(player),
      player,
    })
  }, [] as ScoredPlayer[])
  .sort((a, b) => {
    return b.score - a.score
  })
  // returns the players sorted by their score, with highest first.
  // to get the top pick select the first index of this array
}



