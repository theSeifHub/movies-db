import axios from 'axios';

const setBaseURL = (): string => {
  const omdbApi = 'https://www.omdbapi.com/';
  const apiKey = '8064a965'
  const baseURL = `${omdbApi}?apikey=${apiKey}`
  return baseURL;
};

const createOMDbAxios = () => {
  const OMDbAxios = axios.create({
    baseURL: setBaseURL(),
    timeout: 10000,
    timeoutErrorMessage: 'TIMEOUT! Server is taking too long to respond',
    responseType: 'json',
  });
  return OMDbAxios
};

export default createOMDbAxios();
