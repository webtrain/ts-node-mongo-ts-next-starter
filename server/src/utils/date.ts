/* eslint-disable prettier/prettier */
const monthFullNames = ["January","February","March","April","May","June","July", "August","September","October","November","December"];

const monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

function getCurrentDate() {
  const date = new Date()

  const year = date.getFullYear()
  const month = date.getMonth()
  const monthName = monthFullNames[month]
  const day = date.getDay()
  const formattedDay = day < 10 ? `0${day}` : day
  const hour = date.getHours()
  const formattedHour = hour < 10 ? `0${hour}` : hour
  const minutes = date.getMinutes()
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
  const seconds = date.getSeconds()
  const formattedseconds = seconds < 10 ? `0${seconds}` : seconds


  const finalDate = `${year} ${monthName} ${formattedDay} ${formattedHour}:${formattedMinutes}:${formattedseconds}`

  return finalDate
}

export default getCurrentDate
