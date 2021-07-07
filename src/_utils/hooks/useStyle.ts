import { CSSProperties, useCallback, useMemo } from 'react';

export const useStyle = <TR extends React.RefObject<HTMLElement>, TV = any>(ref: TR, initial: TV, computed: (value: TV) => CSSProperties, deps?: any): [TV, CSSProperties, () => void] => {
  const value = useMemo(() => (initial), [initial])
  const defaultStyle = useMemo(() => computed(value), [value])

  const updateStyle = useCallback(() => {
    const newStyle = computed(value)
    for (const key in newStyle) {
     (ref.current.style as any)[key] = newStyle[key]
    }
  }, [ref, value, ...deps])

  return [
    value,
    defaultStyle,
    updateStyle,
  ]
};
