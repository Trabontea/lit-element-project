import { LitElement, html, css } from 'lit'
import '@vaadin/vaadin-text-field'
import '@vaadin/vaadin-button'
import '@vaadin/vaadin-checkbox'
import '@vaadin/vaadin-radio-button/vaadin-radio-button'
import '@vaadin/vaadin-radio-button/vaadin-radio-group'
import { VisibilityFilters } from '../redux/reducer.js'
import { connect } from 'pwa-helpers'
import { store } from '../redux/store.js'
import { TodoStyles } from '../css/TodoStyles.js'

// Connect the component to the Redux store
export class TodoView extends connect(store)(LitElement) {
  //static get properties() {return{}}
  static properties = {
    todos: { type: Array },
    filter: { type: String },
    task: { type: String },
  }

  static styles = TodoStyles

  //Our state now comes from Redux, remove the constructor.
  // constructor() {
  //   super()
  //   this.todos = []
  //   this.filter = VisibilityFilters.SHOW_ALL
  //   this.task = ''
  // }

  stateChanged(state) {
    this.todos = state.todos
    this.filter = state.filter
  }

  render() {
    return html`
      <div class="input-layout" @keyup="${this.shortcutListener}">
        <vaadin-text-field
          placeholder="Task"
          value="${this.task}"
          @change="${this.updateTask}"
        >
        </vaadin-text-field>
        <vaadin-button theme="primary" @click="${this.addTodo}">
          Add Todo
        </vaadin-button>
      </div>

      <div class="todos-list">
        <!-- Use the .map() operation to map each todo object to a lit-html template -->
        ${this.applyFilter(this.todos).map(
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
      this.todos = [
        ...this.todos,
        {
          task: this.task,
          complete: false,
        },
      ]
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
    this.todos = this.todos.map((todo) =>
      updatedTodo === todo ? { ...updatedTodo, complete } : todo
    )
  }

  // Update the filter property based on the event value
  filterChanged(e) {
    this.filter = e.target.value
  }

  // Update the todos property to a new array only containing the non-completed todos.
  clearCompleted() {
    this.todos = this.todos.filter((todo) => !todo.complete)
  }

  // Create a method that returns only the todos that pass the filter criteria.
  applyFilter(todos) {
    switch (this.filter) {
      case VisibilityFilters.SHOW_ACTIVE:
        return todos.filter((todo) => !todo.complete)
      case VisibilityFilters.SHOW_COMPLETED:
        return todos.filter((todo) => todo.complete)
      default:
        return todos
    }
  }
}

customElements.define('todo-view', TodoView)
