type Material = {
  id: number
  name: string
  teaching_teacher: string
}

export type Work = {
  title: string
  remaining_seconds: number
  status: '1' | '2' | '3'
  material: Material
}

export interface WorkAnswer {
  id: number
  test_answer_id: number
  test_question_id: number
  test_history_id: number
  flagged: boolean
  correct?: {
    id: number
    test_question_id: number
    answer: string
    correct: boolean
  }
}

export interface QuestionAnswer {
  id: number
  test_question_id: number
  answer: string
}

export interface WorkQuestion {
  id: number
  question: string
  image: string | null
  answers: QuestionAnswer[]
}

export type WorkResult = {
  title: string
  grade: number | null
  status: number
  is_show_grade: boolean
  is_show_answer: boolean
  answered: number
  not_answered: number
  total: number
  flagged: number
  working_time: number
  correct_answer: number | null
  wrong_answer: number | null
  material: {
    id: number
    name: string
    teaching_teacher: string
  }
  duration: number
}
