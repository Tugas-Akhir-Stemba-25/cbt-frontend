'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface EditModalProps<TData> {
  row: TData
  headers: any[]
  extraFields?: { id: string; label: string; type?: string }[]
  onClose: () => void
  onSave: (updatedRow: TData) => void
}

const EditModal = <TData extends Record<string, any>>({
  row,
  headers,
  extraFields = [],
  onClose,
  onSave
}: EditModalProps<TData>) => {
  const [formData, setFormData] = React.useState<TData & Record<string, any>>({
    ...row,
    ...extraFields.reduce((acc, field) => ({ ...acc, [field.id]: '' }), {})
  })

  const handleChange = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value })
  }

  const handleSave = () => {
    onSave(formData)
    onClose()
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Data</DialogTitle>
        </DialogHeader>
        {headers.map((header) => (
          <div key={header.id} className="mb-4">
            <Label className="block text-sm font-medium">{header.column.columnDef.header}</Label>
            <Input
              type="text"
              value={formData[header.id] || ''}
              onChange={(e) => handleChange(header.id, e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            />
          </div>
        ))}
        {extraFields.map((field) => (
          <div key={field.id} className="mb-4">
            <Label className="block text-sm font-medium">{field.label}</Label>
            <Input
              type={field.type || 'text'}
              value={formData[field.id] || ''}
              onChange={(e) => handleChange(field.id, e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            />
          </div>
        ))}
        <DialogFooter className="flex gap-2">
          <Button onClick={onClose} variant="subtle" className="flex-1 rounded-md px-4 py-2 dark:bg-tableColour">
            Batal
          </Button>
          <Button
            variant="default"
            onClick={handleSave}
            // disabled={true}
            className="flex-1"
          >
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditModal
