import { useState, useContext } from 'react'
import { ButtonAction } from '../constants/ButtonAction'

import '../css/TodoInput.css'
import { AppContext } from '../layout/TodoLayout'

export const TodoInput = () => {
  const { todoItemsDispatch } = useContext(AppContext)
  const [inputText, setInputText] = useState('')

  const handleInputChange = (event) => {
    setInputText(event.target.value)
  }
  const handleKeyUp = (actionType, event) => {
    if (event.keyCode === 13 && inputText) {
      todoItemsDispatch({
        type: actionType,
        payload: { name: inputText },
      })
      setInputText('')
    }
  }
  const handleButtonClick = (actionType) => {
    if (inputText) {
      todoItemsDispatch({
        type: actionType,
        payload: { name: inputText },
      })
      setInputText('')
    }
  }

  return (
    <div className="todo-input-box">
      <input
        type="text"
        value={inputText}
        placeholder="Add your task here..."
        onChange={handleInputChange}
        onKeyUp={(e) => handleKeyUp(ButtonAction.CLICK_ADD, e)}
      />
      <button
        type="button"
        onClick={() => handleButtonClick(ButtonAction.CLICK_ADD)}
      >
        Add
      </button>
    </div>
  )
}
