export interface QuestionList {
  id: number
  question: string
  updated_at: string
}

export interface QuestionDetail {
  id: number
  question: string
  image: string | null
  answers: {
    id: number
    answer: string
    correct: boolean
  }[]
}

export interface QuestionEditForm {
  question: string
  image: File | null
  answers: {
    id: number | null
    answer: string
  }[]
  correct_answer_idx: number
}
