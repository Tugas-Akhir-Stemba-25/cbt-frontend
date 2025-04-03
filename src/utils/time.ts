import { format, fromUnixTime } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'

export function formatSeconds(seconds: number) {
  const date = toZonedTime(fromUnixTime(seconds), 'UTC')
  const hours = format(date, 'H') // Tanpa leading zero (misal: 1, 2, ..., 23)
  const minutesSeconds = format(date, 'mm:ss')

  return hours === '0' ? minutesSeconds : `${hours}:${minutesSeconds}`
}
