import { MaterialOption } from '../material/material-option'

export interface CreateTestForm {
  name?: string
  start_time?: string
  end_time?: string
  is_show_grade?: boolean
  is_show_answer?: boolean
  is_randomize_question?: boolean
  is_randomize_answer?: boolean
}

export interface UpdateTestForm extends CreateTestForm {
  material_id?: number
}

interface Material extends MaterialOption {
  teaching_teacher: string
}

export interface TestDetail extends CreateTestForm {
  material: Material
  duration: number
  status: 0 | 1 | 2
  total_question: number
}

export interface TestStatistic {
  participants: {
    name: string
    grad_year: number
    total: number
  }
  grade: {
    min: number
    max: number
    average: number
  }
  time: {
    min: number
    max: number
    average: number
  }
}

export interface TestResult {
  id: number
  user: {
    id: number
    name: string
  }
  hash: string
  grade: number
  work_time: number
  correct_answer: number
  wrong_answer: number
  total: number
}

export interface StudentTestStatistic {
  count_by_status: {
    not_started: number | null
    ongoing: number | null
    finished: number | null
  }
  total_tests: number | null
  average_grade: number | null
}

export interface TestItem {
  id: number
  name: string
  start_time: string // ISO timestamp in UTC
  finish_time: string // ISO timestamp
  duration: number // in minutes
  status: number // maybe 1 = upcoming, 2 = ongoing, 3 = finished?
  material: {
    id: number
    name: string
    teaching_teacher: string
  }
}

export interface TestDetailStudent extends TestItem {
  history: {
    hash: string
    status: number
  }
  question_count: number
}
