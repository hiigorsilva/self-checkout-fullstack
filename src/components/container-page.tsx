import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

type ContainerPageProps = ComponentProps<'section'>

export const ContainerPage = ({ children, className }: ContainerPageProps) => {
  return (
    <section className={cn('flex-1 flex flex-col px-5', className)}>
      {children}
    </section>
  )
}
