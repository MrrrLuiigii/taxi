import { html } from "lit-element";
import { BaseView } from "./base-view.js";

import "../components/here-maps-component";
import "../components/map-box-component";

const mapType = {
  HEREMAPS: "HereMaps",
  MAPBOX: "MapBox",
};

export const method = {
  getCurrentLocation: "getCurrentLocation",
  searchAddress: "searchAddress",
  clearMap: "clearMap",
  planRoute: "planRoute",
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

  toggleMapType() {
    this.mapType === mapType.HEREMAPS
      ? (this.mapType = mapType.MAPBOX)
      : (this.mapType = mapType.HEREMAPS);
  }

  triggerChild(method) {
    console.log(this.shadowRoot);
    const hereMapsComponent = this.shadowRoot.getElementById("cld");
    hereMapsComponent.getCurrentLocation();
    // this.dispatchEvent(
    //   new CustomEvent(`${this.mapType}:ActionEvent`, {
    //     detail: {
    //       method,
    //     },
    //   })
    // );
  }

  render() {
    return html`
      <div class="container">
        <button @click="${this.toggleMapType}">Toggle map type</button>
        <div class="mapContainer">
          <div class="formContainer">
            <div class="flexColumn form">
              <h3>Search address</h3>

              <input id="addressSearch" />
              <div class="flexRow">
                <button
                  class="flexButton"
                  @click="${() => this.triggerChild(method.getCurrentLocation)}"
                >
                  Find current location
                </button>
                <button
                  class="flexButton"
                  @click="${() => this.triggerChild(method.searchAddress)}"
                >
                  Search
                </button>
              </div>
            </div>

            <div class="flexColumn form">
              <h3>Plan route</h3>
              <label>From:</label> <input id="addressFrom" /> <label>To:</label>
              <input id="addressTo" />
              <div class="flexRow">
                <button
                  class="flexButton"
                  @click="${() => this.triggerChild(method.clearMap)}"
                >
                  Clear
                </button>
                <button
                  class="flexButton"
                  @click="${() => this.triggerChild(method.planRoute)}"
                >
                  Plan
                </button>
              </div>
            </div>
          </div>
          ${this.mapType === mapType.HEREMAPS
            ? html`<here-maps-component></here-maps-component>`
            : html`<map-box-component></map-box-component>`}
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
