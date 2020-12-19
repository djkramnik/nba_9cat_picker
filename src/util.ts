import { DraftPlayerParams, DraftState, EvalFns, Player, ScoredPlayer, Weights } from "./types"

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

export function draftPlayerToRoster(draftPlayerParams: DraftPlayerParams): void {
  const {
    playersRemaining,
    rosters,
    draftMove: {playerIdentifiers, findPlayerByIdentifiers, rosterDraftOrder},
  } = draftPlayerParams

  const playerIndex = findPlayerByIdentifiers(playersRemaining, playerIdentifiers)
  if (playerIndex === -1) {
    throw Error('wtf, cant find the player in the draft move')
  }
  playersRemaining.splice(playerIndex, 1)

  const rosterDrafting = rosters
    .find(({draftOrder}) => rosterDraftOrder === draftOrder)
    
  if (!rosterDrafting) {
    throw Error('wtf, cant find the roster in the draft move')
  }

  rosterDrafting.roster.push(playersRemaining[playerIndex])
}
