/**
 * Created by linfengluo@gmail.com on 2018/12/10.
 */

import * as Types from '../units/types'
export default {
  [Types.TOGGLE_ASIDE](state) {
    state.menuCollapse = !state.menuCollapse
  },
  
  [Types.SAVE_CLASSIFY](state, list){
    state.classify = list
  }
}
