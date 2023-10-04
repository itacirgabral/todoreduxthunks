import { useAppSelector, useAppDispatch, fetchTodos, postTodo, patchTodo, deleteTodo } from './store/index'

import CreateTodo from './components/CreateTodo'
import ListItemTodo from './components/ListItemTodo'
import { useEffect } from 'react'

export default function App() {
  const todos = useAppSelector(state => state.todos.list)
  const dispatch = useAppDispatch()

  const handleOnAdd = (task: string) => {
    dispatch(postTodo({ task }))
  }
  const handleOnDone = (id: string) => {
    dispatch(patchTodo({ id }))
  }
  const handleOnDestroy = (id: string) => {
    dispatch(deleteTodo({ id }))
  }

  useEffect(() => {
    const promise = dispatch(fetchTodos())

    return () => promise.abort()
  }, [])

  return <>
    <CreateTodo
      onAdd={handleOnAdd}
    />
    {
      todos.length > 0 ?
      <ul>
        {
          todos.map(el => <ListItemTodo key={el.id} {...el} onDone={handleOnDone} onDestroy={handleOnDestroy}/>)
        }
      </ul> :
      null
    }
  </>
}
