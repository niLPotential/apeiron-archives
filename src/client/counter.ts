import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("my-counter")
export class MyCounter extends LitElement {
  @property()
  count = 0;

  override render() {
    return html`
      <button @click="${() => this.count++}">${this.count}</button>
    `;
  }
}
