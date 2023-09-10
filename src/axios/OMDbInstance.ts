import axios from 'axios';

const setBaseURL = (): string => {
  const omdbApi = 'https://www.omdbapi.com/';
  return omdbApi;
};

const OMDbApiKey = process.env.REACT_APP_OMDB_API_KEY;

const createOMDbAxios = () => {
  const OMDbInstance = axios.create({
    baseURL: setBaseURL(),
    timeout: 10000,
    timeoutErrorMessage: 'TIMEOUT! Server is taking too long to respond',
    responseType: 'json',
  });

  // Request interceptors
  OMDbInstance.interceptors.request.use((req) => {
    req.params = {
      ...req.params,
      apikey: OMDbApiKey,
    };
    return req;
  });
  return OMDbInstance
};

export default createOMDbAxios();
