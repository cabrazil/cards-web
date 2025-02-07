import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export function Separator(props: ComponentProps<'div'>) {
  return (
    <div {...props} className={twMerge('h-2 bg-white', props.className)} />
  )
}