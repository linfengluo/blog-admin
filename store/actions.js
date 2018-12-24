/**
 * Created by linfengluo@gmail.com on 2018/12/10.
 */

import apiConfig from '../units/apiConfig'
import * as Type from '../units/types'
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
  
  updateClassify({}, data){
    return new Promise((resolve, reject) => {
      this.$axios({
        method: data.type,
        url: apiConfig.classify,
        data: data.params
      }).then(res => {
          if (res.code < 400) {
            resolve(res.data)
          } else {
            reject(res.msg)
          }
        }).catch(err => {
          reject(err)
        });
    })
  },
  
  getClassify({commit}){
    this.$axios.get(apiConfig.classify)
      .then(res => {
        if (res.code === 200) {
          commit(Type.SAVE_CLASSIFY, res.data.results)
        }
      }).catch(err => {
        console.log(err)
      });
  },
  
  getArticles({}, params){
    return new Promise((resolve, reject) => {
      this.$axios.get(apiConfig.article, {
        params
      })
        .then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        });
    })
  },
  getArticle({}, id){
    return new Promise((resolve, reject) => {
      this.$axios.get(`${apiConfig.article}/${id}`)
        .then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        });
    })
  }
}

export default actions
