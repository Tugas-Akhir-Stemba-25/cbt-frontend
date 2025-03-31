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

export interface TestDetail extends CreateTestForm {
  material: MaterialOption
  duration: number
}
