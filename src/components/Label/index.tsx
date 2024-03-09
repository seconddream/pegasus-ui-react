import clsx from 'clsx'
import {  AiOutlineCloseCircle } from 'react-icons/ai'

import { WithOptionalId } from '../../shared/interfaces'
import { FixedHeightItemSizeStyles } from '../../shared/styles'
import { MouseEvent, ReactNode } from 'react'

export type LabelColor ='dark' | 'white' | 'gray' | 'amber' | 'emerald' | 'teal' | 'sky' | 'indigo' | 'fuchsia' | 'pink' | 'red'


const LabelColors = {
  dark: {
    border: 'border-slate-700',
    text: 'text-white',
    bg: 'bg-slate-700'
  },
  white: {
    border: 'border-slate-600',
    text: 'text-slate-700',
    bg: 'bg-white',
  },
  gray: {
    border: 'border-slate-500',
    text: 'text-slate-500',
    bg: 'bg-slate-100',
  },
  amber: {
    border: 'border-amber-600',
    text: 'text-amber-600',
    bg: 'bg-amber-100',
  },
  emerald: {
    border: 'border-emerald-600',
    text: 'text-emerald-600',
    bg: 'bg-emerald-100',
  },
  teal: {
    border: 'border-teal-600',
    text: 'text-teal-600',
    bg: 'bg-teal-100',
  },
  sky: {
    border: 'border-sky-600',
    text: 'text-sky-600',
    bg: 'bg-sky-100',
  },
  indigo: {
    border: 'border-indigo-600',
    text: 'text-indigo-600',
    bg: 'bg-indigo-100',
  },
  fuchsia: {
    border: 'border-fuchsia-600',
    text: 'text-fuchsia-600',
    bg: 'bg-fuchsia-100',
  },
  pink: {
    border: 'border-pink-600',
    text: 'text-pink-600',
    bg: 'bg-pink-100',
  },
  red: {
    border: 'border-red-600',
    text: 'text-red-600',
    bg: 'bg-red-100',
  },
}

export interface LabelProps extends WithOptionalId {
  size?: 'sm' | 'xs'
  color?: LabelColor
  bordered?: boolean
  shadow?: boolean
  icon?: ReactNode
  text: string
  onClick?: (e:MouseEvent)=>any
  onClose?: ()=>any
}

export default function Label(props: LabelProps) {
  const { id, size = 'xs', color = 'dark', bordered = false, shadow = false, icon, text, onClick, onClose } = props
  const {height, px, fontSize, iconSize, gap, roundCorner,} = FixedHeightItemSizeStyles[size]
  return (
    <div
      onClick={(e)=>{
        e.preventDefault()
        e.stopPropagation()
        onClick?.(e)
      }}
      id={id}
      className={clsx(
        'flex whitespace-nowrap hyphens-auto justify-center items-center',
        // sizing
        height, px, fontSize, gap, roundCorner,
        // color
        LabelColors[color].text,
        LabelColors[color].bg,
        { [`border ${LabelColors[color].border}`]: bordered, ['shadow']: shadow }
      )}
    >
      {icon && <span className={clsx(iconSize)}>{icon}</span>}
      {text}
      {onClose && <AiOutlineCloseCircle className={clsx(iconSize)} onClick={(e)=>{
        e.preventDefault()
        e.stopPropagation()
        onClose()
      }} /> }
    </div>
  )
}
