type ClassInfo = {
  id: number
  name: string
  grad_year: number
}

type Material = {
  id: number
  name: string
  class: ClassInfo
}

export interface Test {
  id: number
  name: string
  start_time: string
  end_time: string
  is_show_answer: boolean
  is_show_grade: boolean
  is_randomize_question: number
  is_randomize_answer: number
  duration: number
  material: Material
  status: number
  students_attemted: number
  students_finished: number
}
