'use client'

import { useEffect, useState } from 'react'

import dynamic from 'next/dynamic'

import 'react-quill-new/dist/quill.snow.css'

import './BasicRTEditor.css'

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

interface BasicRTEditorProps {
  onChange?: (content: string) => void
  value?: string
}

const BasicRTEditor = ({ value, onChange }: BasicRTEditorProps) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ align: ['right', 'center', 'justify'] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link']
    ]
  }

  const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'link', 'align']

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
        className="dark:border-neutral-800"
      />
    </div>
  )
}

export default BasicRTEditor
