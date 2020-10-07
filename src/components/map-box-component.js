import { html } from "lit-element";
import { BaseView } from "../views/base-view.js";

class MapBoxComponent extends BaseView {
  static get properties() {
    return {
      map: {},
    };
  }

  render() {
    return html` <h2>MAPBOX</h2> `;
  }
}

customElements.define("map-box-component", MapBoxComponent);
