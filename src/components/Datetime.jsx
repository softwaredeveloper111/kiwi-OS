
import { useState, useEffect } from 'react'

const Datetime = () => {
  const [datetime, setDatetime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setDatetime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatDatetime = (date) => {
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
    
    const dayName = days[date.getDay()]
    const monthName = months[date.getMonth()]
    const dayOfMonth = date.getDate()
    
    let hours = date.getHours()
    const minutes = date.getMinutes()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    
    hours = hours % 12
    hours = hours ? hours : 12
    
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes
    
    return `${dayName} ${monthName} ${dayOfMonth} ${hours}:${minutesStr}${ampm}`
  }

  return (
    <div>
      {formatDatetime(datetime)}
    </div>
  )
}

export default Datetime
