const axios = require('axios');

export function registerApi(username, password) {
  let result = null;
  axios.post('/api/register', {
    username: username,
    password: password
  }).then((res) => {
    // console.log(res.data);
    result = res.data;
  }).catch((err) => {
    result = err;
  });
  return result
}


