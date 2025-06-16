'use client'

import { Button } from '@/components/ui/button'
import { ChevronLeftIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

export const BackToMenuButton = () => {
  const router = useRouter()
  const { slug } = useParams<{ slug: string }>()

  const handleToBackMenuClick = () => {
    router.push(`/${slug}`)
  }

  return (
    <Button
      className="rounded-full z-10"
      size="icon"
      variant="secondary"
      onClick={handleToBackMenuClick}
    >
      <ChevronLeftIcon className="size-4 shrink-0" />
    </Button>
  )
}
