import { useState } from "react"

export const shadowReactive = <T extends {}>(state: T): T => {
  const [stale, setStale] = useState(state)

  const _stateStore = {}

  Object.keys(stale).forEach(propertyKey => {
    Object.defineProperty(_stateStore, propertyKey, {
      get() {
        return stale[propertyKey]
      },
      set(newValue) {
        setStale(prev => ({ ...prev, [propertyKey]: newValue }))
      }
    })
  })

  return _stateStore as T
}
