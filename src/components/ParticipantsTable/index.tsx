import type { ParticipantRow } from "../../types/ParticipantsRow"
import { calcWinrate } from "../../utils/CalcWinrate"
import { buildOpggUrl } from "../../utils/OpGG"
import "./styles.css"

interface Props {
  rows: ParticipantRow[]
  loading?: boolean
  onReload?: () => void
}
const ParticipantsTable = ({ rows, loading, onReload }: Props) => {
  return (
    <>
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
              const riotId =
                item.data.riotId ??
                `${item.base.gameName}#${item.base.tagLine}`
              return (
                <tr key={idx}>
                  <td data-label="#">{idx + 1}</td>
                  <td data-label="Riot ID">
                    <a
                      href={buildOpggUrl(
                        item.base.gameName,
                        item.base.tagLine
                      )}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: "#4da6ff",
                        textDecoration: "none",
                        fontWeight: 500,
                      }}
                    >
                      {riotId}
                    </a>
                  </td>
                  <td data-label="Alias">{item.base.alias}</td>
                  <td data-label="Tier">{solo ? `${solo.tier} ${solo.rank}` : "-"}</td>
                  <td data-label="LP">{solo?.lp ?? "-"}</td>
                  <td data-label="W / L">{solo ? `${solo.wins}/${solo.losses}` : "-/-"}</td>
                  <td data-label="Winrate">
                    {solo ? calcWinrate(solo.wins, solo.losses) + "%" : "-"}
                  </td>
                  <td data-label="Twitch">
                    {item.base.twitch === "RETIRADO" ? (
                      <span style={{ color: "red", fontWeight: 600 }}>
                        RETIRADO
                      </span>
                    ) : item.base.twitch ? (
                      <a
                        href={`https://twitch.tv/${item.base.twitch}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: item.online ? "lightgreen" : "red" }}
                      >
                        {item.online ? "ONLINE" : "offline"}
                      </a>
                    ) : (
                      <span style={{ color: "gray" }}>
                        No tiene Twitch
                      </span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        )}
      </table>
    </div>
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
    </>
    
  )
}

export default ParticipantsTable
