import { useEffect, useState } from "react"
import { ParticipantsController } from "../controllers/ParticipantsController"
import GaePicaro from "../assets/GaePicaro.png"
import GaeBienvenida from "../assets/GaeBienvenida.jpg"
import ParticipantsTable from "../components/ParticipantsTable"
import Countdown from "../components/Countdown"
import { EVENT_END, EVENT_START } from "../constants/events"
import type { ParticipantRow } from "../types/ParticipantsRow"
import "./HomePage.css"

const controller = new ParticipantsController()

export function HomePage() {
  const [rows, setRows] = useState<ParticipantRow[]>([])
  const [loading, setLoading] = useState(true)

  const PRICE_PER_PLAYER = 10_000

  const activePlayers = rows.filter(
    (p) => p.base.twitch !== "RETIRADO"
  ).length

  const prize = activePlayers * PRICE_PER_PLAYER

  const formatCLP = (n: number) => n.toLocaleString("es-CL")

  async function load() {
    setLoading(true)
    const data = await controller.getAllOrdered()
    setRows(data)
    setLoading(false)
  }

  useEffect(() => {
    ;(async () => await load())()
  }, [])

  return (
    <>
      <div className="container">
        <div className="left">
          <div className="top-bar">
            <img src={GaePicaro} className="logo-img" />
              <div className="prize-box">
                <div className="prize-title">PREMIO TOTAL:</div>
                <div className="prize-value">
                  ${formatCLP(prize)}
                </div>
                <div className="prize-sub">
                  {activePlayers} jugadores activos × ${formatCLP(PRICE_PER_PLAYER)}
                </div>
              </div>
          </div>
          <ParticipantsTable rows={rows} loading={loading} onReload={load} />
          <Countdown start={EVENT_START} end={EVENT_END} />
        </div>
        <div className="right">
          <img src={GaeBienvenida} className="center-img" />
        </div>
      </div>
    </>
  )
}
