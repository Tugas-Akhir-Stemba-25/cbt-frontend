import { Student } from '../student/student-list'
import { Metadata, MetadataWithPagination } from './metadata'

export interface GetStudentCountResponse {
  meta: Metadata
  data: {
    count: {
      total: number
      per_year: [year_group: string, total: number]
    }
  }
}

export interface GetStudentListResponse {
  meta: MetadataWithPagination
  data: Student[]
}

export interface CreateStudentResponse {
  meta: Metadata
}

export interface DeleteStudentResponse {
  meta: Metadata
}

export interface UpdateStudentResponse {
  meta: Metadata
}

export interface BulkDeleteStudentResponse {
  meta: Metadata
}
