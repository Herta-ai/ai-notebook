import { useBoolean } from './use-boolean'

/**
 * Loading
 *
 * @param initValue Init value
 */
export function useLoading(initValue = false) {
  const { bool: loading, setTrue: startLoading, setFalse: endLoading } = useBoolean(initValue)

  return {
    loading,
    startLoading,
    endLoading,
  }
}
