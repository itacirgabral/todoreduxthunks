import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import { todosReducer } from './slices/todosSlice'
import { fetchTodos } from './thunks/fetchTodos'
import { postTodo } from './thunks/postTodo'
import { patchTodo } from './thunks/patchTodo'
import { deleteTodo } from './thunks/deleteTodo'

const store = configureStore({
  reducer: {
    todos: todosReducer,
  }
})

export {
  store
}

type AppDispatch = typeof store.dispatch
type RootState = ReturnType<typeof store.getState>

export { fetchTodos, postTodo, patchTodo, deleteTodo }

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector