import { Children, Fragment, ReactNode, useRef, useState } from 'react'
import clsx from 'clsx'

import {
  WithDirection,
  WithOptionalId,
  WithLayoutSpacing,
  parseDirection,
} from '../../shared/interfaces'
import { FixedHeightItemSizeStyles, LayoutSpacingStyles } from '../../shared/styles'
import {
  AiOutlineDown,
  AiOutlineExclamationCircle,
  AiOutlineLeft,
  AiOutlineLoading3Quarters,
  AiOutlineUp,
} from 'react-icons/ai'
import ButtonBase from '../Button/ButtonBase'
import Divider from '../Divider'
import useFading from '../../hooks/useReveal'
import useReveal from '../../hooks/useReveal'
import { Button } from '../Button'

export interface SectionProps extends WithOptionalId, WithDirection, WithLayoutSpacing {
  title: string
  tools?: ReactNode[]
  loading?: boolean
  error?: boolean
  errorMessage?: string
  collapsible?: boolean
  collapsed?: boolean
  onCollapse?: (collaped: boolean) => any
  summary?: ReactNode
  children?: ReactNode | ReactNode[]
}

export default function Section(props: SectionProps) {
  const {
    id,
    direction = 'vertical',
    spacing = 'normal',
    title,
    tools,
    loading = false,
    error = false,
    errorMessage,
    collapsible = false,
    collapsed,
    onCollapse,
    summary,
    children,
  } = props

  const { vertical } = parseDirection(direction)
  const _isControlled = collapsed !== undefined

  const _collapsedInitValue = _isControlled ? collapsed : false
  const [_collapsed, _setCollapsed] = useState(_collapsedInitValue)
  const isCollapsed = _isControlled ? collapsed : _collapsed

  const { fontSize, iconSize } = FixedHeightItemSizeStyles.lg
  const { gap} = LayoutSpacingStyles[spacing]

  const description = !loading && !error && isCollapsed ? summary : ''

  const contentRef = useRef<HTMLDivElement>(null)
  const contentReveal = useReveal(contentRef, 'slide-down')

  const toggleCollapse = () => {
    contentReveal.toggle()
    if (_isControlled) {
      onCollapse?.(!isCollapsed)
    } else {
      _setCollapsed(!isCollapsed)
    }
  }

  return (
    <div
      id={id}
      className={clsx(
        'flex w-full justify-center items-center flex-col',
        LayoutSpacingStyles.relaxed.gap
      )}
    >
      {/* header  */}
      <div
        className={clsx(
          'flex flex-wrap w-full justify-start items-center',
          LayoutSpacingStyles.tight.gap
        )}
      >
        {/* title  */}
        <div
          className={clsx(
            'flex flex-wrap justify-center items-center',
            fontSize,
            iconSize,
            !loading && error && 'text-warning',
            LayoutSpacingStyles.tight.gap
          )}
        >
          {!loading && error && <AiOutlineExclamationCircle />}
          <span className={clsx('font-medium')}>{title}</span>
          {loading && <AiOutlineLoading3Quarters className='animate-spin' />}
        </div>
        {/* description  */}
        <div
          className={clsx(
            'flex font-extralight text-deemphasized',
            LayoutSpacingStyles.tight.gap
          )}
        >
          {(error || description) && !loading && <Divider />}
          {!loading && error && <span>{errorMessage}</span>}
          {description && <span>{description}</span>}
        </div>

        <div className='flex-grow' />
        {/* tools */}
        {tools && (
          <div
            className={clsx(
              'flex flex-wrap justify-start items-center',
              LayoutSpacingStyles.extraTight.gap
            )}
          >
            {tools.map((tool, index) => {
              return <Fragment key={index}>{tool}</Fragment>
            })}
          </div>
        )}
        {/* collapse control  */}
        {tools && tools.length > 0 && collapsible && <Divider />}
        {collapsible && (
          <Button
            icon={isCollapsed ? <AiOutlineLeft /> : <AiOutlineDown />}
            type='secondary'
            shape='circle'
            onClick={toggleCollapse}
          />
        )}
      </div>
      {/* content  */}
      <div
        ref={contentRef}
        className={clsx(
          'flex w-full',
          !vertical && 'flex-wrap',
          vertical && 'flex-col',
          gap
        )}
      >
        {children}
      </div>
    </div>
  )
}
