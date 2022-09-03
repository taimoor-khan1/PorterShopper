import {
  IS_ORDER_ACCEPTED,
  ORDERREQUEST,
} from '../../../../PorterRider/src/Store/ActionType';

export const setIsOrderAccepted = isOrderAccepted => {
  return {
    type: IS_ORDER_ACCEPTED,
    isOrderAccepted: isOrderAccepted,
  };
};

export const setOrderRequestStatus = orderRequest => {
  return {
    type: ORDERREQUEST,
    orderRequest: orderRequest,
  };
};
