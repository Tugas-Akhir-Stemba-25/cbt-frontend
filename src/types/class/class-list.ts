import { Major } from '../major/major-list'

export interface Class {
  id: number
  name: string
  grad_year: number
  students_count: number
  major: Major
}
