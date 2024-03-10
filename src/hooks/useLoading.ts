import { useCallback, useEffect, useState } from 'react'
import { wait } from '../shared/helpers'

export interface UseLoadingProps {
  loader: (args?: any)=>any
  initialLoad?: boolean
  initialValue?: any
  errorMessage?: string
  dependency?: any[]
  emitSuccess?: boolean
  successResetDelay?: number
}

export default function useLoading(props: UseLoadingProps) {
  const {
    loader,
    initialLoad = false,
    initialValue = null,
    errorMessage = null,
    dependency = [],
    emitSuccess = false,
    successResetDelay = 600,
  } = props

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const [value, setValue] = useState(initialValue)

  const resetError = useCallback(() => {
    setError(false)
  }, [])

  const run = useCallback(async (args?: any) => {
    try {
      setLoading(true)
      setError(false)
      setValue(await loader(args))
      setLoading(false)
      if (emitSuccess) {
        setSuccess(true)
        await wait(successResetDelay)
        setSuccess(false)
      }
    } catch (error: any) {
      console.log(error)
      setLoading(false)
      setError(true)
    }
  }, dependency)

  useEffect(() => {
    if (initialLoad) {
      run(null)
    }
  }, [])

  return { result: value, loading, success, error, errorMessage, run, resetError }
}
