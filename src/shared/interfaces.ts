export interface WithRequiredId {
  id: string
}

export interface WithOptionalId {
  id?: string
}

export interface WithBlock {
  block?: boolean
}

export interface WithActionState {
  loading?: boolean
  error?: boolean
}

export type FixedHeightItemSize = 'lg' | 'md' | 'sm' | 'xs'
export interface WithFixedHeightItemSize {
  size: FixedHeightItemSize
}

export type LayoutSpacing =
  | 'extraRelaxed'
  | 'relaxed'
  | 'normal'
  | 'tight'
  | 'extraTight'
export interface WithLayoutSpacing {
  spacing: LayoutSpacing
}

export type Direction = 'horizontal' | 'vertical'
export interface WithDirection {
  direction?: Direction
}
export function parseDirection(direction: Direction) {
  return {
    horizontal: direction === 'horizontal',
    vertical: direction === 'vertical',
  }
}

export type Placement =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
export interface WithPlacement {
  position?: Placement
}
export function parsePlacement(position: Placement) {
  return {
    top: position === 'top',
    bottom: position === 'bottom',
    left: position === 'left',
    right: position === 'right',
    topLeft: position === 'topLeft',
    topRight: position === 'topRight',
    bottomLeft: position === 'bottomLeft',
    bottomRight: position === 'bottomRight',
  }
}

export interface WithFormControl {
  width?: string
  value?: any
  error?: boolean
  errorMessage?: string
  disabled?: boolean
  readOnly?: boolean
  onChange?: (value: any) => any
}

export const AnimationClassMap = {
  ['fade-in']: 'animate-fade-in',
  ['fade-out']: 'animate-fade-out',
  ['slide-up']: 'animate-slide-up',
  ['slide-down']: 'animate-slide-down',
  ['centered-slide-up']: 'animate-centered-slide-up',
  ['centered-slide-down']: 'animate-centered-slide-down',
}

export type AnimationType = 'fade-in' | 'slide-up' | 'slide-down' | 'centered-slide-up' | 'centered-slide-down'

