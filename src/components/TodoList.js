import { useContext } from 'react'
import '../css/TodoList.css'
import { TodoListBar } from '../components/TodoListBar'
import { TodoListItem } from '../components/TodoListItem'
import { AppContext } from '../layout/TodoLayout'

export const TodoList = () => {
  const { displayItems } = useContext(AppContext)

  return (
    <div className="todo-list">
      <TodoListBar />
      <div className="todo-list-box">
        {displayItems.map((item) => {
          return <TodoListItem key={item.id} item={item} />
        })}
      </div>
    </div>
  )
}
