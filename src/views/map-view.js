import { html } from "lit-element";
import { BaseView } from "./base-view.js";

import "../components/here-maps-component";
import "../components/map-box-component";

const mapType = {
  HEREMAPS: "HereMaps",
  MAPBOX: "MapBox",
};

class MapView extends BaseView {
  static get properties() {
    return {
      mapType: { type: String },
      hereMapsComponent: { type: Object },
      mapBoxComponent: { type: Object },
    };
  }

  constructor() {
    super();
    this.mapType = mapType.MAPBOX;
  }

  firstUpdated() {
    this.hereMapsComponent = this.shadowRoot.getElementById("hereMaps");
    this.mapBoxComponent = this.shadowRoot.getElementById("mapBox");
  }

  toggleMapType() {
    this.mapType === mapType.HEREMAPS
      ? (this.mapType = mapType.MAPBOX)
      : (this.mapType = mapType.HEREMAPS);
  }

  render() {
    return html`
      <div class="container">
        <button class="customButton" @click="${this.toggleMapType}">
          Toggle map type
        </button>
        <div class="mapContainer">
          ${this.mapType === mapType.HEREMAPS
            ? html`<here-maps-component id="hereMaps"></here-maps-component>`
            : html`<map-box-component id="mapBox"></map-box-component>`}
        </div>
      </div>

      <style>
        .customButton {
          border: none;
          height: 2em;
          background-color: var(--shade-color);
          color: var(--base-color);
          border-radius: 5px;
          box-shadow: 1px 1px 2px var(--dark-color);
          margin-right: 1em;
          margin-bottom: 1em;
          outline: none;
          min-width: 5em;
        }

        button:focus {
          outline: none;
        }

        h3 {
          margin-top: 0;
        }

        .formContainer {
          display: flex;
        }

        .flexColumn {
          display: flex;
          flex-direction: column;

          border: 2px solid var(--dark-color);
          border-radius: 10px;
          margin: 2em 0;
          padding: 1em;
          margin-right: 1em;
        }

        .flexRow {
          display: flex;
          justify-content: space-between;
        }

        .form {
          width: 20%;
          background-color: var(--light-color);
        }

        .flexButton {
          margin: 1em 0;
        }
      </style>
    `;
  }
}

customElements.define("map-view", MapView);
