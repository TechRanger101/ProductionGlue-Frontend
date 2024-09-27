"use client"
import Loader from '@/components/Loader'
import React from 'react'
import { usePathname } from 'next/navigation'

const Loading = () => {
  const pathname = usePathname()
  if (pathname === '/' || pathname === '/admin') return null
  return (
    <div>
        <Loader />
    </div>
  )
}

export default Loading