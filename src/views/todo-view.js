import { html } from 'lit-element'
import '@vaadin/vaadin-text-field'
import '@vaadin/vaadin-button'
import '@vaadin/vaadin-checkbox'
import '@vaadin/vaadin-radio-button/vaadin-radio-button'
import '@vaadin/vaadin-radio-button/vaadin-radio-group'
import { connect } from 'pwa-helpers'
import { store } from '../redux/store.js'
import { TodoStyles } from '../css/TodoStyles.js'
import { VisibilityFilters, getVisibleTodosSelector } from '../redux/reducer.js'

import {
  addTodo,
  updateTodoStatus,
  updateFilter,
  clearCompleted,
} from '../redux/actions.js'
import { BaseView } from './base-view.js'

// Connect the component to the Redux store
export class TodoView extends connect(store)(BaseView) {
  //static get properties() {return{}}
  static properties = {
    todos: { type: Array },
    filter: { type: String },
    task: { type: String },
  }

  // style
  static styles = TodoStyles

  stateChanged(state) {
    this.todos = getVisibleTodosSelector(state)
    this.filter = state.filter
  }

  render() {
    return html`
      <div class="input-layout" @keyup="${this.shortcutListener}">
        <vaadin-text-field
          placeholder="Task"
          value="${this.task || ''}"
          @change="${this.updateTask}"
        >
        </vaadin-text-field>
        <vaadin-button theme="primary" @click="${this.addTodo}">
          Add Todo
        </vaadin-button>
      </div>

      <div class="todos-list">
        <!-- Use the .map() operation to map each todo object to a lit-html template -->
        ${this.todos.map(
          (todo) => html`
            <div class="todo-item">
              <vaadin-checkbox
                ?checked="${todo.complete}"
                @change="${(e) =>
                  this.updateTodoStatus(todo, e.target.checked)}"
              >
                ${todo.task}
              </vaadin-checkbox>
            </div>
          `
        )}
      </div>
      <!-- Bind the value to the filter property and the value-changed event to the this.filterChanged method -->
      <vaadin-radio-group
        class="visibility-filters"
        value="${this.filter}"
        @value-changed="${this.filterChanged}"
      >
        <!-- Loop over the filter values and create a radio button for each -->
        ${Object.values(VisibilityFilters).map(
          (filter) => html` <vaadin-radio-button value="${filter}">
            ${filter}
          </vaadin-radio-button>`
        )}
      </vaadin-radio-group>
      <!-- Hook up the clear button click event to this.clearCopleted -->
      <vaadin-button @click="${this.clearCompleted}">
        Clear completed
      </vaadin-button>
    `
  }

  addTodo() {
    if (this.task) {
      store.dispatch(addTodo(this.task))
      // Clear the task property
      this.task = ''
    }
  }

  // If the keyup event originates from the Enter key, call this.addTodo()
  shortcutListener(e) {
    if (e.key === 'Enter') {
      this.addTodo()
    }
  }

  // Update the task property to the value of the text field on change events
  updateTask(e) {
    console.log('e.target.value::', e.target.value)
    this.task = e.target.value
  }

  updateTodoStatus(updatedTodo, complete) {
    store.dispatch(updateTodoStatus(updatedTodo, complete))
  }

  // Update the filter property based on the event value
  filterChanged(e) {
    store.dispatch(updateFilter(e.detail.value))
  }

  // Update the todos property to a new array only containing the non-completed todos.
  clearCompleted() {
    store.dispatch(clearCompleted())
  }
}

customElements.define('todo-view', TodoView)
