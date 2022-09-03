import axios from 'axios';
import {CONSTANTS} from '../../constants';
import {store} from '../store';

const profile = () => {
  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .get(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.GET_PROFILE, {
      headers: {
        Authorization: store.getState().Auth.accessToken,
      },
    })
    .then(onSuccess)
    .catch(onFailure);
};

const profileService = {
  profile,
};
export default profileService;
