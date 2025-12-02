import type { ParticipantRow } from "../../types/ParticipantsRow"
import { calcWinrate } from "../../utils/CalcWinrate"
import "./styles.css"

interface Props {
  rows: ParticipantRow[]
  loading?: boolean
  onReload?: () => void
}
const ParticipantsTable = ({ rows, loading, onReload }: Props) => {
  return (
    <div className="participants-table-container">
      <table className="participants-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Riot ID</th>
            <th>Alias</th>
            <th>Tier</th>
            <th>LP</th>
            <th>W/L</th>
            <th>Winrate</th>
            <th>Twitch</th>
          </tr>
        </thead>
        {!loading && (
          <tbody>
            {rows.map((item, idx) => {
              const solo = item.data.soloQ
              return (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>
                    {item.data.riotId ??
                      `${item.base.gameName}#${item.base.tagLine}`}
                  </td>
                  <td>{item.base.alias}</td>
                  <td>{solo ? `${solo.tier} ${solo.rank}` : "-"}</td>
                  <td>{solo?.lp ?? "-"}</td>
                  <td>{solo ? `${solo.wins}/${solo.losses}` : "-/-"}</td>
                  <td>
                    {solo ? calcWinrate(solo.wins, solo.losses) + "%" : "-"}
                  </td>
                  <td>
                    {item.base.twitch ? (
                      <a
                        href={`https://twitch.tv/${item.base.twitch}`}
                        target="_blank"
                        style={{ color: item.online ? "lightgreen" : "red" }}
                      >
                        {item.online ? "ONLINE" : "offline"}
                      </a>
                    ) : (
                      <span style={{ color: "gray" }}>No tiene Twitch</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        )}
      </table>
      {loading && (
        <div className="loading">
          Obteniendo información de Twitch y Riot...
        </div>
      )}

      {onReload && (
        <button className="reload-button" onClick={onReload} disabled={loading}>
          Recargar tabla
        </button>
      )}
    </div>
  )
}

export default ParticipantsTable
