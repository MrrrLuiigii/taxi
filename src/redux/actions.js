import nanoid from "nanoid"; //create an random id for an object

export const ADD_RIT = "ADD_RIT";
export const UPDATE_FILTER = "UPDATE_FILTER";

export const addRit = (van, naar) => {
  return {
    type: ADD_RIT,
    rit: {
      id: nanoid(),
      datumTijd: new Date(new Date().getTime + 24 * 60 * 60 * 1000),
      van,
      naar,
      afstand: 0,
      duur: 0,
      complete: false,
    },
  };
};
