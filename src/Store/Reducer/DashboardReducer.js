import {DASHBOARD} from '../ActionType';

const initialState = {
  Dashboard: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD:
      return {
        ...state,
        Dashboard: action.dashboard,
      };
  }
  return state;
};
