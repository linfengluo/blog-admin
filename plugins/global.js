/**
 * Created by linfengluo@gmail.com on 2018/12/11.
 */
import Vue from 'vue'
import dayjs from 'dayjs'
Vue.mixin({
  methods: {
    formatDate(date, format = 'YYYY-MM-DD HH:mm'){
      return dayjs(date).format(format)
    }
  }
})
