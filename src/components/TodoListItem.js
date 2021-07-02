import { useState, useContext } from 'react'
import { ButtonAction } from '../constants/ButtonAction'
import { ItemStatus } from '../constants/ItemStatus'

import '../css/TodoListItem.css'

import { AppContext } from '../layout/TodoLayout'

export const TodoListItem = (props) => {
  const [isHover, setIsHover] = useState(false)
  const { todoItemsDispatch } = useContext(AppContext)
  const { id, name, status, doneAt } = props.item

  const handleMouseEvent = (event) => {
    switch (event.type) {
      case 'mouseenter':
        setIsHover(true)
        break
      case 'mouseleave':
        setIsHover(false)
        break
      default:
        setIsHover(false)
        break
    }
  }
  const handleButtonClick = (actionType, id) => {
    todoItemsDispatch({ type: actionType, payload: { id } })
  }

  return (
    <div
      className={`todo-list-item ${isHover && 'todo-list-item-hover'}`}
      onMouseEnter={(e) => handleMouseEvent(e)}
      onMouseLeave={(e) => handleMouseEvent(e)}
    >
      <div className={`${status === ItemStatus.DONE && 'todo-list-item-done'}`}>
        {name}
      </div>
      {isHover && status !== ItemStatus.DONE && (
        <div className="todo-list-action">
          <button
            type="button"
            onClick={() => {
              handleButtonClick(ButtonAction.CLICK_DONE, id)
            }}
          >
            Mark as done
          </button>
          <button
            type="button"
            onClick={() => {
              handleButtonClick(ButtonAction.CLICK_DELETE, id)
            }}
          >
            Delete
          </button>
        </div>
      )}
      {status === ItemStatus.DONE && (
        <div className="todo-list-done-time">{`完成時間: ${doneAt}`}</div>
      )}
    </div>
  )
}
