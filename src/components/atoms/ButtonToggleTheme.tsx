'use client'

import { useEffect, useState } from 'react'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '../ui/button'

const ButtonToggleTheme = ({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { setTheme, theme } = useTheme()
  const [isClient, setIsClient] = useState(false)

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <Button variant={'ghost'} className={className} {...props} onClick={toggleTheme}>
      {theme === 'light' && <Moon className="h-6 w-6" />}
      {theme === 'dark' && <Sun className="h-6 w-6" />}
    </Button>
  )
}

export default ButtonToggleTheme
