import {
  MYORDER,
  ACCEPTED_ORDER,
  COMPLETED__ORDER,
  ORDERDETAILS,
} from '../ActionType';

const initialState = {
  MyOrders: [],
  AcceptedOrder: {},
  Orderdetails: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MYORDER:
      return {
        ...state,
        MyOrders: action.Myorder,
      };
    case ACCEPTED_ORDER:
      return {
        ...state,
        AcceptedOrder: action.acceptedOrderData,
      };

    case COMPLETED__ORDER:
      return {
        ...state,
        AcceptedOrder: null,
      };
    case ORDERDETAILS:
      return {
        ...state,
        Orderdetails: action.Orderdetails,
      };

    default:
      return state;
  }
};
