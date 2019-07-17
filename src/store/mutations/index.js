import user_info from './user/info'
import user_auth from './user/auth'
import common from './common'
const user_module = {
  ...user_info,
  ...user_auth,
}

const common_module = {
  ...common
}

export default {
  user_module,
  common_module
}
