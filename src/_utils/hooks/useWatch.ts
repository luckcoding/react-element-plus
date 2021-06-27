import { useEffect, useMemo } from "react"

type WatchCallback<T> = (val: T, oldVal: T | undefined) => void
type WatchConfig = {
  immediate?: boolean
}

/**
 * useWatch
 * @param value any
 * @param callback (val: any, oldValue: any) => void
 * @param config { immediate: Boolean }
 * @returns stopWatch Function
 *
 * Example:
 * useWatch(props.title, (val, oldVal) => {
 *  console.log(val, oldVal)
 * }, {
 *  immediate: true
 * })
 */
export const useWatch = <T>(value: T, callback: WatchCallback<T>, config: WatchConfig = {}) => {
  const { immediate = false } = config
  const store = useMemo<{ oldVal?: T; inited?: boolean; watch?: boolean }>(() => ({ watch: true }), [])

  const handleChanged = (newValue: T) => {
    if (!store.watch) {
      return
    }
    if (store.inited) {
      callback(newValue, store.oldVal)
    } else {
      store.inited = true
      immediate && callback(newValue, newValue)
    }
    store.oldVal = newValue;
  }

  useEffect(() => {
    handleChanged(value)
  }, [value])

  const stopWatch = () => store.watch = false

  return stopWatch
}
