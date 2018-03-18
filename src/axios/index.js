import axios from 'axios'
import store from '../store'
import router from '../router'

//设置全局axios默认值
axios.defaults.timeout = 100 * 60 * 2; //5000的超时验证
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

//创建一个axios实例
const instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

axios.interceptors.request.use = instance.interceptors.request.use;


const downloadPost = (config) => {
  const url = config.url;
  const data = JSON.parse(config.data);
  const form = document.createElement('form');
  form.action = url;
  form.method = 'post';
  form.style.display = 'none';
  Object.keys(data).forEach(key => {
    const input = document.createElement('input');
    input.name = key;
    input.value = data[key];
    form.appendChild(input)
  });
  const button = document.createElement('input');
  button.type = 'submit';
  form.appendChild(button);
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form)
};

const downloadGet = (config) => {
  const params = [];
  for (const item in config.params) {
    params.push(`${item}=${config.params[item]}`)
  }
  const url = params.length ? `${config.url}?${params.join('&')}` : `${config.url}`;
  let iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = url;
  iframe.onload = function () {
    document.body.removeChild(iframe)
  };
  document.body.appendChild(iframe)
};

//request拦截器
instance.interceptors.request.use(
  config => {
    //每次发送请求之前检测都vuex存有token,那么都要放在请求头发送给服务器
    if (store.state.token) {
      config.headers.Authorization = `${store.state.token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

//respone拦截器
instance.interceptors.response.use(
  response => {

    if (response.data['code'] === 1001) {
      router.replace({
        path: '/login'
      })
    }

    if (response.headers && response.headers['content-type'] === 'application/octet-stream') {
      const config = response.config;
      if (config.method === 'post') {
        downloadPost(config)
      } else if (config.method === 'get') {
        downloadGet(config)
      }
      return
    }

    return response;
  },
  error => { //默认除了2XX之外的都是错误的，就会走这里
    // if (error.response) {
    //   switch (error.response.status) {
    //     case 401:
    //   }
    // }
    return Promise.reject(error.response);
  }
);

export default instance;
