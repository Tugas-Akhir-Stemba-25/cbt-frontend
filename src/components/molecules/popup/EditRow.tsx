import * as React from 'react'

import { Button } from '@/components/ui/button'

interface EditModalProps<TData> {
  row: TData
  headers: any[]
  onClose: () => void
  onSave: (updatedRow: TData) => void
}

const EditModal = <TData extends Record<string, any>>({ row, headers, onClose, onSave }: EditModalProps<TData>) => {
  const [formData, setFormData] = React.useState<TData>(row)

  const handleChange = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value })
  }

  const handleSave = () => {
    onSave(formData)
    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">Edit Data</h2>
        {headers.map((header) => (
          <div key={header.id} className="mb-4">
            <label className="block text-sm font-medium text-gray-700">{header.column.columnDef.header}</label>
            <input
              type="text"
              value={formData[header.id] || ''}
              onChange={(e) => handleChange(header.id, e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            />
          </div>
        ))}
        <div className="flex gap-2">
          <Button variant="subtle" onClick={onClose} className="w-full">
            Batal
          </Button>
          <Button variant="default" onClick={handleSave} disabled={true} className="w-full">
            Simpan
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EditModal
