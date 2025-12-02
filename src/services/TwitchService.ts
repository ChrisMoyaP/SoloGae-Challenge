export class TwitchService {
  private clientId = import.meta.env.VITE_TWITCH_CLIENT_ID
  private clientSecret = import.meta.env.VITE_TWITCH_CLIENT_SECRET
  private oauthUrl = import.meta.env.VITE_TWITCH_ID_OAUTH2
  private token = ""

  private async getToken() {
    if (this.token) return this.token

    const result = await fetch(
      `${this.oauthUrl}?client_id=${this.clientId}&client_secret=${this.clientSecret}&grant_type=client_credentials`,
      { method: "POST" }
    ).then(r => r.json())

    this.token = result.access_token
    return this.token
  }

  async isOnline(username: string) {
    if (!username.trim()) return false

    const token = await this.getToken()

    const res = await fetch(
      `https://api.twitch.tv/helix/streams?user_login=${encodeURIComponent(username)}`,
      {
        headers: {
          "Client-ID": this.clientId,
          Authorization: `Bearer ${token}`,
        }
      }
    )

    if (!res.ok) return false

    const data = await res.json()
    return Array.isArray(data.data) && data.data.length > 0
  }
}
