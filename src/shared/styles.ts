export const LayoutSpacingStyles = {
  extraRelaxed: {
    px: 'px-5',
    py: 'py-5',
    gap: 'gap-5',
  },
  relaxed: {
    px: 'px-5',
    py: 'py-5',
    gap: 'gap-5',
  },
  normal: {
    px: 'px-5',
    py: 'py-5',
    gap: 'gap-4',
  },
  tight: {
    px: 'px-5',
    py: 'py-5',
    gap: 'gap-2',
  },
  extraTight: {
    px: 'px-5',
    py: 'py-5',
    gap: 'gap-1',
  },
}

export const FixedHeightItemSizeStyles = {
  lg: {
    height: 'h-11',
    minHeight: 'min-h-11',
    squireSize: 'h-11 w-11',
    px: 'px-4',
    roundCorner: 'rounded-lg',
    fontSize: 'text-lg',
    iconSize: 'text-xl',
    gap: LayoutSpacingStyles.normal.gap
  },
  md: {
    height: 'h-9',
    minHeight: 'min-h-9',
    squireSize: 'h-9 w-9',
    px: 'px-3',
    roundCorner: 'rounded-lg',
    fontSize: 'text-sm',
    iconSize: 'text-base',
    gap: LayoutSpacingStyles.tight.gap
  },
  sm: {
    height: 'h-8',
    minHeight: 'min-h-8',
    squireSize: 'h-8 w-8',
    px: 'px-2.5',
    roundCorner: 'rounded-md',
    fontSize: 'text-sm',
    iconSize: 'text-base',
    gap: LayoutSpacingStyles.tight.gap
  },
  xs: {
    height: 'h-[26px]',
    minHeight: 'min-h-[26px]',
    squireSize: 'h-[26px] w-[26px]',
    px: 'px-2',
    roundCorner: 'rounded-md',
    fontSize: 'text-xs',
    iconSize: 'text-sm',
    gap: LayoutSpacingStyles.tight.gap
  },
}

export const FormItemDefaultWidth = 'w-48'