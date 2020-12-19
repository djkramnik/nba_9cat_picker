import { EvaluatorFactoryParams, Player } from "./types";

export function evaluatorFactory(params: EvaluatorFactoryParams)
  : (player: Player) => number {
    return function scorePlayer(player: Player) {
      return 0
    }
}
