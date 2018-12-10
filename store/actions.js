/**
 * Created by linfengluo@gmail.com on 2018/12/10.
 */

import apiConfig from '../units/apiConfig'
const actions = {
  login({}, data){
    return new Promise((resolve, reject) => {
      this.$axios.post(apiConfig.login, data)
        .then(res => {
          if (res.code === 200) {
            resolve()
          } else {
            reject(res.msg || '登录失败')
          }
        }).catch(err => {
          reject('请求失败')
        });
    })
  },
}

export default actions
