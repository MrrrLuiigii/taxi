import { html } from "lit-element";
import { BaseView } from "../views/base-view";

class ModalComponent extends BaseView {
  static get properties() {
    return {
      opened: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.opened = false;
  }

  render() {
    return html` <div
        class="${classMap({
          dialog: true,
          opened: !this.opened,
          closed: this.opened,
        })}"
      >
        <h1 class="title ">Title</h1>
        <p class="content">This is a dialog</p>
        <div class="buttons">
          <button
            class="accept"
            @click="${() =>
              this.dispatchEvent(new CustomEvent("dialog.accept"))}"
          >
            Ok
          </button>
          <button
            class="cancel"
            @click="${() =>
              this.dispatchEvent(new CustomEvent("dialog.cancel"))}"
          >
            Cancel
          </button>
        </div>
      </div>

      <style>
        .opened {
          display: flex;
        }
        .closed {
          display: none;
        }
        .dialog {
          flex-direction: column;
          border: 2px outset black;
          padding: 1em;
          margin: 1em;
        }
        .buttons {
          display: flex;
          flex-direction: row;
        }
        .accept {
          justify-content: space-around;
          align-content: space-around;
        }
        .cancel {
          justify-content: space-around;
          align-content: space-around;
        }
      </style>`;
  }
}

customElements.define("modal-component", ModalComponent);
