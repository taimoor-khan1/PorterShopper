import {CONSTANTS} from '../../constants';
import Axios from '../../network';
import utils from '../../utils';
import {DASHBOARD} from '../ActionType';

export const Dashboard = response => {
  return async (dispatch, getState) => {
    const token = getState().Auth.AccessToken;

    if (token !== null) {
      let config = {
        headers: {
          Authorization: token,
        },
      };

      const onSuccess = ({data}) => {
        dispatch({
          type: DASHBOARD,
          dashboard: data.data,
        });

        response({success: 1, error: null});
      };
      const onFailure = error => {
        let errorMsg = utils.showResponseError(error);
        response({success: 0, error: errorMsg});
      };

      Axios.get(CONSTANTS.API_CALLS.DASHBOARD, config)
        .then(onSuccess)
        .catch(onFailure);
    }
  };
};
