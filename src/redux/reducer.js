import { createSelector } from "reselect";

import { ADD_RIT } from "./actions.js";

// export const statusFilter = {
//   SHOW_ALL: "All",
//   SHOW_ACTIVE: "Active",
//   SHOW_COMPLETED: "Completed",
// };

const INITIAL_STATE = {
  ritten: [],
  // filter: statusFilter.SHOW_ALL,
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_RIT:
      return {
        ...state,
        ritten: [...state.ritten, action.rit],
      };
    default:
      return state;
  }
};

const selectRitten = (state) => state.ritten;
// const selectStatusFilter = (state) => state.statusFilter;

// export const getFilteredRitten = createSelector(
//   selectRitten,
//   selectStatusFilter,
//   (ritten, filter) => {
//     switch (filter) {
//       case selectStatusFilter.SHOW_ACTIVE:
//         return ritten.filter((rit) => !rit.complete);
//       case selectStatusFilter.SHOW_COMPLETED:
//         return ritten.filter((rit) => rit.complete);
//       default:
//         return ritten;
//     }
//   }
// );

export const getRitten = createSelector(selectRitten, (ritten) => {
  return ritten;
});
