import axios, { AxiosRequestConfig } from 'axios';

const host = 'https://api-staging.getti.cn'; // staging host

export const auth = 'Token 96bd58d5308201c7b8380edd2270c26547e3c659';

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

