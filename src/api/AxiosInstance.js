import axios, { AxiosRequestConfig } from 'axios';

const host = 'https://api-staging.getti.cn'; // staging host

export const auth = 'Token ec8c067db337fa20f1f43afb2a086d355d0ed477';

// axios config options
const options: AxiosRequestConfig = {
  baseURL: host,
  headers: {
    Authorization: auth,
  },
  // 查询对象序列化函数
  paramsSerializer: (params: any) => qs.stringify(params),
};

const AxiosInstance = axios.create(options);

export default AxiosInstance;

