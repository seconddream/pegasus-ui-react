import { RefObject, useCallback } from 'react'
import { AnimationClassMap, AnimationType } from '../shared/interfaces'


export default function useReveal(
  ref: RefObject<HTMLElement>,
  show?: AnimationType,
  hide?: AnimationType
) {
  const _show = useCallback(() => {
    const isHidden = ref.current?.classList.contains('hidden')
    if (isHidden) {
      ref.current?.addEventListener(
        'animationend',
        () => {
          ref.current?.classList.remove(AnimationClassMap[show ?? 'fade-in'])
        },
        { once: true }
      )
      ref.current?.classList.add(AnimationClassMap[show ?? 'fade-in'])
      ref.current?.classList.remove('hidden')
    }
  }, [ref, show])

  const _hide = useCallback(() => {
    const isHidden = ref.current?.classList.contains('hidden')
    if (!isHidden) {
      ref.current?.addEventListener(
        'animationend',
        () => {
          ref.current?.classList.add('hidden')
          ref.current?.classList.remove(AnimationClassMap[hide ?? 'fade-out'])
        },
        { once: true }
      )
      ref.current?.classList.add(AnimationClassMap[hide ?? 'fade-out'])
    }
  }, [ref])

  const toggle = useCallback(()=>{
    const isHidden = ref.current?.classList.contains('hidden')
    if(isHidden){
      _show()
    }else{
      _hide()
    }
  }, [show, hide])

  return { show:_show, hide:_hide, toggle }
}
