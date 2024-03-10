import { useState } from 'react'
import { WithFixedHeightItemSize, WithFormControl, WithOptionalId,  } from '../../shared/interfaces'
import { FixedHeightItemSizeStyles, FormItemDefaultWidth } from '../../shared/styles'
import Label from '../Label'
import { AiOutlineCloseCircle, AiOutlineCopy, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import clsx from 'clsx'

export interface InputProps extends WithOptionalId, WithFixedHeightItemSize, WithFormControl {
  type?: 'number' | 'password' | 'text' | 'textarea'
  prefix?: string
  suffix?: string
  placeHolder?: string
  maxLength?: number
  rows?: number
  showClear?: boolean
  showCopy?: boolean
  allowShowPassword?: boolean
  onEnterPress?: () => any
}

export default function Input(props: InputProps) {
  const {
    id,
    size = 'md',
    width = FormItemDefaultWidth,
    value = '',
    error=false,
    disabled = false,
    readOnly = false,
    type = 'text',
    prefix,
    suffix,
    placeHolder,
    maxLength,
    rows = 3,
    showClear = true,
    showCopy = false,
    allowShowPassword = true,
    onChange,
    onEnterPress,
  } = props

  const isControlled = onChange !== undefined
  const initValue = isControlled ? value : ''
  const [_value, _setValue] = useState(initValue)
  const mergedValue = isControlled ? value : _value
  
  const [focus, setFocus] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleValueUpdate = (value: any) => {
    if (isControlled) {
      if (type === 'number') {
        let parsed = parseFloat(value)
        if (!isNaN(parsed)) {
          onChange?.(parsed)
        }
      } else {
        onChange?.(value)
      }
    } else {
      _setValue(value)
    }
  }

  const { fontSize, gap, height, minHeight, px, py, roundCorner } = FixedHeightItemSizeStyles[size]

  return (
    <div
      id={id}
      className={clsx(
        'flex border justify-start items-center shadow-sm',
        disabled ? 'bg-disabled' : 'bg-white',
        width,
        fontSize,
        gap,
        type === 'textarea' ? [py, px, minHeight] : [height, px],
        roundCorner,
        error ? 'border-error' : 'border-dark',
        focus && 'ring-2 ring-highlight'
      )}
      onClick={(e)=>{
        e.stopPropagation()
        e.preventDefault()
      }}
    >
      {prefix && <span className={clsx(error ? 'text-error' : 'text-deemphasized')}>{prefix}</span>}
      {type !== 'textarea' && (
        <input
          disabled={disabled}
          className={clsx('border-none outline-none w-full', disabled && 'bg-disabled text-deaktivated')}
          type={type === 'password' ? (showPassword ? 'text' : type) : type}
          value={mergedValue}
          maxLength={maxLength}
          placeholder={placeHolder}
          readOnly={readOnly}
          onFocus={() => {
            setFocus(true)
          }}
          onBlur={() => {
            setFocus(false)
          }}
          onChange={(e) => {
            handleValueUpdate(e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onEnterPress?.()
            }
          }}
          onClick={(e)=>{
            e.stopPropagation()
            e.preventDefault()
          }}
        />
      )}
      {type === 'textarea' && (
        <textarea
          disabled={disabled}
          className={clsx('border-none outline-none w-full', disabled && 'bg-disabled text-disabled-content')}
          value={isControlled ? initValue : _value}
          maxLength={maxLength}
          placeholder={placeHolder}
          readOnly={readOnly}
          rows={rows}
          onFocus={() => {
            setFocus(true)
          }}
          onBlur={() => {
            setFocus(false)
          }}
          onChange={(e) => {
            handleValueUpdate(e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onEnterPress?.()
            }
          }}
          onClick={(e)=>{
            e.stopPropagation()
            e.preventDefault()
          }}
        />
      )}
      {suffix && <Label color={error ? 'red' : 'gray'} text={suffix} />}
      {(type === 'text' || type === 'textarea') && (showClear || showCopy) && (
        <span
          className={clsx(
            'flex items-center',
            type === 'textarea' && 'flex-col',
            error ? 'text-error' : 'text-deemphasized',
            gap,
            fontSize
          )}
        >
          {showCopy && (
            <AiOutlineCopy
              className='hover:text-emphasized hover:cursor-pointer'
              onClick={() => {
                navigator.clipboard.writeText(mergedValue)
              }}
            />
          )}
          {showClear && !disabled && (
            <AiOutlineCloseCircle
              className='hover:text-emphasized hover:cursor-pointer'
              onClick={() => {
                handleValueUpdate('')
              }}
            />
          )}
        </span>
      )}
      {type === 'password' && allowShowPassword && (
        <span
          className={clsx(
            'flex items-center',
            error ? 'text-error' : 'text-deemphasized',
            gap,
            fontSize
          )}
        >
          {showPassword && (
            <AiOutlineEyeInvisible
              className='hover:text-emphasized hover:cursor-pointer'
              onClick={() => {
                setShowPassword(false)
              }}
            />
          )}
          {!showPassword && (
            <AiOutlineEye
              className='hover:text-emphasized hover:cursor-pointer'
              onClick={() => {
                setShowPassword(true)
                setTimeout(() => {
                  setShowPassword(false)
                }, 5000)
              }}
            />
          )}
        </span>
      )}
    </div>
  )
}
