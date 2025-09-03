import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("close-modal")
export class CloseModal extends LitElement {
  override render() {
    return html`
      <div>
        <button @click="${() => this.remove()}">Close</button>
      </div>
    `;
  }
}
