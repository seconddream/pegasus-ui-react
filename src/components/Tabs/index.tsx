import { ReactNode, useEffect, useState } from 'react'
import {
  WithOptionalId,
  WithFixedHeightItemSize,
  WithLayoutSpacing,
  WithRequiredId,
  WithDirection,
} from '../../shared/interfaces'
import clsx from 'clsx'
import {
  FixedHeightItemSizeStyles,
  LayoutSpacingStyles,
} from '../../shared/styles'

interface ButtonStyleHeaderProps extends WithFixedHeightItemSize {
  block?: boolean
  selectedIndex: number
  onSelect: (index: number) => any
  children: JSX.Element[]
}
function ButtonStyleHeader(props: ButtonStyleHeaderProps) {
  const {
    size = 'md',
    block = false,
    selectedIndex = 0,
    children,
    onSelect,
  } = props
  const { fontSize, height, px, gap, roundCorner, iconSize } =
    FixedHeightItemSizeStyles[size]
  return (
    <div
      className={clsx(
        'flex bg-slate-100 p-1',
        block && 'w-full',
        roundCorner,
        LayoutSpacingStyles.extraTight.gap
      )}
    >
      {children.map((child, index) => {
        const { id, title, icon } = child.props
        return (
          <div
            id={id}
            key={index}
            className={clsx(
              'flex items-center justify-center font-medium transition-all ease-out hover:cursor-pointer',
              fontSize,
              height,
              px,
              gap,
              roundCorner,
              block && 'w-full',
              selectedIndex === index &&
                'border border-light bg-white shadow-sm'
            )}
            onClick={() => {
              onSelect(index)
            }}
          >
            {icon && <span className={clsx(iconSize)}>{icon}</span>}
            {title}
          </div>
        )
      })}
    </div>
  )
}

export interface TabProps extends WithRequiredId {
  title: string
  icon?: ReactNode
  children: any
}

export function Tab(props: TabProps) {
  return props.children
}

export interface TabsProps extends WithOptionalId, WithFixedHeightItemSize, WithLayoutSpacing, WithDirection {
  headerStyle?: 'button' | 'tab'
  block?: boolean
  onTabChange?: (tab: string) => any
  children: any
}

export default function Tabs(props: TabsProps) {
  const {
    id,
    size = 'md',
    spacing = 'normal',
    direction = 'vertical',
    headerStyle = 'button',
    block = true,
    onTabChange,
    children,
  } = props

  const [selectedIndex, setSelectedIndex] = useState(0)
  const {px, py, gap} = LayoutSpacingStyles[spacing]

  const childrenList = Array.isArray(children) ? children : [children]
  const filteredChildrenList = childrenList.filter((c) => c)

  useEffect(() => {
    const selectedTab = filteredChildrenList[selectedIndex]
    const { id, title } = selectedTab.props
    onTabChange?.(id ?? title)
  }, [selectedIndex])

  return (
    <div
      id={id}
      className={clsx('flex w-full flex-col', gap)}
    >
      {headerStyle === 'button' && (
        <ButtonStyleHeader
          size={size}
          block={block}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
        >
          {filteredChildrenList}
        </ButtonStyleHeader>
      )}
      {filteredChildrenList.map((child, index) => {
        return (
          <div
            key={index}
            className={clsx(
              'flex w-full',
              direction === 'vertical' && 'flex-col',
              gap,
              index !== selectedIndex && 'hidden'
            )}
          >
            {child}
          </div>
        )
      })}
    </div>
  )
}
