import { nanoid } from 'nanoid'

// Define constants for the action types to avoid typos when we handle these in the reducer.
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO_STATUS = 'UPDATE_TODO_STATUS'
export const UPDATE_FILTER = 'UPDATE_FILTER'
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED'

// Action creators are functions that create the action object.
// They can be used to instantiate objects and to ensure that
// everyone dispatches the action in the same way.
//Create a todo object based on the task. Create a unique id and set the complete property to false.
export const addTodo = (task) => {
  return {
    type: ADD_TODO,
    todo: {
      id: nanoid(),
      task,
      complete: false,
    },
  }
}

export const updateTodoStatus = (todo, complete) => {
  return {
    type: UPDATE_TODO_STATUS,
    todo,
    complete,
  }
}

export const updateFilter = (filter) => {
  return {
    type: UPDATE_FILTER,
    filter,
  }
}

export const clearCompleted = () => {
  return {
    type: CLEAR_COMPLETED,
  }
}
