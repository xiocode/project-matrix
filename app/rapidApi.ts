import axios from 'axios';
import ruiPlayerConfig from './rui-player-config';

const rapidApi = axios.create({
  baseURL: ruiPlayerConfig.apiBase,
  validateStatus: null,
});

export default rapidApi;

export const rapidApiCancelToken = axios.CancelToken;

export { type CancelTokenSource } from 'axios';
