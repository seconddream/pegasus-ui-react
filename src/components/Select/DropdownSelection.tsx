import clsx from 'clsx'
import {
  WithFormControl,
  WithOptionalId,
  WithPlacement,
  WithFixedHeightItemSize,
} from '../../shared/interfaces'
import SelectBase, {
  SelectBaseHandle,
  SelectBaseProps,
  SelectOption,
} from './SelectBase'
import {
  FixedHeightItemSizeStyles,
  FormItemDefaultWidth,
  LayoutSpacingStyles,
} from '../../shared/styles'
import { Fragment, useRef, useState } from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai'

export interface DropdownProps
  extends WithOptionalId,
    WithFixedHeightItemSize,
    WithPlacement,
    WithFormControl {
  options?: SelectOption[]
  multiple?: boolean
}

export default function DropdownSelection(props: DropdownProps) {
  const {
    id,
    size = 'md',
    position = 'bottomRight',
    width = FormItemDefaultWidth,
    value,
    error = false,
    onChange,
    disabled = false,
    options=[],
    multiple = false,
  } = props

  const { fontSize, iconSize, px, gap, roundCorner, height, minHeight, py } =
    FixedHeightItemSizeStyles[size]

  const isControlled = value !== undefined
  const initValue = isControlled ? value : multiple ? [] : null
  const [_value, _setValue] = useState<any | any[]>(initValue)

  const mergedValue = isControlled ? value : _value

  const baseRef = useRef<SelectBaseHandle>(null)

  const handleValueUpdate = (value: any) => {
    const newValue = multiple
      ? Array.from(new Set([...mergedValue, value]))
      : value
    if (isControlled) {
      onChange?.(newValue)
    } else {
      _setValue(newValue)
    }
  }
  const removeValue = (value: any) => {
    const newValue = mergedValue.filter((v: any) => v !== value)
    if (isControlled) {
      onChange?.(newValue)
    } else {
      _setValue(newValue)
    }
  }

  return (
    <SelectBase
      ref={baseRef}
      id={id}
      size={size}
      position={position}
      width={width}
      value={mergedValue}
      error={error}
      disabled={disabled}
      options={options}
      multiple={multiple}
    >
      <div
        className={clsx(
          'flex flex-col border border-dark-line bg-white shadow-xl max-h-48 overflow-y-auto px-1 py-1', minHeight,
          roundCorner,
          'gap-[2px]'
        )}
      >
        {options.map((option, index) => {
          const optionSelected = multiple
            ? mergedValue.includes(option.value)
            : false
          return (
            <div
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                if (!multiple) {
                  baseRef.current?.setOpen(false)
                }
                if(multiple){
                  if(optionSelected){
                    removeValue(option.value)
                  }else{
                    handleValueUpdate(option.value)
                  }
                }else{
                  handleValueUpdate(option.value)
                }
              }}
              key={index}
              className={clsx(
                'flex flex-shrink-0 items-center justify-start hover:cursor-pointer transition-all ease-out whitespace-nowrap',
                fontSize,
                gap,
                px,
                height,
                // corner,
                roundCorner,
                'hover:bg-primary hover:text-white',
                optionSelected ? 'bg-slate-100' : 'bg-white'
              )}
            >
              {option.label}
              {multiple && optionSelected && (
                <Fragment>
                  <span className='flex-grow min-w-6' />
                  <AiOutlineCheckCircle className={clsx(iconSize)} />
                </Fragment>
              )}
            </div>
          )
        })}
      </div>
    </SelectBase>
  )
}
