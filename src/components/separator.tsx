import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export function Separator(props: ComponentProps<'div'>) {
  return (
    <div {...props} className={twMerge('h-4 bg-violet-100', props.className)} />
  )
}