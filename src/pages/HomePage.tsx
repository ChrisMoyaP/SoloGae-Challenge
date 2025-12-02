import { useEffect, useState } from "react"
import { ParticipantsController } from "../controllers/ParticipantsController"
import GaePicaro from "../assets/GaePicaro.png"
import GaeBienvenida from "../assets/GaeBienvenida.jpg"
import ParticipantsTable from "../components/ParticipantsTable"
import Countdown from "../components/Countdown"
import { EVENT_END, EVENT_START } from "../constants/events"
import type { ParticipantRow } from "../types/ParticipantsRow"

const controller = new ParticipantsController()

export function HomePage() {
  const [rows, setRows] = useState<ParticipantRow[]>([])
  const [loading, setLoading] = useState(true)

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
          <img src={GaePicaro} className="logo-img" />
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
