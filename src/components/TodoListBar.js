/* eslint-disable react-hooks/exhaustive-deps */

import { useContext } from 'react'

import '../css/TodoListBar.css'
import { AppContext } from '../layout/TodoLayout'

export const TodoListBar = () => {
  const { showDone, showDoneDispatch, displayItems } = useContext(AppContext)

  const handleOnChange = () => {
    showDoneDispatch({
      type: 'CHANGE_CHECK_BOX',
      payload: { showDone: !showDone },
    })
  }

  return (
    <div className="todo-list-bar">
      <p>{displayItems.length} item(s)</p>

      <label>
        <input
          type="checkbox"
          value={showDone}
          checked={showDone}
          onChange={handleOnChange}
        />
        Show done items
      </label>
    </div>
  )
}
