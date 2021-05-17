import axios from 'axios'
import config from './config.js' // 导入默认配置
import router from '@/router'
import apiUrls from '@/request/apiUrl.js'
import { ElLoading } from 'element-plus';

/**
 * RFC4122 version 4 
 * create uuid
 */
function uuidv4() {
  return 'xxxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function deleteEmptyValue(obj) {
  if(!obj) {
    return ''
  }
  let result = {};
  Object.keys(obj).forEach((item) => {
    if (obj[item] === 0 || obj[item] || obj[item] === false) {
      result[item] = obj[item]
    }
  })
  return result;
}

if (!sessionStorage.getItem('xSessionId')) {
  sessionStorage.setItem('xSessionId', uuidv4())
}

// 获取token
let tokenInfo = {}
try {
  tokenInfo = JSON.parse(localStorage.getItem('sc-auth-info')) || {}
} catch (error) {
  console.error('get token error', error)
}

config.headers.eyeJwt = tokenInfo.jwtToken || '';

let loadingInstance = null;
let loadingCount = 0;

const instance = axios.create(config)

// axios instance request 拦截器
instance.interceptors.request.use(
  config => {
    config.headers['X-B3-TraceId'] = uuidv4();
    config.headers['X-Session-Id'] = sessionStorage.getItem('xSessionId');
    if (config.method.toLocaleUpperCase() === 'POST' && config.data) {
      if (config.headers['Content-Type'].startsWith('application/json')) {
        config.data = JSON.stringify(config.data)
      }
    }
    if (config.method.toLocaleUpperCase() === 'GET') {
      config.params = deleteEmptyValue(config.params);
    }

    return config
  },
  error => {
    //  1.判断请求超时
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      console.log('根据你设置的timeout/真的请求超时 判断请求现在超时了，你可以在这里加入超时的处理方案')
      // return service.request(originalRequest);//例如再重复请求一次
    }
    //  2.需要重定向到错误页面
    const errorInfo = error.response
    // console.log(errorInfo)
    if (errorInfo) {
      // error =errorInfo.data//页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
      const errorStatus = errorInfo.status; // 404 403 500 ... 等
      router.push({
        path: `/error/${errorStatus}`
      })
    }
    return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
  }
)

// axios instance response 拦截器
instance.interceptors.response.use(
  response => {
    // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
    if (response.data == undefined) {
      response.data = response.request.responseText
    }
    // try {
    //   window.userLogline.info('response success', {
    //     uuid: response.config.headers['X-B3-TraceId'],
    //     sessionId: response.config.headers['X-Session-Id'],
    //     status: response.status,
    //     data: response.data
    //   })
    // } catch (error) {
    //   console.log(error)
    // }
    // 若不是正确的返回code，且已经登录，就抛出错误
    // const err = new Error(data.description)

    // err.data = data
    // err.response = response

    // throw err
    return response
  },
  err => {
    return Promise.reject(err) // 返回接口返回的错误信息
  }
)

/**
 * 
 * @param {axios config object} options 
 * @param {return xhr data only} onlyData 
 * @param {show loading icon} loading 
 */
export default function $axios(options, onlyData = true, loading = true) {
  // loading
  if (loading) {
    loadingInstance = ElLoading.service({
      lock: true,
      // text: '加载中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.3)',
      customClass: 'loading-self'
    });
    loadingCount += 1;
  }

  if (!options.url) {
    options.url = apiUrls[options.api]
  }
  return new Promise((resolve, reject) => {
    instance(options)
      .then((res) => {
        if (onlyData) {
          resolve(res.data)
        } else {
          resolve(res)
        }
      })
      .catch((error) => {
        // try {
        //   // 有些手机没有实例化，有点坑
        //   window.userLogline.error('response error', {
        //     uuid: error.config.headers['X-B3-TraceId'],
        //     sessionId: error.config.headers['X-Session-Id'],
        //     response: error.response ? error.response.data : 'no response'
        //   })
        // } catch (error) {
        //   console.log(error)
        // }
        
        // utils.methods.trackerMessage(`http error:${error.config.url}`, {
        //   level: 'error',
        //   uuid: error.config.headers['X-B3-TraceId'],
        //   sessionId: error.config.headers['X-Session-Id']
        // });
        const xhrStatus = _.get(error, 'response.status');
        if (xhrStatus === 401) {
          router.push({ path: '/auth/login', query: { redirectUrl: router.currentRoute.fullPath } })
        } else {
          reject(error)
        }
      }).finally(() => {
        if (loading) {
          loadingCount -= 1;
          if (loadingCount < 1) {
            // 延迟以下，可能会闪现
            setTimeout(() => {
              loadingInstance.close()
            }, 200)
          }
        }
        
      })
  })
}

$axios.setHeader = function (key, value) {
  instance.defaults.headers[key] = value;
}
