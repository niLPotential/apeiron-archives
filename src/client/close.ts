import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { query } from "lit/decorators/query.js";

@customElement("close-modal")
export class CloseModal extends LitElement {
  @query("#zoom")
  // @ts-ignore query
  _zoom;

  override render() {
    return html`
      <div id="zoom">
        <button @click="${() => this._zoom.remove()}">Close</button>
      </div>
    `;
  }
}
