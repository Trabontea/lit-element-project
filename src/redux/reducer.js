import {
  ADD_TODO,
  UPDATE_FILTER,
  UPDATE_TODO_STATUS,
  CLEAR_COMPLETED,
} from './actions.js'

import { createSelector } from 'reselect'

//Move the VisibilityFilters from src/views/todo-view.js to reducer.js.
// Remember to import it in todo-view so the code doesn’t break.
export const VisibilityFilters = {
  SHOW_ALL: 'All',
  SHOW_ACTIVE: 'Active',
  SHOW_COMPLETED: 'Completed',
}

const INITIAL_STATE = {
  todos: [],
  filter: VisibilityFilters.SHOW_ALL,
}

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.todo],
      }
    case UPDATE_TODO_STATUS:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          // The only change to the logic is that we identify the todo now based on its id property.
          todo.id === action.todo.id
            ? { ...action.todo, complete: action.complete }
            : todo
        ),
      }
    case UPDATE_FILTER:
      return {
        ...state,
        filter: action.filter,
      }
    case CLEAR_COMPLETED:
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.complete),
      }
    default:
      return state
  }
}

// The reducer function takes in the current state and an action
// and produces a new state based on the action. Here, we provide an INITIAL_STATE
// for when we start the application, and since we do not have any actions yet, we only return the state.

// Selectors
// Define functions that return the parts of the state that are relevant.
const getTodosSelector = (state) => state.todos
const getFilterSelector = (state) => state.filter

// Tell reselect that these functions should be observed for changes.
export const getVisibleTodosSelector = createSelector(
  getTodosSelector,
  getFilterSelector,
  // Define the output based on the state values.
  (todos, filter) => {
    switch (filter) {
      case VisibilityFilters.SHOW_COMPLETED:
        return todos.filter((todo) => todo.complete)
      case VisibilityFilters.SHOW_ACTIVE:
        return todos.filter((todo) => !todo.complete)
      default:
        return todos
    }
  }
)

export const statsSelector = createSelector(getTodosSelector, (todos) => {
  const completed = todos.filter((todo) => todo.complete).length
  return {
    completed,
    active: todos.length - completed,
  }
})
