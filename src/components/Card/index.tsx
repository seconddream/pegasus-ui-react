import { ReactNode } from 'react'
import {
  WithDirection,
  WithFixedHeightItemSize,
  WithLayoutSpacing,
  WithOptionalId,
} from '../../shared/interfaces'
import clsx from 'clsx'

import { Button } from '../Button'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import {
  FixedHeightItemSizeStyles,
  LayoutSpacingStyles,
} from '../../shared/styles'

export interface CardProps
  extends WithOptionalId,
    WithFixedHeightItemSize,
    WithLayoutSpacing,
    WithDirection {
  title?: ReactNode
  icon?: ReactNode
  footer?: ReactNode
  width?: string
  contentPadded?: boolean
  border?: boolean
  divided?: boolean
  hoverable?: boolean
  onClick?: () => any
  children: ReactNode | ReactNode[]
}

export default function Card(props: CardProps) {
  const {
    id,
    size = 'md',
    spacing = 'normal',
    direction = 'vertical',
    title,
    icon,
    footer,
    width = 'w-full',
    contentPadded = true,
    border = true,
    divided = true,
    hoverable = false,
    onClick,
    children,
  } = props
  const { fontSize, iconSize, roundCorner } = FixedHeightItemSizeStyles[size]
  const { gap, px, py } = LayoutSpacingStyles[spacing]

  return (
    <div
      className={clsx(
        'flex flex-col bg-white shadow-sm',
        roundCorner,
        width,
        border && 'border border-dark',
        divided && ' divide-y divide-dark',
        hoverable && 'hover:scale-105 hover:shadow-xl',
        onClick && 'hover:cursor-pointer'
      )}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onClick?.()
      }}
    >
      {title && (
        <div className={clsx('flex w-full items-center', px, py, fontSize)}>
          {title}
        </div>
      )}
      <div
        className={clsx(
          'flex w-full',
          direction === 'vertical' && 'flex-col',
          gap,
          contentPadded && [px, py]
        )}
      >
        {children}
      </div>
      {footer && (
        <div className={clsx('flex w-full items-center', px, py, fontSize)}>
          {footer}
        </div>
      )}
    </div>
  )
}
