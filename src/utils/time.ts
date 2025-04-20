import { format, fromUnixTime } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'

export function formatSeconds(seconds: number, withLeadingZero = false) {
  const date = toZonedTime(fromUnixTime(seconds), 'UTC')
  const hours = format(date, withLeadingZero ? 'HH' : 'H')
  const minutesSeconds = format(date, 'mm:ss')

  return hours === '0' ? minutesSeconds : `${hours}:${minutesSeconds}`
}
