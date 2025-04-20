export type Metadata = {
  message: string
}

export interface Pagination {
  total: number
  per_page: number
  current_page: number
  total_pages: number
}

export interface MetadataWithPagination extends Metadata {
  pagination: Pagination
}
