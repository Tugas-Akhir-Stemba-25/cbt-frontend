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
