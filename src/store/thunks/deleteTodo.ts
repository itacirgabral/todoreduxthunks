import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const deleteTodo = createAsyncThunk('todo/deleteOne', async ({ id }: { id: string }, thunkAPI) => {
  await axios.delete(`http://localhost:3004/todos/${id}`, {
    signal: thunkAPI.signal
  })

  return { id }
})

export {
  deleteTodo
}