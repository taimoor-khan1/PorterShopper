import {SET_SELECTED_TAB} from '../ActionType';

export const setSelectedTab = selectedtab => {
  return dispatch => {
    dispatch({
      type: SET_SELECTED_TAB,
      payload: selectedtab,
    });
  };
};
