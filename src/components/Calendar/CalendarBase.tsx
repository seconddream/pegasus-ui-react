import clsx from 'clsx'
import dayjs from 'dayjs'
import 'dayjs/locale/de'
import { ReactNode, useMemo } from 'react'

import { Withlocale } from '../../shared/interfaces'
import { paddArray, range } from '../../shared/helpers'

export type CalendarView = 'year' | 'month' | 'week' | 'day'
export type CalendarCell = {
  name: string
  start: number
  end: number
  current: boolean
  outside: boolean
}

export interface CalendarBaseProps extends Withlocale {
  width?: string
  anchorTime: number
  local?: boolean
  view?: CalendarView
  titleRenderer?: (
    title: string,
    index: number,
    view: CalendarView
  ) => ReactNode
  cellRenderer: (
    cell: CalendarCell,
    index: number,
    view: CalendarView
  ) => ReactNode
}

export default function CalendarBase(props: CalendarBaseProps) {
  const {
    width = 'min-w-64',
    anchorTime,
    locale = 'en',
    view = 'week',
    titleRenderer,
    cellRenderer,
  } = props

  const anchorTimeObj = dayjs.unix(anchorTime).locale(locale)

  const titles = useMemo(() => {
    switch (view) {
      case 'week':
        return range(0, 7).map((i) => {
          return anchorTimeObj
            .startOf('week')
            .add(i + 1, 'day')
            .format('ddd')
        })
      case 'day':
        return [
          ...range(0, 12).map((i) => {
            return ((i - 1) * 2 + 2).toString().padStart(2, '0') + ':00'
          }),
          '23:59',
        ]
      default:
        return null
    }
  }, [view, locale])
  // console.log(titles)

  const cells = useMemo((): CalendarCell[] => {
    switch (view) {
      case 'year':
        const currentYear = anchorTimeObj.year()
        const yearList = paddArray(currentYear, 7)
        return yearList.map((i) => ({
          name: i.toString(),
          start: dayjs().year(i).startOf('year').unix(),
          end: dayjs().year(i).endOf('year').unix(),
          current: i === dayjs().year(),
          outside: false,
        }))
      case 'month':
        const monthList = range(0, 12).map((i) => {
          return {
            name: dayjs().locale(locale).month(i).format('MMM'),
            start: anchorTimeObj.month(i).startOf('month').unix(),
            end: anchorTimeObj.month(i).endOf('month').unix(),
            current: i === dayjs().month(),
            outside: false,
          }
        })
        return monthList
      case 'week':
        let dateInMonth = range(0, anchorTimeObj.endOf('month').date()).map(
          (i) => {
            const d = anchorTimeObj.date(i + 1)
            return {
              name: (i + 1).toString().padStart(2, '0'),
              start: d.startOf('day').unix(),
              end: d.endOf('day').unix(),
              current: i + 1 === dayjs().date(),
              outside: false,
            }
          }
        )
        const monthStartWeekDay = anchorTimeObj.startOf('month').day()
        if (monthStartWeekDay > 1) {
          dateInMonth = [
            ...range(0, monthStartWeekDay - 1)
              .reverse()
              .map((i) => {
                const d = anchorTimeObj
                  .startOf('month')
                  .subtract(i + 1, 'day')
                return {
                  name: d.date().toString().padStart(2, '0'),
                  start: d.startOf('day').unix(),
                  end: d.endOf('day').unix(),
                  current: false,
                  outside: true,
                }
              }),
            ...dateInMonth,
          ]
        }
        const monthEndWeekDay = anchorTimeObj.endOf('month').day()
        if (monthEndWeekDay !== 0) {
          dateInMonth = [
            ...dateInMonth,
            ...range(0, 7 - monthEndWeekDay).map((i) => {
              const d = anchorTimeObj.endOf('month').add(i + 1, 'day')
              return {
                name: d.date().toString().padStart(2, '0'),
                start: d.startOf('day').unix(),
                end: d.endOf('day').unix(),
                current: false,
                outside: true,
              }
            }),
          ]
        }
        return dateInMonth
      case 'day':
        return [
          {
            name: anchorTimeObj.format('YYYY-MMM-DD'),
            start: anchorTimeObj.startOf('day').unix(),
            end: anchorTimeObj.endOf('day').unix(),
            current: false,
            outside: false,
          },
        ]
      default:
        throw new Error(`Unknow view: ${view}`)
    }
  }, [locale, view, anchorTime])
  // console.log(cells)

  return (
    // container
    <div className={clsx('flex flex-col', width)}>
      {/* title */}
      {titles && titleRenderer && (
        <div
          className={clsx(
            'w-full',
            view === 'week' && 'grid grid-cols-7',
            view === 'day' && 'flex'
          )}
        >
          {titles.map((title: string, index: number) => {
            return titleRenderer(title, index, view)
          })}
        </div>
      )}
      {/* content */}
      <div
        className={clsx(
          'w-full',
          view === 'year' && 'grid grid-cols-5 gap-1',
          view === 'month' && 'grid grid-cols-3 gap-1',
          view === 'week' && 'grid grid-cols-7 gap-1',
          view === 'day' && 'flex'
        )}
      >
        {cells.map((cell, index) => {
          return cellRenderer(cell, index, view)
        })}
      </div>
    </div>
  )
}
