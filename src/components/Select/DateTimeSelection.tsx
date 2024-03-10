import dayjs from 'dayjs'
import 'dayjs/locale/de'
import {
  WithFormControl,
  WithOptionalId,
  Withlocale,
  WithPlacement,
  WithFixedHeightItemSize,
} from '../../shared/interfaces'
import { Fragment, useState } from 'react'
import SelectBase from './SelectBase'
import CalendarBase from '../Calendar/CalendarBase'
import {
  FixedHeightItemSizeStyles,
  FormItemDefaultWidth,
  LayoutSpacingStyles,
} from '../../shared/styles'
import clsx from 'clsx'
import { Button } from '../Button'
import {
  AiOutlineCaretLeft,
  AiOutlineCaretRight,
  AiOutlineHistory,
  AiOutlineZoomIn,
  AiOutlineZoomOut,
} from 'react-icons/ai'
import Input from '../Input'

export interface DateTimeSelectionProps
  extends WithOptionalId,
    WithFixedHeightItemSize,
    WithPlacement,
    WithFormControl,
    Withlocale {
  showTime?: boolean
}

export default function DateTimeSelection(props: DateTimeSelectionProps) {
  const {
    id,
    size = 'md',
    position = 'bottomRight',
    width = FormItemDefaultWidth,
    value,
    error = false,
    disabled = false,
    locale = 'en',
    onChange,
    showTime = true,
  } = props

  const { fontSize, iconSize, gap, roundCorner, px, height } =
    FixedHeightItemSizeStyles[size]

  const isControlled = value !== undefined
  const initValue = isControlled ? value : dayjs().unix()
  const [_value, _setValue] = useState(initValue)
  const mergedValue = isControlled ? value : _value

  const handleValueUpdate = (value: number) => {
    if (isControlled) {
      onChange?.(value)
    } else {
      _setValue(value)
    }
  }

  const udpateTime = (updates: { unit: any; value: any }[]) => {
    let newTime = dayjs.unix(mergedValue)
    for (const { unit, value } of updates) {
      newTime = newTime.set(unit, value)
    }
    handleValueUpdate(newTime.unix())
  }

  const displayValue = dayjs
    .unix(mergedValue)
    .locale(locale)
    .format(showTime ? 'YYYY-MMM-DD hh:mm:ss' : 'YYYY-MM-DD')

  const [view, setView] = useState<'year' | 'month' | 'week'>('week')

  const zoomIn = () => {
    switch (view) {
      case 'year':
        setView('month')
        break
      case 'month':
        setView('week')
        break
      default:
        break
    }
  }
  const zoomOut = () => {
    switch (view) {
      case 'week':
        setView('month')
        break
      case 'month':
        setView('year')
        break
      default:
        break
    }
  }

  return (
    <SelectBase
      id={id}
      size={size}
      position={position}
      width={width}
      value={displayValue}
      error={error}
      disabled={disabled}
    >
      <div
        className={clsx(
          LayoutSpacingStyles.tight.px,
          LayoutSpacingStyles.tight.py,
          LayoutSpacingStyles.tight.gap,
          'flex w-72 flex-col border border-dark bg-white shadow-xl',
          fontSize,
          iconSize,
          roundCorner
        )}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        <div className={clsx('flex justify-between')}>
          <Button
            type='transparent'
            size='sm'
            disabled={view === 'week'}
            icon={<AiOutlineZoomIn />}
            onClick={zoomIn}
          />
          <div
            className={clsx(
              'flex items-center justify-start font-bold',
              LayoutSpacingStyles.tight.gap
            )}
          >
            {['week', 'year'].includes(view) && (
              <AiOutlineCaretLeft
                className='hover:cursor-pointer'
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  const now = dayjs.unix(mergedValue)
                  if (view === 'week') {
                    udpateTime([
                      {
                        unit: 'month',
                        value: now.month() - 1,
                      },
                    ])
                  } else {
                    udpateTime([
                      {
                        unit: 'year',
                        value: now.year() - 15,
                      },
                    ])
                  }
                }}
              />
            )}
            <span>{dayjs.unix(mergedValue).year()}</span>
            {(view === 'week' || view === 'month') && (
              <span>
                {dayjs.unix(mergedValue).locale(locale).format('MMM')}
              </span>
            )}
            {view === 'week' && (
              <span>{dayjs.unix(mergedValue).locale(locale).format('DD')}</span>
            )}
            {['week', 'year'].includes(view) && (
              <AiOutlineCaretRight
                className='hover:cursor-pointer'
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  const now = dayjs.unix(mergedValue)
                  if (view === 'week') {
                    udpateTime([
                      {
                        unit: 'month',
                        value: now.month() + 1,
                      },
                    ])
                  } else {
                    udpateTime([
                      {
                        unit: 'year',
                        value: now.year() + 15,
                      },
                    ])
                  }
                }}
              />
            )}
          </div>
          <Button
            type='transparent'
            size='sm'
            disabled={view === 'year'}
            icon={<AiOutlineZoomOut />}
            onClick={zoomOut}
          />
        </div>
        <CalendarBase
          anchorTime={mergedValue}
          locale={locale}
          view={view}
          titleRenderer={(title, index, view) => {
            switch (view) {
              case 'week':
                return (
                  <div
                    key={index}
                    className={clsx(
                      'flex h-7 w-8 items-center justify-center font-semibold'
                    )}
                  >
                    {title}
                  </div>
                )
              default:
                return null
            }
          }}
          cellRenderer={(cell, index, view) => {
            switch (view) {
              case 'week':
                const isWeekend = index % 7 === 5 || index % 7 === 6
                const isSelected =
                  dayjs.unix(mergedValue).startOf('day').unix() === cell.start
                return (
                  <div
                    key={index}
                    className={clsx(
                      'flex h-8 w-8 items-center justify-center rounded-full',
                      (cell.outside || isWeekend) && 'text-deactivated',
                      cell.current && 'text-emphasized font-bold bg-slate-100',
                      isSelected && 'bg-primary text-white',
                      'hover:cursor-pointer hover:bg-primary hover:text-white'
                    )}
                    onClick={() => {
                      const updateTime = dayjs.unix(cell.start)
                      udpateTime([
                        { unit: 'month', value: updateTime.month() },
                        { unit: 'date', value: updateTime.date() },
                      ])
                    }}
                  >
                    {cell.name}
                  </div>
                )
              case 'year':
                return (
                  <div
                    key={index}
                    className={clsx(
                      'flex h-8 w-full items-center justify-center border border-dark',
                      roundCorner,
                      cell.current && 'text-emphasized font-bold',
                      'hover:cursor-pointer hover:bg-primary hover:text-white'
                    )}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      const updateTime = dayjs.unix(cell.start)
                      udpateTime([{ unit: 'year', value: updateTime.year() }])
                      zoomIn()
                    }}
                  >
                    {cell.name}
                  </div>
                )
              case 'month':
                return (
                  <div
                    key={index}
                    className={clsx(
                      'flex h-8 w-full items-center justify-center border border-dark',
                      roundCorner,
                      cell.current && 'text-emphasized font-bold',
                      'hover:cursor-pointer hover:bg-primary hover:text-white'
                    )}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      const updateTime = dayjs.unix(cell.start)
                      udpateTime([{ unit: 'month', value: updateTime.month() }])
                      zoomIn()
                    }}
                  >
                    {cell.name}
                  </div>
                )
              default:
                throw new Error(`Unimplemented view: ${view}`)
            }
          }}
        />
        {showTime && (
          <Fragment>
            <div className={clsx('flex w-full justify-between', LayoutSpacingStyles.tight.gap)}>
              <Input
                value={dayjs.unix(mergedValue).hour()}
                size='xs'
                type='number'
                prefix='hh'
                onChange={(value) => {
                  udpateTime([{ unit: 'hour', value }])
                }}
              />
              <Input
                value={dayjs.unix(mergedValue).minute()}
                size='xs'
                type='number'
                prefix='mm'
                onChange={(value) => {
                  udpateTime([{ unit: 'minute', value }])
                }}
              />
              <Input
                value={dayjs.unix(mergedValue).second()}
                size='xs'
                type='number'
                prefix='ss'
                onChange={(value) => {
                  udpateTime([{ unit: 'second', value }])
                }}
              />
            </div>
            <div className={clsx('flex w-full', LayoutSpacingStyles.tight.gap)}>
              <Button
                type='secondary'
                size='xs'
                block
                onClick={() => {
                  const now = dayjs.unix(mergedValue)
                  udpateTime([
                    { unit: 'year', value: now.year() },
                    { unit: 'month', value: now.month() },
                    { unit: 'date', value: now.date() - 1 },
                    { unit: 'hour', value: now.hour() },
                    { unit: 'minute', value: now.minute() },
                    { unit: 'second', value: now.second() },
                  ])
                }}
              >
                -24
              </Button>
              <Button
                type='secondary'
                size='xs'
                block
                icon={<AiOutlineHistory />}
                onClick={() => {
                  const now = dayjs()
                  udpateTime([
                    { unit: 'year', value: now.year() },
                    { unit: 'month', value: now.month() },
                    { unit: 'date', value: now.date() },
                    { unit: 'hour', value: now.hour() },
                    { unit: 'minute', value: now.minute() },
                    { unit: 'second', value: now.second() },
                  ])
                }}
              />
              <Button
                type='secondary'
                size='xs'
                block
                onClick={() => {
                  const now = dayjs.unix(mergedValue)
                  udpateTime([
                    { unit: 'year', value: now.year() },
                    { unit: 'month', value: now.month() },
                    { unit: 'date', value: now.date() + 1 },
                    { unit: 'hour', value: now.hour() },
                    { unit: 'minute', value: now.minute() },
                    { unit: 'second', value: now.second() },
                  ])
                }}
              >
                +24
              </Button>
            </div>
          </Fragment>
        )}
      </div>
    </SelectBase>
  )
}
