import { Player, Roster } from "./index";

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
