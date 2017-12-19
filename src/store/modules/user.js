/**
 * Created by zhaojuntong on 2017/12/19.
 */
import { getToken, setToken, removeToken } from 'utils/auth'
const user = {
  state: {
    user: '',
    password: '',
    token: getToken()
  }
}
