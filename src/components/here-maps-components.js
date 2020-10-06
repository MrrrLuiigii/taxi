import { html } from "lit-element";
import { BaseView } from "../views/base-view.js";

class HereMapsComponent extends BaseView {
  static get properties() {
    return {
      rit: {
        id: { type: Number },
        datumTijd: Date.now(),
        van: "",
        naar: "",
        afstand: 0,
        duur: 0,
        complete: { type: Boolean },
      },
    };
  }

  stateChanged(state) {}

  firstUpdated() {
    this.loadHEREMap();
  }

  loadHEREMap() {
    var platform = new H.service.Platform({
      apikey: "rssyciJ52WL1ns1uK3VI18VBFtqL-uAQl6G2oFp7YdA",
      // apikey: process.env.HERE_MAPS_API_KEY,
    });

    var defaultLayers = platform.createDefaultLayers();

    this.map = new H.Map(
      document.getElementById("mapContainer"),
      defaultLayers.vector.normal.map,
      {
        zoom: 10,
        center: { lat: 51.477491, lng: 5.704076 },
        pixelRatio: window.devicePixelRatio || 1,
      }
    );

    window.addEventListener("resize", () => this.map.getViewPort().resize());

    var behavior = new H.mapevents.Behavior(
      new H.mapevents.MapEvents(this.map)
    );

    var ui = H.ui.UI.createDefault(this.map, defaultLayers);
  }

  moveMapToBerlin() {
    this.map.setCenter({ lat: 52.5159, lng: 13.3777 });
  }

  moveMapToHome() {
    this.map.setCenter({ lat: 51.477491, lng: 5.704076 });
  }

  addMarker() {
    var homeMarker = new H.map.Marker({ lat: 51.477491, lng: 5.704076 });
    this.map.addObject(homeMarker);
  }

  taxiNeeded() {
    var marker = document.getElementById("locationMarker");
    var domIcon = new H.map.DomIcon(marker);
    var locationMarker = new H.map.DomMarker(
      { lat: 51.477491, lng: 5.704076 },
      { icon: domIcon }
    );

    this.map.addObject(locationMarker);
  }

  render() {
    return html`
      <button @click="${this.addMarker}">ADD MARKER</button>
      <button @click="${this.moveMapToBerlin}">MOVE TO BERLIN</button>
      <button @click="${this.moveMapToHome}">MOVE TO HOME</button>
      <button @click="${this.taxiNeeded}">CALL TAXI</button>

      <div style="width: 640px; height: 480px" id="mapContainer"></div>

      <!-- <div id="locationMarker">
        <p>Taxi nodig!</p>
        <p>Naar: Helmond Centraal Station</p>
        <p>Duur: 10 min</p>
      </div> -->

      <style>
        #locationMarker > p {
          padding: 0;
          margin: 0;
        }

        #locationMarker {
          font-size: 0.75em;
          padding: 0.5em;
          width: 15em;
          border: 2px solid var(--dark-color);
          border-radius: 10px;
          background-color: var(--shade-color);
          color: var(--base-color);
        }
      </style>
    `;
  }
}

customElements.define("here-maps-component", HereMapsComponent);
