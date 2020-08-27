import { html } from "lit-element";
import { connect } from "pwa-helpers";
import { store } from "../redux/store.js";
import { BaseView } from "./base-view.js";
import { getRitten } from "../redux/reducer.js";
import { addRit } from "../redux/actions.js";

class RittenView extends BaseView {
  static get properties() {
    return {
      ritten: { type: Array },
      // filter: { type: String },
      modalVisible: { type: Boolean },
    };
  }

  // stateChanged(state) {
  //   this.ritten = getRitten(state);
  //   // this.filter = state.filter;
  // }

  constructor() {
    super();
    this.modalVisible = false;
    this.ritten = [];
  }

  render() {
    return html`
      <style>
        button {
          border: none;
          height: 2em;
          background-color: var(--shade-color);
          color: var(--base-color);
          border-radius: 5px;
          box-shadow: 1px 1px 2px var(--dark-color);
          margin-right: 1em;
          outline: none;
        }

        button:focus {
          outline: none;
        }
      </style>

      <div class="rittenContainer">
        ${this.ritten
          ? this.ritten.map(
              (rit) => html`
                <rit-component>
                  <div slot="ritInfo">
                    <p>
                      ${rit.id}, ${rit.datumTijd}, ${rit.van}, ${rit.naar},
                      ${rit.afstand}, ${rit.duur}, ${rit.complete}
                    </p>
                  </div>
                </rit-component>
              `
            )
          : html`<p>Geen ritten op het moment...</p>`}

        <button @click="${this.ritToevoegen}">RIT TOEVOEGEN</button>
        <button @click="${this.toggleModal.bind(this)}">TOGGLE MODAL</button>

        <modal-component
          ?opened="${this.modalVisible}"
          @dialog.accept="${this.closeDialog.bind(this)}"
          @dialog.cancel="${this.closeDialog.bind(this)}"
        ></modal-component>
      </div>
    `;
  }

  ritToevoegen() {
    const rit = {
      id: 1,
      datumTijd: "01/05/2020 13:45",
      van: "Helmond Centraal",
      naar: "Eindhoven Centraal",
      afstand: 20,
      duur: 30,
      complete: false,
    };

    this.ritten = [...this.ritten, rit];

    // store.dispatch(addRit("Mijn huis", "AppBriek"));
  }

  toggleModal(e) {
    this.dialogVisible = !this.dialogVisible;
    console.log(this.dialogVisible);
  }

  closeDialog(e) {
    console.log(e);
    this.dialogVisible = false;
  }
}

customElements.define("ritten-view", RittenView);
