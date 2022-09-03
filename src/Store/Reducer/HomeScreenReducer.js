import {
  IS_ARRIVED,
  IS_OFFLINE,
  IS_RATINGS,
  REQUEST_ACCEPTANCE,
} from '../ActionType';

const initialState = {
  isOffline: true,
  isRequestAccept: false,
  isArrived: false,
  isRatings: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_OFFLINE:
      return {
        ...state,
        isOffline: action.isOffline,
      };
    case REQUEST_ACCEPTANCE:
      return {
        ...state,
        isRequestAccept: action.isRequestAccept,
      };
    case IS_ARRIVED:
      return {
        ...state,
        isArrived: action.isArrived,
      };
    case IS_RATINGS:
      return {
        ...state,
        isRatings: action.isRatings,
      };

    default:
      return state;
  }
};
