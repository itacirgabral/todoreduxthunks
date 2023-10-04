
import { PayloadAction, nanoid } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { fetchTodos } from '../thunks/fetchTodos'
import { postTodo } from '../thunks/postTodo'
import { patchTodo } from '../thunks/patchTodo'
import { deleteTodo } from '../thunks/deleteTodo'

interface Todo {
  id: string;
  task: string;
  done: boolean;
}

interface InitialState {
  list: Array<Todo>
}

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    list: []
  } as InitialState,
  reducers: {
    addOne (state, action: PayloadAction<{ task: string }>) {
      const id = nanoid()
      const task = action.payload.task
      const done = false
      state.list.push({
        id,
        task,
        done
      })
    },
    doneOne (state, action: PayloadAction<{ id: string }>) {
      const todo = state.list.find(el => el.id === action.payload.id)
      if (todo != null) {
        todo.done = true
      }
    },
    deleteOne (state, action: PayloadAction<{ id: string }>) {
      const idx = state.list.findIndex(el => el.id === action.payload.id)
      state.list.splice(idx, 1)
    }
  },
  extraReducers (builder) {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.list = action.payload
    })
    // fetchTodos.pending
    // fetchTodos.rejected
    builder.addCase(postTodo.fulfilled, (state, action) => {
      state.list.push(action.payload)
    })
    builder.addCase(patchTodo.fulfilled, (state, action) => {
      const todo = state.list.find(el => el.id === action.payload.id)
      if (todo != null) {
        todo.done = true
      }
    })
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      const idx = state.list.findIndex(el => el.id === action.payload.id)
      state.list.splice(idx, 1)
    })
  }
})

export const { addOne, doneOne, deleteOne } = todosSlice.actions

export const todosReducer = todosSlice.reducer