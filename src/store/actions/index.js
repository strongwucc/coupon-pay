// 公共数据模块
import common_data from './common'
import user_data from './user'

const common_module = {
  ...common_data,
  ...user_data
}

export default {
  common_module,
  user_data
}
