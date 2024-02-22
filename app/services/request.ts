import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';


// 返回res.data的interface
export interface IResponse {
  code: number | string;
  data: any;
  msg: string;
}

let axiosInstance:AxiosInstance = axios.create({
  baseURL: "https://next-app-coral-three.vercel.app/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded"
  },
  // transformRequest: [
  //   function(data) {
  //     //由于使用的 form-data传数据所以要格式化
  //     delete data.Authorization;
  //     data = qs.stringify(data);
  //     return data;
  //   }
  // ]
});

// axios实例拦截响应
// axiosInstance.interceptors.response.use(
//   (response: AxiosResponse) => {
//     if (response.headers.authorization) {
//       localStorage.setItem('app_token', response.headers.authorization);
//     } else {
//       if (response.data && response.data.token) {
//         localStorage.setItem('app_token', response.data.token);
//       }
//     }

//     if (response.status === 200) {
//       return response;
//     } else {
//       showMessage(response.status);
//       return response;
//     }
//   },
//   // 请求失败
//   (error: any) => {
//     const {response} = error;
//     if (response) {
//       // 请求已发出，但是不在2xx的范围
//       showMessage(response.status);
//       return Promise.reject(response.data);
//     } else {
//       message.error('网络连接异常,请稍后再试!');
//     }
//   }
// );

// // axios实例拦截请求
// axiosInstance.interceptors.request.use(
//   (config: AxiosRequestConfig) => {
//     const token = localStorage.getItem('app_token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config;
//   },
//   (error:any) => {
//     return Promise.reject(error);
//   }
// )  

export default axiosInstance;