export class ParticipantsService {
  private apiUrl: string

  constructor() {
    this.apiUrl = import.meta.env.VITE_API_URL
  }

  async getParticipant(gameName: string, tagLine: string) {
    const url = `${this.apiUrl}?gameName=${encodeURIComponent(
      gameName
    )}&tagLine=${encodeURIComponent(tagLine)}`

    const res = await fetch(url)
    return res.json()
  }
}
