import React, { useState } from 'react'

import { Eye, SquarePen, Trash, UserPlus } from 'lucide-react'
import { useDebounceValue } from 'usehooks-ts'

import AssignTeacherModal from '@/components/molecules/popup/teacher/AssignTeacherModal'
import DeleteTeacherDialog from '@/components/molecules/popup/teacher/DeleteTeacherModal'
import DetailTeacherModal from '@/components/molecules/popup/teacher/DetailTeacherModal'
import EditTeacherDialog from '@/components/molecules/popup/teacher/EditTeacherModal'
import { Button } from '@/components/ui/button'

import { Teacher } from '@/types/teacher/teacher'

const AssignTeacherColumn: React.FC<{ row: { original: Teacher } }> = ({ row }) => {
  const [search] = useDebounceValue<string>('', 250)
  const [page] = useDebounceValue<number>(1, 250)
  const [perPage] = useDebounceValue<number>(10, 250)

  const data = row.original
  const [openAssignModal, setOpenAssignModal] = useState<boolean>(false)
  const [openEditModal, setOpenEditModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [openDetailModal, setOpenDetailModal] = useState<boolean>(false)

  return (
    <>
      <div className=" ">
        <Button size="icon" variant="ghost" onClick={() => setOpenDetailModal(true)}>
          <Eye size={16} className="text-primary" strokeWidth={1.5} />
        </Button>

        <Button size="icon" variant="ghost" onClick={() => setOpenEditModal(true)}>
          <SquarePen size={16} className="text-primary" strokeWidth={1.5} />
        </Button>

        <Button size="icon" variant="ghost" onClick={() => setOpenAssignModal(true)}>
          <UserPlus size={16} className="text-secondary" strokeWidth={1.5} />
        </Button>

        <Button size="icon" variant="ghost" onClick={() => setOpenDeleteModal(true)}>
          <Trash size={16} className="text-destructive" strokeWidth={1.5} />
        </Button>
      </div>

      <AssignTeacherModal setOpen={setOpenAssignModal} data={data.id} openModal={openAssignModal} />

      <DeleteTeacherDialog
        openModal={openDeleteModal}
        setOpen={setOpenDeleteModal}
        id={data.id as number}
        teacherKey={{ page, per_page: perPage, search }}
        expectedUsn={data?.username as string}
      />

      <DetailTeacherModal openModal={openDetailModal} setOpen={setOpenDetailModal} id={data.id as number} />

      <EditTeacherDialog
        openModal={openEditModal}
        setOpen={setOpenEditModal}
        teacherKey={{ page, per_page: perPage, search }}
        data={data as Teacher}
      />
    </>
  )
}

export default AssignTeacherColumn
