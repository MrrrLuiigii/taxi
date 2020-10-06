import { html } from "lit-element";
import { BaseView } from "./base-view.js";

import hereMapComponent from "../components/here-maps-components";

const mapType = {
  HEREMAPS: "HereMaps",
  MAPBOX: "MapBox",
};

class MapView extends BaseView {
  static get properties() {
    return {
      mapType: { type: String },
    };
  }

  constructor() {
    super();
    this.mapType = mapType.HEREMAPS;
  }

  // firstUpdated() {
  //   if (this.mapType == "HERE") {
  //     loadHEREMap;
  //   }
  // }

  toggleMapType() {
    this.mapType === mapType.HEREMAPS
      ? (this.mapType = mapType.MAPBOX)
      : (this.mapType = mapType.HEREMAPS);
  }

  render() {
    return html`
      <div class="container">
        <button @click="${this.toggleMapType}">${this.mapType}</button>
        <div class="mapContainer">
          ${this.mapType === mapType.HEREMAPS
            ? html`<here-maps-component></here-maps-component>`
            : html`<div>MAPBOX component not implemented yet.</div>`}
        </div>
      </div>

      <style>
        button {
          border: none;
          height: 2em;
          background-color: var(--shade-color);
          color: var(--base-color);
          border-radius: 5px;
          box-shadow: 1px 1px 2px var(--dark-color);
          margin-right: 1em;
          margin-bottom: 1em;
          outline: none;
        }

        button:focus {
          outline: none;
        }
      </style>
    `;
  }
}

customElements.define("map-view", MapView);
