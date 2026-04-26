import { useEffect, useRef, useState } from "react"
import Macwindow from "./Macwindow"
import "./activitymonitor.scss"

const generateValue = (min, max) => Math.random() * (max - min) + min

const useAnimatedValue = (min, max, interval = 1500) => {
  const [value, setValue] = useState(generateValue(min, max))
  useEffect(() => {
    const id = setInterval(() => setValue(generateValue(min, max)), interval)
    return () => clearInterval(id)
  }, [])
  return parseFloat(value.toFixed(1))
}

const MiniGraph = ({ color, values }) => {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    const w = canvas.width
    const h = canvas.height
    ctx.clearRect(0, 0, w, h)
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = 1.5
    values.forEach((v, i) => {
      const x = (i / (values.length - 1)) * w
      const y = h - (v / 100) * h
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    })
    ctx.stroke()

    ctx.lineTo(w, h)
    ctx.lineTo(0, h)
    ctx.closePath()
    ctx.fillStyle = color + "33"
    ctx.fill()
  }, [values])
  return <canvas ref={canvasRef} width={120} height={40} />
}

const useHistory = (value, length = 20) => {
  const [history, setHistory] = useState(Array(length).fill(value))
  useEffect(() => {
    setHistory(prev => [...prev.slice(1), value])
  }, [value])
  return history
}

const ActivityMonitor = ({ windowName, setWindowsState }) => {
  const cpu      = useAnimatedValue(15, 85, 1200)
  const ram      = useAnimatedValue(40, 75, 2000)
  const netUp    = useAnimatedValue(0.1, 3.5, 1000)
  const netDown  = useAnimatedValue(0.5, 8.0, 1000)
  const disk     = useAnimatedValue(5, 40, 3000)

  const cpuHistory  = useHistory(cpu)
  const ramHistory  = useHistory(ram)
  const diskHistory = useHistory(disk)

  const processes = [
    { name: "React Dev Server",   cpu: (cpu * 0.35).toFixed(1), ram: "312 MB", status: "running" },
    { name: "node",               cpu: (cpu * 0.20).toFixed(1), ram: "188 MB", status: "running" },
    { name: "Vite",               cpu: (cpu * 0.15).toFixed(1), ram: "145 MB", status: "running" },
    { name: "Chrome Helper",      cpu: (cpu * 0.12).toFixed(1), ram: "420 MB", status: "running" },
    { name: "VS Code",            cpu: (cpu * 0.10).toFixed(1), ram: "256 MB", status: "running" },
    { name: "Figma",              cpu: (cpu * 0.05).toFixed(1), ram: "198 MB", status: "sleeping" },
    { name: "Spotify",            cpu: (cpu * 0.03).toFixed(1), ram: "110 MB", status: "sleeping" },
  ]

  const Bar = ({ value, color }) => (
    <div className="am-bar-track">
      <div className="am-bar-fill" style={{ width: `${value}%`, background: color }} />
    </div>
  )

  return (
    <Macwindow windowName={windowName} setWindowsState={setWindowsState} width="580px" height="520px">
      <div className="am-window">

        {/* Top Stats */}
        <div className="am-stats-row">

          <div className="am-stat-card">
            <div className="am-stat-header">
              <span className="am-dot" style={{ background: "#ff5f56" }} />
              <span>CPU Usage</span>
            </div>
            <MiniGraph color="#ff5f56" values={cpuHistory} />
            <div className="am-stat-value">{cpu}%</div>
            <Bar value={cpu} color="#ff5f56" />
          </div>

          <div className="am-stat-card">
            <div className="am-stat-header">
              <span className="am-dot" style={{ background: "#27c93f" }} />
              <span>Memory</span>
            </div>
            <MiniGraph color="#27c93f" values={ramHistory} />
            <div className="am-stat-value">{(ram * 0.08).toFixed(1)} GB</div>
            <Bar value={ram} color="#27c93f" />
          </div>

          <div className="am-stat-card">
            <div className="am-stat-header">
              <span className="am-dot" style={{ background: "#ffbd2e" }} />
              <span>Disk</span>
            </div>
            <MiniGraph color="#ffbd2e" values={diskHistory} />
            <div className="am-stat-value">{disk}%</div>
            <Bar value={disk} color="#ffbd2e" />
          </div>

          <div className="am-stat-card">
            <div className="am-stat-header">
              <span className="am-dot" style={{ background: "#00bfff" }} />
              <span>Network</span>
            </div>
            <div className="am-network">
              <span>↑ {netUp} MB/s</span>
              <span>↓ {netDown} MB/s</span>
            </div>
            <div className="am-stat-value small">{(netUp + netDown).toFixed(1)} MB/s</div>
          </div>

        </div>

        {/* Process Table */}
        <div className="am-table-wrapper">
          <table className="am-table">
            <thead>
              <tr>
                <th>Process</th>
                <th>CPU %</th>
                <th>Memory</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {processes.map((p, i) => (
                <tr key={i}>
                  <td>{p.name}</td>
                  <td>{p.cpu}%</td>
                  <td>{p.ram}</td>
                  <td>
                    <span className={`am-status ${p.status}`}>{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </Macwindow>
  )
}

export default ActivityMonitor