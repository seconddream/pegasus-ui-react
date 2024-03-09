import { ReactNode, useEffect, useRef } from 'react'
import { AnimationType, WithPlacement, parsePlacement } from '../../shared/interfaces'
import clsx from 'clsx'
import useReveal from '../../hooks/useReveal'

export interface PopoverProps extends WithPlacement {
  show?: boolean
  popover: any
  animation?: AnimationType
  block?: boolean
  children: ReactNode
}

export default function Popover(props: PopoverProps) {
  const { show=false, block=false, position = 'top', popover, animation='fade-in', children } = props

  const { top, bottom, left, right, topLeft, topRight, bottomLeft, bottomRight } = parsePlacement(position)

  const targetRef = useRef<HTMLDivElement>(null)
  const targetReveal = useReveal(targetRef, animation)

  useEffect(()=>{
    if(show){
      targetReveal.show()
    }else{
      targetReveal.hide()
    }
  }, [show, targetReveal])

  return (
    <div className={clsx('relative', {})}>
      <div ref={targetRef}
        className={clsx('absolute hidden z-10', block && 'min-w-full', {
          'bottom-full pb-1.5': top || topLeft || topRight,
          'top-full pt-1.5': bottom || bottomLeft || bottomRight,
          'left-1/2 -translate-x-1/2': top || bottom,
          'left-0': topLeft || bottomLeft,
          'right-0': topRight || bottomRight,
          'right-full pr-1.5': left,
          'left-full pl-1.5': right,
          'top-1/2 -translate-y-1/2': left || right,
        })}
      >
        {popover}
      </div>
      {children}
    </div>
  )
}
