import { html } from 'lit-element'
import { connect } from 'pwa-helpers'
import { store } from '../redux/store.js'
import { statsSelector } from '../redux/reducer.js'
import '@vaadin/vaadin-charts'
import { BaseView } from './base-view.js'

//Connect the view to the Redux store
// Define a property for the chart configuration. We want the view to get updated any time it changes.
class StatsView extends connect(store)(BaseView) {
  static get properties() {
    return {
      chartConfig: { type: Object },
    }
  }
  // Construct a config object for Vaadin Charts based on the stats selector
  stateChanged(state) {
    const stats = statsSelector(state)
    this.chartConfig = [
      { name: 'Completed', y: stats.completed },
      { name: 'Active', y: stats.active },
    ]

    //Track if there are any todos to show the chart conditionally.
    this.hasTodos = state.todos.length > 0
    4
  }

  render() {
    return html`
      <style>
        stats-view {
          display: block;
        }
      </style>

      ${this.getChart()}
    `
  }

  getChart() {
    if (this.hasTodos) {
      return html`
        <vaadin-chart type="pie">
          <vaadin-chart-series
            .values="${this.chartConfig}"
          ></vaadin-chart-series>
        </vaadin-chart>
      `
    } else {
      return html` <p>Nothing to do! 🌴🍻☀️</p> `
    }
  }
}

customElements.define('stats-view', StatsView)
