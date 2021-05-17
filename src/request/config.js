export default {
  baseURL: import.meta.env.VUE_APP_API_URL,
  method: 'GET',
  headers: {
    'Content-Type':'application/json;charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest',
    'eyeJwt': ''
  },
  // 设置超时时间
  timeout: 10000,
  // 携带凭证
  withCredentials: false,
  // 返回数据类型
  responseType: 'json',
  // validateStatus: function (status) {
  //   return status >= 200 && status < 300
  // },
}
