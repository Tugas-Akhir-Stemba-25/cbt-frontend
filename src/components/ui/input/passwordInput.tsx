'use client'

import * as React from 'react'

import { Eye, EyeOff } from 'lucide-react'

import { cn } from '@/utils/shadcn'

import { Input } from './input'

interface PasswordInputProps extends React.ComponentProps<'input'> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false)
  // Ambil disabled dari props langsung
  const isDisabled = props.disabled

  const toggleShowPassword = () => setShowPassword((prev) => !prev)

  return (
    <div className="relative flex w-full items-center">
      <Input
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        {...props}
        disabled={isDisabled}
        className={cn('pr-10', className)}
      />
      {!isDisabled && (
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute right-2 flex items-center focus:outline-none"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff className="h-5 w-5 text-muted" /> : <Eye className="h-5 w-5 text-muted" />}
        </button>
      )}
    </div>
  )
})

PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
