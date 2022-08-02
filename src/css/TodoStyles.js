import { css } from 'lit'
export const TodoStyles = css`
  :host {
    display: block;
    max-width: 800px;
    margin: 0 auto;
  }
  .input-layout {
    width: 100%;
    display: flex;
  }
  .input-layout vaadin-text-field {
    flex: 1;
    margin-right: var(--spacing);
  }
  .todos-list {
    margin-top: var(--spacing);
  }
  .visibility-filters {
    margin-top: calc(4 * var(--spacing));
  }
`
