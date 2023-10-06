import { useDeleteTodoMutation, useFetchTodosQuery, usePatchTodoMutation, usePostTodoMutation } from './store/index'

import CreateTodo from './components/CreateTodo'
import ListItemTodo from './components/ListItemTodo'

export default function App() {
  const { data } = useFetchTodosQuery()
  const [postTodo, resultPostTodo] = usePostTodoMutation()
  const [doneTodo, resultDoneTodo] = usePatchTodoMutation()
  const [delTodo, resultDelTodo] = useDeleteTodoMutation()

  const handleOnAdd = (task: string) => {
    postTodo({ task })
  }
  const handleOnDone = (id: string) => {
    doneTodo({ id })
  }
  const handleOnDestroy = (id: string) => {
    delTodo({ id })
  }
  return <>
    <CreateTodo
      onAdd={handleOnAdd}
    />
    {
      data && data.length > 0 ?
      <ul>
        {
          data.map(el => <ListItemTodo key={el.id} {...el} onDone={handleOnDone} onDestroy={handleOnDestroy}/>)
        }
      </ul> :
      null
    }
  </>
}
