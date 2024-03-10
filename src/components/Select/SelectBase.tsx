import {
  ReactNode,
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  WithFormControl,
  WithOptionalId,
  WithPlacement,
  WithFixedHeightItemSize,
} from '../../shared/interfaces'
import clsx from 'clsx'
import { AiOutlineLeft } from 'react-icons/ai'
import Label from '../Label'
import Popover from '../Popover'
import {
  FixedHeightItemSizeStyles,
  FormItemDefaultWidth,
  LayoutSpacingStyles,
} from '../../shared/styles'

export type SelectOption = { label: string; value: any }

export interface SelectBaseProps
  extends WithOptionalId,
    WithFixedHeightItemSize,
    WithPlacement,
    WithFormControl {
  icon?: ReactNode
  options?: SelectOption[]
  sufix?: string
  input?: boolean
  onInputChange?: () => any
  multiple?: boolean
  children: ReactNode
}

export type SelectBaseHandle = {
  setOpen: (open:boolean)=>any
}

const SelectBase = (props: SelectBaseProps, ref:Ref<SelectBaseHandle>) => {
  const {
    id,
    size = 'md',
    position = 'bottomRight',
    width = FormItemDefaultWidth,
    value,
    error,
    disabled,
    icon,
    options = [],
    multiple = false,
    children,
  } = props

  const { fontSize, gap, height, px, py, minHeight, roundCorner, iconSize } =
    FixedHeightItemSizeStyles[size]
  const shouldInteract = !disabled

  const displayValue = useMemo(() => {
    if (multiple) {
      if (!value) {
        return []
      }
      return options
        .filter((o) => value.includes(o.value))
        .map((o, index) => {
          return (
            <Label
              key={index}
              color='gray'
              bordered
              text={o.label}
            />
          )
        })
    } else {
      if (options.length > 0) {
        return options.filter((o) => o.value === value)[0]?.label
      } else {
        return value
      }
    }
  }, [value, options])

  const [open, setOpen] = useState(false)

  useImperativeHandle(
    ref,
    () => {
      return { setOpen }
    },
    []
  )

  const baseRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClose = (e: any) => {
      if(e.defaultPrevented){
        console.log('prevented')
        if(!baseRef.current?.contains(e.target)){
          setOpen(false)
        }
      }else{
        if(!baseRef.current?.contains(e.target)){
          setOpen(false)
        }
      }
    
      
    }
    document.addEventListener('click', handleClose)
    return () => {
      document.removeEventListener('click', handleClose)
    }
  }, [])

  return (
    <div id={id} ref={baseRef} className={clsx(width)}>
      <Popover
        popover={children}
        show={open}
        animation='slide-down'
        position={position}
        block
      >
        <div
          tabIndex={shouldInteract ? 0 : undefined}
          className={clsx(
            'flex items-center justify-start border shadow-sm',
            disabled
              ? 'bg-disabled text-deemphasized-content'
              : 'bg-white hover:cursor-pointer',
            fontSize,
            width,
            gap,
            multiple ? [px, py, minHeight] : [height, px],
            roundCorner,
            error ? 'border-error' : 'border-dark',
            'focus:outline-none focus:ring-2 focus:ring-highlight'
          )}
          onClick={(e) => {
            e.preventDefault()
            setOpen(!open)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && shouldInteract) {
              setOpen(true)
            }
            if (e.key === 'Escape' && shouldInteract) {
              setOpen(false)
            }
          }}
        >
          <div
            className={clsx(
              'flex flex-grow flex-wrap whitespace-nowrap w-full overflow-hidden text-ellipsis',
              LayoutSpacingStyles.tight.gap
            )}
            suppressHydrationWarning
          >
            {displayValue}
          </div>
          <div
            className={clsx(
              iconSize,
              'text-deemphasized hover:text-emphasized'
            )}
          >
            {icon ? (
              icon
            ) : (
              <AiOutlineLeft
                className={clsx(
                  open ? '-rotate-90' : 'rotate-0',
                  ' transition-all ease-out'
                )}
              />
            )}
          </div>
        </div>
      </Popover>
    </div>
  )
}

export default forwardRef<SelectBaseHandle, SelectBaseProps>(SelectBase)