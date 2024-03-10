import clsx from 'clsx'
import { useState } from 'react'

export interface useOverlayProps {
  id: string
  onShow?: () => void
  onHide?: () => void
  maskBackground?: boolean
}

export default function useOverlay(props: useOverlayProps) {
  const { id, onShow, onHide, maskBackground = false } = props
  const [el, setEl] = useState<HTMLElement | null>()

  const hide = () => {
    document.getElementById(id)?.remove()
    setEl(null)
    onHide?.()
  }

  const show = () => {
    onShow?.()
    let overlayDiv = document.getElementById(id)
    if (!overlayDiv) {
      overlayDiv = document.createElement('div')
    }
    overlayDiv.setAttribute('id', id)
    overlayDiv.className = clsx(
      'absolute w-full h-full z-[100] flex items-center justify-center',
      maskBackground && 'backdrop-blur backdrop-brightness-95'
    )
    document.body.appendChild(overlayDiv)
    overlayDiv.onclick = (e) => {
      if (e.target === document.getElementById(id)) {
        hide()
      }
    }
    setEl(overlayDiv)
  }

  return { el, show, hide }
}
