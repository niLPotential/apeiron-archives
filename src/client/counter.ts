import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("my-element")
export class MyElement extends LitElement {
  @property()
  count = 0;

  override render() {
    return html`
      <button @click="${() => this.count++}">${this.count}</button>
    `;
  }
}
