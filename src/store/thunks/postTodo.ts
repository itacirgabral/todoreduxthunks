import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface Todo {
  id: string;
  task: string;
  done: boolean;
}

const postTodo = createAsyncThunk('todo/addOne', async ({ task }: { task: string }, thunkAPI) => {

  const response = await axios.post<Todo>('http://localhost:3004/todos', {
    task,
    done: false
  }, {
    signal: thunkAPI.signal
  })

  return response.data
})

export {
  postTodo
}