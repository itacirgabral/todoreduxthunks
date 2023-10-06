import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'

import { todosApi } from './apis/todos'

const store = configureStore({
  reducer: {
    [todosApi.reducerPath]: todosApi.reducer
  },
  middleware (getDefaultMiddleware) {
    return getDefaultMiddleware().concat(todosApi.middleware)
  }
})

setupListeners(store.dispatch)

export {
  store
}

type AppDispatch = typeof store.dispatch
type RootState = ReturnType<typeof store.getState>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export {
  usePostTodoMutation,
  usePatchTodoMutation,
  useFetchTodosQuery,
  useDeleteTodoMutation
} from './apis/todos'