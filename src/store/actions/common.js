import Http from '../../utils/http'
import API from '../../utils/api'

let http = new Http()

export default {
  get_parking_rule ({commit, state}, router) {
    var parkingRule = localStorage.getItem('parking_rule')
    // 从本地缓存中先获取
    if (parkingRule) {
      commit('set_common_data_parking_rule', JSON.parse(parkingRule))
    }
    // 从接口获取
  }
}
