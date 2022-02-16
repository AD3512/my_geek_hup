// 自定义hooks

import { RootState } from '@/types/store'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export function useInitalState<T extends keyof RootState>(
  action: () => void,
  stateName: T
) {
  const dispatch = useDispatch()

  const initState = useSelector((state: RootState) => state[stateName])
  useEffect(() => {
    dispatch(action())
  }, [dispatch, action])

  return initState
}
