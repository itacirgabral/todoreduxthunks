import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Todo {
  id: string;
  task: string;
  done: boolean;
}

interface TodoTag {
  type: 'TodoTag',
  id: string
}


const todosApi = createApi({
  reducerPath: 'todos',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3004'
  }),
  tagTypes: ['TodoTag'],
  endpoints (builder) {
    return {
      fetchTodos: builder.query<Array<Todo>, void>({
        query: () => {
          return {
            url: '/todos',
            method: 'GET'
          }
        },
        providesTags (result, error, args) {
          const tagList: TodoTag = { type: 'TodoTag', id: 'LIST'}
          const resultTags: Array<TodoTag> = result ?
            result.map(el => ({ type: 'TodoTag', id: el.id})) :
            []

          return [tagList, ...resultTags]
        }
      }),
      postTodo: builder.mutation<Todo, { task: string }>({
        query: ({ task }) => {
          return {
            url: '/todos',
            method: 'POST',
            body: {
              task,
              done: false
            }
          }
        },
        invalidatesTags (result, error, args) {
          const tagList: TodoTag = { type: 'TodoTag', id: 'LIST'}
          return [tagList]
        }
      }),
      patchTodo: builder.mutation<Todo, { id: string}>({
        query: ({ id }) => {
          return {
            url: `/todos/${id}`,
            method: 'PATCH',
            body: {
              done: true
            }
          }
        },
        invalidatesTags (result, error, args) {
          const tagList: TodoTag = { type: 'TodoTag', id: args.id}
          return [tagList]
        }
      }),
      deleteTodo: builder.mutation<{}, { id: string}>({
        query: ({ id }) => {
          return {
            url: `/todos/${id}`,
            method: 'DELETE',
          }
        },
        invalidatesTags (result, error, args) {
          const tagList: TodoTag = { type: 'TodoTag', id: args.id}
          return [tagList]
        }
      }),
    }
  }
})

export const {
  usePostTodoMutation,
  usePatchTodoMutation,
  useFetchTodosQuery,
  useDeleteTodoMutation
} = todosApi

export {
  todosApi
}