interface ListItemTodoProps {
  id: string;
  task: string;
  done: boolean;
  onDone: (id: string) => void;
  onDestroy: (id: string) => void;
}

export default function ListItemTodo ({ id, task, done, onDestroy, onDone }: ListItemTodoProps) {
  const handleClickDestroy = () => {
    onDestroy(id)
  }
  const handleClickDone = () => {
    onDone(id)
  }
  const textDecoration = done ? 'line-through' : ''
  return <li style={{ textDecoration }}>
    <span>{task}</span>
    <button onClick={handleClickDone} disabled={done}>✔️</button>
    <button onClick={handleClickDestroy}>❌</button>
  </li>
}