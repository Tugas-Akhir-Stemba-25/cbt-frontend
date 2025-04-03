export interface TeacherParams {
  page?: number
  per_page?: number
  search?: string
}

export const TEACHERS = {
  list: (params?: TeacherParams) => ['teachers', 'list', params?.page, params?.per_page, params?.search],
  details: () => ['teachers', 'detail']
}
