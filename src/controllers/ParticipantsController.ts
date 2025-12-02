import { PARTICIPANTS } from "../constants/participants"
import { TIER_ORDER } from "../constants/tier-order"
import type { Rank } from "../types/Rank"
import { ParticipantsService } from "../services/ParticipantsService"
import { TwitchService } from "../services/TwitchService"

export class ParticipantsController {
  private participantService: ParticipantsService
  private twitchService: TwitchService

  constructor(
    participantService = new ParticipantsService(),
    twitchService = new TwitchService()
  ) {
    this.participantService = participantService
    this.twitchService = twitchService
  }

  async getAllOrdered() {
    const players = await Promise.all(
      PARTICIPANTS.map(async (base) => {
        const [data, online] = await Promise.all([
          this.participantService.getParticipant(base.gameName, base.tagLine),
          this.twitchService.isOnline(base.twitch),
        ])

        return { base, data, online }
      })
    )

    return players.sort((a, b) => {
      const A = a.data.soloQ
      const B = b.data.soloQ

      if (!A && !B) return 0
      if (!A) return 1
      if (!B) return -1

      const tierA = TIER_ORDER[A.tier] ?? -1
      const tierB = TIER_ORDER[B.tier] ?? -1

      if (tierA !== tierB) return tierB - tierA

      const rankToNum = (r: Rank) => ({ I: 1, II: 2, III: 3, IV: 4 }[r] ?? 99)
      const rankA = rankToNum(A.rank)
      const rankB = rankToNum(B.rank)

      if (rankA !== rankB) return rankA - rankB

      return (B.lp ?? 0) - (A.lp ?? 0)
    })
  }
}