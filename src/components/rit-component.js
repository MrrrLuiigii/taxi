import { html } from "lit-element";
import { BaseView } from "./base-view.js";

class RitComponent extends BaseView {
  static get properties() {
    return {
      rit: {
        id: { type: Number },
        datumTijd,
        van,
        naar,
        afstand,
        duur,
        complete: { type: Boolean },
      },
    };
  }

  stateChanged(state) {}

  render() {
    return html`
      <div class="rit-container">
        <slot name="ritInfo"></slot>
        <slot name="boekenKnop"></slot>
      </div>

      <style>
        .rit-container {
          background-color: var(--light-background);
          width: 20em;
          height: 20em;
        }
      </style>
    `;
  }
}

customElements.define("rit-component", RitComponent);
