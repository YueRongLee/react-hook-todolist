/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useReducer } from 'react'
import uuid from 'uuid'

import '../css/TodoLayout.css'
// constants
import { ItemStatus } from '../constants/ItemStatus'
// components
import { TodoTitle } from '../components/TodoTitle'
import { TodoInput } from '../components/TodoInput'
import { TodoList } from '../components/TodoList'
import { ButtonAction } from '../constants/ButtonAction'

// 由根元件來儲存主要邏輯數據 useReducer + useContext
export const AppContext = React.createContext()

export const TodoLayout = () => {
  const initialTodoItems = []

  // todoItem reducer 處理函數
  const todoItemReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
      case ButtonAction.CLICK_ADD:
        return [
          ...state,
          {
            id: uuid.v4(),
            name: action.payload.name,
            status: ItemStatus.UNDONE,
          },
        ]
      case ButtonAction.CLICK_DONE:
        return state.map((item) => {
          if (item.id === payload.id) {
            return {
              ...item,
              status: ItemStatus.DONE,
              doneAt: new Date().toLocaleString([], { hour12: false }),
            }
          } else {
            return item
          }
        })
      case ButtonAction.CLICK_DELETE:
        return state.filter((item) => {
          return item.id !== payload.id
        })
      default:
        return state
    }
  }

  // 是否只顯示 done 的數據，會影響邏輯之變數處理函數
  const showDoneReducer = (state, action) => {
    return action.payload.showDone
  }

  const [todoItems, todoItemsDispatch] = useReducer(
    todoItemReducer,
    initialTodoItems
  )

  const [showDone, showDoneDispatch] = useReducer(showDoneReducer, false)

  // 用來顯示於 list 的數據
  const getDisplayItems = (showDone) => {
    if (showDone) {
      return todoItems.filter((todoItem) => {
        return todoItem.status === ItemStatus.DONE
      })
    }
    return todoItems
  }

  // 用來顯示於 list 的數據，受到 todoItem 和 showDone 的影響
  const displayItems = useMemo(
    () => getDisplayItems(showDone),
    [showDone, todoItems]
  )

  return (
    <AppContext.Provider
      value={{ displayItems, todoItemsDispatch, showDone, showDoneDispatch }}
    >
      <div className="todo-layout">
        <TodoTitle />
        <TodoInput />
        <TodoList />
      </div>
    </AppContext.Provider>
  )
}
