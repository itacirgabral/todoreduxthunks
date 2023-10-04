import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface Todo {
  id: string;
  task: string;
  done: boolean;
}

const fetchTodos = createAsyncThunk('todos/loadAll', async (_args, thunkAPI) => {

  const response = await axios.get<Array<Todo>>('http://localhost:3004/todos', {
    signal: thunkAPI.signal
  })

  return response.data
})

export {
  fetchTodos
}