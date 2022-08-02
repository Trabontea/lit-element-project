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
    default:
      return state
  }
}

// The reducer function takes in the current state and an action
// and produces a new state based on the action. Here, we provide an INITIAL_STATE
// for when we start the application, and since we do not have any actions yet, we only return the state.
