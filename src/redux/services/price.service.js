import axios from 'axios';

const currencies = async () => {
  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .get(
      'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json',
    )
    .then(onSuccess)
    .catch(onFailure);
};

const currenciesService = {
  currencies,
};
export default currenciesService;
