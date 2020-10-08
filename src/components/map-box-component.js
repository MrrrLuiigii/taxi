import { html } from "lit-element";
import { BaseView } from "../views/base-view.js";
import mapboxgl from "mapbox-gl";

class MapBoxComponent extends BaseView {
  static get properties() {
    return {
      map: {},
    };
  }

  firstUpdated() {
    this.loadMapBox();
  }

  loadMapBox() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibXJycmx1aWlnaWkiLCJhIjoiY2tnMGhvb2ZvMDN0bjJybnhseHprNGE4eSJ9.S9RMbJT6yNX6DAwdcHG9vA";
    // mapboxgl.accessToken = process.env.MAPBOX_API_KEY;

    this.map = new mapboxgl.Map({
      container: "mapContainer",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [5.704076, 51.477491],
      zoom: 10,
    });
  }

  render() {
    return html`
      <div id="mapContainer"></div>

      <style>
        #mapContainer {
          width: 640px;
          height: 480px;

          border: 2px solid var(--dark-color);
          border-radius: 10px;
        }
      </style>
    `;
  }
}

customElements.define("map-box-component", MapBoxComponent);
