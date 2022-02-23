// 自定义hooks

import { RootState } from '@/types/store'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export function useInitalState<T extends keyof RootState>(
  action: () => void,
  stateName: T
) {
  const dispatch = useDispatch()

  const actionRef = useRef(action)
  actionRef.current = action

  const initState = useSelector((state: RootState) => state[stateName])
  useEffect(() => {
    dispatch(actionRef.current())
  }, [dispatch])

  return initState
}
