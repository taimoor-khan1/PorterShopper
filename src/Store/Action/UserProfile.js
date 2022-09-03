import {USERPROFILE} from '../ActionType';
import Axios from '../../network/index';
import {CONSTANTS} from '../../constants';
import utils from '../../utils';

export const GetProfile = () => {
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
          type: USERPROFILE,
          userprofile: data.data.records,
        });

        // responsee({ success: 1, error: null });
      };
      const onFailure = error => {
        let errorMsg = utils.showResponseError(error);
        // responsee({ success: 0, error: errorMsg });
      };

      Axios.get(CONSTANTS.API_CALLS.GET_PROFILE, config)
        .then(onSuccess)
        .catch(onFailure);
    }
  };
};
