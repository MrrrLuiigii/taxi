import { html } from "lit-element";
import { BaseView } from "./base-view";

class NotFoundView extends BaseView {
  render() {
    return html`
      <h1>
        404 <br /><br />
        Page not found...
      </h1>
    `;
  }
}

customElements.define("not-found-view", NotFoundView);
