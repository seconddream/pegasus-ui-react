import { ReactNode, useMemo, useState } from 'react'
import { WithPlacement } from '../../shared/interfaces'
import Popover from '../Popover'
import Label from '../Label'

export interface TooltipProps extends WithPlacement {
  text: string
  children?: ReactNode
}

export default function Tooltips(props: TooltipProps) {
  const { text, position = 'bottom', children } = props
  const [show, SetShow] = useState(false)

  const animation = useMemo(() => {
    switch (position) {
      case 'top':
      case 'topLeft':
      case 'topRight':
        return 'centered-slide-up'
      case 'bottom':
      case 'bottomLeft':
      case 'bottomRight':
        return 'centered-slide-down'
      default:
        return 'fade-in'
    }
  }, [position])

  return (
    <div
      onMouseEnter={() => {
        SetShow(true)
      }}
      onMouseLeave={() => {
        SetShow(false)
      }}
    >
      <Popover
        show={show}
        popover={<Label text={text} color='dark' shadow />}
        position={position}
        animation={animation}
      >
        {children}
      </Popover>
    </div>
  )
}
