import { useState, createRef } from 'react';
import { useWatch } from './useWatch';

export const useMultipleRef = <T = undefined>(length: number = 0) => {
  const [refs, setRefs] = useState<React.RefObject<T>[]>(() => [...Array(length)].map(() => createRef<T>()))

  useWatch(length, newLength => {
    setRefs(oldRefs => [...Array(newLength)].map((_, i) => oldRefs[i] || createRef<T>()))
  })

  return refs
};
