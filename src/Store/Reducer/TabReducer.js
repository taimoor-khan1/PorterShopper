import {SCREENS} from '../../constants';
import {SET_SELECTED_TAB} from '../ActionType';

const initialState = {
  selectedTab: SCREENS.PostJob,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_TAB:
      return {
        ...state,
        selectedTab: action.payload,
      };

    default:
      return state;
  }
};
