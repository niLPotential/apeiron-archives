import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("my-counter")
export class MyCounter extends LitElement {
  @property({ type: Number })
  // @ts-ignore property
  count;

  override render() {
    return html`
      <button @click="${() => this.count++}">${this.count}</button>
    `;
  }
}
