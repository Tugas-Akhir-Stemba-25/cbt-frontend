import { Teacher } from '../teacher/teacher'
import { Metadata, MetadataWithPagination } from './metadata'

export interface TeacherListResponse {
  meta: MetadataWithPagination
  data: Teacher[]
}

export interface CreateTeacherResponse {
  meta: Metadata
}

export interface DeleteTeacherResponse {
  meta: Metadata
}

export interface UpdateTeacherResponse {
  meta: Metadata
}

export interface BulkDeleteTeacherResponse {
  meta: Metadata
}

export interface GetTeacherCountResponse {
  meta: Metadata
  data: {
    count: number
  }
}
