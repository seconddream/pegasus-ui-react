import ReactDom from 'react-dom'
import { ReactNode, useEffect, useState } from 'react'
import clsx from 'clsx'
import { Button } from '../Button'
import { LayoutSpacingStyles } from '../../shared/styles'
import { AiOutlineClose } from 'react-icons/ai'
import { WithRequiredId } from '../../shared/interfaces'

export interface DrawerProps extends WithRequiredId {
  open: boolean
  width?: string
  onClose: () => any
  title?: string
  icon?: ReactNode
  children: ReactNode | ReactNode[]
}

export default function Drawer(props: DrawerProps) {
  const { id, open, width = 'w-[450px]', onClose, title, icon, children } = props
  const drawerId = `${id}_drawer`
  const [mountPoint, setMountPoint] = useState<HTMLDivElement | null>()

  useEffect(() => {
    if (!document.getElementById(drawerId)) {
      const drawerEl = document.createElement('div')
      drawerEl.setAttribute('id', drawerId)
      drawerEl.classList.add('h-full', 'w-fit')
      document.body.appendChild(drawerEl)
      setMountPoint(drawerEl)
    }
    return () => {
      document.getElementById(id)?.remove()
    }
  }, [])

  if (!mountPoint) return null

  return ReactDom.createPortal(
    <div
      id={id}
      className={clsx('flex flex-col border-l border-light bg-white', open ? [width, 'h-full'] : 'h-0 w-0')}
    >
      {open && (
        <div className='flex flex-col px-8 animate-fade-in'>
          <div className={clsx('flex h-24 flex-shrink-0 items-center justify-between text-xl font-bold')}>
            {title}
            <Button shape='circle' type='secondary' icon={<AiOutlineClose />} onClick={onClose} />
          </div>
          <div className={clsx('flex h-full w-full flex-col', LayoutSpacingStyles.normal.gap)}>{children}</div>
        </div>
      )}
    </div>,
    mountPoint
  )
}
