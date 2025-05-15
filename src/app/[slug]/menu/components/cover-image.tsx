'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeftIcon, ScrollTextIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type CoverImageProps = {
  imageUrl: string
  imageAlt: string
}

export const CoverImage = ({ imageAlt, imageUrl }: CoverImageProps) => {
  const router = useRouter()

  const handleBackPage = () => router.back()

  return (
    <div className="relative w-full h-[250px]">
      <Button
        className="absolute top-4 left-4 rounded-full z-10"
        size="icon"
        variant="secondary"
        onClick={handleBackPage}
      >
        <ArrowLeftIcon className="size-4 shrink-0" />
      </Button>

      <Button
        className="absolute top-4 right-4 rounded-full z-10"
        size="icon"
        variant="secondary"
      >
        <ScrollTextIcon className="size-4 shrink-0" />
      </Button>

      <Image className="object-cover" src={imageUrl} alt={imageAlt} fill />
    </div>
  )
}
