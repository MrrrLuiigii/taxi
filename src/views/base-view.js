import { LitElement } from "lit-element";
export class BaseView extends LitElement {
  //mapbox style import only works with createRenderRoot enabled, but it disables the use of shadowroot
  createRenderRoot() {
    return this;
  }
}
