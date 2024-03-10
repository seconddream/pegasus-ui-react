import clsx from 'clsx'
import {
  WithOptionalId,
  WithFixedHeightItemSize,
  FixedHeightItemSize,
} from '../../shared/interfaces'
import {
  FixedHeightItemSizeStyles,
  LayoutSpacingStyles,
} from '../../shared/styles'
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import {
  AiOutlineAim,
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
  AiOutlineRight,
  AiOutlineRightSquare,
} from 'react-icons/ai'

export interface TableProps extends WithOptionalId, WithFixedHeightItemSize {
  type?: 'primary' | 'secondary'
  layout?: 'table-auto' | 'table-fixed'
  border?: boolean
  columns: {
    key: string
    label: string
    align?: 'justify-start' | 'justify-center' | 'justify-end'
    render?: (value: any, entry: any) => any
  }[]
  data: any[]
  selectable?: boolean
  onSelectionChanged?: (entries: any) => any
  expandKey?: string
  expandRenderer?: (entry: any) => any
  autoExpand?: boolean
  maxHeight?: string
  pagination?: any
}

export default function Table(props: TableProps) {
  const {
    id,
    size = 'md',
    layout = 'table-auto',
    border = true,
    type = 'primary',
    columns,
    data,
    selectable = false,
    onSelectionChanged,
    expandRenderer,
    autoExpand = false,
    maxHeight,
    pagination,
  } = props
  const { fontSize, px, py, minHeight, gap } = FixedHeightItemSizeStyles[size]

  const [selectedIndex, setSelectedIndex] = useState<string[]>([])

  const itemCount = useMemo(() => {
    let count = 0
    for (const entry of data) {
      count++
      if (Array.isArray(entry.children)) {
        count += entry.children.length
      }
    }
    return count
  }, [data])

  useEffect(() => {
    setSelectedIndex([])
  }, [data])

  useEffect(() => {
    if (!onSelectionChanged) return
    const selectedEntries: any[] = []
    data.forEach((entry, index) => {
      if (selectedIndex.includes(`${index}`)) {
        selectedEntries.push(entry)
      }
      if (Array.isArray(entry.children)) {
        entry.children.forEach((child: any, childIndex: number) => {
          if (selectedIndex.includes(`${index}_${childIndex}`)) {
            selectedEntries.push(child)
          }
        })
      }
    })
    onSelectionChanged(selectedEntries)
  }, [selectedIndex, data])

  return (
    <div
      id={id}
      className={clsx(
        'flex w-full overflow-y-auto',
        border && 'border border-dark',
        maxHeight && maxHeight
      )}
    >
      <table className={clsx('w-full bg-white', layout)}>
        {/* header */}
        <thead className='sticky top-0'>
          <tr
            className={clsx(
              'sticky top-0',
              type === 'primary' ? 'bg-primary text-white' : ' bg-slate-100'
            )}
          >
            {columns.map(({ label, align = 'justify-start' }, index) => {
              return (
                <th
                  key={index}
                  className={clsx(
                    'sticky top-0',
                    minHeight,
                    px,
                    py,
                    fontSize,
                    'font-semibold',
                    align,
                    gap
                  )}
                >
                  <span
                    className={clsx('flex w-full items-center', gap, align)}
                  >
                    {selectable && index === 0 && (
                      <input
                        type='checkbox'
                        checked={
                          selectedIndex.length !== 0 &&
                          selectedIndex.length === itemCount
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            const selectedIndex: any[] = []
                            data.forEach((entry, index) => {
                              selectedIndex.push(index.toString())
                              if (Array.isArray(entry.children)) {
                                entry.children.forEach(
                                  (subEntry: any, subIndex: number) => {
                                    selectedIndex.push(`${index}_${subIndex}`)
                                  }
                                )
                              }
                            })
                            setSelectedIndex(selectedIndex)
                          } else {
                            setSelectedIndex([])
                          }
                        }}
                      />
                    )}
                    {label.toUpperCase()}
                  </span>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody className='divide-y divide-light '>
          {data.map((entry, rowIndex) => {
            const entryIndex = `${rowIndex}`
            return (
              <TableRow
                key={rowIndex}
                rowIndex={entryIndex}
                entry={entry}
                autoExpand={autoExpand}
                columns={columns}
                size={size}
                selectable={selectable}
                selectedIndex={selectedIndex}
                onSelectionChange={(
                  selected: boolean,
                  index: string | string[]
                ) => {
                  let parsedIndex = Array.isArray(index) ? index : [index]
                  if (selected) {
                    setSelectedIndex(
                      Array.from(new Set([...selectedIndex, ...parsedIndex]))
                    )
                  } else {
                    setSelectedIndex(
                      selectedIndex.filter((i) => !parsedIndex.includes(i))
                    )
                  }
                }}
              />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function TableRow(props: {
  entry: any
  rowIndex: string
  autoExpand: boolean
  columns: any
  size: FixedHeightItemSize
  selectable: boolean
  selectedIndex: string[]
  onSelectionChange: (selected: boolean, index: string | string[]) => any
}) {
  const {
    entry,
    rowIndex,
    size,
    autoExpand,
    columns,
    selectable,
    selectedIndex,
    onSelectionChange,
  } = props
  const [expanded, setExpanded] = useState(autoExpand)

  const { minHeight, px, py, fontSize, gap } = FixedHeightItemSizeStyles[size]

  return (
    <Fragment>
      <tr className={clsx('text-xs hover:bg-secondary-hover')}>
        {columns.map((column: any, columIndex: number) => {
          const { key, align = 'justify-start', render } = column
          return (
            <td key={columIndex} className={clsx(minHeight, fontSize, px, py)}>
              <span className={clsx('flex w-full items-center', gap, align)}>
                {selectable && columIndex === 0 && (
                  <input
                    type='checkbox'
                    checked={selectedIndex.includes(rowIndex)}
                    onChange={(e) => {
                      let indexes = [rowIndex]
                      if (Array.isArray(entry.children)) {
                        indexes = [
                          ...indexes,
                          ...Array.from(
                            Array(entry.children.length).keys()
                          ).map((i) => `${rowIndex}_${i}`),
                        ]
                      }
                      onSelectionChange(e.target.checked, indexes)
                    }}
                  />
                )}
                {entry.children?.length > 0 && columIndex === 0 && (
                  <span
                    className={clsx('hover:cursor-pointer')}
                    onClick={() => {
                      setExpanded(!expanded)
                    }}
                  >
                    {expanded ? (
                      <AiOutlineMinusSquare />
                    ) : (
                      <AiOutlinePlusSquare />
                    )}
                  </span>
                )}
                {render ? render(entry[key], entry) : entry[key]}
              </span>
            </td>
          )
        })}
      </tr>
      {entry.children &&
        expanded &&
        entry.children.map((child: any, index: number) => {
          const childIndex = `${rowIndex}_${index}`
          return (
            <tr
              key={index}
              className={clsx('text-xs hover:bg-secondary-hover')}
            >
              {columns.map((column: any, index: number) => {
                const { key, align = 'justify-start', render } = column
                return (
                  <td
                    className={clsx(minHeight, fontSize, px, py)}
                    key={index}
                  >
                    <span
                      className={clsx('flex w-full items-center', gap, align)}
                    >
                      {selectable && index === 0 && (
                        <input
                          type='checkbox'
                          checked={selectedIndex.includes(childIndex)}
                          onChange={(e) => {
                            onSelectionChange(e.target.checked, childIndex)
                          }}
                        />
                      )}
                      {index === 0 && <AiOutlineRight className='ml-2' />}
                      {render ? render(child[key], child) : child[key]}
                    </span>
                  </td>
                )
              })}
            </tr>
          )
        })}
    </Fragment>
  )
}
