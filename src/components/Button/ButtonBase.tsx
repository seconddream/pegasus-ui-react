import clsx from 'clsx'
import { MouseEvent, ReactNode, useRef } from 'react'
import { AiOutlineCheckCircle, AiOutlineExclamationCircle, AiOutlineLoading3Quarters } from 'react-icons/ai'

import { WithOptionalId, WithFixedHeightItemSize, WithBlock, WithActionState} from '../../shared/interfaces'
import { FixedHeightItemSizeStyles } from '../../shared/styles'

const ButtonTheme = {
  primary: 'bg-primary text-white hover:brightness-150 active:brightness-75',
  secondary: 'bg-white text-primary hover:bg-primary-light active:brightness-90 border border-dark',
  transparent: 'bg-transparnet text-primary hover:bg-primary-light active:brightness-90',
  disabled: 'bg-disabled text-deactivated',
  success: 'bg-success text-white',
  error: 'bg-warning text-white hover:brightness-110 active:brightness-90',
  danger:'bg-danger text-white hover:brightness-110 active:brightness-90',
}

export type ButtonType = 'primary' | 'secondary' | 'transparent'



export interface ButtonBaseProps extends WithOptionalId, WithFixedHeightItemSize, WithBlock, WithActionState {
  type?: ButtonType
  shape?: 'rounded' | 'circle'
  success?: boolean
  disabled?: boolean
  danger?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  focusable?: boolean
  children?: ReactNode | ReactNode[]
  onClick?: (e?:MouseEvent) => any
}

export default function ButtonBase(props: ButtonBaseProps) {
  const {
    id,
    size = 'md',
    block = false,
    loading = false,
    error = false,
    type = 'secondary',
    shape = 'rounded',
    success = false,
    disabled = false,
    danger = false,
    icon,
    iconPosition = 'left',
    focusable = false,
    onClick,
    children,
  } = props

  const circle = shape === 'circle'
  const normalState = !loading && !success && !error && !disabled
  const shouldInteract = !loading && !success && !disabled
  const shouldOverWriteIcon = loading || success || error
  const { squireSize, height, px, gap, fontSize, iconSize, roundCorner } = FixedHeightItemSizeStyles[size]

  const buttonRef = useRef<HTMLDivElement>(null)

  return (
    <div
      id={id}
      ref={buttonRef}
      tabIndex={focusable && shouldInteract ? 0 : undefined}
      className={clsx(
        // basic
        'flex flex-shrink-0 font-medium whitespace-nowrap justify-center items-center transition-all ease-out',
        // sizing
        circle || !children ? squireSize : [height, px],
        block && !circle && !children && 'w-full',
        circle ? 'rounded-full' : roundCorner,
        fontSize,
        gap,
        // color
        normalState && danger && ButtonTheme.danger,
        normalState && !danger && ButtonTheme[type],
        !normalState && (loading || disabled) && ButtonTheme.disabled,
        !normalState && success && ButtonTheme.success,
        !normalState && error && ButtonTheme.error,
        // shadow
        type !== 'transparent' && 'shadow-sm',
        // interaction
        shouldInteract
          ? 'hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-highlight'
          : 'hover:cursor-not-allowed'
      )}
      onClick={(e:MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (!shouldInteract) {
          return
        }
        buttonRef.current?.classList.add('animate-signal')
        buttonRef.current?.addEventListener('animationend', () => {
          buttonRef.current?.classList.remove('animate-signal')
        })
        buttonRef.current?.blur()
        onClick?.(e)
      }}
      onKeyDown={(e) => {
        if (focusable && e.key === 'Enter' && shouldInteract) {
          buttonRef.current?.blur()
          onClick?.()
        }
      }}
    >
      {iconPosition === 'right' && shape!=='circle' && children}
      {(shouldOverWriteIcon || icon) && (
        <span className={clsx(iconSize, { 'animate-spin': loading })}>
          {loading && <AiOutlineLoading3Quarters />}
          {success && <AiOutlineCheckCircle />}
          {error && <AiOutlineExclamationCircle />}
          {!shouldOverWriteIcon && icon ? icon : null}
        </span>
      )}
      {iconPosition === 'left'&& shape!=='circle' && children}
    </div>
  )
}
