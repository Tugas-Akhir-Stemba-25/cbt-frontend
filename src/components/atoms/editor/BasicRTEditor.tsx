'use client'

import { useEffect, useState } from 'react'

import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'

interface BasicRTEditorProps {
  onChange?: (content: string) => void
  value?: string
}

const BasicRTEditor = ({ value, onChange }: BasicRTEditorProps) => {
  const myColors = ['purple', '#785412', '#452632', '#856325', '#963254', '#254563', 'white']

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ align: ['right', 'center', 'justify'] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      [{ color: myColors }],
      [{ background: myColors }]
    ]
  }

  const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'link', 'color', 'align']

  const [code, setCode] = useState<string>('')

  const handleProcedureContentChange = (content: any) => {
    setCode(content)
    onChange?.(content)
  }

  useEffect(() => {
    if (value) {
      setCode(value)
    }
  }, [value])

  return (
    <div className="text-editor">
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={code}
        onChange={handleProcedureContentChange}
      />
    </div>
  )
}

export default BasicRTEditor
