import axios from 'axios';

const setBaseURL = (): string => {
  const nytimesArticlesApi = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
  return nytimesArticlesApi;
};

const NYTimesApiKey = process.env.REACT_APP_NYTIMES_API_KEY;

const createNYTimesAxios = () => {
  const NYTimesInstance = axios.create({
    baseURL: setBaseURL(),
    timeout: 10000,
    timeoutErrorMessage: 'TIMEOUT! Server is taking too long to respond',
    responseType: 'json',
  });

  // Request interceptors
  NYTimesInstance.interceptors.request.use((req) => {
    req.params = {
      ...req.params,
      "api-key": NYTimesApiKey,
      sort: "newest",
      page: 0,
    };

    return req;
  });
  return NYTimesInstance
};

export default createNYTimesAxios();
