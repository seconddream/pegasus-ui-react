import { ReactNode, Ref, forwardRef, useImperativeHandle } from 'react'
import useOverlay from '../../hooks/useOverlay'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import {
  FixedHeightItemSizeStyles,
  LayoutSpacingStyles,
} from '../../shared/styles'
import {
  AiOutlineClose,
  AiOutlineExclamationCircle,
  AiOutlineInfoCircle,
  AiOutlineQuestionCircle,
} from 'react-icons/ai'
import { Button } from '../Button'
import {
  WithActionState,
  WithDirection,
  WithLayoutSpacing,
  WithRequiredId,
} from '../../shared/interfaces'

type DialogHandle = {
  show: () => any
  close: () => any
}

export interface DialogProps
  extends WithRequiredId,
    WithLayoutSpacing,
    WithDirection,
    WithActionState {
  title?: ReactNode
  errorMessage?: string
  icon?: 'info' | 'question' | 'warning'
  maskBackground?: boolean
  onShow?: () => any
  onClose?: () => any
  children: ReactNode
}
const IconMap = {
  info: <AiOutlineInfoCircle />,
  question: <AiOutlineQuestionCircle />,
  warning: <AiOutlineExclamationCircle />,
}

const Dialog = (props: DialogProps, ref: Ref<DialogHandle>) => {
  const {
    id,
    spacing = 'normal',
    direction = 'vertical',
    loading = false,
    error = false,
    errorMessage,
    title = null,
    maskBackground = false,
    icon,
    onClose,
    children,
  } = props

  const { el, show, hide } = useOverlay({
    id,
    onHide: onClose,
    maskBackground,
  })
  useImperativeHandle(
    ref,
    () => {
      return {
        show,
        close: hide,
      }
    },
    []
  )
  const { px, py, gap } = LayoutSpacingStyles[spacing]
  const { roundCorner, fontSize, iconSize } = FixedHeightItemSizeStyles.lg
  if (!el) return null
  return createPortal(
    <div
      className={clsx(
        'flex min-h-[20%] min-w-[30%] flex-col border border-light bg-white shadow-2xl',
        px,
        py,
        gap,
        roundCorner
      )}
    >
      <div className={clsx('flex w-full justify-between')}>
        <div
          className={clsx(
            'flex items-center font-bold',
            FixedHeightItemSizeStyles.sm.gap,
            fontSize
          )}
        >
          {icon && <span className={clsx(iconSize)}>IconMap[icon]</span>}
          {title}
        </div>
        <Button
          shape='circle'
          type='secondary'
          icon={<AiOutlineClose />}
          onClick={hide}
        />
      </div>
      <div
        className={clsx(
          'flex',
          px,
          py,
          gap,
          direction === 'vertical' && 'flex-col'
        )}
      >
        {children}
      </div>
    </div>,
    el
  )
}

export default forwardRef<DialogHandle, DialogProps>(Dialog)
