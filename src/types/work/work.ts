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
