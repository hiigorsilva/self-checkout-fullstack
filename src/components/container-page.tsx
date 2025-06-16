import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

type ContainerPageProps = ComponentProps<'section'>

export const ContainerPage = ({ children, className }: ContainerPageProps) => {
  return <div className={cn('flex-1 flex flex-col', className)}>{children}</div>
}
