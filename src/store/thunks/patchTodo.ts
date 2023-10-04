import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface Todo {
  id: string;
  task: string;
  done: boolean;
}

const patchTodo = createAsyncThunk('todo/doneOne', async ({ id }: { id: string }, thunkAPI) => {
  const response = await axios.patch<Todo>(`http://localhost:3004/todos/${id}`, {
    done: true
  }, {
    signal: thunkAPI.signal
  })

  return response.data
})

export {
  patchTodo
}