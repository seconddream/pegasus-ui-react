import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  FieldError,
  FieldErrors,
  FieldValidator,
  FieldValues,
  FormInstance,
} from '../../hooks/useForm'

import clsx from 'clsx'
import {
  WithActionState,
  WithDirection,
  WithFixedHeightItemSize,
  WithLayoutSpacing,
  WithOptionalId,
  parseDirection,
} from '../../shared/interfaces'
import {
  FixedHeightItemSizeStyles,
  LayoutSpacingStyles,
} from '../../shared/styles'
import {
  AiOutlineExclamationCircle,
  AiOutlineLoading3Quarters,
} from 'react-icons/ai'

export const FormContext = createContext<FormInstance>({
  getFormValue: () => {},
  setFormValue: (fieldId: string, value: any) => {},
  setFormValues: (values: FieldValues) => {},
  setFormError: (fieldId: string, error: FieldError) => {},
  setFormErrors: (errors: FieldErrors) => {},
  resetFormError: (fieldId: string) => {},
  resetFormErrors: () => {},
  validateForm: () => {
    return true
  },
  _registerField: (
    fieldId: string,
    updateChildElementValue: (value: any) => void,
    updateChildElementError: (error: FieldError) => void,
    validators: FieldValidator | FieldValidator[] | null
  ) => {},
  _updateFieldValue: (
    fieldId: string,
    value: any,
    isInitial?: boolean,
    shouldUpdateFieldChildElement?: boolean
  ) => {},
})

export interface FormProps extends WithOptionalId, WithLayoutSpacing {
  form: FormInstance
  children: any
}
export function Form(props: FormProps) {
  const { id, spacing = 'relaxed', form, children } = props
  const { gap } = LayoutSpacingStyles[spacing]
  return (
    <FormContext.Provider value={form}>
      <div id={id} className={clsx('flex w-full flex-col', gap)}>
        {children}
      </div>
    </FormContext.Provider>
  )
}

export interface FormSection
  extends WithOptionalId,
    WithLayoutSpacing,
    WithDirection,
    WithActionState {
  title?: string
  description?: string
  errorMessage?: string
  tools?: any[]
  children: any
}
export function FormSection(props: FormSection) {
  const {
    id,
    spacing = 'normal',
    direction = 'vertical',
    title,
    tools,
    description,
    loading = false,
    error = false,
    errorMessage,
    children,
  } = props
  const { gap } = LayoutSpacingStyles[spacing]
  return (
    <div id={id} className={clsx('flex w-full flex-col', gap)}>
      {title && (
        <div
          className={clsx(
            'flex w-full items-center border-b border-dark pb-1',
            {
              'justify-start': !tools,
              'justify-between': tools,
            }
          )}
        >
          <span
            className={clsx(
              'flex items-center justify-start text-xs font-normal',
              LayoutSpacingStyles.extraTight.gap,
              !error ? ' text-deemphasized' : 'text-warning'
            )}
          >
            {error && <AiOutlineExclamationCircle className='text-sm' />}
            <span className='font-medium'>{title.toUpperCase()}</span>
            {loading && (
              <AiOutlineLoading3Quarters className='animate-spin text-sm' />
            )}
            <span className='font-light'>
              {loading ? null : error ? errorMessage ?? '' : description ?? ''}
            </span>
          </span>
          {tools && (
            <span
              className={clsx(
                'flex items-center justify-start',
                LayoutSpacingStyles.extraTight.gap
              )}
            >
              {tools.map((tool, index) => {
                return (
                  <span key={index} className='flex items-center justify-start'>
                    {tool}
                  </span>
                )
              })}
            </span>
          )}
        </div>
      )}
      <div
        className={clsx('flex w-full', gap, {
          'flex-col': direction === 'vertical',
        })}
      >
        {children}
      </div>
    </div>
  )
}

export interface FormFieldProps
  extends WithOptionalId,
    WithFixedHeightItemSize,
    WithDirection {
  fieldId: string
  label?: string
  width?: string
  required?: boolean
  disabled?: boolean
  validate?: FieldValidator | FieldValidator[]
  children: any
}
export function FormField(props: FormFieldProps) {
  const {
    id,
    size = 'md',
    direction = 'vertical',
    fieldId,
    label,
    width = 'w-full',
    required = false,
    disabled = false,
    validate,
    children,
  } = props

  const { vertical } = parseDirection(direction)

  const form = useContext(FormContext)

  const [fieldValue, setFieldValue] = useState(null)
  const [fieldError, setFieldError] = useState<FieldError>(null)

  useEffect(() => {
    let validators: FieldValidator | FieldValidator[] = []
    if (required) {
      validators.push({
        validate: (fieldValue) => {
          if (
            fieldValue === null ||
            fieldValue === undefined ||
            fieldValue === ''
          ) {
            return false
          }
          return true
        },
      })
    }
    if (validate) {
      if (Array.isArray(validate)) {
        validators = [...validators, ...validate]
      } else {
        validators.push(validate)
      }
    }
    if (fieldId) {
      form._registerField(fieldId, setFieldValue, setFieldError, validators)
    }
  }, [])

  const { gap, fontSize } = FixedHeightItemSizeStyles[size]

  return (
    <div
      id={id}
      className={clsx(
        'flex',
        width,
        gap,
        vertical ? 'flex-col' : 'items-center'
      )}
    >
      {label && (
        <div className={clsx('flex', fontSize, fieldError && 'text-error')}>
          {label}
        </div>
      )}
      <div className='flex w-full'>
        {fieldId
          ? cloneElement(children, {
              ...children.props,
              value: fieldValue,
              onChange: (value: any) => {
                setFieldValue(value)
                form._updateFieldValue(fieldId, value)
              },
              width: 'w-full',
              size,
              disabled,
              error:
                typeof fieldError === 'boolean'
                  ? fieldError
                  : !(fieldError === null || fieldError === undefined),
            })
          : children}
      </div>
      {fieldError && typeof fieldError === 'string' && (
        <div className={clsx(fontSize, fieldError && 'text-error')}>{fieldError}</div>
      )}
    </div>
  )
}
