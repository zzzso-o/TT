import axios from "axios";

const DOMAIN = "http://localhost:8080/";
axios.defaults.withCredentials = true; // 쿠키 데이터를 전송받기 위해
export const request: any = (method: any, url: any, data: any) => {
  console.log(data);
  return axios({
    method,
    url: DOMAIN + url,
    data,
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// export const loginRequest: any = (method: string, url: string, data: object) => {
//   return axios({
//     url: DOMAIN + url,
//     method: 'post',
//     data: data
//   })
//     .then(res => {
//       const token = res.data.key
//       dispatch(saveToken(token))
//     })
//     .catch(err => {
//       console.error(err.response.data)
//     })
// }
