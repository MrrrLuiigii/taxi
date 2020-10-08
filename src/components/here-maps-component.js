import { html } from "lit-element";
import { BaseView } from "../views/base-view.js";

class HereMapsComponent extends BaseView {
  static get properties() {
    return {
      map: {},
      platform: {},
    };
  }

  firstUpdated() {
    this.loadHEREMap();
  }

  loadHEREMap() {
    this.platform = new H.service.Platform({
      apikey: "rssyciJ52WL1ns1uK3VI18VBFtqL-uAQl6G2oFp7YdA",
      // apikey: process.env.HERE_MAPS_API_KEY,
    });

    var defaultLayers = this.platform.createDefaultLayers();

    this.map = new H.Map(
      this.shadowRoot.getElementById("mapContainer"),
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

    this.ui = H.ui.UI.createDefault(this.map, defaultLayers);
  }

  async geocode(address) {
    var geocoder = this.platform.getSearchService(),
      geocodingParameters = {
        q: address,
      };
    return await geocoder.geocode(geocodingParameters);
  }

  addMarker(position) {
    const lat = position.lat;
    const lng = position.lng;

    const group = new H.map.Group();
    const marker = new H.map.Marker({ lat, lng });
    group.addObject(marker);

    this.map.addObject(group);
    this.map.setCenter(group.getBoundingBox().getCenter());
  }

  getCurrentLocation() {
    this.clearMap();

    const options = {
      maximumAge: 0,
      timeout: 2000,
      enableHighAccuracy: true,
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          position;
          position.lat = position.coords.latitude;
          position.lng = position.coords.longitude;
          this.addMarker(position);
        },
        (err) => console.warn(`ERROR: ${err}`),
        options
      );
    } else {
      console.warn("Geolocation is not supported by this browser.");
    }
  }

  async searchAddress(address) {
    this.clearMap();

    const locations = await this.geocode(address);
    this.addMarker(locations.items[0].position);
  }

  async planRoute(from, to) {
    this.clearMap();

    const fromLocations = await this.geocode(from);
    const origin = `${fromLocations.items[0].position.lat},${fromLocations.items[0].position.lng}`;

    const toLocations = await this.geocode(to);
    const destination = `${toLocations.items[0].position.lat},${toLocations.items[0].position.lng}`;

    this.calculateRouteFromAtoB(origin, destination);
  }

  calculateRouteFromAtoB(origin, destination) {
    const router = this.platform.getRoutingService(null, 8),
      routeRequestParams = {
        routingMode: "fast",
        transportMode: "car",
        origin,
        destination,
        return: "polyline,turnByTurnActions,actions,instructions,travelSummary",
      };

    const self = this;

    router.calculateRoute(
      routeRequestParams,
      (result) => {
        const route = result.routes[0];
        self.addRouteShapeToMap(route);
        self.addManueversToMap(route);
      },
      (err) => {
        alert("Can't reach the remote server");
        console.warn(err);
      }
    );
  }

  addRouteShapeToMap(route) {
    route.sections.forEach((section) => {
      // decode LineString from the flexible polyline
      let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

      // Create a polyline to display the route:
      let polyline = new H.map.Polyline(linestring, {
        style: {
          lineWidth: 4,
          strokeColor: "rgba(0, 128, 255, 0.7)",
        },
      });

      // Add the polyline to the map
      this.map.addObject(polyline);
      // And zoom to its bounding rectangle
      this.map.getViewModel().setLookAtData({
        bounds: polyline.getBoundingBox(),
      });
    });
  }

  addManueversToMap(route) {
    var svgMarkup =
        '<svg width="18" height="18" ' +
        'xmlns="http://www.w3.org/2000/svg">' +
        '<circle cx="8" cy="8" r="8" ' +
        'fill="#1b468d" stroke="white" stroke-width="1"  />' +
        "</svg>",
      dotIcon = new H.map.Icon(svgMarkup, { anchor: { x: 8, y: 8 } }),
      group = new H.map.Group(),
      i;

    route.sections.forEach((section) => {
      let poly = H.geo.LineString.fromFlexiblePolyline(
        section.polyline
      ).getLatLngAltArray();

      let actions = section.actions;
      // Add a marker for each maneuver
      for (i = 0; i < actions.length; i += 1) {
        let action = actions[i];
        const marker = new H.map.Marker(
          {
            lat: poly[action.offset * 3],
            lng: poly[action.offset * 3 + 1],
          },
          { icon: dotIcon }
        );
        marker.instruction = action.instruction;
        group.addObject(marker);
      }

      const self = this;

      group.addEventListener(
        "tap",
        (evt) => {
          self.map.setCenter(evt.target.getGeometry());
          openBubble(evt.target.getGeometry(), evt.target.instruction);
        },
        false
      );

      // Add the maneuvers group to the map
      this.map.addObject(group);
    });
  }

  clearMap() {
    if (this.map.getObjects().length > 0) {
      for (let i = 0; i < this.map.getObjects().length; i++) {
        this.map.removeObject(this.map.getObjects()[i]);
      }
    }
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

customElements.define("here-maps-component", HereMapsComponent);
