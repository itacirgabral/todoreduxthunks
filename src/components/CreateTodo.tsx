import { useState } from "react"

interface CreateTodoProps {
  onAdd: (task: string) => void
}

export default function CreateTodo ({ onAdd }: CreateTodoProps) {
  const [inputValue, setInputValue] = useState('')

  const empty = inputValue.length === 0

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValue(value)
  }

  const handleClick = () => {
    if (!empty) {
      const task = inputValue
      setInputValue('')
      onAdd(task)
    }
  }

  return <div>
    <p>TODO: <input type="text" onChange={handleChange} value={inputValue}></input> <button onClick={handleClick} disabled={empty}>➕</button></p>
  </div>
}